import { useEffect, useMemo, useState } from 'react'
import { getStockForProduct } from '../utils/inventory'

export const useLiveInventory = (productId) => {
  const baseStock = useMemo(() => getStockForProduct(productId), [productId])
  const [pulse, setPulse] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setPulse((value) => (value + 1) % 6)
    }, 5000)

    return () => clearInterval(timer)
  }, [])

  const liveStock = Math.max(baseStock - Math.floor(pulse / 3), 0)
  const viewers = 8 + ((Number(productId) * 13 + pulse * 5) % 42)

  return { stock: liveStock, viewers }
}
