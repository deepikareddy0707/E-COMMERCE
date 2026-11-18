import { Star } from 'lucide-react'

export const Rating = ({ rating }) => (
  <div className="flex items-center gap-1 text-sm text-slate-600 dark:text-slate-300">
    <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
    <span className="font-semibold text-slate-900 dark:text-white">{rating?.rate ?? '4.5'}</span>
    <span>({rating?.count ?? 0})</span>
  </div>
)
