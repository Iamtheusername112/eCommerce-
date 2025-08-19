'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  Search,
  ShoppingCart,
  User,
  Menu,
  X,
  Heart,
  Package,
} from 'lucide-react'

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [cartCount] = useState(3) // This would come from your cart state

  return (
    <header className='sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60'>
      <div className='container mx-auto px-4'>
        <div className='flex h-16 items-center justify-between'>
          {/* Logo */}
          <div className='flex items-center space-x-2'>
            <Package className='h-8 w-8 text-primary' />
            <span className='text-xl font-bold'>ShopHub</span>
          </div>

          {/* Desktop Navigation */}
          <nav className='hidden md:flex items-center space-x-8'>
            <a
              href='#'
              className='text-sm font-medium hover:text-primary transition-colors'
            >
              Home
            </a>
            <a
              href='#'
              className='text-sm font-medium hover:text-primary transition-colors'
            >
              Categories
            </a>
            <a
              href='#'
              className='text-sm font-medium hover:text-primary transition-colors'
            >
              Deals
            </a>
            <a
              href='#'
              className='text-sm font-medium hover:text-primary transition-colors'
            >
              About
            </a>
          </nav>

          {/* Search Bar */}
          <div className='hidden md:flex flex-1 max-w-md mx-8'>
            <div className='relative w-full'>
              <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground' />
              <input
                type='text'
                placeholder='Search products...'
                className='w-full pl-10 pr-4 py-2 border border-input rounded-md bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent'
              />
            </div>
          </div>

          {/* Right Side Actions */}
          <div className='flex items-center space-x-4'>
            <Button variant='ghost' size='icon' className='hidden md:flex'>
              <Heart className='h-5 w-5' />
            </Button>

            <Button variant='ghost' size='icon' className='relative'>
              <ShoppingCart className='h-5 w-5' />
              {cartCount > 0 && (
                <Badge
                  variant='destructive'
                  className='absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs'
                >
                  {cartCount}
                </Badge>
              )}
            </Button>

            <Button variant='ghost' size='icon' className='hidden md:flex'>
              <User className='h-5 w-5' />
            </Button>

            {/* Mobile Menu Button */}
            <Button
              variant='ghost'
              size='icon'
              className='md:hidden'
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <X className='h-5 w-5' />
              ) : (
                <Menu className='h-5 w-5' />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Search */}
        <div className='md:hidden pb-4'>
          <div className='relative'>
            <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground' />
            <input
              type='text'
              placeholder='Search products...'
              className='w-full pl-10 pr-4 py-2 border border-input rounded-md bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent'
            />
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className='md:hidden border-t py-4'>
            <nav className='flex flex-col space-y-4'>
              <a
                href='#'
                className='text-sm font-medium hover:text-primary transition-colors'
              >
                Home
              </a>
              <a
                href='#'
                className='text-sm font-medium hover:text-primary transition-colors'
              >
                Categories
              </a>
              <a
                href='#'
                className='text-sm font-medium hover:text-primary transition-colors'
              >
                Deals
              </a>
              <a
                href='#'
                className='text-sm font-medium hover:text-primary transition-colors'
              >
                About
              </a>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
