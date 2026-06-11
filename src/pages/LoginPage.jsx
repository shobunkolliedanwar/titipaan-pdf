import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { Mail, Lock, Loader } from 'lucide-react'
import toast from 'react-hot-toast'
import useAuthStore from '../store/authStore'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const login = useAuthStore((state) => state.login)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      await login(email, password)
      toast.success('Login berhasil !')
      navigate('/dashboard')
    } catch (error) {
      const message =
        error.response?.data?.error?.message ||
        error.response?.data?.message ||
        'Login gagal. Coba lagi.'

      toast.error(message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-[calc(100vh-64px)] flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center text-white text-2xl mx-auto mb-4">
              <img
                src="/favicon.png"
                alt="Titipaan PDF"
                className="w-8 h-8 rounded-lg object-cover"
              />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Titipaan PDF</h1>
            <p className="text-gray-600">Masuk ke akun Anda</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 text-gray-400" size={20} />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="email@email.com"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 text-gray-400" size={20} />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="••••••••"
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
            >
              {loading && <Loader size={20} className="animate-spin" />}
              <span>{loading ? 'Sedang masuk...' : 'Masuk'}</span>
            </button>
          </form>

          {/* Footer */}
          <div className="mt-6 text-center">
            <p className="text-gray-600">
              Belum punya akun?{' '}
              <Link to="/register" className="text-blue-600 font-semibold hover:text-blue-700">
                Daftar sekarang
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
