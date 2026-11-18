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
