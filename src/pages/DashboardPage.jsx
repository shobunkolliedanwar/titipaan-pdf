import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Download, User, Clock, FolderOpen, Star, LogOut, Loader } from 'lucide-react'
import { motion } from 'framer-motion'
import toast from 'react-hot-toast'
import api from '../lib/api'
import useAuthStore from '../store/authStore'

export default function DashboardPage() {
  const [purchases, setPurchases] = useState([])
  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(true)
  const { logout, user } = useAuthStore()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [profileRes, purchasesRes] = await Promise.all([
          api.get('/users/profile'),
          api.get('/users/purchases')
        ])
        setProfile(profileRes.data)
        setPurchases(purchasesRes.data)
      } catch (error) {
        toast.error('Gagal memuat data')
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  const handleLogout = () => {
    logout()
    toast.success('Logout berhasil')
  }

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
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Dashboard</h1>
            <p className="text-gray-600">Kelola akun dan unduh produk Anda</p>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center space-x-2 px-6 py-3 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition font-semibold"
          >
            <LogOut size={20} />
            <span>Logout</span>
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-1"
          >
            <div className="bg-white rounded-xl shadow-lg p-6 sticky top-24">
              {/* Profile */}
              <div className="text-center mb-8">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-400 to-indigo-600 rounded-full flex items-center justify-center text-white text-3xl mx-auto mb-4">
                  👤
                </div>
                <h2 className="text-xl font-bold text-gray-900 mb-1">
                  {profile?.full_name}
                </h2>
                <p className="text-gray-600 break-all text-sm">{profile?.email}</p>
              </div>

              <div className="border-t pt-6 space-y-4">
                <div>
                  <p className="text-xs text-gray-500 uppercase font-semibold">Status</p>
                  <p className="text-lg font-bold text-green-600 mt-1">Aktif</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 uppercase font-semibold">Bergabung</p>
                  <p className="text-lg font-bold text-gray-900 mt-1">
                    {new Date(profile?.created_at).toLocaleDateString('id-ID')}
                  </p>
                </div>
              </div>

              <Link
                to="/products"
                className="w-full mt-6 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-semibold text-center"
              >
                + Belanja Lagi
              </Link>
            </div>
          </motion.div>

          {/* Main Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="lg:col-span-3"
          >
            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-white rounded-xl shadow-md p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600 text-sm font-semibold mb-2">Total Pembelian</p>
                    <p className="text-3xl font-bold text-gray-900">{purchases.length}</p>
                  </div>
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 text-xl">
                    🛍️
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-md p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600 text-sm font-semibold mb-2">Total Pengeluaran</p>
                    <p className="text-3xl font-bold text-gray-900">
                      Rp{purchases.reduce((sum, p) => sum + (p.product?.price || 0), 0).toLocaleString('id-ID')}
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center text-green-600 text-xl">
                    💰
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-md p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600 text-sm font-semibold mb-2">Koleksi</p>
                    <p className="text-3xl font-bold text-gray-900">{purchases.length}</p>
                  </div>
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center text-purple-600 text-xl">
                    📚
                  </div>
                </div>
              </div>
            </div>

            {/* Purchases List */}
            <div className="bg-white rounded-xl shadow-lg p-8">
              <div className="flex items-center space-x-3 mb-8">
                <FolderOpen size={28} className="text-blue-600" />
                <h2 className="text-2xl font-bold text-gray-900">PDF Saya</h2>
              </div>

              {purchases.length === 0 ? (
                <div className="text-center py-12">
                  <div className="text-6xl mb-4">📭</div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Belum ada pembelian</h3>
                  <p className="text-gray-600 mb-6">Mulai belanja sekarang untuk mengakses PDF berkualitas</p>
                  <Link
                    to="/products"
                    className="btn-primary inline-block"
                  >
                    Jelajahi Produk
                  </Link>
                </div>
              ) : (
                <div className="space-y-4">
                  {purchases.map((purchase, index) => (
                    <motion.div
                      key={purchase.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition"
                    >
                      <div className="flex items-center space-x-4 flex-1">
                        <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-indigo-600 rounded-lg flex items-center justify-center text-white text-xl">
                          📄
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900">
                            {purchase.product?.title}
                          </h3>
                          <div className="flex items-center space-x-4 text-sm text-gray-600 mt-1">
                            <span className="flex items-center space-x-1">
                              <User size={14} />
                              <span>{purchase.product?.category?.name}</span>
                            </span>
                            <span className="flex items-center space-x-1">
                              <Clock size={14} />
                              <span>{new Date(purchase.created_at).toLocaleDateString('id-ID')}</span>
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center space-x-4">
                        <div className="text-right">
                          <p className="text-lg font-bold text-blue-600">
                            Rp{purchase.product?.price?.toLocaleString('id-ID')}
                          </p>
                          <p className="text-xs text-gray-500">✓ Dibayar</p>
                        </div>
                        <button
                          onClick={() => {
                            // In production, this would open the PDF or redirect to download
                            toast.success('Membuka file...')
                          }}
                          className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                        >
                          <Download size={18} />
                          <span>Unduh</span>
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
