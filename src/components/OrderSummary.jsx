import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { applyCoupon, removeCoupon } from '../redux/slices/cartSlice'
import { useCartTotals } from '../hooks/useCartTotals'

export const OrderSummary = ({ showCoupon = true }) => {
  const dispatch = useDispatch()
  const { couponCode } = useSelector((state) => state.cart)
  const totals = useCartTotals()
  const [code, setCode] = useState('')

  return (
    <aside className="rounded-lg border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
      <h2 className="text-lg font-bold text-slate-950 dark:text-white">Order summary</h2>
      {showCoupon && (
        <div className="mt-4">
          <label className="text-sm font-semibold text-slate-700 dark:text-slate-200">Coupon code</label>
          <div className="mt-2 flex gap-2">
            <input className="input" value={code} onChange={(event) => setCode(event.target.value)} placeholder="WELCOME10" />
            <button className="btn-secondary" onClick={() => dispatch(applyCoupon(code))}>Apply</button>
          </div>
          {couponCode && (
            <button className="mt-2 text-sm font-semibold text-teal-700 dark:text-teal-300" onClick={() => dispatch(removeCoupon())}>
              Remove {couponCode}
            </button>
          )}
        </div>
      )}
      <dl className="mt-5 space-y-3 text-sm">
        <div className="flex justify-between text-slate-600 dark:text-slate-300"><dt>Subtotal</dt><dd>${totals.subtotal.toFixed(2)}</dd></div>
        <div className="flex justify-between text-slate-600 dark:text-slate-300"><dt>Discount</dt><dd>-${totals.discount.toFixed(2)}</dd></div>
        <div className="flex justify-between text-slate-600 dark:text-slate-300"><dt>Shipping</dt><dd>{totals.shipping === 0 ? 'Free' : `$${totals.shipping.toFixed(2)}`}</dd></div>
        <div className="flex justify-between text-slate-600 dark:text-slate-300"><dt>Tax</dt><dd>${totals.tax.toFixed(2)}</dd></div>
        <div className="border-t border-slate-200 pt-3 text-base font-black text-slate-950 dark:border-slate-800 dark:text-white">
          <div className="flex justify-between"><dt>Total</dt><dd>${totals.total.toFixed(2)}</dd></div>
        </div>
      </dl>
    </aside>
  )
}
