import { useMemo } from 'react'
import { useSelector } from 'react-redux'
import { calculateDiscount, coupons } from '../utils/coupons'

export const useCartTotals = () => {
  const { items, couponCode } = useSelector((state) => state.cart)

  return useMemo(() => {
    const subtotal = items.reduce((total, item) => total + item.price * item.quantity, 0)
    const discount = calculateDiscount(subtotal, couponCode)
    const shipping = couponCode && coupons[couponCode]?.type === 'shipping' ? 0 : subtotal > 150 || subtotal === 0 ? 0 : 9.99
    const tax = subtotal ? Number(((subtotal - discount) * 0.08).toFixed(2)) : 0
    const total = Number((subtotal - discount + shipping + tax).toFixed(2))

    return {
      subtotal: Number(subtotal.toFixed(2)),
      discount,
      shipping,
      tax,
      total,
      itemCount: items.reduce((total, item) => total + item.quantity, 0),
    }
  }, [items, couponCode])
}
