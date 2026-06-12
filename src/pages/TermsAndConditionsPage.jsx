import { FileText } from 'lucide-react'

export default function TermsAndConditionsPage() {
    return (
        <div className="bg-slate-50 min-h-screen">
            <section className="bg-gradient-to-r from-violet-600 to-purple-600 text-white py-20">
                <div className="max-w-4xl mx-auto text-center px-4">
                    <FileText size={60} className="mx-auto mb-4" />

                    <h1 className="text-5xl font-bold mb-4">
                        Syarat & Ketentuan
                    </h1>

                    <p className="text-xl text-violet-100">
                        Aturan penggunaan platform Titipaan PDF.
                    </p>
                </div>
            </section>

            <div className="max-w-4xl mx-auto px-4 py-12">
                <div className="bg-white rounded-3xl shadow-lg border border-slate-100 p-8">
                    <div className="space-y-6">
                        <div className="p-5 bg-slate-50 rounded-xl border">
                            <h2 className="font-bold text-slate-900 mb-2">
                                Penggunaan Platform
                            </h2>

                            <p className="text-slate-600">
                                Dengan menggunakan layanan ini, pengguna
                                dianggap telah membaca dan menyetujui seluruh
                                syarat yang berlaku.
                            </p>
                        </div>

                        <div className="p-5 bg-slate-50 rounded-xl border">
                            <h2 className="font-bold text-slate-900 mb-2">
                                Hak Cipta
                            </h2>

                            <p className="text-slate-600">
                                Pengguna dilarang mendistribusikan ulang file
                                PDF tanpa izin pemilik hak cipta.
                            </p>
                        </div>

                        <div className="p-5 bg-slate-50 rounded-xl border">
                            <h2 className="font-bold text-slate-900 mb-2">
                                Akun Pengguna
                            </h2>

                            <p className="text-slate-600">
                                Pengguna bertanggung jawab menjaga keamanan
                                akun dan kata sandinya.
                            </p>
                        </div>

                        <div className="p-5 bg-slate-50 rounded-xl border">
                            <h2 className="font-bold text-slate-900 mb-2">
                                Perubahan Ketentuan
                            </h2>

                            <p className="text-slate-600">
                                Titipaan PDF berhak mengubah syarat dan
                                ketentuan sewaktu-waktu sesuai kebutuhan.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}