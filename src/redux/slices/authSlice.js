import { createSlice } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'
import { loadState, saveState } from '../../utils/storage'

const initialState = loadState('session', { user: null, users: [] })
const persist = (state) => saveState('session', { user: state.user, users: state.users })

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    register: (state, action) => {
      const user = action.payload
      if (state.users.some((item) => item.email === user.email)) {
        toast.error('Account already exists')
        return
      }
      state.users.push(user)
      state.user = { name: user.name, email: user.email }
      persist(state)
      toast.success('Account created')
    },
    login: (state, action) => {
      const { email, password } = action.payload
      const user = state.users.find((item) => item.email === email && item.password === password)
      if (!user) {
        toast.error('Invalid email or password')
        return
      }
      state.user = { name: user.name, email: user.email }
      persist(state)
      toast.success('Welcome back')
    },
    logout: (state) => {
      state.user = null
      persist(state)
      toast.info('Signed out')
    },
  },
})

export const { register, login, logout } = authSlice.actions
export default authSlice.reducer
