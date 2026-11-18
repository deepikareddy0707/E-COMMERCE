import { Link, useLocation } from 'react-router-dom'
import { CheckCircle2 } from 'lucide-react'

const OrderSuccess = () => {
  const location = useLocation()
  const orderId = location.state?.orderId || 'MP-READY'

  return (
    <main className="container-shell grid min-h-[70vh] place-items-center py-10 text-center">
      <div className="max-w-lg rounded-lg border border-slate-200 bg-white p-8 dark:border-slate-800 dark:bg-slate-900">
        <CheckCircle2 className="mx-auto h-14 w-14 text-emerald-600" />
        <h1 className="mt-4 text-3xl font-black text-slate-950 dark:text-white">Order confirmed</h1>
        <p className="mt-3 text-slate-600 dark:text-slate-300">Your order {orderId} has been placed successfully. A confirmation email would be sent in a production checkout.</p>
        <Link className="btn-primary mt-6" to="/products">Continue shopping</Link>
      </div>
    </main>
  )
}

export default OrderSuccess
