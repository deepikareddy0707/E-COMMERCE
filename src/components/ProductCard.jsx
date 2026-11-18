import { memo } from 'react'
import { Link } from 'react-router-dom'
import { Heart, Scale, ShoppingCart } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'
import { addToCart } from '../redux/slices/cartSlice'
import { toggleWishlist } from '../redux/slices/wishlistSlice'
import { toggleCompare } from '../redux/slices/productSlice'
import { Rating } from './Rating'
import { InventoryBadge } from './InventoryBadge'

export const ProductCard = memo(({ product }) => {
  const dispatch = useDispatch()
  const isWishlisted = useSelector((state) => state.wishlist.items.some((item) => item.id === product.id))
  const isCompared = useSelector((state) => state.products.compareIds.includes(product.id))

  return (
    <article className="group flex h-full flex-col rounded-lg border border-slate-200 bg-white p-4 transition hover:-translate-y-1 hover:shadow-xl dark:border-slate-800 dark:bg-slate-900">
      <Link to={`/products/${product.id}`} className="flex aspect-square items-center justify-center rounded-md bg-slate-50 p-5 dark:bg-slate-950">
        <img className="h-full max-h-56 w-full object-contain transition group-hover:scale-105" src={product.image} alt={product.title} loading="lazy" />
      </Link>
      <div className="mt-4 flex flex-1 flex-col">
        <div className="flex items-center justify-between gap-2">
          <p className="text-xs font-bold uppercase tracking-wider text-teal-700 dark:text-teal-300">{product.category}</p>
          <InventoryBadge productId={product.id} />
        </div>
        <Link to={`/products/${product.id}`} className="mt-2 line-clamp-2 min-h-11 text-sm font-bold text-slate-950 hover:text-teal-700 dark:text-white dark:hover:text-teal-300">
          {product.title}
        </Link>
        <div className="mt-3 flex items-center justify-between">
          <Rating rating={product.rating} />
          <span className="text-lg font-black text-slate-950 dark:text-white">${product.price.toFixed(2)}</span>
        </div>
        <div className="mt-4 grid grid-cols-[1fr_42px_42px] gap-2">
          <button className="btn-primary px-3" onClick={() => dispatch(addToCart(product))}>
            <ShoppingCart className="h-4 w-4" />
            <span>Add</span>
          </button>
          <button className="btn-secondary px-0" aria-label="Toggle wishlist" onClick={() => dispatch(toggleWishlist(product))}>
            <Heart className={`h-4 w-4 ${isWishlisted ? 'fill-rose-500 text-rose-500' : ''}`} />
          </button>
          <button className="btn-secondary px-0" aria-label="Compare product" onClick={() => dispatch(toggleCompare(product.id))}>
            <Scale className={`h-4 w-4 ${isCompared ? 'text-teal-600' : ''}`} />
          </button>
        </div>
      </div>
    </article>
  )
})
