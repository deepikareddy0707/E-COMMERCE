import { getInventoryTone, getStockForProduct } from '../utils/inventory'

export const InventoryBadge = ({ productId }) => {
  const stock = getStockForProduct(productId)
  const tone = getInventoryTone(stock)

  return (
    <span className={`inline-flex w-fit rounded-full px-2.5 py-1 text-xs font-bold ${tone.className}`}>
      {tone.label}
    </span>
  )
}
