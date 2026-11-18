import { MessageCircle, Send, X } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'
import { toggleChat } from '../redux/slices/uiSlice'

export const LiveChatWidget = () => {
  const dispatch = useDispatch()
  const chatOpen = useSelector((state) => state.ui.chatOpen)

  return (
    <div className="fixed bottom-5 right-5 z-40">
      {chatOpen && (
        <div className="mb-3 w-[min(92vw,360px)] rounded-lg border border-slate-200 bg-white shadow-2xl dark:border-slate-800 dark:bg-slate-900">
          <div className="flex items-center justify-between border-b border-slate-200 p-4 dark:border-slate-800">
            <div>
              <p className="font-black text-slate-950 dark:text-white">Live support</p>
              <p className="text-xs text-emerald-600">Online now</p>
            </div>
            <button onClick={() => dispatch(toggleChat())} aria-label="Close chat"><X className="h-5 w-5" /></button>
          </div>
          <div className="space-y-3 p-4 text-sm">
            <p className="max-w-[85%] rounded-lg bg-slate-100 p-3 text-slate-700 dark:bg-slate-800 dark:text-slate-200">Hi, I can help with sizing, coupons, shipping, or finding a better product match.</p>
            <p className="ml-auto max-w-[85%] rounded-lg bg-teal-600 p-3 text-white">Show me today&apos;s best deal.</p>
            <p className="max-w-[85%] rounded-lg bg-slate-100 p-3 text-slate-700 dark:bg-slate-800 dark:text-slate-200">Use FLASH20 before midnight for the biggest saving.</p>
          </div>
          <form className="flex gap-2 border-t border-slate-200 p-3 dark:border-slate-800">
            <input className="input" placeholder="Type a message" />
            <button className="btn-primary px-3" type="button" aria-label="Send message"><Send className="h-4 w-4" /></button>
          </form>
        </div>
      )}
      <button className="btn-primary h-14 w-14 rounded-full p-0 shadow-xl" onClick={() => dispatch(toggleChat())} aria-label="Open live chat">
        <MessageCircle className="h-6 w-6" />
      </button>
    </div>
  )
}
