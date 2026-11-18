const deliveryPartners = ['ShipFast', 'BlueRoute', 'ExpressBee', 'ParcelPro']

export const getStockForProduct = (productId) => {
  const stock = (Number(productId) * 9 + 7) % 28
  return stock === 0 ? 0 : stock + 2
}

export const getInventoryTone = (stock) => {
  if (stock === 0) return { label: 'Out of stock', className: 'bg-rose-50 text-rose-700 dark:bg-rose-950 dark:text-rose-200' }
  if (stock <= 6) return { label: `Only ${stock} left`, className: 'bg-amber-50 text-amber-700 dark:bg-amber-950 dark:text-amber-200' }
  return { label: 'In stock', className: 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-200' }
}

export const getDeliveryEstimate = (zip = '', productId = 1) => {
  const digits = zip.replace(/\D/g, '')
  const zoneScore = digits ? Number(digits.slice(-2)) : 35
  const days = 2 + ((zoneScore + Number(productId)) % 4)
  const date = new Date()
  date.setDate(date.getDate() + days)

  return {
    days,
    date: date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' }),
    partner: deliveryPartners[(zoneScore + Number(productId)) % deliveryPartners.length],
  }
}
