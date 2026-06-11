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
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-50 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8 rounded-3xl bg-gradient-to-r from-blue-600 to-indigo-600 p-8 text-white shadow-xl">
          <p className="text-blue-100 text-sm font-medium">
            Dashboard
          </p>

          <h1 className="text-3xl md:text-4xl font-bold mt-2">
            Halo, {profile?.full_name || user?.full_name} 👋
          </h1>

          <div className="mt-5 flex flex-wrap gap-3">
            <div className="bg-white/10 backdrop-blur px-4 py-2 rounded-xl">
              📚 {purchases.length} Koleksi
            </div>

            <div className="bg-white/10 backdrop-blur px-4 py-2 rounded-xl">
              💎 Member Aktif
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-1"
          >
            <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-6 sticky top-24">
              <div className="text-center">
                <div className="w-24 h-24 mx-auto rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white text-4xl shadow-lg">
                  👤
                </div>

                <h2 className="mt-4 text-xl font-bold text-slate-900">
                  {profile?.full_name}
                </h2>

                <p className="text-sm text-slate-500 break-all mt-1">
                  {profile?.email}
                </p>
              </div>

              <div className="my-8 border-t border-slate-100" />

              <div className="space-y-5">
                <div className="flex justify-between">
                  <span className="text-slate-500">Status</span>
                  <span className="font-semibold text-green-600">
                    Aktif
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-slate-500">Bergabung</span>
                  <span className="font-semibold text-slate-900">
                    {new Date(profile?.created_at).toLocaleDateString('id-ID')}
                  </span>
                </div>
              </div>

              <div className="mt-8 space-y-3">
                <Link
                  to="/products"
                  className="block w-full text-center py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold hover:shadow-lg transition-all"
                >
                  + Belanja Lagi
                </Link>

                <button
                  onClick={handleLogout}
                  className="w-full py-3 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-50 transition"
                >
                  Logout
                </button>
              </div>
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
              {[
                {
                  title: 'Total Pembelian',
                  value: purchases.length,
                  icon: '🛍️'
                },
                {
                  title: 'Total Pengeluaran',
                  value: `Rp${purchases
                    .reduce((sum, p) => sum + (p.product?.price || 0), 0)
                    .toLocaleString('id-ID')}`,
                  icon: '💰'
                },
                {
                  title: 'Koleksi PDF',
                  value: purchases.length,
                  icon: '📚'
                }
              ].map((item) => (
                <div
                  key={item.title}
                  className="bg-white rounded-3xl border border-slate-100 shadow-sm p-6 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-sm text-slate-500">{item.title}</p>
                      <h3 className="mt-2 text-3xl font-bold text-slate-900">
                        {item.value}
                      </h3>
                    </div>

                    <div className="w-14 h-14 rounded-2xl bg-slate-100 flex items-center justify-center text-2xl">
                      {item.icon}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Purchases List */}
            <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-8">
              <div className="flex items-center space-x-3 mb-8">
                <FolderOpen size={28} className="text-blue-600" />
                <h2 className="text-2xl font-bold text-gray-900">PDF Saya</h2>
              </div>

              {purchases.length === 0 ? (
                <div className="text-center py-24">
                  <div className="text-8xl mb-6">📚</div>

                  <h3 className="text-3xl font-bold text-slate-900">
                    Koleksi Anda Masih Kosong
                  </h3>

                  <p className="text-slate-500 mt-4 max-w-lg mx-auto">
                    Temukan PDF premium yang membantu pekerjaan,
                    pembelajaran, dan produktivitas Anda.
                  </p>

                  <Link
                    to="/products"
                    className="
      inline-flex
      items-center
      mt-8
      px-6
      py-3
      rounded-xl
      bg-blue-600
      text-white
      font-semibold
      hover:bg-blue-700
      transition
    "
                  >
                    Jelajahi Produk
                  </Link>
                </div>
              ) : (
                <div className="grid md:grid-cols-2 gap-5">
                  {purchases.map((purchase, index) => (
                    <motion.div
                      key={purchase.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className=" bg-white border border-slate-100 rounded-2xl p-5 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                    >
                      <div className="space-y-4">
                        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white text-2xl">
                          📄
                        </div>

                        <div>
                          <h3 className="font-bold text-slate-900 line-clamp-2">
                            {purchase.product?.title}
                          </h3>

                          <p className="text-sm text-slate-500 mt-1">
                            {purchase.product?.category?.name}
                          </p>
                        </div>

                        <div className="flex justify-between text-sm">
                          <span className="text-slate-500">
                            {new Date(purchase.created_at).toLocaleDateString('id-ID')}
                          </span>

                          <span className="font-semibold text-green-600">
                            ✓ Dibayar
                          </span>
                        </div>

                        <div className="flex items-center justify-between pt-3 border-t">
                          <span className="text-xl font-bold text-blue-600">
                            Rp{purchase.product?.price?.toLocaleString('id-ID')}
                          </span>

                          <button
                            onClick={() => {
                              toast.success('Membuka file...')
                            }}
                            className="
      px-4
      py-2
      rounded-xl
      bg-blue-600
      text-white
      hover:bg-blue-700
      transition
      flex
      items-center
      gap-2
      "
                          >
                            <Download size={16} />
                            Unduh
                          </button>
                        </div>
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
