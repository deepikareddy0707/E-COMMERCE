import { Link, useParams } from 'react-router-dom'
import { Heart, Scale, ShoppingCart } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'
import { addToCart } from '../redux/slices/cartSlice'
import { toggleWishlist } from '../redux/slices/wishlistSlice'
import { toggleCompare } from '../redux/slices/productSlice'
import { Rating } from '../components/Rating'
import { Recommendations } from '../components/Recommendations'
import { LiveAvailabilityPanel } from '../components/LiveAvailabilityPanel'

const ProductDetails = () => {
  const { id } = useParams()
  const dispatch = useDispatch()
  const { items, status } = useSelector((state) => state.products)
  const product = items.find((item) => item.id === Number(id))

  if (status === 'loading') return <main className="container-shell py-16">Loading product...</main>
  if (!product) return <main className="container-shell py-16"><Link className="btn-primary" to="/products">Back to products</Link></main>

  return (
    <main>
      <section className="container-shell grid gap-10 py-10 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="rounded-lg border border-slate-200 bg-white p-8 dark:border-slate-800 dark:bg-slate-900">
          <img className="mx-auto h-[420px] max-h-[70vh] w-full object-contain" src={product.image} alt={product.title} />
        </div>
        <div>
          <p className="text-sm font-bold uppercase tracking-wider text-teal-700 dark:text-teal-300">{product.category}</p>
          <h1 className="mt-3 text-3xl font-black tracking-tight text-slate-950 dark:text-white sm:text-5xl">{product.title}</h1>
          <div className="mt-4"><Rating rating={product.rating} /></div>
          <p className="mt-6 text-4xl font-black text-slate-950 dark:text-white">${product.price.toFixed(2)}</p>
          <p className="mt-6 max-w-2xl leading-7 text-slate-600 dark:text-slate-300">{product.description}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <button className="btn-primary" onClick={() => dispatch(addToCart(product))}><ShoppingCart className="h-4 w-4" /> Add to cart</button>
            <button className="btn-secondary" onClick={() => dispatch(toggleWishlist(product))}><Heart className="h-4 w-4" /> Wishlist</button>
            <button className="btn-secondary" onClick={() => dispatch(toggleCompare(product.id))}><Scale className="h-4 w-4" /> Compare</button>
          </div>
          <LiveAvailabilityPanel product={product} />
        </div>
      </section>
      <Recommendations title="You may also like" />
    </main>
  )
}

export default ProductDetails
