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
