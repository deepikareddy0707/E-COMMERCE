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
