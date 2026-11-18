import { useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { clearCart } from '../redux/slices/cartSlice'
import { OrderSummary } from '../components/OrderSummary'
import { CheckoutDeliveryPromise } from '../components/CheckoutDeliveryPromise'

const Checkout = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const items = useSelector((state) => state.cart.items)
  const [form, setForm] = useState({ fullName: '', phone: '', address: '', city: '', zip: '' })
  const [errors, setErrors] = useState({})

  if (!items.length) return <Navigate to="/cart" replace />

  const submit = (event) => {
    event.preventDefault()
    const nextErrors = {}
    Object.entries(form).forEach(([key, value]) => {
      if (!value.trim()) nextErrors[key] = 'Required'
    })
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length) return
    dispatch(clearCart())
    navigate('/order-success', { state: { orderId: `MP-${Date.now().toString().slice(-6)}` } })
  }

  return (
    <main className="container-shell grid gap-8 py-10 lg:grid-cols-[1fr_360px]">
      <form className="rounded-lg border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900" onSubmit={submit}>
        <h1 className="section-title">Checkout</h1>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {[
            ['fullName', 'Full name'],
            ['phone', 'Phone'],
            ['address', 'Address'],
            ['city', 'City'],
            ['zip', 'ZIP code'],
          ].map(([name, label]) => (
            <label key={name} className={name === 'address' ? 'block sm:col-span-2' : 'block'}>
              <span className="text-sm font-semibold">{label}</span>
              <input className="input mt-2" value={form[name]} onChange={(event) => setForm({ ...form, [name]: event.target.value })} />
              {errors[name] && <span className="mt-1 block text-sm text-rose-600">{errors[name]}</span>}
            </label>
          ))}
        </div>
        <CheckoutDeliveryPromise zip={form.zip} />
        <button className="btn-primary mt-6" type="submit">Place order</button>
      </form>
      <OrderSummary showCoupon={false} />
    </main>
  )
}

export default Checkout
