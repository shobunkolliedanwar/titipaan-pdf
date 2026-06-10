import { Link } from 'react-router-dom'
import { Facebook, Twitter, Instagram, Mail, Phone, MapPin } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div>
            <div className="flex items-center space-x-2 font-bold text-white mb-4">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                📚
              </div>
              <span>Titipaan PDF</span>
            </div>
            <p className="text-sm">Platform jual beli link PDF berbayar untuk CPNS, BUMN, PPPK dan kategori lainnya.</p>
          </div>

          {/* Links */}
          <div>
            <h3 className="font-semibold text-white mb-4">Navigasi</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/" className="hover:text-blue-400 transition">Beranda</Link></li>
              <li><Link to="/products" className="hover:text-blue-400 transition">Produk</Link></li>
              <li><Link to="/dashboard" className="hover:text-blue-400 transition">Dashboard</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="font-semibold text-white mb-4">Dukungan</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-blue-400 transition">FAQ</a></li>
              <li><a href="#" className="hover:text-blue-400 transition">Kebijakan Privasi</a></li>
              <li><a href="#" className="hover:text-blue-400 transition">Syarat & Ketentuan</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-white mb-4">Hubungi Kami</h3>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center space-x-2">
                <Mail size={16} />
                <span>info@titipaanpdf.id</span>
              </li>
              <li className="flex items-center space-x-2">
                <Phone size={16} />
                <span>+62 812 3456 7890</span>
              </li>
              <li className="flex items-center space-x-2">
                <MapPin size={16} />
                <span>Jakarta, Indonesia</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Social & Copyright */}
        <div className="border-t border-gray-700 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-center md:text-left">
              &copy; 2026 Titipaan PDF. Semua hak dilindungi.
            </p>
            <div className="flex space-x-4 mt-4 md:mt-0">
              <a href="#" className="hover:text-blue-400 transition"><Facebook size={20} /></a>
              <a href="#" className="hover:text-blue-400 transition"><Twitter size={20} /></a>
              <a href="#" className="hover:text-blue-400 transition"><Instagram size={20} /></a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
