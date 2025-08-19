'use client'

import { ProductCard } from './ProductCard'

// Mock data - in a real app, this would come from an API
const mockProducts = [
  {
    id: '1',
    name: 'Wireless Bluetooth Headphones',
    price: 89.99,
    originalPrice: 129.99,
    image:
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    rating: 4.8,
    reviewCount: 1247,
    category: 'Electronics',
    isNew: true,
    isOnSale: true,
    discount: 31,
  },
  {
    id: '2',
    name: 'Smart Fitness Watch',
    price: 199.99,
    image:
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    rating: 4.6,
    reviewCount: 892,
    category: 'Wearables',
    isOnSale: true,
    discount: 15,
  },
  {
    id: '3',
    name: 'Premium Coffee Maker',
    price: 149.99,
    originalPrice: 199.99,
    image:
      'https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    rating: 4.7,
    reviewCount: 567,
    category: 'Home & Kitchen',
    isOnSale: true,
    discount: 25,
  },
  {
    id: '4',
    name: 'Designer Leather Bag',
    price: 299.99,
    image:
      'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    rating: 4.9,
    reviewCount: 234,
    category: 'Fashion',
    isNew: true,
  },
  {
    id: '5',
    name: 'Gaming Laptop',
    price: 1299.99,
    originalPrice: 1599.99,
    image:
      'https://images.unsplash.com/photo-1603302576837-37561b2e2302?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    rating: 4.5,
    reviewCount: 156,
    category: 'Computers',
    isOnSale: true,
    discount: 19,
  },
  {
    id: '6',
    name: 'Organic Skincare Set',
    price: 79.99,
    image:
      'https://images.unsplash.com/photo-1556228720-195a672e8a03?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    rating: 4.7,
    reviewCount: 445,
    category: 'Beauty',
    isNew: true,
  },
  {
    id: '7',
    name: 'Smart Home Hub',
    price: 179.99,
    originalPrice: 249.99,
    image:
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    rating: 4.4,
    reviewCount: 321,
    category: 'Smart Home',
    isOnSale: true,
    discount: 28,
  },
  {
    id: '8',
    name: 'Yoga Mat Premium',
    price: 49.99,
    image:
      'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    rating: 4.6,
    reviewCount: 678,
    category: 'Sports',
    isNew: true,
  },
]

interface ProductGridProps {
  title?: string
  subtitle?: string
  products?: typeof mockProducts
  showViewAll?: boolean
}

export function ProductGrid({
  title = 'Featured Products',
  subtitle = 'Discover our handpicked selection of premium products',
  products = mockProducts,
  showViewAll = true,
}: ProductGridProps) {
  return (
    <section className='py-16'>
      <div className='container mx-auto px-4'>
        {/* Section Header */}
        <div className='text-center mb-12'>
          <h2 className='text-3xl lg:text-4xl font-bold mb-4'>{title}</h2>
          <p className='text-lg text-muted-foreground max-w-2xl mx-auto'>
            {subtitle}
          </p>
        </div>

        {/* Products Grid */}
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12'>
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* View All Button */}
        {showViewAll && (
          <div className='text-center'>
            <button className='inline-flex items-center px-6 py-3 border border-primary text-primary font-medium rounded-lg hover:bg-primary hover:text-white transition-colors duration-200'>
              View All Products
              <svg
                className='ml-2 h-5 w-5'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M17 8l4 4m0 0l-4 4m4-4H3'
                />
              </svg>
            </button>
          </div>
        )}
      </div>
    </section>
  )
}
