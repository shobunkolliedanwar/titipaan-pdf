import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Plus, Edit2, Trash2, Search, Loader } from 'lucide-react'
import { motion } from 'framer-motion'
import toast from 'react-hot-toast'
import api from '../lib/api'

export default function AdminProductsPage() {
  const [products, setProducts] = useState([])
  const [subcategories, setSubcategories] = useState([])
  const [saving, setSaving] = useState(false)
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [formData, setFormData] = useState({
    category_id: '',
    subcategory_id: '',
    title: '',
    description: '',
    price: '',
    file_url: '',
    thumbnail_url: ''
  })
  const [editingId, setEditingId] = useState(null)

  // Fetch products and categories
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [prodRes, catRes] = await Promise.all([
          api.get('/products'),
          api.get('/categories')
        ])
        setProducts(prodRes.data)
        setCategories(catRes.data)
      } catch (error) {
        toast.error('Gagal memuat data')
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  const loadSubcategories = async (categoryId) => {
    if (!categoryId) {
      setSubcategories([])
      return
    }

    try {
      const { data } = await api.get(`/categories/${categoryId}`)
      setSubcategories(data.subcategories || [])
    } catch (error) {
      console.error(error)
      setSubcategories([])
    }
  }

  const handleAddProduct = async (e) => {
    e.preventDefault()

    if (!formData.title || !formData.price || !formData.file_url) {
      toast.error('Lengkapi semua field yang diperlukan')
      return
    }

    setSaving(true)

    try {
      if (editingId) {
        await api.put(`/admin/products/${editingId}`, formData)
        toast.success('Produk diperbarui')
      } else {
        const { data } = await api.post('/admin/products', formData)
        setProducts([data, ...products])
        toast.success('Produk ditambahkan')
      }

      setFormData({
        category_id: '',
        subcategory_id: '',
        title: '',
        description: '',
        price: '',
        file_url: ''
      })

      setEditingId(null)
      setShowForm(false)

      const { data } = await api.get('/products')
      setProducts(data)

    } catch (error) {
      toast.error(
        error.response?.data?.message ||
        'Gagal menyimpan produk'
      )
    } finally {
      setSaving(false)
    }
  }

  const handleEditProduct = async (product) => {
    await loadSubcategories(product.category_id)

    setFormData({
      category_id: product.category_id,
      subcategory_id: product.subcategory_id,
      title: product.title,
      description: product.description,
      price: product.price,
      file_url: product.file_url,
      thumbnail_url: product.thumbnail_url || ''
    })

    setEditingId(product.id)
    setShowForm(true)
  }

  const handleDeleteProduct = async (id) => {
    if (!confirm('Apakah Anda yakin ingin menghapus produk ini?')) return

    try {
      await api.delete(`/admin/products/${id}`)
      setProducts(products.filter(p => p.id !== id))
      toast.success('Produk dihapus')
    } catch (error) {
      toast.error('Gagal menghapus produk')
    }
  }

  const filteredProducts = products.filter(p =>
    p.title.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const formatPrice = (value) =>
    new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR'
    }).format(value || 0)

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader className="animate-spin text-blue-600" size={40} />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-12">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Manajemen Produk</h1>
            <p className="text-gray-600">Tambah, edit, atau hapus produk dari katalog</p>
          </div>
          <button
            onClick={() => {
              setShowForm(!showForm)
              if (editingId) setEditingId(null)
              setFormData({
                category_id: '',
                subcategory_id: '',
                title: '',
                description: '',
                price: '',
                file_url: '',
                thumbnail_url: ''
              })
            }}
            className="flex items-center space-x-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-semibold"
          >
            <Plus size={20} />
            <span>{showForm ? 'Batal' : 'Tambah Produk'}</span>
          </button>
        </div>

        {/* Form */}
        {showForm && (
          <motion.form
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            onSubmit={handleAddProduct}
            className="bg-white rounded-xl shadow-lg p-8 mb-8"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              {editingId ? 'Edit Produk' : 'Tambah Produk Baru'}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Category */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Kategori
                </label>

                <select
                  value={formData.category_id}
                  onChange={async (e) => {
                    const categoryId = e.target.value

                    setFormData({
                      ...formData,
                      category_id: categoryId,
                      subcategory_id: ''
                    })

                    await loadSubcategories(categoryId)
                  }}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Pilih Kategori</option>

                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Subkategori
                </label>

                <select
                  value={formData.subcategory_id}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      subcategory_id: e.target.value
                    })
                  }
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Pilih Subkategori</option>

                  {subcategories.map((sub) => (
                    <option key={sub.id} value={sub.id}>
                      {sub.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Price */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Harga
                </label>
                <input
                  type="number"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="50000"
                />
              </div>

              {/* Title */}
              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Judul
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Judul Produk"
                />
              </div>

              {/* Description */}
              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Deskripsi
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 h-32"
                  placeholder="Deskripsi produk..."
                />
              </div>

              {/* File URL */}
              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  URL File PDF
                </label>
                <input
                  type="url"
                  value={formData.file_url}
                  onChange={(e) => setFormData({ ...formData, file_url: e.target.value })}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="https://..."
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  URL Thumbnail
                </label>

                <input
                  type="url"
                  value={formData.thumbnail_url}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      thumbnail_url: e.target.value
                    })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="https://example.com/thumbnail.jpg"
                />
              </div>

              {formData.thumbnail_url && (
                <div className="md:col-span-2">
                  <img
                    src={formData.thumbnail_url}
                    alt="Preview"
                    className="w-48 h-64 object-cover rounded-lg border"
                  />
                </div>
              )}
            </div>

            <div className="flex gap-4 mt-8">
              <button
                type="submit"
                disabled={saving}
                className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-semibold disabled:opacity-50"
              >
                {saving
                  ? 'Menyimpan...'
                  : editingId
                    ? 'Perbarui Produk'
                    : 'Tambah Produk'}
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowForm(false)
                  setEditingId(null)
                }}
                className="flex-1 px-6 py-3 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400 transition font-semibold"
              >
                Batal
              </button>
            </div>
          </motion.form>
        )}

        {/* Search */}
        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-4 top-3 text-gray-400" size={20} />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Cari produk..."
            />
          </div>
        </div>

        {/* Products Table */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-100 border-b-2 border-gray-200">
                  <th className="text-left py-4 px-6 font-semibold text-gray-700">Thumbnail</th>
                  <th className="text-left py-4 px-6 font-semibold text-gray-700">Judul</th>
                  <th className="text-left py-4 px-6 font-semibold text-gray-700">Kategori</th>
                  <th className="text-left py-4 px-6 font-semibold text-gray-700">Sub Kategori</th>
                  <th className="text-right py-4 px-6 font-semibold text-gray-700">Harga</th>
                  <th className="text-center py-4 px-6 font-semibold text-gray-700">Status</th>
                  <th className="text-center py-4 px-6 font-semibold text-gray-700">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {filteredProducts.map((product) => (
                  <tr key={product.id} className="border-b hover:bg-gray-50 transition">
                    <td className="py-4 px-6">
                      <img
                        src={
                          product.thumbnail_url ||
                          'https://placehold.co/100x140'
                        }
                        alt={product.title}
                        className="w-16 h-20 object-cover rounded-lg border"
                      />
                    </td>
                    <td className="py-4 px-6 text-gray-900 font-semibold">
                      {product.title.substring(0, 40)}...
                    </td>
                    <td className="py-4 px-6 text-gray-600">
                      {product.category?.name}
                    </td>
                    <td className="py-4 px-6 text-gray-600">
                      {product.subcategory?.name}
                    </td>
                    <td className="py-4 px-6 text-right text-gray-900 font-semibold">
                      {formatPrice(product.price)}
                    </td>
                    <td className="py-4 px-6 text-center">
                      <span className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${product.is_active
                        ? 'bg-green-100 text-green-700'
                        : 'bg-red-100 text-red-700'
                        }`}>
                        {product.is_active ? 'Aktif' : 'Nonaktif'}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-center">
                      <div className="flex items-center justify-center space-x-3">
                        <button
                          onClick={() => handleEditProduct(product)}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition"
                          title="Edit"
                        >
                          <Edit2 size={18} />
                        </button>
                        <button
                          onClick={() => handleDeleteProduct(product.id)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition"
                          title="Hapus"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredProducts.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-600 text-lg">Tidak ada produk ditemukan</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
