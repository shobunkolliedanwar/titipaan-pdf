import { ShieldCheck } from 'lucide-react'

export default function PrivacyPolicyPage() {
    return (
        <div className="bg-slate-50 min-h-screen">
            <section className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white py-20">
                <div className="max-w-4xl mx-auto text-center px-4">
                    <ShieldCheck size={60} className="mx-auto mb-4" />

                    <h1 className="text-5xl font-bold mb-4">
                        Kebijakan Privasi
                    </h1>

                    <p className="text-xl text-emerald-100">
                        Komitmen kami dalam melindungi data dan privasi pengguna.
                    </p>
                </div>
            </section>

            <div className="max-w-4xl mx-auto px-4 py-12">
                <div className="bg-white rounded-3xl shadow-lg border border-slate-100 p-8">
                    <div className="space-y-6 text-slate-700 leading-relaxed">
                        <p>
                            Titipaan PDF menghargai privasi setiap pengguna dan
                            berkomitmen menjaga keamanan data pribadi yang diberikan.
                        </p>

                        <p>
                            Kami dapat mengumpulkan informasi seperti nama,
                            email, dan riwayat transaksi untuk menyediakan
                            layanan yang optimal.
                        </p>

                        <p>
                            Data pengguna tidak akan dijual atau dibagikan
                            kepada pihak ketiga tanpa persetujuan pengguna,
                            kecuali diwajibkan oleh hukum.
                        </p>

                        <p>
                            Kami menerapkan langkah-langkah keamanan yang
                            wajar untuk melindungi informasi pengguna dari
                            akses yang tidak sah.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}