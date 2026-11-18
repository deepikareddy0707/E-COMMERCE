import { Link } from 'react-router-dom'
import { Minus, Plus, Trash2 } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'
import { removeFromCart, updateQuantity } from '../redux/slices/cartSlice'
import { EmptyState } from '../components/EmptyState'
import { OrderSummary } from '../components/OrderSummary'

const Cart = () => {
  const dispatch = useDispatch()
  const items = useSelector((state) => state.cart.items)

  if (!items.length) return <main className="container-shell py-10"><EmptyState title="Your cart is empty" message="Add products to start building your order." /></main>

  return (
    <main className="container-shell grid gap-8 py-10 lg:grid-cols-[1fr_360px]">
      <section>
        <h1 className="section-title">Shopping cart</h1>
        <div className="mt-6 space-y-4">
          {items.map((item) => (
            <article key={item.id} className="grid gap-4 rounded-lg border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900 sm:grid-cols-[110px_1fr_auto]">
              <img className="h-28 w-full object-contain sm:w-28" src={item.image} alt={item.title} />
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-teal-700 dark:text-teal-300">{item.category}</p>
                <Link className="mt-1 block font-bold text-slate-950 dark:text-white" to={`/products/${item.id}`}>{item.title}</Link>
                <p className="mt-2 text-lg font-black">${item.price.toFixed(2)}</p>
              </div>
              <div className="flex items-center gap-2 sm:flex-col sm:items-end sm:justify-between">
                <div className="flex items-center rounded-md border border-slate-200 dark:border-slate-700">
                  <button className="p-2" onClick={() => dispatch(updateQuantity({ id: item.id, quantity: item.quantity - 1 }))}><Minus className="h-4 w-4" /></button>
                  <span className="w-10 text-center text-sm font-bold">{item.quantity}</span>
                  <button className="p-2" onClick={() => dispatch(updateQuantity({ id: item.id, quantity: item.quantity + 1 }))}><Plus className="h-4 w-4" /></button>
                </div>
                <button className="btn-secondary px-3" onClick={() => dispatch(removeFromCart(item.id))}><Trash2 className="h-4 w-4" /></button>
              </div>
            </article>
          ))}
        </div>
      </section>
      <div>
        <OrderSummary />
        <Link className="btn-primary mt-4 w-full" to="/checkout">Checkout</Link>
      </div>
    </main>
  )
}

export default Cart
