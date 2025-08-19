'use client'

import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  Package,
  Mail,
  Phone,
  MapPin,
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  ArrowUp,
} from 'lucide-react'

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className='bg-gray-900 text-white'>
      <div className='container mx-auto px-4 py-16'>
        {/* Main Footer Content */}
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12'>
          {/* Company Info */}
          <div className='space-y-4'>
            <div className='flex items-center space-x-2'>
              <Package className='h-8 w-8 text-primary' />
              <span className='text-xl font-bold'>ShopHub</span>
            </div>
            <p className='text-gray-300 max-w-xs'>
              Your trusted destination for premium products. We're committed to
              providing exceptional quality and outstanding customer service.
            </p>
            <div className='flex space-x-4'>
              <Button
                variant='ghost'
                size='icon'
                className='text-gray-300 hover:text-white hover:bg-gray-800'
              >
                <Facebook className='h-5 w-5' />
              </Button>
              <Button
                variant='ghost'
                size='icon'
                className='text-gray-300 hover:text-white hover:bg-gray-800'
              >
                <Twitter className='h-5 w-5' />
              </Button>
              <Button
                variant='ghost'
                size='icon'
                className='text-gray-300 hover:text-white hover:bg-gray-800'
              >
                <Instagram className='h-5 w-5' />
              </Button>
              <Button
                variant='ghost'
                size='icon'
                className='text-gray-300 hover:text-white hover:bg-gray-800'
              >
                <Youtube className='h-5 w-5' />
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div className='space-y-4'>
            <h3 className='text-lg font-semibold'>Quick Links</h3>
            <ul className='space-y-2'>
              <li>
                <a
                  href='#'
                  className='text-gray-300 hover:text-white transition-colors'
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href='#'
                  className='text-gray-300 hover:text-white transition-colors'
                >
                  Shop
                </a>
              </li>
              <li>
                <a
                  href='#'
                  className='text-gray-300 hover:text-white transition-colors'
                >
                  Categories
                </a>
              </li>
              <li>
                <a
                  href='#'
                  className='text-gray-300 hover:text-white transition-colors'
                >
                  Deals
                </a>
              </li>
              <li>
                <a
                  href='#'
                  className='text-gray-300 hover:text-white transition-colors'
                >
                  About Us
                </a>
              </li>
              <li>
                <a
                  href='#'
                  className='text-gray-300 hover:text-white transition-colors'
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div className='space-y-4'>
            <h3 className='text-lg font-semibold'>Customer Service</h3>
            <ul className='space-y-2'>
              <li>
                <a
                  href='#'
                  className='text-gray-300 hover:text-white transition-colors'
                >
                  Help Center
                </a>
              </li>
              <li>
                <a
                  href='#'
                  className='text-gray-300 hover:text-white transition-colors'
                >
                  Returns & Exchanges
                </a>
              </li>
              <li>
                <a
                  href='#'
                  className='text-gray-300 hover:text-white transition-colors'
                >
                  Shipping Info
                </a>
              </li>
              <li>
                <a
                  href='#'
                  className='text-gray-300 hover:text-white transition-colors'
                >
                  Size Guide
                </a>
              </li>
              <li>
                <a
                  href='#'
                  className='text-gray-300 hover:text-white transition-colors'
                >
                  Track Order
                </a>
              </li>
              <li>
                <a
                  href='#'
                  className='text-gray-300 hover:text-white transition-colors'
                >
                  FAQ
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className='space-y-4'>
            <h3 className='text-lg font-semibold'>Contact Us</h3>
            <div className='space-y-3'>
              <div className='flex items-center space-x-3'>
                <MapPin className='h-5 w-5 text-primary' />
                <span className='text-gray-300'>
                  123 Commerce St, Business City, BC 12345
                </span>
              </div>
              <div className='flex items-center space-x-3'>
                <Phone className='h-5 w-5 text-primary' />
                <span className='text-gray-300'>+1 (555) 123-4567</span>
              </div>
              <div className='flex items-center space-x-3'>
                <Mail className='h-5 w-5 text-primary' />
                <span className='text-gray-300'>support@shophub.com</span>
              </div>
            </div>

            {/* Newsletter Signup */}
            <div className='pt-4'>
              <h4 className='text-sm font-medium mb-2'>
                Subscribe to our newsletter
              </h4>
              <div className='flex space-x-2'>
                <input
                  type='email'
                  placeholder='Enter your email'
                  className='flex-1 px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent'
                />
                <Button size='sm' className='bg-primary hover:bg-primary/90'>
                  Subscribe
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className='border-t border-gray-800 pt-8'>
          <div className='flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0'>
            <div className='flex items-center space-x-4'>
              <span className='text-gray-400'>
                © 2025 ShopHub. All rights reserved.
              </span>
              <div className='flex space-x-4 text-sm'>
                <a
                  href='#'
                  className='text-gray-400 hover:text-white transition-colors'
                >
                  Privacy Policy
                </a>
                <a
                  href='#'
                  className='text-gray-400 hover:text-white transition-colors'
                >
                  Terms of Service
                </a>
                <a
                  href='#'
                  className='text-gray-400 hover:text-white transition-colors'
                >
                  Cookie Policy
                </a>
              </div>
            </div>

            <div className='flex items-center space-x-4'>
              <Badge
                variant='outline'
                className='border-gray-600 text-gray-300'
              >
                🔒 Secure Payment
              </Badge>
              <Badge
                variant='outline'
                className='border-gray-600 text-gray-300'
              >
                🚚 Free Shipping
              </Badge>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll to Top Button */}
      <Button
        onClick={scrollToTop}
        variant='ghost'
        size='icon'
        className='fixed bottom-8 right-8 bg-primary text-white hover:bg-primary/90 rounded-full shadow-lg'
      >
        <ArrowUp className='h-5 w-5' />
      </Button>
    </footer>
  )
}
