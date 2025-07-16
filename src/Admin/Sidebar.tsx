import { Link } from "react-router";




export const Sidebar = () => {

    return (
        <div style={{ fontFamily: "Inter, sans-serif" }}>
        <aside className="fixed top-0 left-0 h-full w-72 bg-gray-50 border-r border-gray-200 shadow-md px-4 font-inter text-sm z-40">
            {/* Header */}
            <div className="flex items-center mt-5">
                <i className="fas fa-table text-xl mr-2 text-gray-700" />
                <span className="font-semibold text-lg text-gray-700">Perpustakaan Faiz</span>
            </div>

            {/* Divider */}
            <hr className="my-4 border-gray-200" />

            {/* Section Title */}
            <h6 className="text-gray-500 uppercase text-xs font-bold mb-3">Account Pages</h6>

            {/* Navigation Items */}
            <nav className="flex flex-col space-y-2">

                {/* Dashboard */}
                 <Link to="/admin">
                    <a className="flex items-center bg-white shadow-sm rounded-lg px-3 py-2 hover:bg-gray-100 transition">
                        <i className="fas fa-home text-gray-600 mr-3"></i>
                        <span className="text-gray-700 font-medium">Dashboard</span>
                    </a>
                </Link>

                {/* Koleksi Buku */}
                <Link to="/admin/koleksibuku">
                    <a href="#" className="flex items-center bg-white shadow-sm rounded-lg px-3 py-2 hover:bg-gray-100 transition">
                        <i className="fas fa-book text-gray-600 mr-3"></i>
                        <span className="text-gray-700 font-medium">Koleksi Buku</span>
                    </a>
                </Link>

                {/* Anggota */}
                 <Link to="/admin/manajemenanggota">
                    <a  className="flex items-center bg-white shadow-sm rounded-lg px-3 py-2 hover:bg-gray-100 transition">
                        <i className="fas fa-users text-gray-600 mr-3"></i>
                        <span className="text-gray-700 font-medium">Manajemen Anggota</span>
                    </a>
                 </Link>

                {/* Peminjaman */}
                <Link to="/admin/peminjamanbuku">
                <a className="flex items-center bg-white shadow-sm rounded-lg px-3 py-2 hover:bg-gray-100 transition">
                    <i className="fas fa-arrow-right text-gray-600 mr-3"></i>
                    <span className="text-gray-700 font-medium">Peminjaman Buku</span>
                </a>
                </Link>

                {/* Pengembalian */}
                <a href="#" className="flex items-center bg-white shadow-sm rounded-lg px-3 py-2 hover:bg-gray-100 transition">
                    <i className="fas fa-arrow-left text-gray-600 mr-3"></i>
                    <span className="text-gray-700 font-medium">Pengembalian Buku</span>
                </a>

                {/* Penjualan Buku */}
                <a href="#" className="flex items-center bg-white shadow-sm rounded-lg px-3 py-2 hover:bg-gray-100 transition">
                    <i className="fas fa-shopping-cart text-gray-600 mr-3"></i>
                    <span className="text-gray-700 font-medium">Penjualan Buku</span>
                </a>

                {/* Transaksi Penjualan */}
                <a href="#" className="flex items-center bg-white shadow-sm rounded-lg px-3 py-2 hover:bg-gray-100 transition">
                    <i className="fas fa-receipt text-gray-600 mr-3"></i>
                    <span className="text-gray-700 font-medium">Transaksi Penjualan</span>
                </a>

                {/* Laporan */}
                <a href="#" className="flex items-center bg-white shadow-sm rounded-lg px-3 py-2 hover:bg-gray-100 transition">
                    <i className="fas fa-chart-bar text-gray-600 mr-3"></i>
                    <span className="text-gray-700 font-medium">Laporan</span>
                </a>

                {/* Notifikasi */}
                <a href="#" className="flex items-center bg-white shadow-sm rounded-lg px-3 py-2 hover:bg-gray-100 transition">
                    <i className="fas fa-bell text-gray-600 mr-3"></i>
                    <span className="text-gray-700 font-medium">Notifikasi</span>
                </a>

                {/* Pengaturan */}
                <a href="#" className="flex items-center bg-white shadow-sm rounded-lg px-3 py-2 hover:bg-gray-100 transition">
                    <i className="fas fa-cog text-gray-600 mr-3"></i>
                    <span className="text-gray-700 font-medium">Pengaturan</span>
                </a>

                {/* Logout */}
                <a href="#" className="flex items-center bg-white shadow-sm rounded-lg px-3 py-2 hover:bg-red-100 transition">
                    <i className="fas fa-sign-out-alt text-red-500 mr-3"></i>
                    <span className="text-red-600 font-medium">Logout</span>
                </a>

            </nav>


            {/* Docs Box */}
            <div className="mt-6 bg-gradient-to-br from-gray-200 to-gray-100 rounded-xl p-4 relative overflow-hidden shadow-inner">
                <div className="text-gray-800 font-semibold text-sm mb-1">Need help?</div>
                <p className="text-gray-500 text-xs mb-3">Please check our docs</p>
                <button className="bg-white text-black text-xs font-bold py-2 px-4 rounded-md shadow hover:bg-gray-200 transition">
                    Documentation
                </button>
            </div>

            {/* Upgrade Button */}
            <div className="mt-6">
                <button className="w-full bg-orange-500 text-white font-bold py-3 rounded-lg hover:bg-orange-600 transition">
                    Upgrade to pro
                </button>
            </div>
        </aside>
        </div>
    );
};
