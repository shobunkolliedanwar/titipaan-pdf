import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Users, Package, TrendingUp, DollarSign, Loader, ArrowRight } from 'lucide-react'
import { motion } from 'framer-motion'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts'
import toast from 'react-hot-toast'
import api from '../lib/api'

export default function AdminDashboardPage() {
  const [stats, setStats] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const { data } = await api.get('/admin/dashboard/stats')
        setStats(data)
      } catch (error) {
        toast.error('Gagal memuat statistik')
      } finally {
        setLoading(false)
      }
    }

    fetchStats()
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader className="animate-spin text-blue-600" size={40} />
      </div>
    )
  }

  // Sample chart data
  const chartData = [
    { name: 'Jan', revenue: 40000, users: 10 },
    { name: 'Feb', revenue: 60000, users: 25 },
    { name: 'Mar', revenue: 45000, users: 18 },
    { name: 'Apr', revenue: 80000, users: 35 },
    { name: 'May', revenue: 70000, users: 28 },
    { name: 'Jun', revenue: 100000, users: 45 }
  ]

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Admin Dashboard</h1>
          <p className="text-gray-600">Kelola produk, pengguna, dan transaksi</p>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Total Users */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl shadow-md p-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-semibold mb-2">Total Pengguna</p>
                <p className="text-4xl font-bold text-gray-900">{stats?.totalUsers || 0}</p>
              </div>
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center text-2xl">
                👥
              </div>
            </div>
          </motion.div>

          {/* Total Products */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-xl shadow-md p-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-semibold mb-2">Total Produk</p>
                <p className="text-4xl font-bold text-gray-900">{stats?.totalProducts || 0}</p>
              </div>
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center text-2xl">
                📦
              </div>
            </div>
          </motion.div>

          {/* Total Revenue */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-xl shadow-md p-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-semibold mb-2">Total Pendapatan</p>
                <p className="text-3xl font-bold text-gray-900">
                  Rp{(stats?.totalRevenue || 0).toLocaleString('id-ID')}
                </p>
              </div>
              <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center text-2xl">
                💰
              </div>
            </div>
          </motion.div>

          {/* Total Transactions */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-xl shadow-md p-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-semibold mb-2">Transaksi Sukses</p>
                <p className="text-4xl font-bold text-gray-900">
                  {stats?.recentTransactions?.length || 0}
                </p>
              </div>
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center text-2xl">
                ✓
              </div>
            </div>
          </motion.div>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Revenue Chart */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl shadow-lg p-6"
          >
            <h2 className="text-xl font-bold text-gray-900 mb-6">Pendapatan Bulanan</h2>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="revenue" stroke="#3b82f6" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Users Chart */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-xl shadow-lg p-6"
          >
            <h2 className="text-xl font-bold text-gray-900 mb-6">Pengguna Baru Bulanan</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="users" fill="#10b981" />
              </BarChart>
            </ResponsiveContainer>
          </motion.div>
        </div>

        {/* Management Buttons */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl shadow-lg p-8 text-white"
          >
            <Package size={32} className="mb-4" />
            <h3 className="text-2xl font-bold mb-3">Manajemen Produk</h3>
            <p className="text-blue-100 mb-6">
              Tambah, edit, atau hapus produk dari katalog Anda
            </p>
            <Link
              to="/admin/products"
              className="inline-flex items-center space-x-2 px-6 py-3 bg-white text-blue-600 rounded-lg hover:bg-blue-50 transition font-semibold"
            >
              <span>Kelola Produk</span>
              <ArrowRight size={20} />
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
            className="bg-gradient-to-br from-green-600 to-emerald-600 rounded-xl shadow-lg p-8 text-white"
          >
            <TrendingUp size={32} className="mb-4" />
            <h3 className="text-2xl font-bold mb-3">Laporan Penjualan</h3>
            <p className="text-green-100 mb-6">
              Lihat detail transaksi dan analisis penjualan
            </p>
            <button className="inline-flex items-center space-x-2 px-6 py-3 bg-white text-green-600 rounded-lg hover:bg-green-50 transition font-semibold">
              <span>Lihat Laporan</span>
              <ArrowRight size={20} />
            </button>
          </motion.div>
        </div>

        {/* Recent Transactions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl shadow-lg p-8"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Transaksi Terbaru</h2>
          
          {stats?.recentTransactions?.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-600">Belum ada transaksi</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b-2 border-gray-200">
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Order ID</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Pengguna</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Produk</th>
                    <th className="text-right py-3 px-4 font-semibold text-gray-700">Jumlah</th>
                    <th className="text-center py-3 px-4 font-semibold text-gray-700">Status</th>
                    <th className="text-right py-3 px-4 font-semibold text-gray-700">Tanggal</th>
                  </tr>
                </thead>
                <tbody>
                  {stats?.recentTransactions?.map((transaction) => (
                    <tr key={transaction.id} className="border-b hover:bg-gray-50 transition">
                      <td className="py-3 px-4 text-gray-900 font-semibold">
                        {transaction.id.substring(0, 8)}...
                      </td>
                      <td className="py-3 px-4 text-gray-900">
                        {transaction.user?.email}
                      </td>
                      <td className="py-3 px-4 text-gray-600">
                        {transaction.product?.title?.substring(0, 30)}...
                      </td>
                      <td className="py-3 px-4 text-right text-gray-900 font-semibold">
                        Rp{transaction.amount?.toLocaleString('id-ID')}
                      </td>
                      <td className="py-3 px-4 text-center">
                        <span className="inline-block px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-semibold">
                          Berhasil
                        </span>
                      </td>
                      <td className="py-3 px-4 text-right text-gray-600">
                        {new Date(transaction.created_at).toLocaleDateString('id-ID')}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  )
}
