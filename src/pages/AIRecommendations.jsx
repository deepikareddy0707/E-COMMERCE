import { useMemo } from 'react'
import { Link } from 'react-router-dom'
import { Sparkles, ShoppingBag, SlidersHorizontal } from 'lucide-react'
import { useSelector } from 'react-redux'
import { ProductCard } from '../components/ProductCard'
import { ProductSkeleton } from '../components/ProductSkeleton'
import { getRecommendations } from '../utils/recommendations'

const AIRecommendations = () => {
  const { items, status } = useSelector((state) => state.products)
  const cartItems = useSelector((state) => state.cart.items)
  const wishlistItems = useSelector((state) => state.wishlist.items)
  const recommendations = useMemo(
    () => getRecommendations(items, cartItems, wishlistItems, 8),
    [items, cartItems, wishlistItems],
  )

  return (
    <main>
      <section className="border-b border-slate-200 bg-white py-10 dark:border-slate-800 dark:bg-slate-950">
        <div className="container-shell">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="inline-flex items-center gap-2 rounded-full bg-teal-50 px-3 py-1 text-sm font-bold text-teal-700 dark:bg-teal-950 dark:text-teal-200">
                <Sparkles className="h-4 w-4" />
                Personalized shopping assistant
              </p>
              <h1 className="mt-4 text-4xl font-black tracking-tight text-slate-950 dark:text-white sm:text-5xl">
                AI Product Recommendations
              </h1>
              <p className="mt-4 max-w-2xl text-slate-600 dark:text-slate-300">
                Picks are ranked from your cart, wishlist, categories, ratings, and product popularity.
              </p>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="rounded-lg border border-slate-200 p-4 dark:border-slate-800">
                <ShoppingBag className="h-5 w-5 text-teal-600" />
                <p className="mt-2 text-sm font-bold text-slate-950 dark:text-white">Cart-aware</p>
                <p className="text-sm text-slate-600 dark:text-slate-300">{cartItems.length} cart item signals</p>
              </div>
              <div className="rounded-lg border border-slate-200 p-4 dark:border-slate-800">
                <SlidersHorizontal className="h-5 w-5 text-teal-600" />
                <p className="mt-2 text-sm font-bold text-slate-950 dark:text-white">Wishlist-aware</p>
                <p className="text-sm text-slate-600 dark:text-slate-300">{wishlistItems.length} saved item signals</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="container-shell py-10">
        <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-bold uppercase tracking-wider text-teal-700 dark:text-teal-300">Recommended for you</p>
            <h2 className="section-title">Smart product picks</h2>
          </div>
          <Link className="btn-secondary" to="/products">Browse catalog</Link>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {status === 'loading'
            ? Array.from({ length: 8 }, (_, index) => <ProductSkeleton key={index} />)
            : recommendations.map((product) => <ProductCard key={product.id} product={product} />)}
        </div>
      </section>
    </main>
  )
}

export default AIRecommendations
