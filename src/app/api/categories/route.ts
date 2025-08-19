import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { categories, products } from '@/lib/db/schema'
import { eq, sql, and } from 'drizzle-orm'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const includeProductCount =
      searchParams.get('includeProductCount') === 'true'

    if (includeProductCount) {
      // Fetch categories with product count
      const categoriesData = await db
        .select({
          id: categories.id,
          name: categories.name,
          slug: categories.slug,
          description: categories.description,
          imageUrl: categories.imageUrl,
          isActive: categories.isActive,
          productCount: sql<number>`COUNT(p.id)`,
        })
        .from(categories)
        .leftJoin(
          products,
          and(
            eq(products.categoryId, categories.id),
            eq(products.isActive, true)
          )
        )
        .where(eq(categories.isActive, true))
        .groupBy(categories.id)
        .orderBy(categories.name)

      return NextResponse.json({ categories: categoriesData })
    } else {
      // Fetch categories without product count
      const categoriesData = await db
        .select({
          id: categories.id,
          name: categories.name,
          slug: categories.slug,
          description: categories.description,
          imageUrl: categories.imageUrl,
          isActive: categories.isActive,
        })
        .from(categories)
        .where(eq(categories.isActive, true))
        .orderBy(categories.name)

      return NextResponse.json({ categories: categoriesData })
    }
  } catch (error) {
    console.error('Error fetching categories:', error)
    return NextResponse.json(
      { error: 'Failed to fetch categories' },
      { status: 500 }
    )
  }
}
