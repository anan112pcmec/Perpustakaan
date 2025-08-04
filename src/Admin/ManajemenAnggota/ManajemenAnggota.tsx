import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { masukanhalaman } from "../AdminState/Halaman";
import { Bounce, toast, ToastContainer } from "react-toastify";
import { Swiper, SwiperSlide } from "swiper/react";
import { useQuery } from "@tanstack/react-query";
import { setAlamat, setBergabung, setBukuBelumdikembalikan, setBukudikembalikan, setEmail, setKreditSkor, setNama, setStatus, UserInspect } from "./UserInspectState";
import { VerticalTimeline, VerticalTimelineElement } from "react-vertical-timeline-component";
import 'react-vertical-timeline-component/style.min.css';
import { FaBook } from "react-icons/fa"; 
import { UnreadyFall } from "../AdminComponent/Unready.fallback";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBook } from "@fortawesome/free-solid-svg-icons";



export default function ManajemenAnggota() {
    const TableAnggota = useRef<HTMLDivElement>(null);
    const DetailAnggota = useRef<HTMLDivElement>(null);
    const RiwayatPeminjamanBukuAll = useRef<HTMLDivElement>(null);
    const StatistikAnggota = useRef<HTMLDivElement>(null);
    const DataVisualisasi = useRef<HTMLDivElement>(null);
    const dispatch = useDispatch()
    const [initialize, setinitialize] = useState(0);
    function Inisialisasi() {
        setinitialize((prev:number) => prev + 1);
    }
    const [ToastMessage, setMessage] = useState("");

    const Nama = useSelector((state:any) => state.userinspect.Nama);
    const Email = useSelector((state:any) => state.userinspect.Email);
    const Alamat = useSelector((state:any) => state.userinspect.Alamat);
    const Bergabung = useSelector((state:any) => state.userinspect.Bergabung);
    const Status = useSelector((state:any) => state.userinspect.Status);
    const KreditSkor = useSelector((state:any) => state.userinspect.KreditSkor);
    const Dikembalikan = useSelector((state:any) => state.userinspect.BukuDikembalikan);
    const BelumDikembalikan = useSelector((state:any) => state.userinspect.BukuBelumDikembalikan);

    console.log("namanyoo", Nama);

    useEffect(()=>{
        console.log("nama_berubah");
    }, [Nama])

    useEffect(()=>{
        dispatch(masukanhalaman("Manajemen Anggota"));
        Inisialisasi()
    }, [])

    useEffect(()=>{
        if(ToastMessage == ""){

        } else{
        toast(`${ToastMessage}`, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Bounce,
            progressClassName: "custom-progress"
            });
        }
    }, [ToastMessage])



    return (
        <div className="min-h-screen bg-white p-6" style={{ fontFamily: "Inter, sans-serif" }}>
            <ToastContainer/>
            <div className="grid grid-rows-2 gap-6 mx-auto">
                {/* Bagian Tabel dan Detail */}
                <div className="grid grid-cols-[70%_28%] gap-6">
                    {/* Daftar Anggota */}
                    <div
                        ref={TableAnggota}
                        className="bg-white border border-gray-200 rounded-md shadow p-5 max-h-[40-rem] min-h-[40rem]"
                    >
                        <table className="w-full table-auto border-collapse text-sm">
                            <thead>
                                <tr className="border-b border-gray-200 text-gray-400 text-left uppercase">
                                    <th className="px-4 py-3">Nama</th>
                                    <th className="px-4 py-3">Alamat</th>
                                    <th className="px-4 py-3">Status</th>
                                    <th className="px-4 py-3">bergabung</th>
                                    <th className="px-4 py-3">Aktivitas</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100 h-full">
                                {/* Rows with canvas placeholder for images */}
                                <TableUser initialize={initialize}/>
                            </tbody>
                        </table>
                    </div>

                    {/* Detail Anggota */}

                    <div
                    ref={DetailAnggota}
                    className="bg-white border border-gray-200 rounded-md shadow p-5"
                    >
                    <Swiper className="mySwiper">
                        <SwiperSlide>
                            <DetailedAnggota Nama={Nama} Email={Email} Alamat={Alamat} Bergabung={Bergabung} KreditSkor={KreditSkor} Status={Status} />
                        </SwiperSlide>
                        <SwiperSlide>

                        </SwiperSlide>
                    </Swiper>
                   </div>
                
                </div>

                {/* Bagian Riwayat & Statistik */}
                <div className="grid grid-cols-2 gap-6">
                    {/* Riwayat */}
                    <div
                        ref={RiwayatPeminjamanBukuAll}
                        className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm relative"
                    >

                        <div className="grid grid-cols-[40%_57%] mb-3 space-x-6 items-center">
                            <div>
                                <h2
                                className="text-2xl font-bold mb-4 text-neutral-800"
                                style={{ fontFamily: "Inter, sans-serif" }}
                                >
                                Riwayat Peminjaman Buku
                                </h2>
                                <p className="text-xs text-gray-500 max-w-sm">
                                Lihat riwayat peminjaman buku yang pernah {Nama} lakukan. Pantau status dengan mudah dan cepat.
                                </p>
                            </div>
                            <div className="flex space-x-6 justify-end">
                                <div className="flex space-x-6 justify-end">
                                   <div className="relative group flex items-center justify-center bg-gradient-to-r from-green-400 to-teal-500 rounded-3xl w-24 h-24 shadow-lg cursor-pointer hover:scale-110 transition-transform duration-300">
                                    <div className="flex items-center gap-2">
                                        <FontAwesomeIcon icon={faBook} className="text-white text-3xl" />
                                        <span className="text-white text-2xl font-semibold">{Dikembalikan}</span> {/* Ganti '3' dengan angka dinamis jika perlu */}
                                    </div>

                                    {/* Toast */}
                                    <div className="pointer-events-none absolute bottom-full mb-2 hidden w-max rounded-md bg-gray-800 px-3 py-1 text-sm text-white opacity-0 transition-opacity duration-300 group-hover:block group-hover:opacity-100">
                                        Dikembalikan
                                    </div>
                                    </div>

                                    <div className="relative group flex items-center justify-center bg-gradient-to-r from-pink-400 to-rose-700 rounded-3xl w-24 h-24 shadow-lg cursor-pointer hover:scale-110 transition-transform duration-300">
                                    <div className="flex items-center gap-2">
                                        <FontAwesomeIcon icon={faBook} className="text-white text-3xl" />
                                        <span className="text-white text-2xl font-semibold">{BelumDikembalikan}</span> {/* Ganti 7 dengan nilai dinamis jika diperlukan */}
                                    </div>

                                    {/* Toast */}
                                    <div className="pointer-events-none absolute bottom-full mb-2 hidden w-max rounded-md bg-gray-800 px-3 py-1 text-sm text-white opacity-0 transition-opacity duration-300 group-hover:block group-hover:opacity-100">
                                        Belum Dikembalikan
                                    </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    <RiwayatPeminjamanTimeline nama={Nama} email={Email} />  
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

type TableUserProps = {
  initialize: number;
};

const TableUser = ({initialize}:TableUserProps) => {
    const dispatch = useDispatch();
    const { isPending, error, data } = useQuery({
    queryKey: ["AmbilDataUserAdmin", String(initialize)],
    queryFn: () =>
        fetch("http://localhost:8080/admin", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            tujuan: "AmbilDataUserAdmin",
        }),
        }).then((res) => {
        if (!res.ok) {
            throw new Error("Network response was not ok");
        }
        return res.json();
        }),
    refetchInterval: 20000,
    });

    if (isPending) return "Loading...";
    if (error) return "An error has occurred: " + error.message;
    return (
        <>
            {data.Hasil.map((data:any, _:any) => (
                <tr key={data.id} className="border-b border-gray-100">
                    {/* Kolom: Profil dan Nama */}
                    <td className="px-4 py-4 flex gap-4 text-gray-800 font-semibold">
                    <canvas
                        width={36}
                        height={36}
                        className="rounded-full bg-gray-300"
                        style={{ display: "inline-block" }}
                        aria-label="Placeholder for author profile image"
                    />
                    <div className="flex flex-col text-sm font-normal text-gray-500">
                        <span className="font-semibold text-gray-900">{data.nama}</span>
                        <span>{data.email}</span>
                    </div>
                    </td>

                    {/* Kolom: Favorit dan Alamat */}
                    <td className="px-4 py-4 text-gray-700 font-semibold">
                    <div>{data.alamat}</div>
                    </td>

                    {/* Kolom: Status */}
                    <td className="px-4 py-4">
                    <span
                        className={`text-white text-xs font-bold px-3 py-1 rounded-full cursor-default select-none ${
                        data.status === "Aktif" ? "bg-lime-400" : "bg-gray-400"
                        }`}
                    >
                        {data.status}
                    </span>
                    </td>

                    {/* Kolom: Tanggal Bergabung */}
                    <td className="px-4 py-4 text-gray-700 font-normal text-sm">
                    {data.bergabung}
                    </td>

                    {/* Kolom: Aksi */}
                   <td
                    className="px-4 py-4 text-gray-700 font-semibold cursor-pointer select-none hover:text-blue-600"
                    onClick={() => {
                        dispatch(setNama(data.nama));
                        dispatch(setEmail(data.email));
                        dispatch(setAlamat(data.alamat));
                        dispatch(setBergabung(data.bergabung));
                        dispatch(setStatus(data.status));
                        dispatch(setKreditSkor(data.kreditskor));
                    }}
                    >
                    Inspect
                    </td>

                </tr>
            ))}
        </>
    );
};

