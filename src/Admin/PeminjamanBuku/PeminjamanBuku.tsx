import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { masukanhalaman } from "../AdminState/Halaman";
import { useQuery } from "@tanstack/react-query";
import { UnreadyFall } from "../AdminComponent/Unready.fallback";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faReceipt, faCommentDots } from "@fortawesome/free-solid-svg-icons";

export default function PeminjamanBuku() {
    const dispatch = useDispatch();
    const [shortSearch, setShortSearch] = useState("Semua");

    function setDicari(dicari: string) {
        console.log("lewatdicari nih", dicari);
        setShortSearch(dicari);
    }

    useEffect(() => {
        dispatch(masukanhalaman("Peminjaman Buku"));
    }, [dispatch]);

    return (
        <div className="p-6 space-y-6 font-inter">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4">
                <div
                    onClick={() => setDicari("Semua")}
                    className="cursor-pointer rounded-2xl p-5 bg-gradient-to-br from-sky-400 to-sky-600
                            shadow-xl backdrop-blur-md border border-white/20 
                            transition-all duration-300 ease-in-out hover:scale-[1.03] hover:shadow-2xl"
                    style={{ fontFamily: "'Inter', sans-serif" }}
                >
                    <div className="text-sm text-white/80 tracking-wide">Total</div>
                    <div className="text-3xl font-bold text-white drop-shadow-sm mt-1">128</div>
                </div>

                {/* Masa Peminjaman */}
                <div
                    onClick={() => setDicari("Masa_peminjaman")}
                    className="cursor-pointer rounded-2xl p-5 bg-gradient-to-br from-teal-400 to-teal-600
                            shadow-xl backdrop-blur-md border border-white/20 
                            transition-all duration-300 ease-in-out hover:scale-[1.03] hover:shadow-2xl"
                    style={{ fontFamily: "'Inter', sans-serif" }}
                >
                    <div className="text-sm text-white/80 tracking-wide">Masa peminjaman</div>
                    <div className="text-3xl font-bold text-white drop-shadow-sm mt-1">24</div>
                </div>

                {/* Dikembalikan */}
                <div
                    onClick={() => setDicari("Dikembalikan")}
                    className="cursor-pointer rounded-2xl p-5 bg-gradient-to-br from-green-400 to-green-600
                            shadow-xl backdrop-blur-md border border-white/20 
                            transition-all duration-300 ease-in-out hover:scale-[1.03] hover:shadow-2xl"
                    style={{ fontFamily: "'Inter', sans-serif" }}
                >
                    <div className="text-sm text-white/80 tracking-wide">Dikembalikan</div>
                    <div className="text-3xl font-bold text-white drop-shadow-sm mt-1">7</div>
                </div>

                {/* Belum Dikembalikan */}
                <div
                    onClick={() => setDicari("Belum_Dikembalikan")}
                    className="cursor-pointer rounded-2xl p-5 bg-gradient-to-br from-red-400 to-red-600
                            shadow-xl backdrop-blur-md border border-white/20 
                            transition-all duration-300 ease-in-out hover:scale-[1.03] hover:shadow-2xl"
                    style={{ fontFamily: "'Inter', sans-serif" }}
                >
                    <div className="text-sm text-white/80 tracking-wide">Belum Dikembalikan</div>
                    <div className="text-3xl font-bold text-white drop-shadow-sm mt-1">17</div>
                </div>

                {/* Pengembalian Hari Ini */}
                <div
                    onClick={() => setDicari("Dikembalikan_Hari_Ini")}
                    className="cursor-pointer rounded-2xl p-5 bg-gradient-to-br from-indigo-400 to-indigo-600
                            shadow-xl backdrop-blur-md border border-white/20 
                            transition-all duration-300 ease-in-out hover:scale-[1.03] hover:shadow-2xl"
                    style={{ fontFamily: "'Inter', sans-serif" }}
                >
                    <div className="text-sm text-white/80 tracking-wide">Pengembalian Hari Ini</div>
                    <div className="text-3xl font-bold text-white drop-shadow-sm mt-1">5</div>
                </div>


            </div>

            <div className="min-h-[35rem] max-h-[35rem] items-center text-center justify-center overflow-y-auto"
            style={{
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
            }}>
                <BukuDicariPeminjaman Dicari={shortSearch}/>
            </div>
        </div>
    );
}

interface PropsBukuDicari{
    Dicari: string;
}

