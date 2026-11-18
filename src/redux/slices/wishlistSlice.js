import { createSlice } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'
import { loadState, saveState } from '../../utils/storage'

const initialState = loadState('wishlist', { items: [] })
const persist = (state) => saveState('wishlist', { items: state.items })

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState,
  reducers: {
    toggleWishlist: (state, action) => {
      const exists = state.items.some((item) => item.id === action.payload.id)
      if (exists) {
        state.items = state.items.filter((item) => item.id !== action.payload.id)
        toast.info('Removed from wishlist')
      } else {
        state.items.push(action.payload)
        toast.success('Saved to wishlist')
      }
      persist(state)
    },
    removeFromWishlist: (state, action) => {
      state.items = state.items.filter((item) => item.id !== action.payload)
      persist(state)
    },
  },
})

export const { toggleWishlist, removeFromWishlist } = wishlistSlice.actions
export default wishlistSlice.reducer
