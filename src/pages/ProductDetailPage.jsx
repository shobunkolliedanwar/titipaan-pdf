import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Star, Download, ShoppingCart, ArrowLeft, Loader } from 'lucide-react'
import { motion } from 'framer-motion'
import toast from 'react-hot-toast'
import api from '../lib/api'
import useAuthStore from '../store/authStore'

export default function ProductDetailPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [purchasing, setPurchasing] = useState(false)
  const { token } = useAuthStore()

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data } = await api.get(`/products/${id}`)
        setProduct(data)
      } catch (error) {
        toast.error('Produk tidak ditemukan')
        navigate('/products')
      } finally {
        setLoading(false)
      }
    }

    fetchProduct()
  }, [id])

  // const handleBuy = async () => {
  //   console.log("🔥 HANDLE BUY TRIGGERED")
  //   if (!token) {
  //     toast.error('Silakan login terlebih dahulu')
  //     navigate('/login')
  //     return
  //   }

  //   setPurchasing(true)

  //   try {
  //     const { data } = await api.post('/payments/create', {
  //       product_id: product.id,
  //       quantity: 1
  //     })

  //     console.log("SNAP TOKEN:", data.snap_token)
  //     console.log("SNAP OBJECT:", window.snap)

  //     // In a real app, you would redirect to payment gateway here
  //     // For now, simulate payment
  //     toast.success('Membuka halaman pembayaran...')

  //     // Simulate payment completion
  //     // setTimeout(async () => {
  //     //   try {
  //     //     await api.post('/payments/verify', {
  //     //       order_id: data.order_id
  //     //     })
  //     //     toast.success('Pembayaran berhasil! PDF siap diunduh.')
  //     //     navigate('/dashboard')
  //     //   } catch (error) {
  //     //     toast.error('Gagal memverifikasi pembayaran')
  //     //   }
  //     // }, 2000)
  //     window.snap.pay(data.snap_token, {
  //       onSuccess: function (result) {
  //         toast.success('Pembayaran berhasil')
  //         navigate('/dashboard')
  //       },

  //       onPending: function (result) {
  //         toast('Menunggu pembayaran')
  //       },

  //       onError: function (result) {
  //         toast.error('Pembayaran gagal')
  //       },

  //       onClose: function () {
  //         toast('Pembayaran dibatalkan')
  //       }
  //     })

  //   } catch (error) {
  //     toast.error(error.response?.data?.message || 'Gagal membuat transaksi')
  //   } finally {
  //     setPurchasing(false)
  //   }
  // }

  const handleBuy = async () => {
    if (!token) {
      toast.error('Silakan login terlebih dahulu')
      navigate('/login')
      return
    }

    setPurchasing(true)

    try {
      await api.post('/payments/create', {
        product_id: product.id,
        quantity: 1
      })

      toast.success('Pembelian berhasil!')

      setTimeout(() => {
        navigate('/dashboard')
      }, 1500)

    } catch (error) {
      toast.error(
        error.response?.data?.error?.message ||
        error.response?.data?.message ||
        'Gagal membuat transaksi'
      )
    } finally {
      setPurchasing(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader className="animate-spin text-blue-600" size={40} />
      </div>
    )
  }

  if (!product) return null

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <button
          onClick={() => navigate('/products')}
          className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 font-semibold mb-8"
        >
          <ArrowLeft size={20} />
          <span>Kembali ke Produk</span>
        </button>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Product Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="md:col-span-1"
          >
            <div className="rounded-xl overflow-hidden shadow-xl bg-white">
              <img
                src={
                  product.thumbnail_url ||
                  'https://placehold.co/600x900/png?text=PDF'
                }
                alt={product.title}
                className="w-full h-96 object-cover"
                onError={(e) => {
                  e.target.src =
                    'https://placehold.co/600x900/png?text=PDF'
                }}
              />
            </div>
          </motion.div>

          {/* Product Details */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:col-span-2"
          >
            <div className="bg-white rounded-xl shadow-lg p-8">
              {/* Badges */}
              <div className="flex flex-wrap gap-2 mb-6">
                <span className="px-4 py-2 bg-blue-100 text-blue-700 rounded-full font-semibold text-sm">
                  {product.category?.name}
                </span>
                {product.subcategory && (
                  <span className="px-4 py-2 bg-green-100 text-green-700 rounded-full font-semibold text-sm">
                    {product.subcategory.name}
                  </span>
                )}
              </div>

              {/* Title */}
              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                {product.title}
              </h1>

              {/* Rating */}
              <div className="flex items-center space-x-4 mb-6">
                <div className="flex items-center space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={20}
                      className={`${i < Math.floor(product.rating || 5)
                        ? 'text-yellow-400 fill-yellow-400'
                        : 'text-gray-300'
                        }`}
                    />
                  ))}
                </div>
                <span className="text-lg font-semibold text-gray-900">
                  {product.rating || 5}/5
                </span>
                <span className="text-gray-600">
                  ({product.download_count || 0} diunduh)
                </span>
              </div>

              {/* Description */}
              <div className="mb-8">
                <h2 className="text-lg font-semibold text-gray-900 mb-3">
                  Deskripsi
                </h2>
                <p className="text-gray-600 leading-relaxed whitespace-pre-wrap">
                  {product.description}
                </p>
              </div>

              {/* Features */}
              <div className="mb-8 p-4 bg-gray-50 rounded-lg">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">
                  Fitur Produk
                </h2>
                <ul className="space-y-2">
                  <li className="flex items-center space-x-3">
                    <span className="text-green-600">✓</span>
                    <span className="text-gray-700">Akses selamanya</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <span className="text-green-600">✓</span>
                    <span className="text-gray-700">Unduh kapan saja</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <span className="text-green-600">✓</span>
                    <span className="text-gray-700">Tidak ada batasan download</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <span className="text-green-600">✓</span>
                    <span className="text-gray-700">Materi berkualitas tinggi</span>
                  </li>
                </ul>
              </div>

              {/* Price & Action */}
              <div className="border-t pt-8">
                <div className="mb-6">
                  <p className="text-sm text-gray-600 mb-2">Harga</p>
                  <p className="text-5xl font-bold text-blue-600 mb-2">
                    Rp{product.price?.toLocaleString('id-ID')}
                  </p>
                  <p className="text-sm text-gray-500">
                    Pembayaran sekali, akses selamanya
                  </p>
                </div>

                <button
                  onClick={() => {
                    console.log("BUTTON CLICKED")
                    handleBuy()
                  }}
                  disabled={purchasing}
                  className="w-full bg-blue-600 text-white py-4 rounded-lg font-semibold text-lg hover:bg-blue-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                >
                  {purchasing ? (
                    <>
                      <Loader size={24} className="animate-spin" />
                      <span>Memproses...</span>
                    </>
                  ) : (
                    <>
                      <ShoppingCart size={24} />
                      <span>Beli Sekarang</span>
                    </>
                  )}
                </button>

                {!token && (
                  <p className="text-center text-gray-600 mt-4 text-sm">
                    <span className="text-blue-600 font-semibold">Login terlebih dahulu</span> untuk membeli produk
                  </p>
                )}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Related Products Section */}
        <div className="mt-20">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Produk Terkait</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((item) => (
              <div key={item} className="card h-64 bg-gray-200 animate-pulse"></div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
