import { useEffect, useState } from 'react'
import { useSearchParams, Link } from 'react-router-dom'
import { Star, Loader, Search, Filter } from 'lucide-react'
import { motion } from 'framer-motion'
import api from '../lib/api'

export default function ProductsPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [subcategories, setSubcategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState(searchParams.get('search') || '')
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category_id') || '')
  const [selectedSubcategory, setSelectedSubcategory] = useState(searchParams.get('subcategory_id') || '')

  // Fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data } = await api.get('/categories')
        setCategories(data)
      } catch (error) {
        console.error('Error fetching categories:', error)
      }
    }
    fetchCategories()
  }, [])

  // Fetch subcategories when category changes
  useEffect(() => {
    if (selectedCategory) {
      const fetchSubcategories = async () => {
        try {
          const { data } = await api.get(`/categories/${selectedCategory}`)
          setSubcategories(data?.subcategories || [])
        } catch (error) {
          console.error('Error fetching subcategories:', error)
        }
      }
      fetchSubcategories()
    } else {
      setSubcategories([])
    }
  }, [selectedCategory])

  // Fetch products
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true)
      try {
        const params = new URLSearchParams()
        if (searchTerm) params.append('search', searchTerm)
        if (selectedCategory) params.append('category_id', selectedCategory)
        if (selectedSubcategory) params.append('subcategory_id', selectedSubcategory)

        const { data } = await api.get(`/products?${params.toString()}`)
        setProducts(data)
      } catch (error) {
        console.error('Error fetching products:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [searchTerm, selectedCategory, selectedSubcategory])

  const handleSearch = (value) => {
    setSearchTerm(value)
    setSearchParams({
      ...(value && { search: value }),
      ...(selectedCategory && { category_id: selectedCategory }),
      ...(selectedSubcategory && { subcategory_id: selectedSubcategory })
    })
  }

  const handleCategoryChange = (value) => {
    setSelectedCategory(value)
    setSelectedSubcategory('') // Reset subcategory
    setSearchParams({
      ...(searchTerm && { search: searchTerm }),
      ...(value && { category_id: value })
    })
  }

  const handleSubcategoryChange = (value) => {
    setSelectedSubcategory(value)
    setSearchParams({
      ...(searchTerm && { search: searchTerm }),
      ...(selectedCategory && { category_id: selectedCategory }),
      ...(value && { subcategory_id: value })
    })
  }

  const handleReset = () => {
    setSearchTerm('')
    setSelectedCategory('')
    setSelectedSubcategory('')
    setSearchParams({})
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Katalog Produk</h1>
          <p className="text-xl text-gray-600">Temukan PDF berkualitas tinggi sesuai kebutuhan Anda</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar Filters */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white rounded-xl shadow-md p-6 sticky top-24"
            >
              <div className="flex items-center space-x-2 mb-6">
                <Filter size={20} />
                <h2 className="text-lg font-bold text-gray-900">Filter</h2>
              </div>

              {/* Search */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Cari Produk
                </label>
                <div className="relative">
                  <Search className="absolute left-3 top-3 text-gray-400" size={18} />
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => handleSearch(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Cari..."
                  />
                </div>
              </div>

              {/* Category Filter */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Kategori
                </label>
                <select
                  value={selectedCategory}
                  onChange={(e) => handleCategoryChange(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Semua Kategori</option>
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.icon} {cat.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Subcategory Filter */}
              {subcategories.length > 0 && (
                <div className="mb-6">
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    Sub Kategori
                  </label>
                  <select
                    value={selectedSubcategory}
                    onChange={(e) => handleSubcategoryChange(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Semua Sub Kategori</option>
                    {subcategories.map((subcat) => (
                      <option key={subcat.id} value={subcat.id}>
                        {subcat.name}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {/* Reset Button */}
              <button
                onClick={handleReset}
                className="w-full px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition font-semibold"
              >
                Reset Filter
              </button>
            </motion.div>
          </div>

          {/* Products Grid */}
          <div className="lg:col-span-3">
            {loading ? (
              <div className="flex items-center justify-center h-96">
                <Loader className="animate-spin text-blue-600" size={40} />
              </div>
            ) : products.length === 0 ? (
              <div className="bg-white rounded-xl shadow-md p-12 text-center">
                <div className="text-6xl mb-4">📭</div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Produk tidak ditemukan</h3>
                <p className="text-gray-600 mb-6">Coba ubah filter atau cari dengan keyword berbeda</p>
                <button
                  onClick={handleReset}
                  className="btn-primary inline-block"
                >
                  Reset Filter
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {products.map((product, index) => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                  >
                    <Link to={`/products/${product.id}`}>
                      <div className="card group h-full cursor-pointer hover:shadow-xl transition-all">
                        {/* Thumbnail */}
                        <div className="h-48 rounded-lg mb-4 overflow-hidden bg-gray-100">
                          <img
                            src={
                              product.thumbnail_url ||
                              'https://placehold.co/400x600/png?text=PDF'
                            }
                            alt={product.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            onError={(e) => {
                              e.target.src = 'https://placehold.co/400x600/png?text=PDF'
                            }}
                          />
                        </div>

                        {/* Content */}
                        <div className="flex-1 flex flex-col">
                          <div className="mb-3">
                            <span className="inline-block px-3 py-1 bg-blue-100 text-blue-700 text-xs rounded-full font-semibold">
                              {product.category?.name}
                            </span>
                            {product.subcategory && (
                              <span className="ml-2 inline-block px-3 py-1 bg-green-100 text-green-700 text-xs rounded-full font-semibold">
                                {product.subcategory.name}
                              </span>
                            )}
                          </div>

                          <h3 className="font-semibold text-lg text-gray-900 mb-2 group-hover:text-blue-600 transition line-clamp-2">
                            {product.title}
                          </h3>

                          <p className="text-sm text-gray-600 mb-4 line-clamp-2 flex-1">
                            {product.description}
                          </p>

                          {/* Footer */}
                          <div className="flex justify-between items-center pt-4 border-t border-gray-200">
                            <div>
                              <p className="text-xs text-gray-500">Harga</p>
                              <p className="text-2xl font-bold text-blue-600">
                                Rp{product.price?.toLocaleString('id-ID')}
                              </p>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Star size={16} className="text-yellow-400 fill-yellow-400" />
                              <span className="font-semibold text-gray-900">
                                {product.rating || 5}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
