import { faAngleLeft, faAngleRight, faBook, faBookBookmark, faComment, faHeart, faSortDown, faSortUp, faThumbsUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useQuery } from "@tanstack/react-query";
import { animate } from "animejs";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { Swiper, SwiperSlide } from "swiper/react"
import LoadingAnimation from "../../lottie/Sandy_Loading.json"
import { renderLoading } from "../CariBuku/Caribuku";
import FailureAnimation from "../../lottie/Questions.json"
import { updatenilai, type DetilBukuState } from "../DetailBuku/DetailBukuState";
import { Detailbuku } from "../DetailBuku/DetailBuku";
import ShinyText from "../../React_bits_compo/ShinyText";
import AnimatedList from "../../React_bits_compo/AnimatedList/AnimatedList";


export default function Foryou(){
    const [Relevansinya, SetRelevansi] = useState<string>("BaruDilihat")
    const items = ['Baru Saja Dilihat', 'Paling Banyak Dicari', 'Motivasi', 'Fiksi', 'Non-fiksi', 'Horror', 'Thriller', 'Cetak', 'Digital', 'News']; 
    const [ScrolldownFav, setScrollDownFav] = useState(false);
    console.log(localStorage.getItem("Favorit"), "Nih bro");
    return(
      <>
        <Detailbuku/>
        <div className="h-screen overflow-y-auto mt-5"
        style={{
              scrollbarWidth: "none", 
              msOverflowStyle: "none", 
            }}>
          {/* Header */}
          <div className="p-4 text-5xl text-neutral-100 font-semibold" style={{ fontFamily: "Inter, sans-serif" }}>
            For you {useSelector((state: any) => state.foryouasist.nama)}
            <hr className="mt-8" />
          </div>

          {/* Konten Scrollable */}
          <div className="grid gap-8 px-4">
            {/* Section Favorit */}
            <div className="grid grid-cols-2 gap-4">
              {/* Kiri */}
              <div className="grid grid-rows-[auto_1fr]">
                <div className="p-4 text-2xl text-neutral-100 font-light" style={{ fontFamily: "Inter, sans-serif" }}>
                  Relevansi
                </div>
                <div className="mt-2 flex justify-start items-start w-full">
                  <CardBukunya
                    Nama={useSelector((state: any) => state.foryouasist.nama)}
                    Berdasarkan="Favorit"
                    Favorit={localStorage.getItem("Favorit")}
                  />
                </div>
              </div>

              {/* Kanan */}
              <div className="grid grid-rows-[auto_1fr]">
                <div className="mt-5 ml-24 text-xl text-neutral-100 font-light" style={{ fontFamily: "Inter, sans-serif" }}>
                  Menampilkan Berdasarkan Buku Buku Yang Anda Sukai
                </div>
                <div className="pl-24 py-4 text-neutral-300 text-base leading-relaxed font-extralight" style={{ fontFamily: 'Inter, sans-serif' }}>
                  Setiap halaman yang Anda baca bukan sekadar cerita—melainkan cermin dari jiwa Anda sendiri. Buku-buku yang Anda sukai adalah jejak emosi, bisikan kenangan, dan gema harapan yang tak pernah padam. Di sinilah kami hadir, menampilkan kembali kisah-kisah yang pernah membuat Anda terdiam, tersenyum, bahkan menangis. Karena di balik setiap pilihan buku, ada bagian dari diri Anda yang sedang ingin dipahami. Setiap cerita membawa Anda ke dalam dunia baru, membuka cakrawala pikiran, dan menghubungkan hati dengan perasaan yang paling dalam. Membaca bukan hanya aktivitas, melainkan perjalanan jiwa yang tak berujung.
                  <div id="tulisan-pemanis" className="mt-2 text-[11px] text-neutral-400 font-extralight italic">
                    Karena setiap pilihan buku menyimpan cerita yang tak semua orang tahu.
                  </div>
                </div>
              </div>
            </div>

            {/* Section Lihat Favorit */}
           <div className="text-neutral-100 ml-2 px-4">
              <hr className="mb-3 border-neutral-600" />

              {/* Tombol Toggle */}
              <div
                className={`text-xl tracking-wide flex items-center gap-2 cursor-pointer grid ${ScrolldownFav == false ? "grid-cols-[80%_20%]" : "grid-cols-[30%_70%]" }}`}
                style={{ fontFamily: 'Inter, sans-serif' }}

              >
                <div className="mt-2"
                onClick={() => setScrollDownFav(!ScrolldownFav)} >
                <FontAwesomeIcon icon={faBookBookmark} className="text-lg" />
                <span className="select-none ml-2 font-medium">Lihat Favorit</span>
                {ScrolldownFav === false ? (
                  <FontAwesomeIcon icon={faSortDown} className="text-base mb-1 ml-2" />
                ) : (
                  <FontAwesomeIcon icon={faSortUp} className="text-base mt-1 ml-2" />
                )}
                {ScrolldownFav == false ? (<span className="ml-2 mb-2 text-sm italic text-neutral-200">
                  <ShinyText text="Ini adalah daftar buku yang Anda favoritkan — jejak rasa yang pernah menyentuh hati, dan kisah yang ingin selalu Anda kenang." className="text-neutral-200"/>
                </span>
                ) : null }
                </div>
                
                {ScrolldownFav == true ? (
                  <div className="flex">
                    <div className="ml-5 mt-2 backdrop-blur-md bg-white/20 border border-white/30 rounded-xl shadow-lg px-4 py-2 flex items-center space-x-3">
                    <FontAwesomeIcon icon={faBook} />
                    </div>
                    <div 
                      className="ml-5 mt-2 backdrop-blur-md bg-white/20 border border-white/30 rounded-xl shadow-lg px-4 py-2 flex items-center space-x-3 w-full">
                        <i className="fa-solid fa-magnifying-glass text-white text-lg"></i>
                        <input
                          type="text"
                          placeholder="Cari sesuatu..."
                          className="bg-transparent outline-none text-white placeholder-white w-full"
                        />
                      </div>
                  </div>
                ) : (
                  <> </>
                )}
              </div>

              <div
                className={`overflow-hidden transition-all duration-500 ease-in-out`}
                style={{
                  height: ScrolldownFav ? "800px" : "0px",
                }}
              >
                <DaftarBukuFavorit  
                    Nama={useSelector((state: any) => state.foryouasist.nama)} 
                    Favorit={localStorage.getItem("Favorit")}
                  />
              </div>
              <hr className="mt-4 border-neutral-600"/>
            </div>


            {/* Section Baru Baru Ini */}
           <div className="grid grid-cols-[50%_50%] gap-4 w-full mb-10">
            {/* Kolom Kiri: Baru-Baru Ini */}
            <div className="grid grid-rows-[auto_1fr] w-full">
              <div className="p-4 text-2xl text-neutral-100 font-light" style={{ fontFamily: "Inter, sans-serif" }}>
                Baru-Baru Ini Dilihat
              </div>
              <div className="px-4">
                <RelevansiSearch Tipe={Relevansinya}/>
              </div>
            </div>

            {/* Kolom Kanan: Buku Yang Disukai */}
            <div className="grid grid-rows-[auto_1fr]">
              <div className="w-full flex justify-end mt-20">
                <AnimatedList
                  items={items}
                  onItemSelect={(item, index) => console.log(item, index)}
                  showGradients={true}
                  enableArrowNavigation={true}
                  displayScrollbar={true}
                />
              </div>
            </div>
          </div>
          </div>
        </div>
      </>

    )
}