const BukuDicariPeminjaman = ({ Dicari }: PropsBukuDicari) => {
    const [disableQuery, setDisableQuery] = useState(false);
    const BukuDicariDiv = useRef<HTMLDivElement | null>(null);
    
    let nyari;

    console.log(Dicari, "Nih si issue")

    if(Dicari == null){
        nyari == "Semua"
    } else {
        nyari == Dicari
    }

    const { isPending, error, data } = useQuery({
        queryKey: ["AmbilDataPeminjaman", Dicari],
        queryFn: () =>
            fetch("http://192.168.1.4:8080/admin", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    tujuan: "AmbilDataPeminjaman",
                    searchuntuk: `${Dicari}`
            
                }),
            }).then((res) => {
                if (!res.ok) {
                    throw new Error("Network response was not ok");
                }
                return res.json();
            }),
        refetchInterval: 1000,
        enabled: !disableQuery, 
    });

    if (isPending) return "Loading...";
    if (error) return "An error has occurred: " + error.message;
    if (data.Hasil == null) return <UnreadyFall type="custom" Message={"User Ini Belum Memmiliki riwayat peminjaman"}/>;

    console.log(data.Hasil)

    return (
        <>
        <div
            ref={BukuDicariDiv}
            onMouseLeave={() => {
                console.log("mousenya keluar");
                setDisableQuery(false)
            }}
            id="ElemenPencarian"
            style={{
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
            }}
        >
           <div className="flex flex-wrap justify-between items-center bg-white/30 backdrop-blur-md p-4 rounded-2xl shadow-lg border border-white/20 gap-3 transition-all"
           style={{
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
            }}>
                <input
                    type="text"
                    placeholder="🔍 Cari nama / buku..."
                    className="flex-1 sm:flex-none px-4 py-2 rounded-xl bg-white/60 text-slate-700 placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-slate-400 focus:bg-white/80 transition w-full sm:w-64 shadow-inner"
                    style={{ fontFamily: "Inter, sans-serif" }}
                    onChange={(e) => {
                        const nilai = e.target.value.toLowerCase();
                        const BukuPeminjaman = document.querySelectorAll(".Buku_Peminjaman");

                        if (BukuPeminjaman.length > 0) {
                            BukuPeminjaman.forEach((buku:any) => {
                            const nama_dataset = buku.getAttribute("data-nama")?.toLowerCase() || "";
                            const penulis_dataset = buku.getAttribute("data-penulis")?.toLowerCase() || "";

                            // Tampilkan jika nama atau penulis mengandung nilai input
                            if (nama_dataset.includes(nilai) || penulis_dataset.includes(nilai)) {
                                buku.style.display = ""; // tampilkan
                            } else {
                                buku.style.display = "none"; // sembunyikan
                            }
                            });
                        }
                        }}


                />
                <button
                    className="px-5 py-2 bg-slate-800 text-white text-sm rounded-xl hover:bg-slate-900 active:scale-[0.98] transition-all shadow-md"
                    style={{ fontFamily: "Inter, sans-serif" }}
                >
                    ＋ Tambah Peminjaman
                </button>
            </div>


            {/* Tabel */}
            <div className="overflow-x-auto bg-white/30 shadow rounded-lg p-4 backdrop-blur-md border border-white/20"
            style={{
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
            }}>
            </div>
            
            <div 
            onMouseEnter={() => {
                console.log("Dientar cuks");
                setDisableQuery(true)
            }} className="min-h-[28rem] max-h-[28rem] space-y-6 overflow-y-auto mt-5"
            style={{
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
            }}>
                {data.Hasil.map((nilai:any, _:number) => (
                   <div
                    data-nama={nilai.Judul}
                    data-penulis={nilai.Penulis}
                    data-isbn={nilai.ISBN}
                    className="Buku_Peminjaman grid grid-cols-[10%_35%_35%_20%] gap-3 items-center px-5 py-4 
                                bg-white/30 backdrop-blur-xl shadow-xl rounded-2xl border 
                                border-white/20 hover:shadow-2xl transition-all duration-300 
                                hover:scale-[1.01]"
                    >
                {/* Kolom Nomor */}
                <div className="flex items-center justify-center">
                    <span className="text-2xl text-slate-600 font-bold" style={{ fontFamily: "Inter, sans-serif" }}>
                    {nilai.nomor}
                    </span>
                </div>

                {/* Kolom Gambar dan Informasi Buku */}
                <div className="grid grid-cols-[25%_75%] items-start text-sm text-slate-700 font-medium" style={{ fontFamily: "Inter, sans-serif" }}>
                    <div className="flex justify-start">
                    <img src={nilai.Gambar} alt="Cover Buku" className="h-24 w-16 rounded-lg object-cover shadow-md border border-slate-200" />
                    </div>
                    <div className="flex flex-col gap-1 justify-start items-start">
                    <span className="text-base font-semibold text-slate-800 leading-snug">{nilai.Judul}</span>
                    <span className="text-sm text-sky-600">{nilai.Kategori}</span>
                    <span className="text-xs text-slate-500">Kode: {nilai.Kode}</span>
                    <span className="text-xs text-slate-500">Jenis: {nilai.Jenis}</span>
                    </div>
                </div>

                {/* Kolom Detail Buku */}
                <div className="text-sm text-slate-600">
                    <div className="flex flex-col items-start justify-start gap-1">
                    <span className="text-base font-semibold text-slate-800">{nilai.Penulis}</span>
                    <span>{nilai.Penerbit}</span>
                    <span className="text-xs text-slate-500">Tahun: {nilai.Tahun}</span>
                    <span className="text-xs text-slate-500">ISBN: {nilai.ISBN}</span>
                    </div>
                </div>

                {/* Kolom Status */}
                <div className={`grid grid-cols-${
                        nilai.Status === "Dikembalikan Hari Ini"
                        ? "2" : nilai.Status === "Belum Dikembalikan"
                        ? "2": "1"
                    }`}>
                    <div className="flex flex-col items-center justify-center gap-2" 
                        style={{
                        scrollbarWidth: 'none',
                        msOverflowStyle: 'none',
                        }}>
                        <span
                            className={`text-white text-xs font-semibold px-4 py-1 rounded-full shadow-sm select-none transition-all duration-300 ${
                            nilai.Status === "dipinjam"
                                ? "bg-gradient-to-r from-lime-400 to-teal-500"
                                : nilai.Status === "Belum Dikembalikan"
                                ? "bg-gradient-to-r from-yellow-400 to-orange-500"
                                : nilai.Status === "Dikembalikan"
                                ? "bg-gradient-to-r from-sky-400 to-blue-500"
                                : nilai.Status === "Dikembalikan Hari Ini"
                                ? "bg-gradient-to-r from-red-400 to-pink-500"
                                : "bg-gradient-to-r from-gray-300 to-gray-400"
                            }`}
                        >
                        {nilai.Status}
                        </span>
                        <span className="text-[10px] text-slate-400 italic">Status Peminjaman</span>
                    </div>
                        {(nilai.Status === "Dikembalikan Hari Ini" || nilai.Status === "Belum Dikembalikan") && (
                        <div className="flex items-center gap-4 mt-4 ml-8">
                            {/* Tombol Sanksi */}
                            {nilai.Status === "Belum Dikembalikan" && (
                            <div
                            className="group relative"
                            title="Berikan sanksi"
                            >
                                <div className="p-3 bg-gradient-to-r from-red-600 to-rose-800 text-white rounded-full shadow-lg hover:scale-110 hover:shadow-red-300 transition-all duration-300 ease-in-out cursor-pointer">
                                    <FontAwesomeIcon icon={faReceipt} size="lg" />
                                </div>
                                {/* Tooltip */}
                                <div className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 bg-black text-white text-xs rounded-md px-2 py-1 transition-opacity duration-200 z-10 pointer-events-none">
                                    Berikan sanksi
                                </div>
                            </div>
                            )}

                            {/* Tombol Hubungi */}
                            <div
                            className="group relative"
                            title="Hubungi peminjam"
                            >
                            <div className="p-3 bg-green-100 text-green-800 rounded-full shadow-lg hover:scale-110 hover:shadow-green-300 transition-all duration-300 ease-in-out cursor-pointer">
                                <FontAwesomeIcon icon={faCommentDots} size="lg" />
                            </div>
                            {/* Tooltip */}
                            <div className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 bg-black text-white text-xs rounded-md px-2 py-1 transition-opacity duration-200 z-10 pointer-events-none">
                                Hubungi peminjam
                            </div>
                            </div>
                        </div>
                        )}
                    </div>
                </div>
                ))}
            </div>
            </div>
        </>
    );
};
