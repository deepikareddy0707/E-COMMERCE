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
