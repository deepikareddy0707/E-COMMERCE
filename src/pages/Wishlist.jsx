import { ShoppingCart, Trash2 } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'
import { addToCart } from '../redux/slices/cartSlice'
import { removeFromWishlist } from '../redux/slices/wishlistSlice'
import { EmptyState } from '../components/EmptyState'
import { Rating } from '../components/Rating'

const Wishlist = () => {
  const dispatch = useDispatch()
  const items = useSelector((state) => state.wishlist.items)

  if (!items.length) return <main className="container-shell py-10"><EmptyState title="Your wishlist is empty" message="Save products you love and move them into cart when ready." /></main>

  return (
    <main className="container-shell py-10">
      <h1 className="section-title">Wishlist</h1>
      <div className="mt-6 grid gap-4 md:grid-cols-2">
        {items.map((item) => (
          <article key={item.id} className="grid gap-4 rounded-lg border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900 sm:grid-cols-[120px_1fr]">
            <img className="h-32 w-full object-contain sm:w-32" src={item.image} alt={item.title} />
            <div>
              <p className="line-clamp-2 font-bold text-slate-950 dark:text-white">{item.title}</p>
              <div className="mt-2"><Rating rating={item.rating} /></div>
              <p className="mt-2 text-xl font-black">${item.price.toFixed(2)}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                <button className="btn-primary" onClick={() => { dispatch(addToCart(item)); dispatch(removeFromWishlist(item.id)) }}><ShoppingCart className="h-4 w-4" /> Move to cart</button>
                <button className="btn-secondary" onClick={() => dispatch(removeFromWishlist(item.id))}><Trash2 className="h-4 w-4" /> Remove</button>
              </div>
            </div>
          </article>
        ))}
      </div>
    </main>
  )
}

export default Wishlist
