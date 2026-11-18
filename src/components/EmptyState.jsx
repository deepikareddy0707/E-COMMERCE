import { Link } from 'react-router-dom'
import { ShoppingBag } from 'lucide-react'

export const EmptyState = ({ title, message, action = 'Browse products', to = '/products' }) => (
  <div className="rounded-lg border border-dashed border-slate-300 bg-white px-6 py-14 text-center dark:border-slate-700 dark:bg-slate-900">
    <ShoppingBag className="mx-auto h-10 w-10 text-teal-600" />
    <h2 className="mt-4 text-xl font-bold text-slate-950 dark:text-white">{title}</h2>
    <p className="mx-auto mt-2 max-w-md text-sm text-slate-600 dark:text-slate-300">{message}</p>
    <Link className="btn-primary mt-6" to={to}>{action}</Link>
  </div>
)
