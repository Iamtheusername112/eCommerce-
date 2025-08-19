import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server'
import { db } from '@/lib/db'
import {
  cartItems,
  products,
  productImages,
  productVariants,
} from '@/lib/db/schema'
import { eq, and } from 'drizzle-orm'

export async function GET() {
  try {
    const { userId } = await auth()

    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const cartData = await db
      .select({
        id: cartItems.id,
        quantity: cartItems.quantity,
        productId: cartItems.productId,
        productVariantId: cartItems.productVariantId,
        productName: products.name,
        productSlug: products.slug,
        price: products.price,
        comparePrice: products.comparePrice,
        isOnSale: products.isOnSale,
        salePercentage: products.salePercentage,
        stockQuantity: products.stockQuantity,
        primaryImage: productImages.url,
        variantName: productVariants.name,
        variantValue: productVariants.value,
        variantPriceModifier: productVariants.priceModifier,
      })
      .from(cartItems)
      .leftJoin(products, eq(cartItems.productId, products.id))
      .leftJoin(
        productImages,
        and(
          eq(productImages.productId, products.id),
          eq(productImages.isPrimary, true)
        )
      )
      .leftJoin(
        productVariants,
        eq(cartItems.productVariantId, productVariants.id)
      )
      .where(eq(cartItems.userId, userId))

    return NextResponse.json({ cart: cartData })
  } catch (error) {
    console.error('Error fetching cart:', error)
    return NextResponse.json({ error: 'Failed to fetch cart' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const { userId } = await auth()

    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { productId, productVariantId, quantity } = await request.json()

    if (!productId || !quantity) {
      return NextResponse.json(
        { error: 'Product ID and quantity are required' },
        { status: 400 }
      )
    }

    // Check if item already exists in cart
    const existingItem = await db
      .select()
      .from(cartItems)
      .where(
        and(
          eq(cartItems.userId, userId),
          eq(cartItems.productId, productId),
          eq(cartItems.productVariantId, productVariantId || null)
        )
      )

    if (existingItem.length > 0) {
      // Update existing item
      await db
        .update(cartItems)
        .set({
          quantity: existingItem[0].quantity + quantity,
          updatedAt: new Date(),
        })
        .where(eq(cartItems.id, existingItem[0].id))
    } else {
      // Add new item
      await db.insert(cartItems).values({
        userId,
        productId,
        productVariantId: productVariantId || null,
        quantity,
      })
    }

    return NextResponse.json({ message: 'Item added to cart' })
  } catch (error) {
    console.error('Error adding to cart:', error)
    return NextResponse.json(
      { error: 'Failed to add item to cart' },
      { status: 500 }
    )
  }
}

export async function PUT(request: NextRequest) {
  try {
    const { userId } = await auth()

    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { cartItemId, quantity } = await request.json()

    if (!cartItemId || quantity === undefined) {
      return NextResponse.json(
        { error: 'Cart item ID and quantity are required' },
        { status: 400 }
      )
    }

    if (quantity <= 0) {
      // Remove item if quantity is 0 or negative
      await db
        .delete(cartItems)
        .where(and(eq(cartItems.id, cartItemId), eq(cartItems.userId, userId)))
    } else {
      // Update quantity
      await db
        .update(cartItems)
        .set({
          quantity,
          updatedAt: new Date(),
        })
        .where(and(eq(cartItems.id, cartItemId), eq(cartItems.userId, userId)))
    }

    return NextResponse.json({ message: 'Cart updated' })
  } catch (error) {
    console.error('Error updating cart:', error)
    return NextResponse.json(
      { error: 'Failed to update cart' },
      { status: 500 }
    )
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { userId } = await auth()

    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const cartItemId = searchParams.get('cartItemId')

    if (!cartItemId) {
      return NextResponse.json(
        { error: 'Cart item ID is required' },
        { status: 400 }
      )
    }

    await db
      .delete(cartItems)
      .where(and(eq(cartItems.id, cartItemId), eq(cartItems.userId, userId)))

    return NextResponse.json({ message: 'Item removed from cart' })
  } catch (error) {
    console.error('Error removing from cart:', error)
    return NextResponse.json(
      { error: 'Failed to remove item from cart' },
      { status: 500 }
    )
  }
}