type DetailUser = {
  Nama: string;
  Email: string;
  Alamat: string;
  Status: string;
  Bergabung: string;
  KreditSkor: string;
};

const DetailedAnggota = ({
  Nama,
  Email,
  Alamat,
  Status,
  Bergabung,
  KreditSkor,
}: DetailUser) => {
  return (
    <div className="bg-white border border-gray-100 rounded-2xl shadow-md p-6 w-full h-full transition-shadow duration-300 hover:shadow-lg">
        <h2 className="text-3xl font-semibold text-gray-800 mb-4 border-b pb-2">
            Detail Anggota
        </h2>

        <div className="text-sm text-gray-700 space-y-5">
            <div className="flex gap-4">
            <span className="font-medium w-24">Nama</span>
            <span className="text-gray-600">{Nama}</span>
            </div>
            <div className="flex gap-4">
            <span className="font-medium w-24">Email</span>
            <span className="text-gray-600">{Email}</span>
            </div>
            <div className="flex gap-4">
            <span className="font-medium w-24">Kredit Skor</span>
            <span className="text-gray-600">{KreditSkor}</span>
            </div>
            <div className="flex gap-4">
            <span className="font-medium w-24">Alamat</span>
            <span className="text-gray-600">{Alamat}</span>
            </div>
            <div className="flex gap-4">
            <span className="font-medium w-24">Status</span>
            <span className={`inline-block px-2 py-0.5 text-xs font-semibold text-white rounded-full ${
                Status === 'Aktif' ? 'bg-green-400' : 'bg-gray-400'
            }`}>
                {Status}
            </span>
            </div>
            <div className="flex gap-4">
            <span className="font-medium w-24">Bergabung</span>
            <span className="text-gray-600">{Bergabung}</span>
            </div>

            <p className="text-zinc-400">
            *Note Admin Tidak Boleh Mengubah Informasi User, 
            Pedoman User--
            </p>
        </div>

        {/* Badge Section */}
        <div className="mt-4 grid grid-cols-4 gap-3">
        {/* Badge 1 */}
        <div className="flex items-center justify-center p-3 rounded-md">
            <div className="flex flex-col items-center text-center gap-1">
            <i className="fas fa-book text-blue-500 text-lg"></i>
            <p className="text-xs text-gray-600">Buku Dipinjam</p>
            <p className="text-sm font-semibold text-gray-800">12</p>
            </div>
        </div>

        {/* Badge 2 */}
        <div className="flex items-center justify-center p-3 rounded-md">
            <div className="flex flex-col items-center text-center gap-1">
            <i className="fas fa-shopping-cart text-green-500 text-lg"></i>
            <p className="text-xs text-gray-600">Buku Dibeli</p>
            <p className="text-sm font-semibold text-gray-800">15</p>
            </div>
        </div>

        {/* Badge 3 */}
        <div className="flex items-center justify-center p-3 rounded-md">
            <div className="flex flex-col items-center text-center gap-1">
            <i className="fas fa-receipt text-yellow-500 text-lg"></i>
            <p className="text-xs text-gray-600">Total Transaksi</p>
            <p className="text-sm font-semibold text-gray-800">23</p>
            </div>
        </div>

        {/* Badge 4 */}
        <div className="flex items-center justify-center p-3  rounded-md">
            <div className="flex flex-col items-center text-center gap-1">
            <i className="fas fa-calendar-alt text-purple-500 text-lg"></i>
            <p className="text-xs text-gray-600">Lama Bergabung</p>
            <p className="text-sm font-semibold text-gray-800">2 Tahun</p>
            </div>
        </div>
    </div>
    </div>
  );
};