interface CardSwiper {
    Nama: string;
    Favorit?: any;
    Berdasarkan: string;
}

export interface BukuCard {
  id: number;
  judul: string;
  jenis: string;
  harga: number;
  penulis: string;
  penerbit: string;
  stok: number;
  tahun: string;
  isbn: string;
  kategori: string;
  bahasa: string;
  deskripsi: string;
  tujuan_aksi: string;
  diskon: number;
  rating: number;
  gambar: string | null;
}

const CardBukunya = ({ Nama, Favorit, Berdasarkan }: CardSwiper) => {
  const [DataBuku, setDataBuku] = useState<BukuCard[]>([]);
  const cardRef = useRef<HTMLDivElement[]>([]);
  const Gambar = useRef<HTMLDivElement[]>([])
  const Slugs = useDispatch();
  

  if(Berdasarkan == "Favorit"){
    const FavoritAda: string[] = Favorit
    ? Favorit.split(",").map((item:any) => item.trim()).filter(Boolean)
    : [];

    // Gunakan useQuery di luar if
    const { isLoading, error, data } = useQuery({
    queryKey: [`AmbilBukuBerdasar${Favorit}`],
    queryFn: () =>
        fetch("http://192.168.1.4:8080/user", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            tujuan: "AmbilBukuFavorit",
            nama: `${Nama}`,
            favoritnya: FavoritAda,
            iduser: `${localStorage.getItem("Id_user")}`,
        }),
        }).then((res) => {
        if (!res.ok) throw new Error("Network response was not ok");
        return res.json();
        }),
    enabled: Berdasarkan === "Favorit" && !!FavoritAda.length,
    });

    useEffect(() => {
        if (data?.HasilUser) {
        setDataBuku(data.HasilUser);
        console.log(data.HasilUser, "nihbro");
        } else {
        setDataBuku([]); // reset jika tidak ada data
        }
    }, [data]);

    if (isLoading) return <div>Loading...</div>;

    if (error) return <div>Error loading data</div>;
  }

  return (
    <>
      <div className="w-full p-4">
      <Swiper
        pagination={{ clickable: true }}
        spaceBetween={20}
        slidesPerView={5}
        className="w-full max-w-[890px] [mask-image:linear-gradient(to_right,transparent,black_20%,black_80%,transparent)]"
        >
        {DataBuku.map((buku: any, index: number) => (
          <SwiperSlide>
            <div className="p-4">
                  <div
                    key={index}
                    className="relative w-[150px] h-[220px] group transition-transform duration-300 ease-in-out rounded-xl"
                    ref={(el) => {
                      if (el) cardRef.current[index] = el;
                    }}
                    style={{ perspective: "1000px" }}
                    onMouseEnter={() => {
                    const el = cardRef.current[index];
                    if (el) {
                      animate(el, {
                        rotateY: 6,
                        scale: 1.02,
                        duration: 0.7, 
                        ease: "easeOut",
                      });
                    }
                  }}
              
                  onMouseLeave={() => {
                    const el = cardRef.current[index];
                    if (el) {
                      animate(el, {
                        rotateY: 0,
                        scale: 1,
                        duration: 0.2,
                        ease: "easeInOut",
                      });
                    }
              
                   const targetElem = Gambar.current[index];
                    if (!targetElem) return;
              
                    const currentTransform = targetElem.style.transform;
              
                    if (currentTransform.includes("rotateY(-90deg)")) {
                      targetElem.style.transform = "rotateY(-12deg) rotateX(1.5deg) scale(1.005)";
                      console.log("lewat2")
                    } else {
                      targetElem.style.transform = "rotateY(-90deg) scale(1.005)";
                      console.log("lewat1")
                    }
              
                  }}
                  >
              
                    <div
                      className="absolute top-0 left-[6px] w-full h-full bg-white rounded-lg shadow-md z-0"
                      style={{
                        filter: "brightness(1)", // normal dulu, biar gak terlalu redup
                        boxShadow: "inset -4px 0 12px rgba(0,0,0,0.08), 0 4px 8px rgba(0,0,0,0.1)",
                        transform: "rotateY(-8deg) rotateX(1deg) scale(1)",
                        transition: "transform 0.4s ease, filter 0.4s ease, box-shadow 0.4s ease",
                        padding: "0.8rem",
                        overflow: "hidden",
                      }}
                      onMouseEnter={e => {
                        e.currentTarget.style.filter = "brightness(1.05)";
                        e.currentTarget.style.transform = "rotateY(0deg) rotateX(0deg) scale(1.02)";
                        e.currentTarget.style.boxShadow = "0 8px 15px rgba(0,0,0,0.15)";
                      }}
                      onMouseLeave={e => {
                        e.currentTarget.style.filter = "brightness(1)";
                        e.currentTarget.style.transform = "rotateY(-8deg) rotateX(1deg) scale(1)";
                        e.currentTarget.style.boxShadow = "inset -4px 0 12px rgba(0,0,0,0.08), 0 4px 8px rgba(0,0,0,0.1)";
                      }}
                    >
                      <span
                        className="block"
                        style={{
                          width: "100%",
                          height: "100%",
                          fontSize: "clamp(0.7rem, 1vw, 0.85rem)",
                          lineHeight: "1.3",
                          color: "#333",
                          overflowWrap: "break-word",
                          wordBreak: "break-word",
                          whiteSpace: "normal",
                          boxSizing: "border-box",
                          padding: "0",
                          margin: 0,
                          userSelect: "text",
                          fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
                        }}
                      >
                        {buku.deskripsi}
                      </span>
                    </div>
              
                    <img
                      src={buku.gambar}
                      alt={buku.judul}
                      ref={
                        (el) => {
                          if (el) Gambar.current[index] = el;
                        } 
                      }
              
                      className="relative w-full h-full rounded z-10 group-hover:-translate-y-1"
              
                      style={{
                        transform: "rotateY(-12deg) rotateX(1.5deg) scale(1.005)",
                        transformOrigin: "left center",
                        transformStyle: "preserve-3d",
                        cursor: "pointer",
                        transition: "transform 0.6s ease, box-shadow 0.6s ease",
                        boxShadow:
                          "inset -6px 0 8px rgba(0, 0, 0, 0.5), " +
                          "0 12px 24px rgba(0, 0, 0, 0.15)",
                        borderLeft: "4px solid #333",
                      }}
              
                      onMouseEnter={(e) => {
                        const el = e.currentTarget;
                        const style = el.style.transform;
              
                        if (!style.includes("rotateY(-90deg) rotateX(1.5deg) scale(1.005)")) {
                          el.style.transform = "rotateY(-90deg)  scale(1.005)";
                        }
              
                        console.log("gambar :", buku.judul, "di hover");
                      }}
                    />
                  </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
    </>
  );
};

interface BukuFavorit{
  Nama: string;
  Favorit: string | null;
}

const DaftarBukuFavorit = ({Nama, Favorit}: BukuFavorit) => {
  const Slugs = useDispatch();
  const FavoritAda: string[] = Favorit
  ? Favorit.split(",").map((item:any) => item.trim()).filter(Boolean)
  : [];
  type Buku = {
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
    disukai?:string;
  };

  const [DariSampai, setDariSampai] = useState<[number, number]>([0, 8]);
  console.log("cok cok", localStorage.getItem("Id_user"))

    const { isLoading, error, data } = useQuery({
    queryKey: [`AmbilBukuBerdasarFavnya`],
    queryFn: () =>
        fetch("http://192.168.1.4:8080/user", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            tujuan: "AmbilBukuFavoritdia",
            namauser: `${Nama}`,
            iduser: `${localStorage.getItem("Id_user")}`
        }),
        }).then((res) => {
        if (!res.ok) throw new Error("Network response was not ok");
        return res.json();
      })
    });

    if (isLoading) return renderLoading("Memuat data...", LoadingAnimation);

    if(error) return renderLoading("Jaringan Bermasalah", FailureAnimation)

      console.log(data?.HasilUser);
  
  return (
    <>
      <div className="grid grid-rows-[90%_10%]">
        <div className="h-full w-full flex flex-wrap items-start gap-4 mt-5">
            {data?.HasilUser.slice(DariSampai[0], DariSampai[1]).map((buku:Buku, index:number) =>
              buku.tahun && buku.gambar && buku.penulis ? (
                  <div
                    key={index}
                    onMouseEnter={(el) => {
                      animate(el.currentTarget, {
                        opacity: [1, 1],
                        scale: [1.05, 1],
                        easing: "easeOutQuart",
                        duration: 700,
                      });
                    }}
                    onClick={() => {
                      console.log("slug jalan")
                      console.log(buku.judul, buku.gambar, buku.penulis, buku.kategori, buku.bahasa, buku.tahun, buku.rating, buku.harga);
                      Slugs(
                        updatenilai({
                          Judul: buku.judul,
                          Gambar: buku.gambar,
                          Penulis: buku.penulis,
                          Genre: buku.kategori,
                          Bahasa: buku.bahasa,
                          Tahun: buku.tahun,
                          Harga: buku.harga,
                          Kategori: buku.kategori,
                          Jenis: buku.jenis,
                          Disukai: buku.disukai,
                          Diskon: buku.diskon,
                          Penerbit: buku.penerbit,
                          ISBN: buku.isbn,
                          Deskripsi: buku.deskripsi,
                          ID: buku.id,
                        })
                      );
                    }}
                    className="buku-card w-[360px] h-[280px] bg-gradient-to-br from-white/10 via-white/20 to-white/10 backdrop-blur-md border border-white/30 rounded-3xl shadow-lg overflow-hidden m-4 transition-transform hover:scale-[1.04] hover:shadow-2xl cursor-pointer flex"
                  >
                    <div className="grid grid-cols-[140px_1fr] h-full">
                      <div className="relative flex flex-col bg-white/20 backdrop-blur-sm rounded-l-3xl overflow-hidden p-4">
                        <img
                          src={buku.gambar}
                          alt={buku.judul}
                          className="object-contain h-[230px] w-[130px] rounded-xl shadow-inner mx-auto"
                        />
                        <div className="flex justify-center gap-2">
                          <button
                            className="w-9 h-9 bg-white/30 hover:bg-white/50 backdrop-blur-sm rounded-full flex items-center justify-center text-white shadow-md transition-all p-4"
                            title="Like"
                          >
                            <FontAwesomeIcon icon={faThumbsUp} className="w-4 h-4" />
                          </button>
        
                          {/* Love */}
                          <button
                            id={`love${buku.isbn}`}
                            className={`w-9 h-9 bg-white/30 hover:bg-white/50 backdrop-blur-sm rounded-full flex items-center justify-center ${buku.disukai == "buku disukai" ? "text-red-500" : "text-gray-500"} shadow-md transition-all p-4`}
                            title="Love"
                              onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation(); // MENCEGAH event bubbling ke parent
                              console.log(`dia menyukai buku ${buku.judul}`);
                              fetch("http://192.168.1.4:8080/user", {
                                method: "POST",
                                headers: {
                                  "Content-Type": "application/json",
                                },
                                body: JSON.stringify({
                                  tujuan: "Favorit",
                                  iduser: `${localStorage.getItem("Id_user")}`,
                                  namabuku: buku.judul,
                                  isbn: `${buku.isbn}`,
                                  namauser: localStorage.getItem("userNama"),
                                }),
                              })
                              .then((res) => {
                                if (!res.ok) {
                                  throw new Error("Network response was not ok");
                                }
                                 return res.json(); // hanya panggil sekali dan return ke bawah
                              })
                              .then((hasil: any) => {
                                  console.log(hasil.HasilUser);
                                  if(hasil.HasilUser.Kondisi == "Tidak Disukai"){
                                    document.getElementById(`love${buku.isbn}`)?.classList.remove("text-red-500");
                                    document.getElementById(`love${buku.isbn}`)?.classList.add("text-gray-500");
                                  } else if (hasil.HasilUser.Kondisi == "Disukai"){
                                    document.getElementById(`love${buku.isbn}`)?.classList.add("text-red-500");
                                    document.getElementById(`love${buku.isbn}`)?.classList.remove("text-gray-500");
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
                            {buku.judul}
                          </h3>
                          <p className="text-sm text-white/70 font-semibold">Penulis: {buku.penulis}</p>
                          <p className="text-xs text-white/50 italic tracking-wide">Genre: {buku.kategori}</p>
                          <p className="text-xs text-white/50">Bahasa: {buku.bahasa ?? 'ID'}</p>
                          <p className="text-xs text-white/50">Tahun: {buku.tahun}</p>
                          <p className="text-xs text-white/50">
                            Rating: <span className="font-medium">{buku.rating ?? 'Belum Dinilai'}</span>
                          </p>
                        </div>
        
                        <div className="mt-4">
                          <button
                            style={{ fontFamily: "Inter, sans-serif" }}
                            className="relative px-6 py-2 w-full bg-white/20 hover:bg-white/30 active:bg-teal-700 rounded-xl shadow-lg text-white font-semibold text-sm transition duration-300 ease-in-out flex items-center justify-center"
                          >
                            <span>Rp.{buku.harga}</span>
                            {buku.diskon && (
                              <span className="absolute -top-2 -right-2 bg-red-500 text-xs px-2 rounded-full shadow-md font-bold">
                                {buku.diskon}%
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
              ) : null
              )}
          </div>
          <div className="w-full flex justify-center items-center mt-12">
            <div className="flex space-x-4">
            {/* Tombol kiri */}
            <button
              className={`w-12 h-12 flex justify-center items-center backdrop-blur-md bg-white/20 border border-white/30 rounded-full shadow-lg transition ${
                DariSampai[0] === 0 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-white/30'
              }`}
              disabled={DariSampai[0] === 0}
              onClick={() => {
                setDariSampai(([start, end]) => [Math.max(0, start - 8), Math.max(8, end - 8)]);
              }}
            >
              <FontAwesomeIcon icon={faAngleLeft} className="text-white text-xl" />
            </button>

            <button
              className={`w-12 h-12 flex justify-center items-center backdrop-blur-md bg-white/20 border border-white/30 rounded-full shadow-lg transition ${
                data?.HasilUser.length <= DariSampai[1] ? 'opacity-50 cursor-not-allowed' : 'hover:bg-white/30'
              }`}
              disabled={data?.HasilUser.length <= DariSampai[1]}
              onClick={() => {
                setDariSampai(([start, end]) => [start + 8, end + 8]);
              }}
            >
              <FontAwesomeIcon icon={faAngleRight} className="text-white text-xl" />
            </button>
          </div>
          </div>
      </div>
    </>
  )
}

interface Relevansi{
  Tipe: string;
}

const RelevansiSearch = ({Tipe}:Relevansi) => {

  const Slugs = useDispatch();
  
  const { isLoading, error, data } = useQuery({
    queryKey: [`AmbilRelevansi_${Tipe}`],
    queryFn: async (): Promise<DetilBukuState[] | any> => {
      if (Tipe === "BaruDilihat") {
        const local = localStorage.getItem("PerpustakaanFaiz_BukuBaruBaruIni");
        return local ? (JSON.parse(local) as DetilBukuState[]) : [];
      } else {
        const res = await fetch("http://192.168.1.4:8080/user", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            tujuan: "AmbilRelevansi",
            jenisrelevansi: Tipe,
            iduser: localStorage.getItem("Id_user"),
          }),
        });

        if (!res.ok) throw new Error("Network response was not ok");

        const hasil = await res.json();
        return hasil as any; // Aman, fleksibel
      }
    },
    staleTime: 1000 * 60 * 5,
  });

  if (isLoading) return renderLoading("Memuat data...", LoadingAnimation);

  if(error) return renderLoading("Jaringan Bermasalah", FailureAnimation);

  if(Tipe == "BaruDilihat") return(
  <>
    <div className="h-full w-full flex flex-wrap items-start gap-2 mt-5">
      {data.map((buku: DetilBukuState, index: number) => (
        <div
          key={index}
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
            console.log(
              buku.Judul,
              buku.Gambar,
              buku.Penulis,
              buku.Kategori,
              buku.Bahasa,
              buku.Tahun,
              buku.Rating,
              buku.Harga
            );

            Slugs(
              updatenilai({
                Judul: buku.Judul,
                Gambar: buku.Gambar,
                Penulis: buku.Penulis,
                Genre: buku.Genre,
                Bahasa: buku.Bahasa,
                Tahun: buku.Tahun,
                Harga: buku.Harga,
                Kategori: buku.Kategori,
                Jenis: buku.Jenis,
                Disukai: buku.Disukai,
                Diskon: buku.Diskon,
                Penerbit: buku.Penerbit,
                ISBN: buku.ISBN,
                Deskripsi: buku.Deskripsi,
                ID: buku.ID,
              })
            );
          }}
          className="buku-card w-[360px] h-[280px] bg-gradient-to-br from-white/10 via-white/20 to-white/10 backdrop-blur-md border border-white/30 rounded-3xl shadow-lg overflow-hidden m-4 transition-transform hover:scale-[1.04] hover:shadow-2xl cursor-pointer flex"
        >
          <div className="grid grid-cols-[140px_1fr] h-full">
            {/* Gambar & Tombol */}
            <div className="relative flex flex-col bg-white/20 backdrop-blur-sm rounded-l-3xl overflow-hidden p-4">
              <img
                src={buku.Gambar}
                className="object-contain h-[230px] w-[130px] rounded-xl shadow-inner mx-auto"
              />
              <div className="flex justify-center gap-2 mt-2">
                {/* Like */}
                <button
                  className="w-9 h-9 bg-white/30 hover:bg-white/50 backdrop-blur-sm rounded-full flex items-center justify-center text-white shadow-md transition-all p-4"
                  title="Like"
                >
                  <FontAwesomeIcon icon={faThumbsUp} className="w-4 h-4" />
                </button>

                {/* Love */}
                <button
                  id={`lobe${buku.ISBN}`}
                  className={`w-9 h-9 bg-white/30 hover:bg-white/50 backdrop-blur-sm rounded-full flex items-center justify-center ${
                    buku.Disukai === "buku disukai" ? "text-red-500" : "text-gray-500"
                  } shadow-md transition-all p-4`}
                  title="Love"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    fetch("http://192.168.1.4:8080/user", {
                      method: "POST",
                      headers: {
                        "Content-Type": "application/json",
                      },
                      body: JSON.stringify({
                        tujuan: "Favorit",
                        iduser: `${localStorage.getItem("Id_user")}`,
                        namabuku: buku.Judul,
                        isbn: `${buku.ISBN}`,
                        namauser: localStorage.getItem("userNama"),
                      }),
                    })
                      .then((res) => {
                        if (!res.ok) throw new Error("Network response was not ok");
                        return res.json();
                      })
                      .then((hasil: any) => {
                        if (hasil.HasilUser.Kondisi === "Tidak Disukai") {
                          document.getElementById(`lobe${buku.ISBN}`)?.classList.remove("text-red-500");
                          document.getElementById(`lobe${buku.ISBN}`)?.classList.add("text-gray-500");
                        } else if (hasil.HasilUser.Kondisi === "Disukai") {
                          document.getElementById(`lobe${buku.ISBN}`)?.classList.add("text-red-500");
                          document.getElementById(`lobe${buku.ISBN}`)?.classList.remove("text-gray-500");
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

            {/* Informasi Buku */}
            <div className="flex flex-col justify-between p-5 text-neutral-100">
              <div className="space-y-1">
                <h3 className="text-lg font-bold text-white/90 line-clamp-2">{buku.Judul}</h3>
                <p className="text-sm text-white/70 font-semibold">Penulis: {buku.Penulis}</p>
                <p className="text-xs text-white/50 italic tracking-wide">Genre: {buku.Kategori}</p>
                <p className="text-xs text-white/50">Bahasa: {buku.Bahasa ?? "ID"}</p>
                <p className="text-xs text-white/50">Tahun: {buku.Tahun}</p>
                <p className="text-xs text-white/50">
                  Rating: <span className="font-medium">{buku.Rating ?? "Belum Dinilai"}</span>
                </p>
              </div>

              {/* Harga + Diskon */}
              <div className="mt-4">
                <button
                  style={{ fontFamily: "Inter, sans-serif" }}
                  className="relative px-6 py-2 w-full bg-white/20 hover:bg-white/30 active:bg-teal-700 rounded-xl shadow-lg text-white font-semibold text-sm transition duration-300 ease-in-out flex items-center justify-center"
                >
                  <span>Rp.{buku.Harga}</span>
                  {buku.Diskon && (
                    <span className="absolute -top-2 -right-2 bg-red-500 text-xs px-2 rounded-full shadow-md font-bold">
                      {buku.Diskon}%
                    </span>
                  )}
                </button>
              </div>

              <div className="text-[10px] text-white/30 mt-3 select-none">Katalog Buku Digital</div>
            </div>
          </div>
        </div>
      ))}

    </div>
  </>
  )


  return(
    <>
    </>
  )
}