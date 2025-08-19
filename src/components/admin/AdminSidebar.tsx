'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  LayoutDashboard,
  Package,
  FolderOpen,
  ShoppingCart,
  Users,
  Settings,
  BarChart3,
  FileText,
  Menu,
  X,
} from 'lucide-react'

const navigation = [
  { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
  { name: 'Products', href: '/admin/products', icon: Package },
  { name: 'Categories', href: '/admin/categories', icon: FolderOpen },
  { name: 'Orders', href: '/admin/orders', icon: ShoppingCart },
  { name: 'Customers', href: '/admin/customers', icon: Users },
  { name: 'Analytics', href: '/admin/analytics', icon: BarChart3 },
  { name: 'Reports', href: '/admin/reports', icon: FileText },
  { name: 'Settings', href: '/admin/settings', icon: Settings },
]

export function AdminSidebar() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const pathname = usePathname()

  return (
    <>
      {/* Mobile sidebar */}
      <div
        className={`fixed inset-0 z-50 lg:hidden ${
          sidebarOpen ? 'block' : 'hidden'
        }`}
      >
        <div
          className='fixed inset-0 bg-gray-600 bg-opacity-75'
          onClick={() => setSidebarOpen(false)}
        />
        <div className='fixed inset-y-0 left-0 flex w-64 flex-col bg-white'>
          <div className='flex h-16 items-center justify-between px-4'>
            <h1 className='text-xl font-bold text-gray-900'>ShopHub Admin</h1>
            <button
              onClick={() => setSidebarOpen(false)}
              className='text-gray-400 hover:text-gray-600'
              aria-label='Close sidebar'
            >
              <X className='h-6 w-6' />
            </button>
          </div>
          <nav className='flex-1 space-y-1 px-2 py-4'>
            {navigation.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md ${
                    isActive
                      ? 'bg-blue-100 text-blue-900'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                  onClick={() => setSidebarOpen(false)}
                >
                  <item.icon
                    className={`mr-3 h-5 w-5 flex-shrink-0 ${
                      isActive
                        ? 'text-blue-500'
                        : 'text-gray-400 group-hover:text-gray-500'
                    }`}
                  />
                  {item.name}
                </Link>
              )
            })}
          </nav>
        </div>
      </div>

      {/* Desktop sidebar */}
      <div className='hidden lg:flex lg:flex-shrink-0'>
        <div className='flex w-64 flex-col'>
          <div className='flex h-16 items-center px-4'>
            <h1 className='text-xl font-bold text-gray-900'>ShopHub Admin</h1>
          </div>
          <nav className='flex-1 space-y-1 px-2 py-4'>
            {navigation.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md ${
                    isActive
                      ? 'bg-blue-100 text-blue-900'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                >
                  <item.icon
                    className={`mr-3 h-5 w-5 flex-shrink-0 ${
                      isActive
                        ? 'text-blue-500'
                        : 'text-gray-400 group-hover:text-gray-500'
                    }`}
                  />
                  {item.name}
                </Link>
              )
            })}
          </nav>
        </div>
      </div>

      {/* Mobile menu button */}
      <div className='lg:hidden'>
        <button
          onClick={() => setSidebarOpen(true)}
          className='fixed top-4 left-4 z-50 p-2 bg-white rounded-md shadow-lg'
          aria-label='Open sidebar'
        >
          <Menu className='h-6 w-6 text-gray-600' />
        </button>
      </div>
    </>
  )
}
