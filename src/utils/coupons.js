export const coupons = {
  WELCOME10: { label: 'Welcome offer', type: 'percent', value: 10 },
  FLASH20: { label: 'Flash sale boost', type: 'percent', value: 20 },
  FREESHIP: { label: 'Free shipping', type: 'shipping', value: 0 },
}

export const calculateDiscount = (subtotal, couponCode) => {
  const coupon = coupons[couponCode?.toUpperCase()]
  if (!coupon || coupon.type !== 'percent') return 0
  return Number(((subtotal * coupon.value) / 100).toFixed(2))
}
