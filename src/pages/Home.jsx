import { Link } from 'react-router-dom'
import { ArrowRight, Sparkles, Truck, ShieldCheck } from 'lucide-react'
import { useSelector } from 'react-redux'
import { ProductCard } from '../components/ProductCard'
import { ProductSkeleton } from '../components/ProductSkeleton'
import { Recommendations } from '../components/Recommendations'

const Home = () => {
  const { items, status } = useSelector((state) => state.products)
  const featured = items.slice(0, 4)

  return (
    <main>
      <section className="bg-white dark:bg-slate-950">
        <div className="container-shell grid min-h-[560px] items-center gap-10 py-12 lg:grid-cols-[1fr_0.9fr]">
          <div>
            <p className="inline-flex rounded-full bg-teal-50 px-3 py-1 text-sm font-bold text-teal-700 dark:bg-teal-950 dark:text-teal-200">
              New market features live
            </p>
            <h1 className="mt-5 max-w-3xl text-4xl font-black tracking-tight text-slate-950 dark:text-white sm:text-6xl">
              Shop smarter with deals, comparisons, and personalized picks.
            </h1>
            <p className="mt-5 max-w-2xl text-lg text-slate-600 dark:text-slate-300">
              A polished ecommerce storefront with persistent cart, wishlist, protected checkout, coupons, flash sales, and live support.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link className="btn-primary" to="/products">Explore products <ArrowRight className="h-4 w-4" /></Link>
              <Link className="btn-secondary" to="/cart">View cart</Link>
            </div>
            <div className="mt-8 grid gap-3 sm:grid-cols-3">
              {[
                [Sparkles, 'AI recommendations'],
                [Truck, 'Free shipping over $150'],
                [ShieldCheck, 'Protected checkout'],
              ].map(([Icon, label]) => (
                <div key={label} className="flex items-center gap-2 text-sm font-semibold text-slate-700 dark:text-slate-200">
                  <Icon className="h-5 w-5 text-teal-600" />
                  {label}
                </div>
              ))}
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {status === 'loading'
              ? Array.from({ length: 4 }, (_, index) => <ProductSkeleton key={index} />)
              : featured.map((product) => <ProductCard key={product.id} product={product} />)}
          </div>
        </div>
      </section>
      <Recommendations title="Recommended for your next order" />
    </main>
  )
}

export default Home
