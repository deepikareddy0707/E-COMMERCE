import { useMemo } from 'react'
import { useSelector } from 'react-redux'
import { getRecommendations } from '../utils/recommendations'
import { ProductCard } from './ProductCard'

export const Recommendations = ({ title = 'AI product recommendations' }) => {
  const products = useSelector((state) => state.products.items)
  const cartItems = useSelector((state) => state.cart.items)
  const wishlistItems = useSelector((state) => state.wishlist.items)
  const recommended = useMemo(
    () => getRecommendations(products, cartItems, wishlistItems),
    [products, cartItems, wishlistItems],
  )

  if (!recommended.length) return null

  return (
    <section className="py-10">
      <div className="container-shell">
        <div className="mb-5 flex items-end justify-between gap-4">
          <div>
            <p className="text-sm font-bold uppercase tracking-wider text-teal-700 dark:text-teal-300">Smart picks</p>
            <h2 className="section-title">{title}</h2>
          </div>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {recommended.map((product) => <ProductCard key={product.id} product={product} />)}
        </div>
      </div>
    </section>
  )
}
