import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import useAuthStore from './store/authStore'

// Pages
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import ProductsPage from './pages/ProductsPage'
import ProductDetailPage from './pages/ProductDetailPage'
import DashboardPage from './pages/DashboardPage'
import AdminDashboardPage from './pages/AdminDashboardPage'
import AdminProductsPage from './pages/AdminProductsPage'

function ProtectedRoute({ children }) {
  const { token } = useAuthStore()
  return token ? children : <Navigate to="/login" replace />
}

function AdminRoute({ children }) {
  const { token, user } = useAuthStore()
  return token && user?.role === 'admin' ? children : <Navigate to="/" replace />
}

export default function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-gradient-to-b from-slate-50 to-white">
        <Navbar />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/products/:id" element={<ProductDetailPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />

            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <DashboardPage />
                </ProtectedRoute>
              }
            />

            <Route
              path="/admin"
              element={
                <AdminRoute>
                  <AdminDashboardPage />
                </AdminRoute>
              }
            />

            <Route
              path="/admin/products"
              element={
                <AdminRoute>
                  <AdminProductsPage />
                </AdminRoute>
              }
            />
          </Routes>
        </main>
        <Footer />
      </div>
      <Toaster
        position="top-center"
        toastOptions={{
          duration: 3000,
          style: {
            borderRadius: '20px',
            background: '#111827',
            color: '#fff',
            padding: '16px 24px',
            boxShadow:
              '0 20px 50px rgba(0,0,0,0.25)',
          },
          success: {
            iconTheme: {
              primary: '#10B981',
              secondary: '#fff',
            },
          },
        }}
      />
    </Router>
  )
}
