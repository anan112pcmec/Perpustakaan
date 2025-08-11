import { useQuery } from "@tanstack/react-query";
import { useRef } from "react";
import LoadingAnimation from '../../lottie/Sandy_Loading.json';
import { renderLoading } from "../CariBuku/Caribuku";
import ErrorAnimation from '../../lottie/Questions.json';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp, faHeart, faComment } from "@fortawesome/free-solid-svg-icons";
import { useDispatch } from "react-redux";
import { animate } from "animejs";
import { Swiper, SwiperSlide } from "swiper/react";
import { updatenilai } from "../DetailBuku/DetailBukuState";
import { Autoplay, FreeMode } from "swiper/modules";

interface Buku {
    bahasa?: string;
    created_at?: string;
    deleted_at?: string | null;
    deskripsi?: string;
    gambar?: string; 
    harga?: number;
    id?: number;
    isbn?: string;
    jenis?: string;
    judul: string;
    kategori?: string;
    penerbit?: string;
    penulis?: string;
    rating?: number;
    stok?: number;
    tahun?: string;
    tujuan_aksi?: string;
    updated_at?: string;
    viewed?: number;
    diskon?: number;
    disukai?: string;
};

interface InitialBuku {
    Jenis: string;
    Buku: Buku;
}

export function BestSeller() {
    const bukuRef = useRef<HTMLDivElement[]>([]);
    const dispatch = useDispatch();
    
    const { isLoading, error, data } = useQuery({
        queryKey: ["AmbilBestSeller"],
        queryFn: () =>
            fetch("http://localhost:8080/user", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ tujuan: "AmbilBukuBestSeller" }),
            }).then((res) => {
                if (!res.ok) throw new Error("Network response was not ok");
                return res.json();
            })
    });

    if (isLoading) return renderLoading("Memuat data...", LoadingAnimation);
    if (error) return renderLoading("Data Tidak Ditemukan Periksa Jaringan Anda", ErrorAnimation);
    
    const bukuList: InitialBuku[] = data?.HasilUser  || [];
    const List: string[] = ["Fiksi", "Non-Fiksi"];
    
    return (
        <>
            <div className="h-screen overflow-y-auto mt-10">
                <div className={`grid grid-rows-${List.length}`}>
                    {List.map((kategori: string) => {
                        const filteredBukuList = bukuList.filter(buku => buku.Jenis === kategori);
                            return (
                    <section key={kategori}>
                       <div className="w-screen">
                         <span className="text-2xl font-semibold text-neutral-200 ml-2 " 
                        style={{ fontFamily: "Inter, sans-serif" }}>
                            {kategori}
                        </span>
                        <hr />
                       </div>

                        <div className="h-full flex flex-wrap items-start gap-4 mt-5 mb-10">
                            <Swiper className={`SwiperBest${kategori} w-screen`}
                                slidesPerView={5}
                                spaceBetween={10}
                                modules={[Autoplay, FreeMode]}       // <- ini dia modul pentingnya
                                freeMode={true}
                                loop={true}
                                speed={1500}
                                autoplay={{
                                    delay: 0,
                                    disableOnInteraction: true,
                                }}
                                allowTouchMove={true}>
                                {filteredBukuList.map((buku: InitialBuku, index: number) => (
                                    <SwiperSlide key={index}>
                                        <div
                                            ref={(el) => { if (el) bukuRef.current[index] = el }}
                                            onMouseEnter={(el) => {
                                                animate(el.currentTarget, {
                                                    opacity: [1, 1],
                                                    scale: [1.05, 1],
                                                    easing: "easeOutQuart",
                                                    duration: 700,
                                                });
                                            }}
                                            onClick={() => {
                                                console.log("slug jalan");
                                                console.log(buku.Buku.judul, buku.Buku.gambar, buku.Buku.penulis, buku.Buku.kategori, buku.Buku.bahasa, buku.Buku.tahun, buku.Buku.rating, buku.Buku.harga);
                                                
                                                dispatch(updatenilai({
                                                    Judul: buku.Buku.judul,
                                                    Gambar: buku.Buku.gambar,
                                                    Penulis: buku.Buku.penulis,
                                                    Genre: buku.Buku.kategori,
                                                    Bahasa: buku.Buku.bahasa,
                                                    Tahun: buku.Buku.tahun,
                                                    Harga: buku.Buku.harga,
                                                    Kategori: buku.Buku.kategori,
                                                    Jenis: buku.Buku.jenis,
                                                    Disukai: buku.Buku.disukai,
                                                    Diskon: buku.Buku.diskon,
                                                    Penerbit: buku.Buku.penerbit,
                                                    ISBN: buku.Buku.isbn,
                                                    Deskripsi: buku.Buku.deskripsi,
                                                    ID: buku.Buku.id,
                                                }));
                                            }}
                                            className="buku-card w-[360px] h-[280px] bg-gradient-to-br from-white/10 via-white/20 to-white/10 backdrop-blur-md border border-white/30 rounded-3xl shadow-lg overflow-hidden m-4 transition-transform hover:scale-[1.04] hover:shadow-2xl cursor-pointer flex"
                                        >
                                            <div className="grid grid-cols-[140px_1fr] h-full">
                                                <div className="relative flex flex-col bg-white/20 backdrop-blur-sm rounded-l-3xl overflow-hidden p-4">
                                                    {/* Gambar */}
                                                    <img
                                                        src={buku.Buku.gambar}
                                                        alt={buku.Buku.judul}
                                                        className="object-contain h-[230px] w-[130px] rounded-xl shadow-inner mx-auto"
                                                    />

                                                    {/* Bar Tombol Aksi */}
                                                    <div className="flex justify-center gap-2">
                                                        {/* Like */}
                                                        <button
                                                            className="w-9 h-9 bg-white/30 hover:bg-white/50 backdrop-blur-sm rounded-full flex items-center justify-center text-white shadow-md transition-all p-4"
                                                            title="Like"
                                                        >
                                                            <FontAwesomeIcon icon={faThumbsUp} className="w-4 h-4" />
                                                        </button>

                                                        {/* Love */}
                                                        <button
                                                            id={`love${buku.Buku.isbn}`}
                                                            className={`w-9 h-9 bg-white/30 hover:bg-white/50 backdrop-blur-sm rounded-full flex items-center justify-center ${buku.Buku.disukai === "buku disukai" ? "text-red-500" : "text-gray-500"} shadow-md transition-all p-4`}
                                                            title="Love"
                                                            onClick={(e) => {
                                                                e.preventDefault();
                                                                e.stopPropagation();
                                                                console.log(`dia menyukai buku ${buku.Buku.judul}`);
                                                                fetch("http://localhost:8080/user", {
                                                                    method: "POST",
                                                                    headers: {
                                                                        "Content-Type": "application/json",
                                                                    },
                                                                    body: JSON.stringify({
                                                                        tujuan: "Favorit",
                                                                        iduser: `${localStorage.getItem("Id_user")}`,
                                                                        namabuku: buku.Buku.judul,
                                                                        isbn: `${buku.Buku.isbn}`,
                                                                        namauser: localStorage.getItem("userNama"),
                                                                    }),
                                                                })
                                                                .then((res) => {
                                                                    if (!res.ok) {
                                                                        throw new Error("Network response was not ok");
                                                                    }
                                                                    return res.json();
                                                                })
                                                                .then((hasil: any) => {
                                                                    console.log(hasil.HasilUser );
                                                                    const loveButton = document.getElementById(`love${buku.Buku.isbn}`);
                                                                    if (hasil.HasilUser .Kondisi === "Tidak Disukai") {
                                                                        loveButton?.classList.remove("text-red-500");
                                                                        loveButton?.classList.add("text-gray-500");
                                                                    } else if (hasil.HasilUser .Kondisi === "Disukai") {
                                                                        loveButton?.classList.add("text-red-500");
                                                                        loveButton?.classList.remove("text-gray-500");
                                                                    }
                                                                })
                                                                .catch((err) => {
                                                                    console.error("Fetch error:", err);
                                                                });
                                                            }}
                                                        >
                                                            <FontAwesomeIcon icon={faHeart} className="w-4 h-4" />
                                                        </button>

                                                        {/* Comment */}
                                                        <button
                                                            className="w-9 h-9 bg-white/30 hover:bg-white/50 backdrop-blur-sm rounded-full flex items-center justify-center text-white shadow-md transition-all p-4"
                                                            title="Komentar"
                                                        >
                                                            <FontAwesomeIcon icon={faComment} className="w-4 h-4" />
                                                        </button>
                                                    </div>
                                                </div>

                                                <div className="flex flex-col justify-between p-5 text-neutral-100">
                                                    <div className="space-y-1">
                                                        <h3 className="text-lg font-bold text-white/90 line-clamp-2">
                                                            {buku.Buku.judul}
                                                        </h3>
                                                        <p className="text-sm text-white/70 font-semibold">Penulis: {buku.Buku.penulis}</p>
                                                        <p className="text-xs text-white/50 italic tracking-wide">Genre: {buku.Buku.kategori}</p>
                                                        <p className="text-xs text-white/50">Bahasa: {buku.Buku.bahasa ?? 'ID'}</p>
                                                        <p className="text-xs text-white/50">Tahun: {buku.Buku.tahun}</p>
                                                        <p className="text-xs text-white/50">
                                                            Rating: <span className="font-medium">{buku.Buku.rating ?? 'Belum Dinilai'}</span>
                                                        </p>
                                                    </div>

                                                    <div className="mt-4">
                                                        <button
                                                            style={{ fontFamily: "Inter, sans-serif" }}
                                                            className="relative px-6 py-2 w-full bg-white/20 hover:bg-white/30 active:bg-teal-700 rounded-xl shadow-lg text-white font-semibold text-sm transition duration-300 ease-in-out flex items-center justify-center"
                                                        >
                                                            <span>Rp.{buku.Buku.harga}</span>
                                                            {buku.Buku.diskon && (
                                                                <span className="absolute -top-2 -right-2 bg-red-500 text-xs px-2 rounded-full shadow-md font-bold">
                                                                    {buku.Buku.diskon}%
                                                                </span>
                                                            )}
                                                        </button>
                                                    </div>

                                                    <div className="text-[10px] text-white/30 mt-3 select-none">
                                                        Katalog Buku Digital
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                            
                        </div>
                    </section>
                );
            })}
        </div>


                  
                </div>
            
        </>
    );
}
