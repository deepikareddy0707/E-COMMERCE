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
