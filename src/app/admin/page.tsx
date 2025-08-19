import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Package,
  ShoppingCart,
  Users,
  DollarSign,
  TrendingUp,
  TrendingDown,
} from 'lucide-react'
import { db } from '@/lib/db'
import { products, orders, users } from '@/lib/db/schema'
import { sql } from 'drizzle-orm'

export default async function AdminDashboard() {
  // Fetch dashboard statistics
  const stats = await Promise.all([
    // Total products
    db.select({ count: sql<number>`count(*)` }).from(products),
    // Total orders
    db.select({ count: sql<number>`count(*)` }).from(orders),
    // Total customers
    db.select({ count: sql<number>`count(*)` }).from(users),
    // Total revenue
    db
      .select({
        total: sql<number>`COALESCE(SUM(total_amount), 0)`,
      })
      .from(orders)
      .where(sql`payment_status = 'paid'`),
    // Recent orders (last 7 days)
    db
      .select({
        count: sql<number>`count(*)`,
      })
      .from(orders)
      .where(sql`created_at >= NOW() - INTERVAL '7 days'`),
    // Low stock products
    db
      .select({
        count: sql<number>`count(*)`,
      })
      .from(products)
      .where(sql`stock_quantity <= low_stock_threshold`),
  ])

  const [
    totalProducts,
    totalOrders,
    totalCustomers,
    totalRevenue,
    recentOrders,
    lowStockProducts,
  ] = stats

  const dashboardStats = [
    {
      title: 'Total Products',
      value: totalProducts[0]?.count || 0,
      icon: Package,
      change: '+12%',
      changeType: 'positive' as const,
    },
    {
      title: 'Total Orders',
      value: totalOrders[0]?.count || 0,
      icon: ShoppingCart,
      change: '+8%',
      changeType: 'positive' as const,
    },
    {
      title: 'Total Customers',
      value: totalCustomers[0]?.count || 0,
      icon: Users,
      change: '+15%',
      changeType: 'positive' as const,
    },
    {
      title: 'Total Revenue',
      value: `$${(totalRevenue[0]?.total || 0).toLocaleString()}`,
      icon: DollarSign,
      change: '+23%',
      changeType: 'positive' as const,
    },
    {
      title: 'Recent Orders (7d)',
      value: recentOrders[0]?.count || 0,
      icon: ShoppingCart,
      change: '+5%',
      changeType: 'positive' as const,
    },
    {
      title: 'Low Stock Products',
      value: lowStockProducts[0]?.count || 0,
      icon: Package,
      change: '-3%',
      changeType: 'negative' as const,
    },
  ]

  return (
    <div className='space-y-6'>
      <div>
        <h1 className='text-3xl font-bold text-gray-900'>Dashboard</h1>
        <p className='text-gray-600'>Welcome to your ecommerce dashboard</p>
      </div>

      {/* Stats Grid */}
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
        {dashboardStats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
              <CardTitle className='text-sm font-medium text-gray-600'>
                {stat.title}
              </CardTitle>
              <stat.icon className='h-4 w-4 text-gray-400' />
            </CardHeader>
            <CardContent>
              <div className='text-2xl font-bold text-gray-900'>
                {stat.value}
              </div>
              <div className='flex items-center text-xs text-gray-600 mt-1'>
                {stat.changeType === 'positive' ? (
                  <TrendingUp className='h-3 w-3 text-green-500 mr-1' />
                ) : (
                  <TrendingDown className='h-3 w-3 text-red-500 mr-1' />
                )}
                {stat.change} from last month
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Actions */}
      <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className='space-y-3'>
            <button className='w-full text-left p-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors'>
              <div className='font-medium text-gray-900'>Add New Product</div>
              <div className='text-sm text-gray-600'>
                Create a new product listing
              </div>
            </button>
            <button className='w-full text-left p-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors'>
              <div className='font-medium text-gray-900'>
                View Recent Orders
              </div>
              <div className='text-sm text-gray-600'>
                Check latest customer orders
              </div>
            </button>
            <button className='w-full text-left p-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors'>
              <div className='font-medium text-gray-900'>Manage Inventory</div>
              <div className='text-sm text-gray-600'>Update stock levels</div>
            </button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent className='space-y-3'>
            <div className='flex items-center space-x-3 p-2 rounded-lg bg-blue-50'>
              <div className='w-2 h-2 bg-blue-500 rounded-full'></div>
              <div className='text-sm'>
                <span className='font-medium'>New order</span> received from
                John Doe
              </div>
            </div>
            <div className='flex items-center space-x-3 p-2 rounded-lg bg-green-50'>
              <div className='w-2 h-2 bg-green-500 rounded-full'></div>
              <div className='text-sm'>
                <span className='font-medium'>Product</span> "Wireless
                Headphones" updated
              </div>
            </div>
            <div className='flex items-center space-x-3 p-2 rounded-lg bg-yellow-50'>
              <div className='w-2 h-2 bg-yellow-500 rounded-full'></div>
              <div className='text-sm'>
                <span className='font-medium'>Low stock</span> alert for "Smart
                Watch"
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