type PropsRiwayatPeminjaman = {
  nama: string;
  email: string;
};

function RiwayatPeminjamanTimeline({nama, email}:PropsRiwayatPeminjaman) {
    const dispatch = useDispatch();
    if(nama !== "" && email !== ""){
    const { isPending, error, data } = useQuery({
    queryKey: ["AmbilDataUserRiwayatPeminjaman", nama, email],
    queryFn: () =>
        fetch("http://localhost:8080/admin", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            tujuan: "AmbilDataUserRiwayatPeminjaman",
            nama: nama,
            email: email,

        }),
        }).then((res) => {
        if (!res.ok) {
            throw new Error("Network response was not ok");
        }
        return res.json();
        }),
    refetchInterval: 20000,
    });

    if (isPending) return "Loading...";
    if (error) return "An error has occurred: " + error.message;
    if (data.Hasil == null) return <UnreadyFall type="notfound" Message={"User Ini Belum Memmiliki riwayat peminjaman"}/>;

    let Dikembalikan = 0;
    let BelumDikembalikan = 0;
    data.Hasil.map((data:any, _:number) =>{
        if (data.status == "Belum Dikembalikan") {
            BelumDikembalikan++
        } else {
            Dikembalikan++
        }
    })

    dispatch(setBukudikembalikan(Dikembalikan));
    dispatch(setBukuBelumdikembalikan(BelumDikembalikan));

    const getStatusColors = (status:string, tanggal:any) => {
        const today:any = new Date();
        const borrowedDate:any = new Date(Date.parse(tanggal));
        const diffDays = (today - borrowedDate) / (1000 * 60 * 60 * 24);

        if (status === "Belum Dikembalikan") {
        return {        // red-500
            borderColor: 'rgba(206, 58, 58, 0.3)', // red-500 border transparent
            gradienicon : " from-pink-400 to-rose-500",

        };
        } else if (diffDays > 30) {
        // Lama pinjaman, teal color
        return {  // teal-500
            borderColor: 'rgba(17, 101, 91, 0.3)',
            gradieicon : " from-ocean-400 to-sky-500",
        };
        } else {
        // Status normal (dikembalikan), green color
        return {               // green-500
            borderColor: 'rgba(34, 197, 94, 0.3)',
            gradienicon: "from-green-400 to-teal-500"
        };
        }
    };

    return (
        <div
            className=" bg-gray-50 rounded-xl shadow-lg max-h-[30rem] min-h-[30rem] overflow-y-auto"
            style={{
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
            }}
        >
            <style>
            {`s
                div::-webkit-scrollbar {
                display: none;
                }
            `}
            </style>

            <VerticalTimeline lineColor="#e0e0e0"> {/* garis timeline warna abu-abu terang di kiri */}
        {data.Hasil.map((buku: any, i: number) => {
            const { borderColor, gradienicon } = getStatusColors(buku.status, buku.tanggal);

            return (
            <VerticalTimelineElement
                key={i}
                position="left"  // PENTING: paksa semua konten ke kanan
                className="vertical-timeline-element--work mr-5"
                contentStyle={{
                background: "rgba(255, 255, 255, 0.85)",  // transparan putih supaya ada efek glassmorphism
                backdropFilter: "blur(12px)",
                WebkitBackdropFilter: "blur(12px)",
                border: `1px solid ${borderColor}`,
                color: "#0f172a",
                borderRadius: "16px",
                boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
                padding: "1.75rem",
                transition: "transform 0.2s ease",
                }}
                contentArrowStyle={{
                borderRight: `5px solid ${borderColor}`, // warna panah sesuaikan border
                }}
                date={buku.tanggal}
                dateClassName={`text-sm text-neutral-100 text-center ml-4 mr-4 bg-gradient-to-r ${gradienicon} rounded-xl p-2 font-semibold`}
                iconStyle={{
                color: ' #fff ',
                boxShadow: `0 0 0 5px ${borderColor}`,
                transition: "box-shadow 0.3s ease",
                }}
                icon={<FaBook />}
                iconClassName={`bg-gradient-to-r ${gradienicon}`}
            >
                <div className="ml-4 mr-4 transition duration-300 hover:scale-[1.05] cursor-pointer">
                <h3 className="text-xl font-semibold mb-2 text-gray-900">
                    {buku.judul}
                </h3>
                <hr className="mb-3 border-slate-300" />
                <p className="text-sm text-slate-600 mb-1">
                    Kategori: <span className="font-medium text-slate-800">{buku.kategori}</span>
                </p>
                <p
                    className={`text-sm font-semibold ${
                    buku.status === "Belum Dikembalikan"
                        ? "text-red-600"
                        : "text-emerald-600"
                    }`}
                >
                    Status: {buku.status}
                </p>
                </div>
            </VerticalTimelineElement>
            );
        })}
        </VerticalTimeline>

        </div>
        );
    } else {
        return(
            <div className="relative p-4 sm:p-8 bg-gray-50 rounded-xl shadow-md max-h-[40rem] min-h-[40rem] overflow-y-auto"
                style={{
                scrollbarWidth: 'none', // Firefox
                msOverflowStyle: 'none', // IE/Edge
                }}
            >
                <h1>Coba Inspect Salah Satu User</h1>
            </div>
        )
    }
  
}