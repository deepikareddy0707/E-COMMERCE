# Complete E-Commerce App Code

## package.json

```json
{
  "name": "e-commerce",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "lint": "oxlint",
    "preview": "vite preview"
  },
  "dependencies": {
    "@reduxjs/toolkit": "^2.12.0",
    "@tailwindcss/vite": "^4.3.1",
    "axios": "^1.18.1",
    "lucide-react": "^1.21.0",
    "react": "^19.2.7",
    "react-dom": "^19.2.7",
    "react-redux": "^9.3.0",
    "react-router-dom": "^7.18.0",
    "react-toastify": "^11.1.0",
    "tailwindcss": "^4.3.1"
  },
  "devDependencies": {
    "@types/react": "^19.2.17",
    "@types/react-dom": "^19.2.3",
    "@vitejs/plugin-react": "^6.0.2",
    "oxlint": "^1.69.0",
    "vite": "^8.1.0"
  }
}

```

## vite.config.js

```js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
})

```

## index.html

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>e-commerce</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>

```

## src/App.jsx

```jsx
import { Suspense, lazy, useEffect } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { fetchProducts } from './redux/slices/productSlice'
import { Layout } from './components/Layout'
import { ProtectedRoute } from './routes/ProtectedRoute'
import { ErrorBoundary } from './components/ErrorBoundary'
import { PageLoader } from './components/PageLoader'

const Home = lazy(() => import('./pages/Home'))
const Products = lazy(() => import('./pages/Products'))
const ProductDetails = lazy(() => import('./pages/ProductDetails'))
const Cart = lazy(() => import('./pages/Cart'))
const Wishlist = lazy(() => import('./pages/Wishlist'))
const AIRecommendations = lazy(() => import('./pages/AIRecommendations'))
const Login = lazy(() => import('./pages/Login'))
const Register = lazy(() => import('./pages/Register'))
const Checkout = lazy(() => import('./pages/Checkout'))
const OrderSuccess = lazy(() => import('./pages/OrderSuccess'))

function App() {
  const dispatch = useDispatch()
  const theme = useSelector((state) => state.ui.theme)

  useEffect(() => {
    dispatch(fetchProducts())
  }, [dispatch])

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark')
  }, [theme])

  return (
    <ErrorBoundary>
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Products />} />
            <Route path="/products/:id" element={<ProductDetails />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/wishlist" element={<Wishlist />} />
            <Route path="/recommendations" element={<AIRecommendations />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route
              path="/checkout"
              element={
                <ProtectedRoute>
                  <Checkout />
                </ProtectedRoute>
              }
            />
            <Route
              path="/order-success"
              element={
                <ProtectedRoute>
                  <OrderSuccess />
                </ProtectedRoute>
              }
            />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
        </Routes>
      </Suspense>
    </ErrorBoundary>
  )
}

export default App

```

## src/main.jsx

```jsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import './index.css'
import App from './App.jsx'
import { store } from './redux/store'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
        <ToastContainer position="bottom-right" autoClose={2200} theme="colored" />
      </BrowserRouter>
    </Provider>
  </StrictMode>,
)

```

## src/index.css

```css
@import "tailwindcss";

@custom-variant dark (&:where(.dark, .dark *));

