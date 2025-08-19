import { Header } from '@/components/Header'
import { Hero } from '@/components/Hero'
import { ProductGrid } from '@/components/ProductGrid'
import { Footer } from '@/components/Footer'

export default function Home() {
  return (
    <main className='min-h-screen'>
      <Header />
      <Hero />
      <ProductGrid />
      <Footer />
    </main>
  )
}
