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