:root {
  font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
  color: #172033;
  background: #f7f8fb;
  font-synthesis: none;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

* {
  box-sizing: border-box;
}

body {
  margin: 0;
  min-width: 320px;
}

button,
input,
select,
textarea {
  font: inherit;
}

button {
  cursor: pointer;
}

.line-clamp-2 {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
}

.line-clamp-3 {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  overflow: hidden;
}

.focus-ring {
  @apply focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 dark:focus:ring-offset-slate-950;
}

.container-shell {
  @apply mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8;
}

.btn-primary {
  @apply inline-flex items-center justify-center gap-2 rounded-md bg-teal-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60 dark:focus:ring-offset-slate-950;
}

.btn-secondary {
  @apply inline-flex items-center justify-center gap-2 rounded-md border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-800 transition hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:hover:bg-slate-800 dark:focus:ring-offset-slate-950;
}

.input {
  @apply w-full rounded-md border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:focus:ring-offset-slate-950;
}

.section-title {
  @apply text-2xl font-bold tracking-tight text-slate-950 dark:text-white sm:text-3xl;
}

```

## src/components/CheckoutDeliveryPromise.jsx

```jsx
import { Truck } from 'lucide-react'
import { useSelector } from 'react-redux'
import { getDeliveryEstimate } from '../utils/inventory'

export const CheckoutDeliveryPromise = ({ zip }) => {
  const firstItem = useSelector((state) => state.cart.items[0])
  const estimate = getDeliveryEstimate(zip, firstItem?.id || 1)

  return (
    <div className="mt-4 rounded-lg border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-900 dark:border-emerald-900 dark:bg-emerald-950 dark:text-emerald-100">
      <div className="flex items-start gap-3">
        <Truck className="mt-0.5 h-5 w-5" />
        <div>
          <p className="font-black">Delivery promise</p>
          <p className="mt-1">
            Estimated arrival by {estimate.date} through {estimate.partner}. Final promise updates as ZIP code changes.
          </p>
        </div>
      </div>
    </div>
  )
}

```

## src/components/CompareDrawer.jsx

```jsx
import { X } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'
import { clearCompare, toggleCompare } from '../redux/slices/productSlice'
import { Rating } from './Rating'

export const CompareDrawer = () => {
  const dispatch = useDispatch()
  const { items, compareIds } = useSelector((state) => state.products)
  const products = items.filter((product) => compareIds.includes(product.id))

  if (!products.length) return null

  return (
    <div className="fixed inset-x-0 bottom-0 z-30 border-t border-slate-200 bg-white shadow-2xl dark:border-slate-800 dark:bg-slate-950">
      <div className="container-shell py-4">
        <div className="flex items-center justify-between gap-4">
          <h2 className="text-base font-black text-slate-950 dark:text-white">Product comparison</h2>
          <button className="btn-secondary py-2" onClick={() => dispatch(clearCompare())}>Clear</button>
        </div>
        <div className="mt-3 grid gap-3 md:grid-cols-3">
          {products.map((product) => (
            <div key={product.id} className="relative rounded-lg border border-slate-200 p-3 dark:border-slate-800">
              <button className="absolute right-2 top-2 rounded-full bg-slate-100 p-1 dark:bg-slate-800" onClick={() => dispatch(toggleCompare(product.id))} aria-label="Remove from comparison">
                <X className="h-4 w-4" />
              </button>
              <div className="flex gap-3">
                <img className="h-20 w-20 object-contain" src={product.image} alt={product.title} />
                <div>
                  <p className="line-clamp-2 text-sm font-bold text-slate-950 dark:text-white">{product.title}</p>
                  <p className="mt-1 text-sm font-black text-teal-700 dark:text-teal-300">${product.price.toFixed(2)}</p>
                  <Rating rating={product.rating} />
                </div>
              </div>
              <dl className="mt-3 grid grid-cols-2 gap-2 text-xs text-slate-600 dark:text-slate-300">
                <dt>Category</dt><dd className="text-right font-semibold">{product.category}</dd>
                <dt>Reviews</dt><dd className="text-right font-semibold">{product.rating?.count}</dd>
              </dl>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

```

## src/components/EmptyState.jsx

```jsx
import { Link } from 'react-router-dom'
import { ShoppingBag } from 'lucide-react'

export const EmptyState = ({ title, message, action = 'Browse products', to = '/products' }) => (
  <div className="rounded-lg border border-dashed border-slate-300 bg-white px-6 py-14 text-center dark:border-slate-700 dark:bg-slate-900">
    <ShoppingBag className="mx-auto h-10 w-10 text-teal-600" />
    <h2 className="mt-4 text-xl font-bold text-slate-950 dark:text-white">{title}</h2>
    <p className="mx-auto mt-2 max-w-md text-sm text-slate-600 dark:text-slate-300">{message}</p>
    <Link className="btn-primary mt-6" to={to}>{action}</Link>
  </div>
)

```

## src/components/ErrorBoundary.jsx

```jsx
import { Component } from 'react'

export class ErrorBoundary extends Component {
  state = { hasError: false }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  render() {
    if (this.state.hasError) {
      return (
        <main className="grid min-h-screen place-items-center bg-slate-50 px-4 text-center dark:bg-slate-950">
          <div>
            <h1 className="text-3xl font-bold text-slate-950 dark:text-white">Something went wrong</h1>
            <p className="mt-3 max-w-md text-slate-600 dark:text-slate-300">
              Refresh the page or return home to continue shopping.
            </p>
            <a className="btn-primary mt-6" href="/">Go home</a>
          </div>
        </main>
      )
    }
    return this.props.children
  }
}

```

## src/components/FlashSaleBanner.jsx

```jsx
import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { Clock } from 'lucide-react'

const getTimeLeft = () => {
  const end = new Date()
  end.setHours(23, 59, 59, 999)
  const diff = Math.max(end.getTime() - Date.now(), 0)
  const hours = Math.floor(diff / 3600000)
  const minutes = Math.floor((diff % 3600000) / 60000)
  const seconds = Math.floor((diff % 60000) / 1000)
  return { hours, minutes, seconds }
}

export const FlashSaleBanner = () => {
  const [timeLeft, setTimeLeft] = useState(getTimeLeft)
  const saleCode = useMemo(() => 'FLASH20', [])

  useEffect(() => {
    const timer = setInterval(() => setTimeLeft(getTimeLeft()), 1000)
    return () => clearInterval(timer)
  }, [])

  return (
    <section className="bg-slate-950 text-white dark:bg-teal-950">
      <div className="container-shell flex flex-col gap-3 py-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <Clock className="h-5 w-5 text-amber-300" />
          <p className="text-sm font-semibold">Flash sale ends today. Use {saleCode} for 20% off selected picks.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="grid grid-cols-3 gap-2 text-center text-xs font-black">
            {Object.entries(timeLeft).map(([label, value]) => (
              <span key={label} className="rounded-md bg-white/10 px-2 py-1">{String(value).padStart(2, '0')} {label[0].toUpperCase()}</span>
            ))}
          </div>
          <Link className="rounded-md bg-amber-300 px-3 py-1.5 text-xs font-black text-slate-950" to="/products">Shop deals</Link>
        </div>
      </div>
    </section>
  )
}

```

## src/components/InventoryBadge.jsx

```jsx
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

```

## src/components/Layout.jsx

```jsx
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

```

## src/components/LiveAvailabilityPanel.jsx

```jsx
import { useMemo, useState } from 'react'
import { Bell, MapPin, PackageCheck, Truck } from 'lucide-react'
import { toast } from 'react-toastify'
import { useLiveInventory } from '../hooks/useLiveInventory'
import { getDeliveryEstimate, getInventoryTone } from '../utils/inventory'

export const LiveAvailabilityPanel = ({ product }) => {
  const [zip, setZip] = useState('')
  const [checkedZip, setCheckedZip] = useState('')
  const { stock, viewers } = useLiveInventory(product.id)
  const tone = getInventoryTone(stock)
  const estimate = useMemo(() => getDeliveryEstimate(checkedZip, product.id), [checkedZip, product.id])

  const checkDelivery = (event) => {
    event.preventDefault()
    if (zip.replace(/\D/g, '').length < 5) {
      toast.error('Enter a valid ZIP code')
      return
    }
    setCheckedZip(zip)
    toast.success('Delivery promise updated')
  }

  return (
    <section className="mt-8 rounded-lg border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-bold uppercase tracking-wider text-teal-700 dark:text-teal-300">Live availability</p>
          <h2 className="text-xl font-black text-slate-950 dark:text-white">Inventory and delivery promise</h2>
        </div>
        <span className={`inline-flex w-fit rounded-full px-3 py-1 text-sm font-bold ${tone.className}`}>
          {tone.label}
        </span>
      </div>

      <div className="mt-5 grid gap-3 sm:grid-cols-3">
        <div className="rounded-md bg-slate-50 p-4 dark:bg-slate-950">
          <PackageCheck className="h-5 w-5 text-teal-600" />
          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">Warehouse stock</p>
          <p className="text-xl font-black text-slate-950 dark:text-white">{stock} units</p>
        </div>
        <div className="rounded-md bg-slate-50 p-4 dark:bg-slate-950">
          <Bell className="h-5 w-5 text-amber-500" />
          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">Active shoppers</p>
          <p className="text-xl font-black text-slate-950 dark:text-white">{viewers} viewing</p>
        </div>
        <div className="rounded-md bg-slate-50 p-4 dark:bg-slate-950">
          <Truck className="h-5 w-5 text-emerald-600" />
          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">Delivery partner</p>
          <p className="text-xl font-black text-slate-950 dark:text-white">{estimate.partner}</p>
        </div>
      </div>

      <form className="mt-5 grid gap-3 sm:grid-cols-[1fr_auto]" onSubmit={checkDelivery}>
        <label className="relative">
          <MapPin className="pointer-events-none absolute left-3 top-3 h-4 w-4 text-slate-400" />
          <input className="input pl-9" value={zip} onChange={(event) => setZip(event.target.value)} placeholder="Enter ZIP code for ETA" />
        </label>
        <button className="btn-secondary" type="submit">Check delivery</button>
      </form>

      <p className="mt-3 text-sm font-semibold text-slate-700 dark:text-slate-200">
        {checkedZip ? `Delivering to ${checkedZip}: ` : 'Estimated delivery: '}
        arrives by {estimate.date} in {estimate.days} business days.
      </p>
    </section>
  )
}

```

## src/components/LiveChatWidget.jsx

```jsx
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

```

## src/components/OrderSummary.jsx

```jsx
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { applyCoupon, removeCoupon } from '../redux/slices/cartSlice'
import { useCartTotals } from '../hooks/useCartTotals'

export const OrderSummary = ({ showCoupon = true }) => {
  const dispatch = useDispatch()
  const { couponCode } = useSelector((state) => state.cart)
  const totals = useCartTotals()
  const [code, setCode] = useState('')

  return (
    <aside className="rounded-lg border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
      <h2 className="text-lg font-bold text-slate-950 dark:text-white">Order summary</h2>
      {showCoupon && (
        <div className="mt-4">
          <label className="text-sm font-semibold text-slate-700 dark:text-slate-200">Coupon code</label>
          <div className="mt-2 flex gap-2">
            <input className="input" value={code} onChange={(event) => setCode(event.target.value)} placeholder="WELCOME10" />
            <button className="btn-secondary" onClick={() => dispatch(applyCoupon(code))}>Apply</button>
          </div>
          {couponCode && (
            <button className="mt-2 text-sm font-semibold text-teal-700 dark:text-teal-300" onClick={() => dispatch(removeCoupon())}>
              Remove {couponCode}
            </button>
          )}
        </div>
      )}
      <dl className="mt-5 space-y-3 text-sm">
        <div className="flex justify-between text-slate-600 dark:text-slate-300"><dt>Subtotal</dt><dd>${totals.subtotal.toFixed(2)}</dd></div>
        <div className="flex justify-between text-slate-600 dark:text-slate-300"><dt>Discount</dt><dd>-${totals.discount.toFixed(2)}</dd></div>
        <div className="flex justify-between text-slate-600 dark:text-slate-300"><dt>Shipping</dt><dd>{totals.shipping === 0 ? 'Free' : `$${totals.shipping.toFixed(2)}`}</dd></div>
        <div className="flex justify-between text-slate-600 dark:text-slate-300"><dt>Tax</dt><dd>${totals.tax.toFixed(2)}</dd></div>
        <div className="border-t border-slate-200 pt-3 text-base font-black text-slate-950 dark:border-slate-800 dark:text-white">
          <div className="flex justify-between"><dt>Total</dt><dd>${totals.total.toFixed(2)}</dd></div>
        </div>
      </dl>
    </aside>
  )
}

```

## src/components/PageLoader.jsx

```jsx
export const PageLoader = () => (
  <div className="grid min-h-screen place-items-center bg-slate-50 dark:bg-slate-950">
    <div className="h-12 w-12 animate-spin rounded-full border-4 border-slate-200 border-t-teal-600" />
  </div>
)

```

## src/components/ProductCard.jsx

```jsx
import { memo } from 'react'
import { Link } from 'react-router-dom'
import { Heart, Scale, ShoppingCart } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'
import { addToCart } from '../redux/slices/cartSlice'
import { toggleWishlist } from '../redux/slices/wishlistSlice'
import { toggleCompare } from '../redux/slices/productSlice'
import { Rating } from './Rating'
import { InventoryBadge } from './InventoryBadge'

export const ProductCard = memo(({ product }) => {
  const dispatch = useDispatch()
  const isWishlisted = useSelector((state) => state.wishlist.items.some((item) => item.id === product.id))
  const isCompared = useSelector((state) => state.products.compareIds.includes(product.id))

  return (
    <article className="group flex h-full flex-col rounded-lg border border-slate-200 bg-white p-4 transition hover:-translate-y-1 hover:shadow-xl dark:border-slate-800 dark:bg-slate-900">
      <Link to={`/products/${product.id}`} className="flex aspect-square items-center justify-center rounded-md bg-slate-50 p-5 dark:bg-slate-950">
        <img className="h-full max-h-56 w-full object-contain transition group-hover:scale-105" src={product.image} alt={product.title} loading="lazy" />
      </Link>
      <div className="mt-4 flex flex-1 flex-col">
        <div className="flex items-center justify-between gap-2">
          <p className="text-xs font-bold uppercase tracking-wider text-teal-700 dark:text-teal-300">{product.category}</p>
          <InventoryBadge productId={product.id} />
        </div>
        <Link to={`/products/${product.id}`} className="mt-2 line-clamp-2 min-h-11 text-sm font-bold text-slate-950 hover:text-teal-700 dark:text-white dark:hover:text-teal-300">
          {product.title}
        </Link>
        <div className="mt-3 flex items-center justify-between">
          <Rating rating={product.rating} />
          <span className="text-lg font-black text-slate-950 dark:text-white">${product.price.toFixed(2)}</span>
        </div>
        <div className="mt-4 grid grid-cols-[1fr_42px_42px] gap-2">
          <button className="btn-primary px-3" onClick={() => dispatch(addToCart(product))}>
            <ShoppingCart className="h-4 w-4" />
            <span>Add</span>
          </button>
          <button className="btn-secondary px-0" aria-label="Toggle wishlist" onClick={() => dispatch(toggleWishlist(product))}>
            <Heart className={`h-4 w-4 ${isWishlisted ? 'fill-rose-500 text-rose-500' : ''}`} />
          </button>
          <button className="btn-secondary px-0" aria-label="Compare product" onClick={() => dispatch(toggleCompare(product.id))}>
            <Scale className={`h-4 w-4 ${isCompared ? 'text-teal-600' : ''}`} />
          </button>
        </div>
      </div>
    </article>
  )
})

```

## src/components/ProductSkeleton.jsx

```jsx
export const ProductSkeleton = () => (
  <div className="animate-pulse rounded-lg border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
    <div className="aspect-square rounded-md bg-slate-200 dark:bg-slate-800" />
    <div className="mt-4 h-4 w-2/3 rounded bg-slate-200 dark:bg-slate-800" />
    <div className="mt-3 h-4 w-full rounded bg-slate-200 dark:bg-slate-800" />
    <div className="mt-3 h-9 rounded bg-slate-200 dark:bg-slate-800" />
  </div>
)

```

## src/components/Rating.jsx

```jsx
import { Star } from 'lucide-react'

export const Rating = ({ rating }) => (
  <div className="flex items-center gap-1 text-sm text-slate-600 dark:text-slate-300">
    <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
    <span className="font-semibold text-slate-900 dark:text-white">{rating?.rate ?? '4.5'}</span>
    <span>({rating?.count ?? 0})</span>
  </div>
)

```

## src/components/Recommendations.jsx

```jsx
import { useMemo } from 'react'
import { useSelector } from 'react-redux'
import { getRecommendations } from '../utils/recommendations'
import { ProductCard } from './ProductCard'

export const Recommendations = ({ title = 'AI product recommendations' }) => {
  const products = useSelector((state) => state.products.items)
  const cartItems = useSelector((state) => state.cart.items)
  const wishlistItems = useSelector((state) => state.wishlist.items)
  const recommended = useMemo(
    () => getRecommendations(products, cartItems, wishlistItems),
    [products, cartItems, wishlistItems],
  )

  if (!recommended.length) return null

  return (
    <section className="py-10">
      <div className="container-shell">
        <div className="mb-5 flex items-end justify-between gap-4">
          <div>
            <p className="text-sm font-bold uppercase tracking-wider text-teal-700 dark:text-teal-300">Smart picks</p>
            <h2 className="section-title">{title}</h2>
          </div>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {recommended.map((product) => <ProductCard key={product.id} product={product} />)}
        </div>
      </div>
    </section>
  )
}

```

## src/pages/AIRecommendations.jsx

```jsx
import { useMemo } from 'react'
import { Link } from 'react-router-dom'
import { Sparkles, ShoppingBag, SlidersHorizontal } from 'lucide-react'
import { useSelector } from 'react-redux'
import { ProductCard } from '../components/ProductCard'
import { ProductSkeleton } from '../components/ProductSkeleton'
import { getRecommendations } from '../utils/recommendations'

const AIRecommendations = () => {
  const { items, status } = useSelector((state) => state.products)
  const cartItems = useSelector((state) => state.cart.items)
  const wishlistItems = useSelector((state) => state.wishlist.items)
  const recommendations = useMemo(
    () => getRecommendations(items, cartItems, wishlistItems, 8),
    [items, cartItems, wishlistItems],
  )

  return (
    <main>
      <section className="border-b border-slate-200 bg-white py-10 dark:border-slate-800 dark:bg-slate-950">
        <div className="container-shell">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="inline-flex items-center gap-2 rounded-full bg-teal-50 px-3 py-1 text-sm font-bold text-teal-700 dark:bg-teal-950 dark:text-teal-200">
                <Sparkles className="h-4 w-4" />
                Personalized shopping assistant
              </p>
              <h1 className="mt-4 text-4xl font-black tracking-tight text-slate-950 dark:text-white sm:text-5xl">
                AI Product Recommendations
              </h1>
              <p className="mt-4 max-w-2xl text-slate-600 dark:text-slate-300">
                Picks are ranked from your cart, wishlist, categories, ratings, and product popularity.
              </p>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="rounded-lg border border-slate-200 p-4 dark:border-slate-800">
                <ShoppingBag className="h-5 w-5 text-teal-600" />
                <p className="mt-2 text-sm font-bold text-slate-950 dark:text-white">Cart-aware</p>
                <p className="text-sm text-slate-600 dark:text-slate-300">{cartItems.length} cart item signals</p>
              </div>
              <div className="rounded-lg border border-slate-200 p-4 dark:border-slate-800">
                <SlidersHorizontal className="h-5 w-5 text-teal-600" />
                <p className="mt-2 text-sm font-bold text-slate-950 dark:text-white">Wishlist-aware</p>
                <p className="text-sm text-slate-600 dark:text-slate-300">{wishlistItems.length} saved item signals</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="container-shell py-10">
        <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-bold uppercase tracking-wider text-teal-700 dark:text-teal-300">Recommended for you</p>
            <h2 className="section-title">Smart product picks</h2>
          </div>
          <Link className="btn-secondary" to="/products">Browse catalog</Link>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {status === 'loading'
            ? Array.from({ length: 8 }, (_, index) => <ProductSkeleton key={index} />)
            : recommendations.map((product) => <ProductCard key={product.id} product={product} />)}
        </div>
      </section>
    </main>
  )
}

export default AIRecommendations

```

## src/pages/Cart.jsx

```jsx
import { Link } from 'react-router-dom'
import { Minus, Plus, Trash2 } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'
import { removeFromCart, updateQuantity } from '../redux/slices/cartSlice'
import { EmptyState } from '../components/EmptyState'
import { OrderSummary } from '../components/OrderSummary'

const Cart = () => {
  const dispatch = useDispatch()
  const items = useSelector((state) => state.cart.items)

  if (!items.length) return <main className="container-shell py-10"><EmptyState title="Your cart is empty" message="Add products to start building your order." /></main>

  return (
    <main className="container-shell grid gap-8 py-10 lg:grid-cols-[1fr_360px]">
      <section>
        <h1 className="section-title">Shopping cart</h1>
        <div className="mt-6 space-y-4">
          {items.map((item) => (
            <article key={item.id} className="grid gap-4 rounded-lg border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900 sm:grid-cols-[110px_1fr_auto]">
              <img className="h-28 w-full object-contain sm:w-28" src={item.image} alt={item.title} />
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-teal-700 dark:text-teal-300">{item.category}</p>
                <Link className="mt-1 block font-bold text-slate-950 dark:text-white" to={`/products/${item.id}`}>{item.title}</Link>
                <p className="mt-2 text-lg font-black">${item.price.toFixed(2)}</p>
              </div>
              <div className="flex items-center gap-2 sm:flex-col sm:items-end sm:justify-between">
                <div className="flex items-center rounded-md border border-slate-200 dark:border-slate-700">
                  <button className="p-2" onClick={() => dispatch(updateQuantity({ id: item.id, quantity: item.quantity - 1 }))}><Minus className="h-4 w-4" /></button>
                  <span className="w-10 text-center text-sm font-bold">{item.quantity}</span>
                  <button className="p-2" onClick={() => dispatch(updateQuantity({ id: item.id, quantity: item.quantity + 1 }))}><Plus className="h-4 w-4" /></button>
                </div>
                <button className="btn-secondary px-3" onClick={() => dispatch(removeFromCart(item.id))}><Trash2 className="h-4 w-4" /></button>
              </div>
            </article>
          ))}
        </div>
      </section>
      <div>
        <OrderSummary />
        <Link className="btn-primary mt-4 w-full" to="/checkout">Checkout</Link>
      </div>
    </main>
  )
}

export default Cart

```

## src/pages/Checkout.jsx

```jsx
import { useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { clearCart } from '../redux/slices/cartSlice'
import { OrderSummary } from '../components/OrderSummary'
import { CheckoutDeliveryPromise } from '../components/CheckoutDeliveryPromise'

const Checkout = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const items = useSelector((state) => state.cart.items)
  const [form, setForm] = useState({ fullName: '', phone: '', address: '', city: '', zip: '' })
  const [errors, setErrors] = useState({})

  if (!items.length) return <Navigate to="/cart" replace />

  const submit = (event) => {
    event.preventDefault()
    const nextErrors = {}
    Object.entries(form).forEach(([key, value]) => {
      if (!value.trim()) nextErrors[key] = 'Required'
    })
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length) return
    dispatch(clearCart())
    navigate('/order-success', { state: { orderId: `MP-${Date.now().toString().slice(-6)}` } })
  }

  return (
    <main className="container-shell grid gap-8 py-10 lg:grid-cols-[1fr_360px]">
      <form className="rounded-lg border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900" onSubmit={submit}>
        <h1 className="section-title">Checkout</h1>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {[
            ['fullName', 'Full name'],
            ['phone', 'Phone'],
            ['address', 'Address'],
            ['city', 'City'],
            ['zip', 'ZIP code'],
          ].map(([name, label]) => (
            <label key={name} className={name === 'address' ? 'block sm:col-span-2' : 'block'}>
              <span className="text-sm font-semibold">{label}</span>
              <input className="input mt-2" value={form[name]} onChange={(event) => setForm({ ...form, [name]: event.target.value })} />
              {errors[name] && <span className="mt-1 block text-sm text-rose-600">{errors[name]}</span>}
            </label>
          ))}
        </div>
        <CheckoutDeliveryPromise zip={form.zip} />
        <button className="btn-primary mt-6" type="submit">Place order</button>
      </form>
      <OrderSummary showCoupon={false} />
    </main>
  )
}

export default Checkout

```

## src/pages/Home.jsx

```jsx
import { Link } from 'react-router-dom'
import { ArrowRight, Sparkles, Truck, ShieldCheck } from 'lucide-react'
import { useSelector } from 'react-redux'
import { ProductCard } from '../components/ProductCard'
import { ProductSkeleton } from '../components/ProductSkeleton'
import { Recommendations } from '../components/Recommendations'

const Home = () => {
  const { items, status } = useSelector((state) => state.products)
  const featured = items.slice(0, 4)

  return (
    <main>
      <section className="bg-white dark:bg-slate-950">
        <div className="container-shell grid min-h-[560px] items-center gap-10 py-12 lg:grid-cols-[1fr_0.9fr]">
          <div>
            <p className="inline-flex rounded-full bg-teal-50 px-3 py-1 text-sm font-bold text-teal-700 dark:bg-teal-950 dark:text-teal-200">
              New market features live
            </p>
            <h1 className="mt-5 max-w-3xl text-4xl font-black tracking-tight text-slate-950 dark:text-white sm:text-6xl">
              Shop smarter with deals, comparisons, and personalized picks.
            </h1>
            <p className="mt-5 max-w-2xl text-lg text-slate-600 dark:text-slate-300">
              A polished ecommerce storefront with persistent cart, wishlist, protected checkout, coupons, flash sales, and live support.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link className="btn-primary" to="/products">Explore products <ArrowRight className="h-4 w-4" /></Link>
              <Link className="btn-secondary" to="/cart">View cart</Link>
            </div>
            <div className="mt-8 grid gap-3 sm:grid-cols-3">
              {[
                [Sparkles, 'AI recommendations'],
                [Truck, 'Free shipping over $150'],
                [ShieldCheck, 'Protected checkout'],
              ].map(([Icon, label]) => (
                <div key={label} className="flex items-center gap-2 text-sm font-semibold text-slate-700 dark:text-slate-200">
                  <Icon className="h-5 w-5 text-teal-600" />
                  {label}
                </div>
              ))}
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {status === 'loading'
              ? Array.from({ length: 4 }, (_, index) => <ProductSkeleton key={index} />)
              : featured.map((product) => <ProductCard key={product.id} product={product} />)}
          </div>
        </div>
      </section>
      <Recommendations title="Recommended for your next order" />
    </main>
  )
}

export default Home

```

## src/pages/Login.jsx

```jsx
import { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { login } from '../redux/slices/authSlice'

const Login = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation()
  const user = useSelector((state) => state.auth.user)
  const users = useSelector((state) => state.auth.users)
  const [form, setForm] = useState({ email: '', password: '' })
  const [errors, setErrors] = useState({})

  useEffect(() => {
    if (user) navigate(location.state?.from || '/', { replace: true })
  }, [user, navigate, location.state])

  const submit = (event) => {
    event.preventDefault()
    const nextErrors = {}
    if (!/\S+@\S+\.\S+/.test(form.email)) nextErrors.email = 'Enter a valid email.'
    if (form.password.length < 6) nextErrors.password = 'Password must be at least 6 characters.'
    if (!users.some((item) => item.email === form.email && item.password === form.password)) {
      nextErrors.credentials = 'Invalid email or password.'
    }
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length) return
    dispatch(login(form))
  }

  return (
    <main className="container-shell grid min-h-[70vh] place-items-center py-10">
      <form className="w-full max-w-md rounded-lg border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900" onSubmit={submit}>
        <h1 className="text-2xl font-black text-slate-950 dark:text-white">Login</h1>
        <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">Use an account created in this demo session.</p>
        <div className="mt-6 space-y-4">
          <label className="block text-sm font-semibold">Email<input className="input mt-2" value={form.email} onChange={(event) => setForm({ ...form, email: event.target.value })} /></label>
          {errors.email && <p className="text-sm text-rose-600">{errors.email}</p>}
          <label className="block text-sm font-semibold">Password<input className="input mt-2" type="password" value={form.password} onChange={(event) => setForm({ ...form, password: event.target.value })} /></label>
          {errors.password && <p className="text-sm text-rose-600">{errors.password}</p>}
          {errors.credentials && <p className="text-sm text-rose-600">{errors.credentials}</p>}
        </div>
        <button className="btn-primary mt-6 w-full" type="submit">Login</button>
        <p className="mt-4 text-center text-sm text-slate-600 dark:text-slate-300">
          New here? <Link className="font-bold text-teal-700 dark:text-teal-300" to="/register">Create account</Link>
        </p>
      </form>
    </main>
  )
}

export default Login

```

## src/pages/OrderSuccess.jsx

```jsx
import { Link, useLocation } from 'react-router-dom'
import { CheckCircle2 } from 'lucide-react'

const OrderSuccess = () => {
  const location = useLocation()
  const orderId = location.state?.orderId || 'MP-READY'

  return (
    <main className="container-shell grid min-h-[70vh] place-items-center py-10 text-center">
      <div className="max-w-lg rounded-lg border border-slate-200 bg-white p-8 dark:border-slate-800 dark:bg-slate-900">
        <CheckCircle2 className="mx-auto h-14 w-14 text-emerald-600" />
        <h1 className="mt-4 text-3xl font-black text-slate-950 dark:text-white">Order confirmed</h1>
        <p className="mt-3 text-slate-600 dark:text-slate-300">Your order {orderId} has been placed successfully. A confirmation email would be sent in a production checkout.</p>
        <Link className="btn-primary mt-6" to="/products">Continue shopping</Link>
      </div>
    </main>
  )
}

export default OrderSuccess

```

## src/pages/ProductDetails.jsx

```jsx
import { Link, useParams } from 'react-router-dom'
import { Heart, Scale, ShoppingCart } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'
import { addToCart } from '../redux/slices/cartSlice'
import { toggleWishlist } from '../redux/slices/wishlistSlice'
import { toggleCompare } from '../redux/slices/productSlice'
import { Rating } from '../components/Rating'
import { Recommendations } from '../components/Recommendations'
import { LiveAvailabilityPanel } from '../components/LiveAvailabilityPanel'

const ProductDetails = () => {
  const { id } = useParams()
  const dispatch = useDispatch()
  const { items, status } = useSelector((state) => state.products)
  const product = items.find((item) => item.id === Number(id))

  if (status === 'loading') return <main className="container-shell py-16">Loading product...</main>
  if (!product) return <main className="container-shell py-16"><Link className="btn-primary" to="/products">Back to products</Link></main>

  return (
    <main>
      <section className="container-shell grid gap-10 py-10 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="rounded-lg border border-slate-200 bg-white p-8 dark:border-slate-800 dark:bg-slate-900">
          <img className="mx-auto h-[420px] max-h-[70vh] w-full object-contain" src={product.image} alt={product.title} />
        </div>
        <div>
          <p className="text-sm font-bold uppercase tracking-wider text-teal-700 dark:text-teal-300">{product.category}</p>
          <h1 className="mt-3 text-3xl font-black tracking-tight text-slate-950 dark:text-white sm:text-5xl">{product.title}</h1>
          <div className="mt-4"><Rating rating={product.rating} /></div>
          <p className="mt-6 text-4xl font-black text-slate-950 dark:text-white">${product.price.toFixed(2)}</p>
          <p className="mt-6 max-w-2xl leading-7 text-slate-600 dark:text-slate-300">{product.description}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <button className="btn-primary" onClick={() => dispatch(addToCart(product))}><ShoppingCart className="h-4 w-4" /> Add to cart</button>
            <button className="btn-secondary" onClick={() => dispatch(toggleWishlist(product))}><Heart className="h-4 w-4" /> Wishlist</button>
            <button className="btn-secondary" onClick={() => dispatch(toggleCompare(product.id))}><Scale className="h-4 w-4" /> Compare</button>
          </div>
          <LiveAvailabilityPanel product={product} />
        </div>
      </section>
      <Recommendations title="You may also like" />
    </main>
  )
}

export default ProductDetails

```

## src/pages/Products.jsx

```jsx
import { useMemo } from 'react'
import { Search } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'
import { setCategory, setPage, setSearch, setSort } from '../redux/slices/productSlice'
import { ProductCard } from '../components/ProductCard'
import { ProductSkeleton } from '../components/ProductSkeleton'
import { EmptyState } from '../components/EmptyState'

const Products = () => {
  const dispatch = useDispatch()
  const { items, categories, search, category, sort, page, perPage, status, error } = useSelector((state) => state.products)

  const filteredProducts = useMemo(() => {
    const normalizedSearch = search.toLowerCase().trim()
    const list = items
      .filter((product) => category === 'all' || product.category === category)
      .filter((product) => product.title.toLowerCase().includes(normalizedSearch))

    return [...list].sort((a, b) => {
      if (sort === 'price-asc') return a.price - b.price
      if (sort === 'price-desc') return b.price - a.price
      if (sort === 'rating') return b.rating.rate - a.rating.rate
      return b.rating.count - a.rating.count
    })
  }, [items, category, search, sort])

  const pageCount = Math.max(1, Math.ceil(filteredProducts.length / perPage))
  const paginated = filteredProducts.slice((page - 1) * perPage, page * perPage)

  return (
    <main className="container-shell py-10">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-sm font-bold uppercase tracking-wider text-teal-700 dark:text-teal-300">Catalog</p>
          <h1 className="section-title">Products</h1>
        </div>
        <div className="grid gap-3 md:grid-cols-[minmax(220px,320px)_180px_180px]">
          <label className="relative">
            <Search className="pointer-events-none absolute left-3 top-3 h-4 w-4 text-slate-400" />
            <input className="input pl-9" value={search} onChange={(event) => dispatch(setSearch(event.target.value))} placeholder="Search products" />
          </label>
          <select className="input" value={category} onChange={(event) => dispatch(setCategory(event.target.value))}>
            <option value="all">All categories</option>
            {categories.map((item) => <option key={item} value={item}>{item}</option>)}
          </select>
          <select className="input" value={sort} onChange={(event) => dispatch(setSort(event.target.value))}>
            <option value="featured">Featured</option>
            <option value="price-asc">Price: low to high</option>
            <option value="price-desc">Price: high to low</option>
            <option value="rating">Top rated</option>
          </select>
        </div>
      </div>

      {error && <p className="mt-6 rounded-md bg-rose-50 p-4 text-sm font-semibold text-rose-700">{error}</p>}

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {status === 'loading'
          ? Array.from({ length: 8 }, (_, index) => <ProductSkeleton key={index} />)
          : paginated.map((product) => <ProductCard key={product.id} product={product} />)}
      </div>

      {status !== 'loading' && !paginated.length && (
        <div className="mt-8">
          <EmptyState title="No products found" message="Try another search, category, or sort option." />
        </div>
      )}

      {pageCount > 1 && (
        <div className="mt-8 flex flex-wrap justify-center gap-2">
          {Array.from({ length: pageCount }, (_, index) => index + 1).map((pageNumber) => (
            <button
              key={pageNumber}
              className={pageNumber === page ? 'btn-primary px-4' : 'btn-secondary px-4'}
              onClick={() => dispatch(setPage(pageNumber))}
            >
              {pageNumber}
            </button>
          ))}
        </div>
      )}
    </main>
  )
}

export default Products

```

## src/pages/Register.jsx

```jsx
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { register } from '../redux/slices/authSlice'

const Register = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const users = useSelector((state) => state.auth.users)
  const [form, setForm] = useState({ name: '', email: '', password: '' })
  const [errors, setErrors] = useState({})

  const submit = (event) => {
    event.preventDefault()
    const nextErrors = {}
    if (form.name.trim().length < 2) nextErrors.name = 'Enter your name.'
    if (!/\S+@\S+\.\S+/.test(form.email)) nextErrors.email = 'Enter a valid email.'
    if (users.some((item) => item.email === form.email)) nextErrors.email = 'Account already exists.'
    if (form.password.length < 6) nextErrors.password = 'Use at least 6 characters.'
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length) return
    dispatch(register(form))
    navigate('/checkout')
  }

  return (
    <main className="container-shell grid min-h-[70vh] place-items-center py-10">
      <form className="w-full max-w-md rounded-lg border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900" onSubmit={submit}>
        <h1 className="text-2xl font-black text-slate-950 dark:text-white">Create account</h1>
        <div className="mt-6 space-y-4">
          <label className="block text-sm font-semibold">Name<input className="input mt-2" value={form.name} onChange={(event) => setForm({ ...form, name: event.target.value })} /></label>
          {errors.name && <p className="text-sm text-rose-600">{errors.name}</p>}
          <label className="block text-sm font-semibold">Email<input className="input mt-2" value={form.email} onChange={(event) => setForm({ ...form, email: event.target.value })} /></label>
          {errors.email && <p className="text-sm text-rose-600">{errors.email}</p>}
          <label className="block text-sm font-semibold">Password<input className="input mt-2" type="password" value={form.password} onChange={(event) => setForm({ ...form, password: event.target.value })} /></label>
          {errors.password && <p className="text-sm text-rose-600">{errors.password}</p>}
        </div>
        <button className="btn-primary mt-6 w-full" type="submit">Register</button>
        <p className="mt-4 text-center text-sm text-slate-600 dark:text-slate-300">
          Already have an account? <Link className="font-bold text-teal-700 dark:text-teal-300" to="/login">Login</Link>
        </p>
      </form>
    </main>
  )
}

export default Register

```

## src/pages/Wishlist.jsx

```jsx
import { ShoppingCart, Trash2 } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'
import { addToCart } from '../redux/slices/cartSlice'
import { removeFromWishlist } from '../redux/slices/wishlistSlice'
import { EmptyState } from '../components/EmptyState'
import { Rating } from '../components/Rating'

const Wishlist = () => {
  const dispatch = useDispatch()
  const items = useSelector((state) => state.wishlist.items)

  if (!items.length) return <main className="container-shell py-10"><EmptyState title="Your wishlist is empty" message="Save products you love and move them into cart when ready." /></main>

  return (
    <main className="container-shell py-10">
      <h1 className="section-title">Wishlist</h1>
      <div className="mt-6 grid gap-4 md:grid-cols-2">
        {items.map((item) => (
          <article key={item.id} className="grid gap-4 rounded-lg border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900 sm:grid-cols-[120px_1fr]">
            <img className="h-32 w-full object-contain sm:w-32" src={item.image} alt={item.title} />
            <div>
              <p className="line-clamp-2 font-bold text-slate-950 dark:text-white">{item.title}</p>
              <div className="mt-2"><Rating rating={item.rating} /></div>
              <p className="mt-2 text-xl font-black">${item.price.toFixed(2)}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                <button className="btn-primary" onClick={() => { dispatch(addToCart(item)); dispatch(removeFromWishlist(item.id)) }}><ShoppingCart className="h-4 w-4" /> Move to cart</button>
                <button className="btn-secondary" onClick={() => dispatch(removeFromWishlist(item.id))}><Trash2 className="h-4 w-4" /> Remove</button>
              </div>
            </div>
          </article>
        ))}
      </div>
    </main>
  )
}

export default Wishlist

```

## src/redux/slices/authSlice.js

```js
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

```

## src/redux/slices/cartSlice.js

```js
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

```

## src/redux/slices/productSlice.js

```js
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

```

## src/redux/slices/uiSlice.js

```js
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

```

## src/redux/slices/wishlistSlice.js

```js
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

```

## src/redux/store.js

```js
import { configureStore } from '@reduxjs/toolkit'
import productReducer from './slices/productSlice'
import cartReducer from './slices/cartSlice'
import wishlistReducer from './slices/wishlistSlice'
import authReducer from './slices/authSlice'
import uiReducer from './slices/uiSlice'

export const store = configureStore({
  reducer: {
    products: productReducer,
    cart: cartReducer,
    wishlist: wishlistReducer,
    auth: authReducer,
    ui: uiReducer,
  },
})

```

## src/hooks/useCartTotals.js

```js
import { useMemo } from 'react'
import { useSelector } from 'react-redux'
import { calculateDiscount, coupons } from '../utils/coupons'

export const useCartTotals = () => {
  const { items, couponCode } = useSelector((state) => state.cart)

  return useMemo(() => {
    const subtotal = items.reduce((total, item) => total + item.price * item.quantity, 0)
    const discount = calculateDiscount(subtotal, couponCode)
    const shipping = couponCode && coupons[couponCode]?.type === 'shipping' ? 0 : subtotal > 150 || subtotal === 0 ? 0 : 9.99
    const tax = subtotal ? Number(((subtotal - discount) * 0.08).toFixed(2)) : 0
    const total = Number((subtotal - discount + shipping + tax).toFixed(2))

    return {
      subtotal: Number(subtotal.toFixed(2)),
      discount,
      shipping,
      tax,
      total,
      itemCount: items.reduce((total, item) => total + item.quantity, 0),
    }
  }, [items, couponCode])
}

```

## src/hooks/useLiveInventory.js

```js
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

```

## src/routes/ProtectedRoute.jsx

```jsx
import { Navigate, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'

export const ProtectedRoute = ({ children }) => {
  const user = useSelector((state) => state.auth.user)
  const location = useLocation()

  if (!user) return <Navigate to="/login" replace state={{ from: location.pathname }} />
  return children
}

```

## src/services/api.js

```js
import axios from 'axios'

export const api = axios.create({
  baseURL: 'https://fakestoreapi.com',
  timeout: 12000,
})

export const productService = {
  getProducts: async () => {
    const { data } = await api.get('/products')
    return data
  },
  getCategories: async () => {
    const { data } = await api.get('/products/categories')
    return data
  },
}

```

## src/utils/coupons.js

```js
export const coupons = {
  WELCOME10: { label: 'Welcome offer', type: 'percent', value: 10 },
  FLASH20: { label: 'Flash sale boost', type: 'percent', value: 20 },
  FREESHIP: { label: 'Free shipping', type: 'shipping', value: 0 },
}

export const calculateDiscount = (subtotal, couponCode) => {
  const coupon = coupons[couponCode?.toUpperCase()]
  if (!coupon || coupon.type !== 'percent') return 0
  return Number(((subtotal * coupon.value) / 100).toFixed(2))
}

```

## src/utils/inventory.js

```js
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

```

## src/utils/recommendations.js

```js
export const getRecommendations = (products, cartItems = [], wishlistItems = [], limit = 4) => {
  const preferredCategories = new Set([
    ...cartItems.map((item) => item.category),
    ...wishlistItems.map((item) => item.category),
  ])
  const ownedIds = new Set([...cartItems.map((item) => item.id), ...wishlistItems.map((item) => item.id)])

  const scored = products
    .filter((product) => !ownedIds.has(product.id))
    .map((product) => ({
      product,
      score:
        product.rating?.rate * 2 +
        product.rating?.count / 100 +
        (preferredCategories.has(product.category) ? 4 : 0),
    }))
    .sort((a, b) => b.score - a.score)

  return scored.slice(0, limit).map((item) => item.product)
}

```

## src/utils/storage.js

```js
export const loadState = (key, fallback) => {
  try {
    const item = localStorage.getItem(key)
    return item ? JSON.parse(item) : fallback
  } catch {
    return fallback
  }
}

export const saveState = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value))
  } catch {
    // Local storage can be unavailable in private browsing.
  }
}

```

