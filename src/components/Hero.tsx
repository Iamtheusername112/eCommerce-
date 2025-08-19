'use client'

import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ArrowRight, Play, Star, Users, Truck, Shield } from 'lucide-react'

export function Hero() {
  return (
    <section className='relative overflow-hidden bg-gradient-to-br from-primary/5 via-background to-secondary/5'>
      <div className='container mx-auto px-4 py-16 lg:py-24'>
        <div className='grid lg:grid-cols-2 gap-12 items-center'>
          {/* Left Content */}
          <div className='space-y-8'>
            {/* Badge */}
            <Badge variant='outline' className='px-4 py-2 text-sm font-medium'>
              🚀 New Collection 2025
            </Badge>

            {/* Main Heading */}
            <h1 className='text-4xl lg:text-6xl font-bold leading-tight'>
              Discover Amazing
              <span className='text-primary block'>Products</span>
              <span className='text-3xl lg:text-4xl text-muted-foreground font-normal'>
                Shop the latest trends with confidence
              </span>
            </h1>

            {/* Description */}
            <p className='text-lg text-muted-foreground max-w-md'>
              Experience the future of shopping with our curated collection of
              premium products. Fast delivery, secure payments, and exceptional
              customer service.
            </p>

            {/* CTA Buttons */}
            <div className='flex flex-col sm:flex-row gap-4'>
              <Button size='lg' className='group'>
                Shop Now
                <ArrowRight className='ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform' />
              </Button>
              <Button variant='outline' size='lg' className='group'>
                <Play className='mr-2 h-5 w-5 group-hover:scale-110 transition-transform' />
                Watch Demo
              </Button>
            </div>

            {/* Stats */}
            <div className='flex items-center space-x-8 pt-4'>
              <div className='flex items-center space-x-2'>
                <Star className='h-5 w-5 text-yellow-500 fill-yellow-500' />
                <span className='text-sm font-medium'>4.9/5 Rating</span>
              </div>
              <div className='flex items-center space-x-2'>
                <Users className='h-5 w-5 text-blue-500' />
                <span className='text-sm font-medium'>10K+ Customers</span>
              </div>
            </div>
          </div>

          {/* Right Content - Image/Visual */}
          <div className='relative'>
            <div className='relative z-10'>
              {/* Main Product Image */}
              <div className='relative rounded-2xl overflow-hidden shadow-2xl'>
                <img
                  src='https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80'
                  alt='Featured Product'
                  className='w-full h-[500px] object-cover'
                />

                {/* Floating Elements */}
                <div className='absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-lg p-3 shadow-lg'>
                  <div className='flex items-center space-x-2'>
                    <div className='w-3 h-3 bg-green-500 rounded-full animate-pulse'></div>
                    <span className='text-sm font-medium'>In Stock</span>
                  </div>
                </div>

                <div className='absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg p-3 shadow-lg'>
                  <div className='text-center'>
                    <div className='text-2xl font-bold text-primary'>$299</div>
                    <div className='text-xs text-muted-foreground'>
                      Limited Time
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating Cards */}
              <div className='absolute -top-6 -left-6 bg-white rounded-xl p-4 shadow-lg border'>
                <div className='flex items-center space-x-3'>
                  <div className='w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center'>
                    <Truck className='h-5 w-5 text-primary' />
                  </div>
                  <div>
                    <div className='font-semibold text-sm'>Free Shipping</div>
                    <div className='text-xs text-muted-foreground'>
                      On orders $50+
                    </div>
                  </div>
                </div>
              </div>

              <div className='absolute -bottom-6 -right-6 bg-white rounded-xl p-4 shadow-lg border'>
                <div className='flex items-center space-x-3'>
                  <div className='w-10 h-10 bg-green-100 rounded-full flex items-center justify-center'>
                    <Shield className='h-5 w-5 text-green-600' />
                  </div>
                  <div>
                    <div className='font-semibold text-sm'>Secure Payment</div>
                    <div className='text-xs text-muted-foreground'>
                      100% Protected
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Background Decoration */}
            <div className='absolute inset-0 -z-10'>
              <div className='absolute top-1/2 left-1/2 w-96 h-96 bg-primary/20 rounded-full blur-3xl transform -translate-x-1/2 -translate-y-1/2'></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
