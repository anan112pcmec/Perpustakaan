import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { masukanhalaman } from "./AdminState/Halaman";

export default function DashboardAdmin() {
     const dispatch = useDispatch();

     useEffect(() => {
        dispatch(masukanhalaman("Admin / Dashboard"))
    }, []);

    function getTodayFormattedDate(): string {
        const today = new Date();

        const day = String(today.getDate()).padStart(2, '0');
        const month = String(today.getMonth() + 1).padStart(2, '0'); // bulan mulai dari 0
        const year = today.getFullYear();

        return `${day}/${month}/${year}`;
    }
    
    return (
        <main className="pt-2 px-6 pb-10 bg-gray-50 min-h-screen" style={{ fontFamily: "Inter, sans-serif" }}>

            <h1 className="text-2xl font-bold text-gray-800 mb-6 mt-2">{getTodayFormattedDate()}</h1>

            {/* STATISTIK UTAMA */}
            <div className="grid grid-cols-2">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <StatCard title="Total Buku" value="3.200" icon="fa-book" />
                <StatCard title="Total Anggota" value="850" icon="fa-users" />
                <StatCard title="Buku Dipinjam" value="145" icon="fa-exchange-alt" />
                <StatCard title="Buku Terlambat" value="12" icon="fa-clock" />
                <StatCard title="Total Penjualan" value="Rp 57.300.000" icon="fa-money-bill-wave" />
                <StatCard title="Buku Terjual" value="920" icon="fa-box" />
                <StatCard title="Pengunjung Hari Ini" value="76" icon="fa-user-clock" />
                </div>
                <div>
                    <Review/>
                </div>
            </div>

            {/* BAGIAN LANJUTAN */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-10">
                {/* Chart atau Grafik Penjualan */}
                <div className="bg-white rounded-xl shadow p-4">
                    <h2 className="text-lg font-semibold mb-4">Statistik Penjualan Buku</h2>
                    <div className="h-60 flex items-center justify-center text-gray-400">[Grafik Placeholder]</div>
                </div>

                {/* Aktivitas Terakhir */}
                <div className="bg-white rounded-xl shadow p-4">
                    <h2 className="text-lg font-semibold mb-4">Aktivitas Terbaru</h2>
                    <ul className="space-y-3 text-sm text-gray-600">
                        <li>📗 Buku <strong>Atomic Habits</strong> dipinjam oleh <strong>Andi</strong></li>
                        <li>🛒 <strong>UI/UX Essentials</strong> terjual seharga <strong>Rp 120.000</strong></li>
                        <li>📙 Buku <strong>Deep Work</strong> dikembalikan tepat waktu</li>
                        <li>👤 Pengguna baru <strong>Siti Maesaroh</strong> terdaftar</li>
                    </ul>
                </div>
            </div>
        </main>
    );
}

function StatCard({ title, value, icon }: { title: string, value: string, icon: string }) {
    return (
        <div className="bg-white rounded-xl shadow-md p-5 flex items-center space-x-4 hover:shadow-lg transition">
            <div className="w-12 h-12 flex items-center justify-center rounded-full bg-blue-100 text-blue-600 text-xl">
                <i className={`fas ${icon}`}></i>
            </div>
            <div>
                <div className="text-sm text-gray-500">{title}</div>
                <div className="text-xl font-semibold text-gray-800">{value}</div>
            </div>
        </div>
    );
}

function Review() {
    return(
    <div className=" ml-5 w-full bg-white rounded-xl shadow p-6 w-full space-y-4">
            <h2 className="text-lg font-semibold text-gray-800">Reviews</h2>

            {/* Positive Reviews */}
            <div className="flex items-center justify-between text-sm font-medium text-gray-700">
                <span>Positive Reviews</span>
                <span>80%</span>
            </div>
            <div className="w-full h-1.5 bg-gray-200 rounded">
                <div className="h-full bg-orange-500 rounded" style={{ width: "80%" }}></div>
            </div>

            {/* Neutral Reviews */}
            <div className="flex items-center justify-between text-sm font-medium text-gray-700 mt-4">
                <span>Neutral Reviews</span>
                <span>17%</span>
            </div>
            <div className="w-full h-1.5 bg-gray-200 rounded">
                <div className="h-full bg-orange-400 rounded" style={{ width: "17%" }}></div>
            </div>

            {/* Negative Reviews */}
            <div className="flex items-center justify-between text-sm font-medium text-gray-700 mt-4">
                <span>Negative Reviews</span>
                <span>3%</span>
            </div>
            <div className="w-full h-1.5 bg-gray-200 rounded">
                <div className="h-full bg-orange-300 rounded" style={{ width: "3%" }}></div>
            </div>

            {/* Deskripsi */}
            <p className="text-sm text-gray-500 mt-6">
                More than <span className="font-bold text-gray-700">1,500,000</span> developers used Creative Tim's products and over <span className="font-bold text-gray-700">700,000</span> projects were created.
            </p>

            {/* Tombol */}
            <div className="mt-4 flex justify-end">
                <button className="bg-black text-white text-sm font-semibold px-5 py-2 rounded-lg hover:bg-gray-900 shadow">
                    View all reviews
                </button>
            </div>
        </div>
    )
}


