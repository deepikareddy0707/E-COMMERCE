import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { productService } from '../../services/api'

export const fetchProducts = createAsyncThunk('products/fetchProducts', async (_, { rejectWithValue }) => {
  try {
    const [items, categories] = await Promise.all([
      productService.getProducts(),
      productService.getCategories(),
    ])
    return { items, categories }
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || 'Unable to load products. Please try again.')
  }
})

const initialState = {
  items: [],
  categories: [],
  search: '',
  category: 'all',
  sort: 'featured',
  page: 1,
  perPage: 8,
  status: 'idle',
  error: null,
  compareIds: [],
}

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setSearch: (state, action) => {
      state.search = action.payload
      state.page = 1
    },
    setCategory: (state, action) => {
      state.category = action.payload
      state.page = 1
    },
    setSort: (state, action) => {
      state.sort = action.payload
      state.page = 1
    },
    setPage: (state, action) => {
      state.page = action.payload
    },
    toggleCompare: (state, action) => {
      const id = action.payload
      if (state.compareIds.includes(id)) {
        state.compareIds = state.compareIds.filter((itemId) => itemId !== id)
      } else if (state.compareIds.length < 3) {
        state.compareIds.push(id)
      }
    },
    clearCompare: (state) => {
      state.compareIds = []
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.items = action.payload.items
        state.categories = action.payload.categories
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.payload
      })
  },
})

export const { setSearch, setCategory, setSort, setPage, toggleCompare, clearCompare } = productSlice.actions
export default productSlice.reducer
