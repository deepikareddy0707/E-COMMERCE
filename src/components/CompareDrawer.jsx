import { X } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'
import { clearCompare, toggleCompare } from '../redux/slices/productSlice'
import { Rating } from './Rating'

export const CompareDrawer = () => {
  const dispatch = useDispatch()
  const { items, compareIds } = useSelector((state) => state.products)
  const products = items.filter((product) => compareIds.includes(product.id))

  if (!products.length) return null

  return (
    <div className="fixed inset-x-0 bottom-0 z-30 border-t border-slate-200 bg-white shadow-2xl dark:border-slate-800 dark:bg-slate-950">
      <div className="container-shell py-4">
        <div className="flex items-center justify-between gap-4">
          <h2 className="text-base font-black text-slate-950 dark:text-white">Product comparison</h2>
          <button className="btn-secondary py-2" onClick={() => dispatch(clearCompare())}>Clear</button>
        </div>
        <div className="mt-3 grid gap-3 md:grid-cols-3">
          {products.map((product) => (
            <div key={product.id} className="relative rounded-lg border border-slate-200 p-3 dark:border-slate-800">
              <button className="absolute right-2 top-2 rounded-full bg-slate-100 p-1 dark:bg-slate-800" onClick={() => dispatch(toggleCompare(product.id))} aria-label="Remove from comparison">
                <X className="h-4 w-4" />
              </button>
              <div className="flex gap-3">
                <img className="h-20 w-20 object-contain" src={product.image} alt={product.title} />
                <div>
                  <p className="line-clamp-2 text-sm font-bold text-slate-950 dark:text-white">{product.title}</p>
                  <p className="mt-1 text-sm font-black text-teal-700 dark:text-teal-300">${product.price.toFixed(2)}</p>
                  <Rating rating={product.rating} />
                </div>
              </div>
              <dl className="mt-3 grid grid-cols-2 gap-2 text-xs text-slate-600 dark:text-slate-300">
                <dt>Category</dt><dd className="text-right font-semibold">{product.category}</dd>
                <dt>Reviews</dt><dd className="text-right font-semibold">{product.rating?.count}</dd>
              </dl>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
