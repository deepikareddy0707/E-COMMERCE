import { Truck } from 'lucide-react'
import { useSelector } from 'react-redux'
import { getDeliveryEstimate } from '../utils/inventory'

export const CheckoutDeliveryPromise = ({ zip }) => {
  const firstItem = useSelector((state) => state.cart.items[0])
  const estimate = getDeliveryEstimate(zip, firstItem?.id || 1)

  return (
    <div className="mt-4 rounded-lg border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-900 dark:border-emerald-900 dark:bg-emerald-950 dark:text-emerald-100">
      <div className="flex items-start gap-3">
        <Truck className="mt-0.5 h-5 w-5" />
        <div>
          <p className="font-black">Delivery promise</p>
          <p className="mt-1">
            Estimated arrival by {estimate.date} through {estimate.partner}. Final promise updates as ZIP code changes.
          </p>
        </div>
      </div>
    </div>
  )
}
