import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Plus, Search, Filter, MoreHorizontal } from 'lucide-react'
import { db } from '@/lib/db'
import { products, categories, productImages } from '@/lib/db/schema'
import { eq, and, like, sql } from 'drizzle-orm'
import Link from 'next/link'

export default async function AdminProducts() {
  // Fetch products with category and primary image
  const productsData = await db
    .select({
      id: products.id,
      name: products.name,
      slug: products.slug,
      price: products.price,
      comparePrice: products.comparePrice,
      stockQuantity: products.stockQuantity,
      isActive: products.isActive,
      isFeatured: products.isFeatured,
      isOnSale: products.isOnSale,
      categoryName: categories.name,
      primaryImage: productImages.url,
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
    .orderBy(products.createdAt)

  return (
    <div className='space-y-6'>
      <div className='flex justify-between items-center'>
        <div>
          <h1 className='text-3xl font-bold text-gray-900'>Products</h1>
          <p className='text-gray-600'>Manage your product catalog</p>
        </div>
        <Link href='/admin/products/new'>
          <Button className='flex items-center space-x-2'>
            <Plus className='h-4 w-4' />
            <span>Add Product</span>
          </Button>
        </Link>
      </div>

      {/* Filters and Search */}
      <Card>
        <CardContent className='p-4'>
          <div className='flex flex-col sm:flex-row gap-4'>
            <div className='flex-1 relative'>
              <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400' />
              <input
                type='text'
                placeholder='Search products...'
                className='w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
              />
            </div>
            <Button variant='outline' className='flex items-center space-x-2'>
              <Filter className='h-4 w-4' />
              <span>Filters</span>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Products Table */}
      <Card>
        <CardHeader>
          <CardTitle>All Products ({productsData.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className='overflow-x-auto'>
            <table className='w-full'>
              <thead>
                <tr className='border-b border-gray-200'>
                  <th className='text-left py-3 px-4 font-medium text-gray-900'>
                    Product
                  </th>
                  <th className='text-left py-3 px-4 font-medium text-gray-900'>
                    Category
                  </th>
                  <th className='text-left py-3 px-4 font-medium text-gray-900'>
                    Price
                  </th>
                  <th className='text-left py-3 px-4 font-medium text-gray-900'>
                    Stock
                  </th>
                  <th className='text-left py-3 px-4 font-medium text-gray-900'>
                    Status
                  </th>
                  <th className='text-left py-3 px-4 font-medium text-gray-900'>
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {productsData.map((product) => (
                  <tr
                    key={product.id}
                    className='border-b border-gray-100 hover:bg-gray-50'
                  >
                    <td className='py-4 px-4'>
                      <div className='flex items-center space-x-3'>
                        <div className='w-12 h-12 bg-gray-200 rounded-lg overflow-hidden'>
                          {product.primaryImage ? (
                            <img
                              src={product.primaryImage}
                              alt={product.name}
                              className='w-full h-full object-cover'
                            />
                          ) : (
                            <div className='w-full h-full bg-gray-300 flex items-center justify-center'>
                              <span className='text-gray-500 text-xs'>
                                No Image
                              </span>
                            </div>
                          )}
                        </div>
                        <div>
                          <div className='font-medium text-gray-900'>
                            {product.name}
                          </div>
                          <div className='text-sm text-gray-500'>
                            SKU: {product.id.slice(0, 8)}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className='py-4 px-4 text-gray-600'>
                      {product.categoryName || 'Uncategorized'}
                    </td>
                    <td className='py-4 px-4'>
                      <div className='text-gray-900 font-medium'>
                        ${Number(product.price).toFixed(2)}
                      </div>
                      {product.comparePrice && (
                        <div className='text-sm text-gray-500 line-through'>
                          ${Number(product.comparePrice).toFixed(2)}
                        </div>
                      )}
                    </td>
                    <td className='py-4 px-4'>
                      <div className='flex items-center space-x-2'>
                        <span
                          className={`text-sm font-medium ${
                            product.stockQuantity > 10
                              ? 'text-green-600'
                              : product.stockQuantity > 0
                              ? 'text-yellow-600'
                              : 'text-red-600'
                          }`}
                        >
                          {product.stockQuantity}
                        </span>
                        {product.stockQuantity <= 5 && (
                          <Badge variant='destructive' className='text-xs'>
                            Low Stock
                          </Badge>
                        )}
                      </div>
                    </td>
                    <td className='py-4 px-4'>
                      <div className='flex items-center space-x-2'>
                        <Badge
                          variant={product.isActive ? 'default' : 'secondary'}
                        >
                          {product.isActive ? 'Active' : 'Inactive'}
                        </Badge>
                        {product.isFeatured && (
                          <Badge
                            variant='outline'
                            className='text-blue-600 border-blue-600'
                          >
                            Featured
                          </Badge>
                        )}
                        {product.isOnSale && (
                          <Badge variant='destructive'>On Sale</Badge>
                        )}
                      </div>
                    </td>
                    <td className='py-4 px-4'>
                      <div className='flex items-center space-x-2'>
                        <Link href={`/admin/products/${product.id}`}>
                          <Button variant='outline' size='sm'>
                            Edit
                          </Button>
                        </Link>
                        <Button variant='ghost' size='sm'>
                          <MoreHorizontal className='h-4 w-4' />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
