import { createSlice } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'
import { coupons } from '../../utils/coupons'
import { loadState, saveState } from '../../utils/storage'

const initialState = loadState('cart', { items: [], couponCode: null })

const persist = (state) => saveState('cart', { items: state.items, couponCode: state.couponCode })

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const product = action.payload
      const existing = state.items.find((item) => item.id === product.id)
      if (existing) {
        existing.quantity += 1
      } else {
        state.items.push({ ...product, quantity: 1 })
      }
      persist(state)
      toast.success('Added to cart')
    },
    updateQuantity: (state, action) => {
      const { id, quantity } = action.payload
      const item = state.items.find((cartItem) => cartItem.id === id)
      if (item) item.quantity = Math.max(1, quantity)
      persist(state)
    },
    removeFromCart: (state, action) => {
      state.items = state.items.filter((item) => item.id !== action.payload)
      persist(state)
      toast.info('Removed from cart')
    },
    clearCart: (state) => {
      state.items = []
      state.couponCode = null
      persist(state)
    },
    applyCoupon: (state, action) => {
      const code = action.payload.toUpperCase()
      if (coupons[code]) {
        state.couponCode = code
        toast.success(`${code} applied`)
      } else {
        toast.error('Invalid coupon code')
      }
      persist(state)
    },
    removeCoupon: (state) => {
      state.couponCode = null
      persist(state)
    },
  },
})

export const { addToCart, updateQuantity, removeFromCart, clearCart, applyCoupon, removeCoupon } = cartSlice.actions
export default cartSlice.reducer
