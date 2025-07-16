import { useEffect, useState } from "react";

interface Peminjaman {
    id: number;
    anggota: string;
    buku: string;
    tanggalPinjam: string;
    tanggalKembali: string;
    status: "Dipinjam" | "Terlambat";
}

export default function PeminjamanBuku() {
    const [search, setSearch] = useState("");
    const [data, setData] = useState<Peminjaman[]>([]);

    useEffect(() => {
        // Simulasi data awal
        setData([
            { id: 1, anggota: "Faizh Hakim", buku: "Atomic Habits", tanggalPinjam: "01/07/2025", tanggalKembali: "08/07/2025", status: "Dipinjam" },
            { id: 2, anggota: "Andi", buku: "Rich Dad Poor Dad", tanggalPinjam: "28/06/2025", tanggalKembali: "05/07/2025", status: "Terlambat" },
            { id: 3, anggota: "Siti", buku: "Deep Work", tanggalPinjam: "30/06/2025", tanggalKembali: "07/07/2025", status: "Dipinjam" },
        ]);
    }, []);

    const filtered = data.filter((item) =>
        item.anggota.toLowerCase().includes(search.toLowerCase()) ||
        item.buku.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="p-6 space-y-6 font-inter">
            {/* Header */}
            <div className="text-2xl font-bold text-gray-800">📚 Peminjaman Buku</div>

            {/* Statistik Ringkas */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                <Stat label="Total Dipinjam" value="128" color="bg-sky-200" />
                <Stat label="Terlambat" value="7" color="bg-red-300" />
                <Stat label="Total Denda" value="Rp 50.000" color="bg-yellow-200" />
                <Stat label="Pengembalian Hari Ini" value="5" color="bg-lime-200" />
            </div>

            {/* Filter & Tambah */}
            <div className="flex flex-wrap justify-between items-center bg-white/30 p-4 rounded-xl shadow border border-white/20 backdrop-blur gap-2">
                <input
                    type="text"
                    placeholder="🔍 Cari nama / buku..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="px-4 py-2 rounded-lg bg-white/50 text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-300 text-sm w-full sm:w-64"
                />
                <button className="px-4 py-2 bg-slate-700 text-white text-sm rounded-lg hover:bg-slate-800 transition shadow">
                    + Tambah Peminjaman
                </button>
            </div>

            {/* Tabel */}
            <div className="overflow-x-auto bg-white/30 shadow rounded-lg p-4 backdrop-blur-md border border-white/20">
                <table className="w-full table-auto text-sm border-collapse">
                    <thead>
                        <tr className="text-left text-gray-400 uppercase border-b border-gray-200">
                            <th className="px-4 py-2">Anggota</th>
                            <th className="px-4 py-2">Judul Buku</th>
                            <th className="px-4 py-2">Tgl. Pinjam</th>
                            <th className="px-4 py-2">Tgl. Kembali</th>
                            <th className="px-4 py-2">Status</th>
                            <th className="px-4 py-2">Aksi</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 text-gray-700">
                        {filtered.length === 0 ? (
                            <tr>
                                <td colSpan={6} className="text-center py-6 text-slate-400">Tidak ada data.</td>
                            </tr>
                        ) : (
                            filtered.map((item) => (
                                <tr key={item.id}>
                                    <td className="px-4 py-2">{item.anggota}</td>
                                    <td className="px-4 py-2">{item.buku}</td>
                                    <td className="px-4 py-2">{item.tanggalPinjam}</td>
                                    <td className="px-4 py-2">{item.tanggalKembali}</td>
                                    <td className="px-4 py-2">
                                        <span className={`px-3 py-1 rounded-full text-white text-xs font-semibold ${item.status === "Dipinjam" ? "bg-green-500" : "bg-red-400"}`}>
                                            {item.status}
                                        </span>
                                    </td>
                                    <td className="px-4 py-2 space-x-2">
                                        <button className="text-blue-500 hover:underline text-xs">Detail</button>
                                        <button className="text-green-600 hover:underline text-xs">Kembali</button>
                                        <button className="text-red-500 hover:underline text-xs">Hapus</button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

        </div>
    );
}

const Stat = ({ label, value, color }: { label: string, value: string, color: string }) => (
    <div className={`rounded-xl shadow p-4 ${color} backdrop-blur-md bg-opacity-30`}>
        <div className="text-sm text-gray-600">{label}</div>
        <div className="text-xl font-semibold text-gray-800">{value}</div>
    </div>
);



