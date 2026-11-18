import { useState } from 'react'
import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom'
import { Heart, LogOut, Menu, Moon, ShoppingCart, Sparkles, Sun, User, X } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../redux/slices/authSlice'
import { toggleTheme } from '../redux/slices/uiSlice'
import { useCartTotals } from '../hooks/useCartTotals'
import { FlashSaleBanner } from './FlashSaleBanner'
import { CompareDrawer } from './CompareDrawer'
import { LiveChatWidget } from './LiveChatWidget'

const navItems = [
  { to: '/', label: 'Home' },
  { to: '/products', label: 'Products' },
  { to: '/recommendations', label: 'AI Picks' },
  { to: '/wishlist', label: 'Wishlist' },
  { to: '/cart', label: 'Cart' },
]

export const Layout = () => {
  const [open, setOpen] = useState(false)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const user = useSelector((state) => state.auth.user)
  const theme = useSelector((state) => state.ui.theme)
  const wishlistCount = useSelector((state) => state.wishlist.items.length)
  const totals = useCartTotals()

  const handleLogout = () => {
    dispatch(logout())
    setOpen(false)
    navigate('/')
  }

  const linkClass = ({ isActive }) =>
    `rounded-md px-3 py-2 text-sm font-semibold transition ${isActive ? 'bg-teal-50 text-teal-700 dark:bg-teal-950 dark:text-teal-200' : 'text-slate-600 hover:text-slate-950 dark:text-slate-300 dark:hover:text-white'}`

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100">
      <FlashSaleBanner />
      <header className="sticky top-0 z-20 border-b border-slate-200 bg-white/95 backdrop-blur dark:border-slate-800 dark:bg-slate-950/95">
        <div className="container-shell flex h-16 items-center justify-between gap-4">
          <Link to="/" className="text-xl font-black tracking-tight text-slate-950 dark:text-white">MarketPro</Link>
          <nav className="hidden items-center gap-1 md:flex">
            {navItems.map((item) => <NavLink key={item.to} to={item.to} className={linkClass}>{item.label}</NavLink>)}
          </nav>
          <div className="flex items-center gap-2">
            <button className="btn-secondary px-3" onClick={() => dispatch(toggleTheme())} aria-label="Toggle dark mode">
              {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </button>
            <Link className="btn-secondary relative hidden px-3 sm:inline-flex" to="/wishlist" aria-label="Wishlist">
              <Heart className="h-4 w-4" />
              {wishlistCount > 0 && <span className="absolute -right-1 -top-1 rounded-full bg-rose-500 px-1.5 text-[10px] text-white">{wishlistCount}</span>}
            </Link>
            <Link className="btn-secondary hidden px-3 lg:inline-flex" to="/recommendations" aria-label="AI product recommendations">
              <Sparkles className="h-4 w-4" />
            </Link>
            <Link className="btn-secondary relative px-3" to="/cart" aria-label="Cart">
              <ShoppingCart className="h-4 w-4" />
              {totals.itemCount > 0 && <span className="absolute -right-1 -top-1 rounded-full bg-teal-600 px-1.5 text-[10px] text-white">{totals.itemCount}</span>}
            </Link>
            {user ? (
              <button className="btn-secondary hidden sm:inline-flex" onClick={handleLogout}><LogOut className="h-4 w-4" /> Logout</button>
            ) : (
              <Link className="btn-primary hidden sm:inline-flex" to="/login"><User className="h-4 w-4" /> Login</Link>
            )}
            <button
              className="btn-secondary px-3 md:hidden"
              onClick={() => setOpen((value) => !value)}
              aria-expanded={open}
              aria-controls="mobile-navigation"
              aria-label="Toggle menu"
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </header>
      {open && (
        <div className="fixed inset-0 z-40 md:hidden">
          <button
            className="absolute inset-0 bg-slate-950/40"
            onClick={() => setOpen(false)}
            aria-label="Close menu backdrop"
            type="button"
          />
          <nav
            id="mobile-navigation"
            className="absolute right-0 top-0 h-full w-[min(86vw,340px)] border-l border-slate-200 bg-white p-5 shadow-2xl dark:border-slate-800 dark:bg-slate-950"
          >
            <div className="mb-6 flex items-center justify-between">
              <Link to="/" className="text-xl font-black tracking-tight text-slate-950 dark:text-white" onClick={() => setOpen(false)}>
                MarketPro
              </Link>
              <button className="btn-secondary px-3" onClick={() => setOpen(false)} aria-label="Close menu" type="button">
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="grid gap-2">
              {navItems.map((item) => (
                <NavLink key={item.to} to={item.to} onClick={() => setOpen(false)} className={linkClass}>
                  {item.label}
                </NavLink>
              ))}
              {user ? (
                <button className="btn-secondary mt-2 justify-start" onClick={handleLogout} type="button">
                  <LogOut className="h-4 w-4" />
                  Logout
                </button>
              ) : (
                <Link className="btn-primary mt-2 justify-start" to="/login" onClick={() => setOpen(false)}>
                  <User className="h-4 w-4" />
                  Login
                </Link>
              )}
            </div>
          </nav>
        </div>
      )}
      <Outlet />
      <footer className="border-t border-slate-200 bg-white py-8 dark:border-slate-800 dark:bg-slate-950">
        <div className="container-shell flex flex-col gap-2 text-sm text-slate-600 dark:text-slate-300 sm:flex-row sm:items-center sm:justify-between">
          <p>MarketPro commerce experience built with React, Redux Toolkit, and FakeStore API.</p>
          <p>Coupons: WELCOME10, FLASH20, FREESHIP</p>
        </div>
      </footer>
      <CompareDrawer />
      <LiveChatWidget />
    </div>
  )
}
