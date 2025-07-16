import { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { masukanhalaman } from "../AdminState/Halaman";
import TableAdmin from "../AdminComponent/Table";

export default function ManajemenAnggota() {
    const TableAnggota = useRef<HTMLDivElement>(null);
    const DetailAnggota = useRef<HTMLDivElement>(null);
    const RiwayatPeminjamanBukuAll = useRef<HTMLDivElement>(null);
    const StatistikAnggota = useRef<HTMLDivElement>(null);
    const DataVisualisasi = useRef<HTMLDivElement>(null);
    const dispatch = useDispatch()

    function editUser(nama:string){
        console.log(nama)
    }

    const adminList = [
  {
    name: "John Doe",
    email: "john.doe@example.com",
    position: "Manager",
    subtitle: "Sales Department",
    status: "ONLINE",
    joinDate: "01/01/2023",
    onEdit: () => editUser("John Doe"),
  },
  {
    name: "Jane Smith",
    email: "jane.smith@example.com",
    position: "Designer",
    subtitle: "Creative Team",
    status: "OFFLINE",
    joinDate: "15/02/2023",
    onEdit: () => alert("Edit Jane"),
  },
  {
    name: "Michael Johnson",
    email: "michael.johnson@example.com",
    position: "Developer",
    subtitle: "Tech Division",
    status: "ONLINE",
    joinDate: "20/03/2023",
    onEdit: () => alert("Edit Michael"),
  },
  {
    name: "Emily Davis",
    email: "emily.davis@example.com",
    position: "Analyst",
    subtitle: "Finance Department",
    status: "OFFLINE",
    joinDate: "05/04/2023",
    onEdit: () => alert("Edit Emily"),
  },
  {
    name: "David Wilson",
    email: "david.wilson@example.com",
    position: "Sales Executive",
    subtitle: "Marketing Team",
    status: "ONLINE",
    joinDate: "18/05/2023",
    onEdit: () => alert("Edit David"),
  },
  {
    name: "Sarah Taylor",
    email: "sarah.taylor@example.com",
    position: "Support Agent",
    subtitle: "Customer Service",
    status: "OFFLINE",
    joinDate: "10/06/2023",
    onEdit: () => alert("Edit Sarah"),
  },
];

    useEffect(()=>{
        dispatch(masukanhalaman("Manajemen Anggota"))
    }, [])

    const anggotaList = [
        { nama: "Adit", email: "adit@email.com", status: "Aktif" },
        { nama: "Bella", email: "bella@email.com", status: "Nonaktif" },
        { nama: "Chandra", email: "chandra@email.com", status: "Aktif" },
        { nama: "Dina", email: "dina@email.com", status: "Nonaktif" },
    ];

    return (
        <div className="min-h-screen bg-white p-6" style={{ fontFamily: "Inter, sans-serif" }}>
            <div className="grid grid-rows-2 gap-6 mx-auto">
                {/* Bagian Tabel dan Detail */}
                <div className="grid grid-cols-[70%_30%] gap-6">
                    {/* Daftar Anggota */}
                    <div
                        ref={TableAnggota}
                        className="bg-white border border-gray-200 rounded-md shadow p-5"
                    >
                        <table className="w-full table-auto border-collapse text-sm">
                    <thead>
                        <tr className="border-b border-gray-200 text-gray-400 text-left uppercase">
                            <th className="px-4 py-3">Nama</th>
                            <th className="px-4 py-3">Buku Dibeli</th>
                            <th className="px-4 py-3">Status</th>
                            <th className="px-4 py-3">Buku Dipinjam</th>
                            <th className="px-4 py-3">Select</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {/* Rows with canvas placeholder for images */}
                        {adminList.map((admin, i) => (
                            <TableAdmin key={i} data={admin} index={i} />
                        ))}
                    </tbody>
                </table>
                    </div>

                    {/* Detail Anggota */}
                    <div
                        ref={DetailAnggota}
                        className="bg-white border border-gray-200 rounded-md shadow p-5"
                    >
                        <h2 className="text-lg font-semibold mb-3">Detail Anggota</h2>
                        <div className="text-sm text-gray-700 space-y-2">
                            <p><strong>Nama:</strong> Bella</p>
                            <p><strong>Email:</strong> bella@email.com</p>
                            <p><strong>Alamat:</strong> Jl. Mawar No. 10</p>
                            <p><strong>Status:</strong> Aktif</p>
                            <p><strong>Bergabung:</strong> Jan 2024</p>
                        </div>
                    </div>
                </div>

                {/* Bagian Riwayat & Statistik */}
                <div className="grid grid-cols-2 gap-6">
                    {/* Riwayat */}
                    <div
                        ref={RiwayatPeminjamanBukuAll}
                        className="bg-white border border-gray-200 rounded-md shadow p-5"
                    >
                        <h2 className="text-lg font-semibold mb-3">Riwayat Peminjaman</h2>
                        <ul className="text-sm list-disc list-inside text-gray-700 space-y-1">
                            <li>"Atomic Habits" - 01 Feb 2024</li>
                            <li>"Rich Dad Poor Dad" - 15 Mar 2024</li>
                            <li>"Sapiens" - 10 Mei 2024</li>
                        </ul>
                    </div>

                    {/* Statistik + Visualisasi */}
                    <div className="grid grid-rows-[35%_65%] gap-6">
                        {/* Statistik */}
                        <div
                            ref={StatistikAnggota}
                            className="bg-white border border-gray-200 rounded-md shadow p-5"
                        >
                            <h2 className="text-lg font-semibold mb-3">Statistik Anggota</h2>
                            <ul className="text-sm text-gray-700 space-y-1">
                                <li>Total Anggota: 123</li>
                                <li>Anggota Aktif: 97</li>
                                <li>Anggota Nonaktif: 26</li>
                            </ul>
                        </div>

                        {/* Visualisasi */}
                        <div
                            ref={DataVisualisasi}
                            className="bg-white border border-gray-200 rounded-md shadow p-5"
                        >
                            <h2 className="text-lg font-semibold mb-3">Visualisasi Data</h2>
                            <p className="text-sm text-gray-700">
                                (Chart Placeholder) Grafik peminjaman akan ditampilkan di sini.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
