import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  ArrowRight,
  BookOpen,
  Users,
  Zap,
  TrendingUp,
  Star,
  ShieldCheck,
  FileText,
  Download
} from 'lucide-react'
import { motion } from 'framer-motion'
import api from '../lib/api'

export default function HomePage() {
  const [categories, setCategories] = useState([])
  const [featuredProducts, setFeaturedProducts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [catRes, prodRes] = await Promise.all([
          api.get('/categories'),
          api.get('/products?limit=6')
        ])
        setCategories(catRes.data || [])
        setFeaturedProducts(prodRes.data || [])
      } catch (error) {
        console.error('Error fetching data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  const features = [
    {
      icon: <BookOpen className="w-8 h-8" />,
      title: "Koleksi Lengkap",
      description: "Ribuan PDF berkualitas untuk berbagai kategori ujian"
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Download Instan",
      description: "Akses file PDF langsung setelah pembayaran"
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Komunitas Aktif",
      description: "Bergabung dengan ribuan pengguna yang sudah sukses"
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: "Materi Terbaru",
      description: "Konten selalu diperbarui mengikuti soal-soal terkini"
    }
  ]

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-blue-500 to-indigo-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center"
          >
            <div>
              <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
                Platform Jual Beli Link PDF Berbayar
              </h1>
              <p className="text-xl mb-8 text-blue-100">
                Akses ribuan materi berkualitas untuk CPNS, BUMN, PPPK dan lainnya. Siap mengubah masa depan karir Anda!
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/products"
                  className="btn-primary inline-flex items-center justify-center space-x-2"
                >
                  <span>Mulai Belanja</span>
                  <ArrowRight size={20} />
                </Link>
                <Link
                  to="/register"
                  className="px-6 py-3 bg-white text-blue-600 rounded-lg font-semibold hover:bg-blue-50 transition-all duration-300 shadow-md inline-flex items-center justify-center"
                >
                  Daftar Sekarang
                </Link>
              </div>
            </div>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent rounded-3xl blur-2xl"></div>
              <div className="relative bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-8">
                <div className="space-y-5">
                  <div className="group bg-white/15 backdrop-blur-xl border border-white/20 rounded-2xl p-5 hover:bg-white/20 transition-all duration-300">
                    <div className="flex items-start gap-4">
                      <div className="p-3 rounded-xl bg-white/20">
                        <BookOpen className="w-6 h-6 text-white" />
                      </div>

                      <div>
                        <h3 className="font-bold text-white text-lg">
                          Materi Premium
                        </h3>

                        <p className="text-white/80 mt-1 leading-relaxed">
                          Ribuan PDF CPNS, PPPK, BUMN, dan Sekolah Kedinasan yang siap digunakan.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="group bg-white/15 backdrop-blur-xl border border-white/20 rounded-2xl p-5 hover:bg-white/20 transition-all duration-300">
                    <div className="flex items-start gap-4">
                      <div className="p-3 rounded-xl bg-white/20">
                        <Zap className="w-6 h-6 text-yellow-300" />
                      </div>

                      <div>
                        <h3 className="font-bold text-white text-lg">
                          Download Instan
                        </h3>

                        <p className="text-white/80 mt-1 leading-relaxed">
                          Link PDF otomatis tersedia setelah pembayaran berhasil.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="group bg-white/15 backdrop-blur-xl border border-white/20 rounded-2xl p-5 hover:bg-white/20 transition-all duration-300">
                    <div className="flex items-start gap-4">
                      <div className="p-3 rounded-xl bg-white/20">
                        <ShieldCheck className="w-6 h-6 text-green-300" />
                      </div>

                      <div>
                        <h3 className="font-bold text-white text-lg">
                          Pembayaran Aman
                        </h3>

                        <p className="text-white/80 mt-1 leading-relaxed">
                          Transaksi terlindungi dan diproses secara otomatis.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Mengapa Pilih Titipaan PDF ?</h2>
            <p className="text-xl text-gray-600">Platform terpercaya dengan jutaan pengguna aktif</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="card text-center hover:shadow-xl"
              >
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 text-blue-600">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3 text-gray-900">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      {categories.length > 0 && (
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Kategori Populer</h2>
              <p className="text-xl text-gray-600">Temukan materi untuk kategori ujian pilihan Anda</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
              {categories.slice(0, 5).map((category, index) => (
                <Link
                  key={category.id}
                  to={`/products?category_id=${category.id}`}
                >
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className="card text-center cursor-pointer hover:scale-105 h-full"
                  >
                    <div className="text-4xl mb-3">{category.icon || '📚'}</div>
                    <h3 className="font-semibold text-gray-900">{category.name}</h3>
                    <p className="text-sm text-gray-600 mt-2">{category.description}</p>
                  </motion.div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Featured Products Section */}
      {featuredProducts.length > 0 && (
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center mb-16">
              <div>
                <h2 className="text-4xl font-bold text-gray-900 mb-2">Produk Unggulan</h2>
                <p className="text-xl text-gray-600">PDF berkualitas tinggi pilihan terbaik kami</p>
              </div>
              <Link to="/products" className="text-blue-600 font-semibold hover:text-blue-700 inline-flex items-center space-x-2">
                <span>Lihat Semua</span>
                <ArrowRight size={20} />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredProducts.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Link to={`/products/${product.id}`}>
                    <div className="card group cursor-pointer h-full flex flex-col hover:shadow-xl">
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
                      <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition">
                        {product.title}
                      </h3>
                      <p className="text-sm text-gray-600 mb-4 flex-1">{product.description?.substring(0, 100)}...</p>
                      <div className="flex justify-between items-center pt-4 border-t">
                        <span className="text-2xl font-bold text-blue-600">
                          Rp{product.price?.toLocaleString('id-ID')}
                        </span>
                        <div className="flex items-center space-x-1">
                          <Star size={16} className="text-yellow-400 fill-yellow-400" />
                          <span className="text-sm text-gray-600">{product.rating || 5}</span>
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6">Siap Raih Kesuksesan?</h2>
          <p className="text-xl mb-8 text-blue-100">
            Jangan lewatkan kesempatan untuk meningkatkan persiapan Anda dengan materi-materi terbaik dari Titipaan PDF.
          </p>
          <Link
            to="/register"
            className="inline-flex items-center justify-center space-x-2 px-8 py-4 bg-white text-blue-600 rounded-lg font-semibold hover:bg-blue-50 transition-all duration-300 shadow-lg"
          >
            <span>Mulai Sekarang</span>
            <ArrowRight size={20} />
          </Link>
        </div>
      </section>
    </div>
  )
}
