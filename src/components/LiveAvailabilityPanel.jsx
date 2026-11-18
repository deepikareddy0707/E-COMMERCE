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
