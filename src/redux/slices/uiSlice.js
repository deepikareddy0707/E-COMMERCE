import { createSlice } from '@reduxjs/toolkit'
import { loadState, saveState } from '../../utils/storage'

const initialState = loadState('ui', {
  theme: window.matchMedia?.('(prefers-color-scheme: dark)').matches ? 'dark' : 'light',
  chatOpen: false,
})

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.theme = state.theme === 'dark' ? 'light' : 'dark'
      saveState('ui', state)
    },
    toggleChat: (state) => {
      state.chatOpen = !state.chatOpen
      saveState('ui', state)
    },
  },
})

export const { toggleTheme, toggleChat } = uiSlice.actions
export default uiSlice.reducer
