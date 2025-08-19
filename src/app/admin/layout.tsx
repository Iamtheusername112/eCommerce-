import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import { db } from '@/lib/db'
import { users } from '@/lib/db/schema'
import { eq } from 'drizzle-orm'
import { AdminSidebar } from '@/components/admin/AdminSidebar'

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { userId } = await auth()

  if (!userId) {
    redirect('/sign-in')
  }

  // Check if user is admin
  const user = await db.select().from(users).where(eq(users.id, userId))

  if (!user.length || user[0].role !== 'admin') {
    redirect('/')
  }

  return (
    <div className='flex h-screen bg-gray-100'>
      <AdminSidebar />
      <main className='flex-1 overflow-y-auto'>
        <div className='p-6'>{children}</div>
      </main>
    </div>
  )
}
