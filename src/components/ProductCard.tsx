'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Heart, ShoppingCart, Star, Eye } from 'lucide-react'

interface ProductCardProps {
  product: {
    id: string
    name: string
    price: number
    originalPrice?: number
    image: string
    rating: number
    reviewCount: number
    category: string
    isNew?: boolean
    isOnSale?: boolean
    discount?: number
  }
}

export function ProductCard({ product }: ProductCardProps) {
  const [isWishlisted, setIsWishlisted] = useState(false)
  const [isHovered, setIsHovered] = useState(false)

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(price)
  }

  return (
    <Card
      className='group overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1'
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <CardHeader className='p-0 relative'>
        {/* Product Image */}
        <div className='relative aspect-square overflow-hidden'>
          <img
            src={product.image}
            alt={product.name}
            className='w-full h-full object-cover transition-transform duration-300 group-hover:scale-105'
          />

          {/* Overlay with quick actions */}
          <div
            className={`absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center space-x-2`}
          >
            <Button
              variant='secondary'
              size='icon'
              className='h-10 w-10 rounded-full bg-white/90 hover:bg-white'
              onClick={() => setIsWishlisted(!isWishlisted)}
            >
              <Heart
                className={`h-5 w-5 ${
                  isWishlisted ? 'fill-red-500 text-red-500' : 'text-gray-600'
                }`}
              />
            </Button>
            <Button
              variant='secondary'
              size='icon'
              className='h-10 w-10 rounded-full bg-white/90 hover:bg-white'
            >
              <Eye className='h-5 w-5 text-gray-600' />
            </Button>
          </div>

          {/* Badges */}
          <div className='absolute top-2 left-2 flex flex-col gap-2'>
            {product.isNew && (
              <Badge variant='default' className='bg-green-500'>
                NEW
              </Badge>
            )}
            {product.isOnSale && product.discount && (
              <Badge variant='destructive'>-{product.discount}%</Badge>
            )}
          </div>

          {/* Category Badge */}
          <div className='absolute top-2 right-2'>
            <Badge variant='outline' className='bg-white/90 text-gray-700'>
              {product.category}
            </Badge>
          </div>
        </div>
      </CardHeader>

      <CardContent className='p-4'>
        {/* Product Name */}
        <h3 className='font-semibold text-lg mb-2 line-clamp-2 group-hover:text-primary transition-colors'>
          {product.name}
        </h3>

        {/* Rating */}
        <div className='flex items-center space-x-1 mb-2'>
          <div className='flex items-center'>
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-4 w-4 ${
                  i < Math.floor(product.rating)
                    ? 'fill-yellow-400 text-yellow-400'
                    : 'text-gray-300'
                }`}
              />
            ))}
          </div>
          <span className='text-sm text-gray-500 ml-1'>
            ({product.reviewCount})
          </span>
        </div>

        {/* Price */}
        <div className='flex items-center space-x-2 mb-3'>
          <span className='text-xl font-bold text-primary'>
            {formatPrice(product.price)}
          </span>
          {product.originalPrice && product.originalPrice > product.price && (
            <span className='text-sm text-gray-500 line-through'>
              {formatPrice(product.originalPrice)}
            </span>
          )}
        </div>
      </CardContent>

      <CardFooter className='p-4 pt-0'>
        <Button
          className='w-full group-hover:bg-primary/90 transition-colors'
          onClick={() => console.log('Add to cart:', product.id)}
        >
          <ShoppingCart className='h-4 w-4 mr-2' />
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  )
}
