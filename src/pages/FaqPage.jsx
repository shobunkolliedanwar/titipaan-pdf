import { HelpCircle } from 'lucide-react'

export default function FaqPage() {
    const faqs = [
        {
            question: 'Bagaimana cara membeli PDF?',
            answer:
                'Pilih produk, lakukan pembayaran, lalu link PDF akan tersedia setelah transaksi berhasil.'
        },
        {
            question: 'Apakah PDF bisa diunduh berkali-kali?',
            answer:
                'Ya, selama link masih aktif sesuai kebijakan penjual.'
        },
        {
            question: 'Bagaimana jika mengalami kendala?',
            answer:
                'Hubungi tim dukungan melalui email yang tersedia.'
        }
    ]

    return (
        <div className="bg-slate-50 min-h-screen">
            <section className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-20">
                <div className="max-w-4xl mx-auto px-4 text-center">
                    <HelpCircle size={60} className="mx-auto mb-4" />
                    <h1 className="text-5xl font-bold mb-4">
                        Frequently Asked Questions
                    </h1>
                    <p className="text-xl text-blue-100">
                        Temukan jawaban atas pertanyaan yang sering diajukan.
                    </p>
                </div>
            </section>

            <div className="max-w-4xl mx-auto px-4 py-12">
                <div className="space-y-5">
                    {faqs.map((faq, index) => (
                        <div
                            key={index}
                            className="bg-white rounded-2xl shadow-md border border-slate-100 p-6 hover:shadow-lg transition"
                        >
                            <h2 className="text-lg font-bold text-slate-900">
                                {faq.question}
                            </h2>

                            <p className="text-slate-600 mt-3 leading-relaxed">
                                {faq.answer}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}