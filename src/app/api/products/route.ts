import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { products, categories, productImages } from '@/lib/db/schema'
import { eq, desc, asc, and, like, sql } from 'drizzle-orm'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '12')
    const category = searchParams.get('category')
    const search = searchParams.get('search')
    const sortBy = searchParams.get('sortBy') || 'createdAt'
    const sortOrder = searchParams.get('sortOrder') || 'desc'
    const minPrice = searchParams.get('minPrice')
    const maxPrice = searchParams.get('maxPrice')

    const offset = (page - 1) * limit

    // Build where conditions
    let whereConditions = [eq(products.isActive, true)]

    if (category) {
      whereConditions.push(eq(categories.slug, category))
    }

    if (search) {
      whereConditions.push(like(products.name, `%${search}%`))
    }

    if (minPrice) {
      whereConditions.push(sql`${products.price} >= ${parseFloat(minPrice)}`)
    }

    if (maxPrice) {
      whereConditions.push(sql`${products.price} <= ${parseFloat(maxPrice)}`)
    }

    // Build order by
    let orderBy = []
    if (sortBy === 'price') {
      orderBy.push(
        sortOrder === 'asc' ? asc(products.price) : desc(products.price)
      )
    } else if (sortBy === 'name') {
      orderBy.push(
        sortOrder === 'asc' ? asc(products.name) : desc(products.name)
      )
    } else {
      orderBy.push(
        sortOrder === 'asc' ? asc(products.createdAt) : desc(products.createdAt)
      )
    }

    // Fetch products with category and primary image
    const productsData = await db
      .select({
        id: products.id,
        name: products.name,
        slug: products.slug,
        description: products.shortDescription,
        price: products.price,
        comparePrice: products.comparePrice,
        isOnSale: products.isOnSale,
        salePercentage: products.salePercentage,
        stockQuantity: products.stockQuantity,
        isFeatured: products.isFeatured,
        categoryName: categories.name,
        categorySlug: categories.slug,
        primaryImage: productImages.url,
        rating: sql<number>`COALESCE(AVG(pr.rating), 0)`,
        reviewCount: sql<number>`COUNT(pr.id)`,
        createdAt: products.createdAt,
      })
      .from(products)
      .leftJoin(categories, eq(products.categoryId, categories.id))
      .leftJoin(
        productImages,
        and(
          eq(productImages.productId, products.id),
          eq(productImages.isPrimary, true)
        )
      )
      .leftJoin(sql`product_reviews pr`, eq(pr.productId, products.id))
      .where(and(...whereConditions))
      .groupBy(products.id, categories.name, categories.slug, productImages.url)
      .orderBy(...orderBy)
      .limit(limit)
      .offset(offset)

    // Get total count for pagination
    const totalCount = await db
      .select({ count: sql<number>`count(*)` })
      .from(products)
      .leftJoin(categories, eq(products.categoryId, categories.id))
      .where(and(...whereConditions))

    const total = totalCount[0]?.count || 0
    const totalPages = Math.ceil(total / limit)

    return NextResponse.json({
      products: productsData,
      pagination: {
        page,
        limit,
        total,
        totalPages,
        hasNext: page < totalPages,
        hasPrev: page > 1,
      },
    })
  } catch (error) {
    console.error('Error fetching products:', error)
    return NextResponse.json(
      { error: 'Failed to fetch products' },
      { status: 500 }
    )
  }
}
