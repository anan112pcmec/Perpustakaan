import { faBookBookmark, faChartLine, faComment, faHeart, faStar, faThumbsUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch, useSelector } from "react-redux"
import { Swiper, SwiperSlide } from "swiper/react"
import CountUp from "../../React_bits_compo/CountUp/CountUp";
import { useQuery } from "@tanstack/react-query";
import { animate } from "animejs";
import React, { useEffect, useRef, useState } from "react";
import { setSearchQuery } from "./CariBukuState";
import Lottie from "lottie-react";
import LoadingAnimation from '../../lottie/Sandy_Loading.json';
import FailureAnimation from '../../lottie/Questions.json'
import { Detailbuku } from "../DetailBuku/DetailBuku";
import { updatenilai } from "../DetailBuku/DetailBukuState";



export default function CariBuku() {
  const IklanEl = useRef<HTMLDivElement | null>(null)
  const ElemenBook = useRef<HTMLDivElement | null>(null)
  const Nama = localStorage.getItem("userNama");
  const dispatch = useDispatch();
  const DetilBukuEl = useRef(null);
  useEffect(() => {
    dispatch(setSearchQuery(""));
  }, [])

  const [BukuDicari, setBukuDicari] = useState("");
  const [PembantuPencarian, setPembantuPencarian] = useState(false);

  useEffect(() => {
    if(BukuDicari !== "") {
      setPembantuPencarian(true)
       animate("#ElemenBantuPencarian", {
          opacity: [0, 1],
          scale: [0.9, 1],
          easing: "easeOutQuint",
          duration: 400,
        });
    } else {
      setPembantuPencarian(false)
    }
  }, [BukuDicari])

  function UbahDicari(Input:string){
    setBukuDicari(Input)
  } 

  function RunAnimationInit(){
  let queue: HTMLElement[] = [];
  let animating = false;

  const runAnimationQueue = () => {
    if (queue.length === 0) {
      animating = false;
      return;
    }

    animating = true;
    const el = queue.shift()!;
    animate(el, {
      opacity: [0, 1],
      translateX: [40, 0],
      duration: 600,
      easing: "easeOutQuad",
      complete: () => {
        runAnimationQueue(); 
      },
    });
  };
  

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const el = entry.target as HTMLElement;

          if (el.classList.contains("viewbuku")) {
           
            if (!queue.includes(el)) {
              queue.push(el);
            }
            obs.unobserve(el);
          } else if (el === IklanEl.current) {
            
            animate(el, {
              opacity: [0, 1],
              translateY: [20, 0],
              duration: 600,
              easing: "easeOutQuad",
            });
            obs.unobserve(el);
          } else if (el === ElemenBook.current) {
          
            animate(el, {
              opacity: [0, 1],
              translateY: [20, 0],
              duration: 600,
              easing: "easeOutQuad",
            });
            obs.unobserve(el);
          }
        }
      });

      if (!animating && queue.length > 0) {
        runAnimationQueue();
      }
    },
    { threshold: 0.1 }
  );

  if (IklanEl.current) {
    IklanEl.current.style.opacity = "0";
    IklanEl.current.style.transform = "translateY(20px)";
    observer.observe(IklanEl.current);
  }

  if (ElemenBook.current) {
    ElemenBook.current.style.opacity = "0";
    ElemenBook.current.style.transform = "translateY(20px)";
    observer.observe(ElemenBook.current);
  }

  const viewBukuElements = document.querySelectorAll(".viewbuku");
    viewBukuElements.forEach((el: any) => {
      el.style.opacity = "0";
      el.style.transform = "translateX(40px)";
      observer.observe(el);
    });

    return () => observer.disconnect();
  }

  useEffect(() => {
    RunAnimationInit()
  }, []);

  const Dicari:string = useSelector((state:any) => state.caribuku.searchQuery)

  useEffect(() => {
    if(Dicari == ""){
      RunAnimationInit()
    } else {
      
    }
  }, [Dicari])

  let timeoutId: number | undefined;

  return(
    <>
    <div className="grid grid-rows-[10%_5%_85%] h-screen p-5" >

      <div className="grid grid-cols-[30%_70%]">
        <div className="pt-4 text-5xl text-neutral-100 font-semibold" style={{ fontFamily: "Inter, sans-serif" }}>
          Beranda
        </div>
        <div>
          <div className="w-full h-full flex items-center justify-center space-x-2">

            <Detailbuku/>
            
            <div className="max-w-md w-[90%] relative"
            onMouseEnter={() => {
              setPembantuPencarian(true);
              if (timeoutId) clearTimeout(timeoutId);
            }}
            onMouseLeave={() => {
              timeoutId = setTimeout(() => setPembantuPencarian(false), 200);
            }}

              >
              <div 
              className="backdrop-blur-md bg-white/20 border border-white/30 rounded-xl shadow-lg px-4 py-2 flex items-center space-x-3 w-full">
                <i className="fa-solid fa-magnifying-glass text-white text-lg"></i>
                <input
                  type="text"
                  placeholder="Cari sesuatu..."
                  className="bg-transparent outline-none text-white placeholder-white w-full"
                  value={BukuDicari}
                  onChange={(e) => {
                    e.preventDefault();
                    UbahDicari(e.target.value);
                  }}
                />
              </div>

              {PembantuPencarian == true ? (
                <>
                  {/* Elemen pembantu pencarian melayang */}
                  <div id="ElemenBantuPencarian" className="p-3 absolute top-full left-0 mt-2 w-full border border-white/5 bg-white/10 backdrop-blur-md rounded-xl shadow text-white space-y-2 transition-all duration-300 z-50">
                    {/* Isi hasil pencarian atau saran */}
                    <div
                      onClick={() => {
                        setPembantuPencarian(false);
                        dispatch(setSearchQuery("One Piece"))
                      }}
                      className="p-2 cursor-pointer hover:bg-white/20 transition-colors rounded-xl"
                    >
                      🔍 Saran: One Piece
                    </div>
                    <hr />
                    <div className="p-2">🔍 Saran: One Punch Man</div>
                    <hr />
                    <div className="p-2">🔍 Saran: One OK Rock</div>
                  </div>
                </>
              ) : (
                <></>
              )}
            </div>
            <div
              className="group cursor-pointer backdrop-blur-md bg-white/10 border border-white/20 rounded-xl p-2 shadow-md text-white flex items-center justify-center
                transition-all duration-300 ease-out
                hover:scale-110
                active:bg-red-500 active:text-white"

                onClick={() => {
                  console.log(BukuDicari, "Nihyangdicaricari");
                  dispatch(setSearchQuery(BukuDicari));
                }}

            >
              <i className="fa-solid fa-search text-2xl transition-colors duration-300"></i>
            </div>
            <div
              className="group cursor-pointer backdrop-blur-md bg-white/10 border border-white/20 rounded-xl p-2 shadow-md text-white flex items-center justify-center
                transition-all duration-300 ease-out
                hover:scale-110
                active:bg-red-500 active:text-white"

                onClick={() => {
                  UbahDicari("");
                  dispatch(setSearchQuery(""));
                }}

            >
              <i className="fa-solid fa-xmark text-2xl transition-colors duration-300"></i>
            </div>
            <div className="relative group cursor-pointer"
            onClick={() => {
              UbahDicari("");
              dispatch(setSearchQuery("Menunjukan Semua Buku"));
            }} >
              <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-xl p-2 shadow-md text-white flex items-center justify-center transition-all duration-300 hover:scale-110">
                <i className="fa-solid fa-inbox text-2xl"></i>
              </div>
              <div className="absolute w-[300px] top-full mt-2 left-1/2 -translate-x-1/2 bg-black/70 text-white text-sm px-3 py-1 rounded shadow opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none">
                Daftar Seluruh Buku
              </div>
            </div>

            <hr />

          </div>
        </div>
      </div>
      <hr className="mt-2" />

      <div className="w-full overflow-y-auto"  style={{
              scrollbarWidth: "none", 
              msOverflowStyle: "none", 
            }}>
        {Dicari ? (
          <div className="">
            <PencarianBukuInit Dicari={Dicari} />
          </div>
        ) 
        :
       (
        <>
        <div  
        ref={IklanEl}
        style={{
        scrollbarWidth: "none", // Firefox
        msOverflowStyle: "none", // IE/Edge
            }}>
          <Swiper className="swiperku w-full max-w-full rounded-xl">
              {/* Slide Gambar - ukuran asli dan tengah */}
            <SwiperSlide className="flex justify-center items-center h-[170px]">
              <div className="w-full h-full bg-white/7 backdrop-blur-lg rounded-xl shadow-md p-4 flex justify-center items-center gap-4">
                <img 
                  src="https://lh3.googleusercontent.com/DgYEMoJUsegNo0sNvfJYzmlnuU8Kc-UPGDMO9Cgd5jyj5q4-sHkpem-Bprkg1m6rIJurOsWdEK0PM945obceaShEDUzFss3toAg=w1064" 
                  alt="Slide 1"
                  className="h-[170px] rounded-lg"
                />
                
                <img 
                  src="https://lh3.googleusercontent.com/k2WqzDH6Izs3aj69UcSF6g8b9ZEZfMlmW4b53KMDCYoIY9H_eTRXLppKInYdL_GtDlvQWuYSJeCdlJ7Jo0jo9VaLjyzODr-n8h0=w1064" 
                  alt="Slide 2"
                  className="h-[170px] rounded-lg"
                />
                
                <img 
                  src="https://lh3.googleusercontent.com/OU46AwWgmo_JDv267teUP5MttWJTrEoToQKxwT1KiQm-I15EYsVDIfYhnvADulfMKdGiZsUgcPXdNJQSdtAYnJ05QJboxbyXzofH=w1064" 
                  alt="Slide 3"
                  className="h-[170px] rounded-lg"
                />
              </div>


            </SwiperSlide>

            {/* Slide Teks - glassmorphism */}
            <SwiperSlide className="flex justify-center items-center h-[170px]">
              <div className="w-full h-full bg-white/20 backdrop-blur-md rounded-xl shadow-md flex justify-center items-center">
                <div className="text-lg font-medium text-gray-800">Mantap</div>
              </div>
            </SwiperSlide>
          </Swiper>


        </div>
          <div className="Saran viewbuku">
          <Bukutrend 
            Berdasarkan="Popularitas" 
            Deskripsi="Disini Berisi Buku Yang Sedang Naik Daun" 
            Icon={<FontAwesomeIcon icon={faChartLine} />} 
            IconColor="text-rose-300" 
             
            WarnaBadge="bg-gradient-to-r from-pink-300 via-rose-400 to-red-500" 
          />
        </div>

        <div className="Saran viewbuku mt-14">
          <Bukutrend 
            Berdasarkan="Rating Tertinggi" 
            Deskripsi="Kumpulan buku dengan penilaian terbaik dari pembaca" 
            Icon={<FontAwesomeIcon icon={faStar} />} 
            IconColor="text-yellow-400" 
            
            WarnaBadge="bg-gradient-to-r from-yellow-300 via-amber-400 to-orange-500" 
          />
        </div>

        <div className="Saran viewbuku mt-14">
          <Bukutrend 
            Berdasarkan="Jumlah Pembaca" 
            Deskripsi="Buku-buku yang paling sering dibaca atau diakses" 
            Icon={<FontAwesomeIcon icon={faBookBookmark} />} 
            IconColor="text-blue-400" 
            
            WarnaBadge="bg-gradient-to-r from-blue-300 via-sky-400 to-indigo-500" 
          />
        </div>

        <div ref={ElemenBook} className="h-[680px] mt-14 p-4">
          <span className="text-neutral-300 text-2xl mb-5" style={{ fontFamily: "Inter, sans-serif" }}>
            Untuk {Nama}
          </span>
          <div
            className="mt-5 flex flex-wrap gap-4 h-[600px] overflow-y-auto"
            style={{
              scrollbarWidth: "none", // Firefox
              msOverflowStyle: "none", // IE/Edge
            }}
          >
            <DisplayBukuNih />
          </div>

        </div>

        </>
       )}
      </div>
    </div>

    </>
  )
}

const DisplayBukuNih = () => {
  const Slugs = useDispatch();
  const bukuRef = useRef<(HTMLDivElement | null)[]>([]);
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
  };

  const [dataBuku, setDataBuku] = useState<Buku[]>([]);

  useEffect(() => {
    const cards = document.querySelectorAll(".buku-card");
    cards.forEach((el, i) => {
      setTimeout(() => {
        animate(el, {
          opacity: [0, 1],
          scale: [0.8, 1],
          easing: "easeOutExpo",
          duration: 500,
        });
      }, i * 100); 
    });
  }, [dataBuku]);

  const judul = React.useMemo(() => {
    if (!dataBuku || dataBuku.length === 0) return null;

    const hasil = dataBuku
      .map(item => (typeof item.judul === "string" ? item.judul : ""))
      .filter(Boolean);

    return hasil.length > 0 ? hasil : null;
  }, [dataBuku]);


  console.log("nih jud", judul)

  const { isLoading, error, data } = useQuery({
    queryKey: ["AmbilBukuBeranda"],
    queryFn: () =>
      fetch("http://localhost:8080/user", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ tujuan: "AmbilBukuScroll", bukanbuku: judul }),
      }).then((res) => {
        if (!res.ok) throw new Error("Network response was not ok");
        return res.json();
      })
  });

  useEffect(() => {
    if (data?.HasilUser?.length) {
      setDataBuku(prev => [...prev, ...data.HasilUser]);
    }
  }, [data]);

  useEffect(() => {
    console.log(judul);
  }, [judul]);

  if (isLoading) return "Loading...";
  if (error) return "An error has occurred: " + (error as Error).message;

  console.log(dataBuku, "NIHCOY");

  return(
    <>
      {dataBuku.map((buku: Buku, index: number) =>
        buku.tahun && buku.gambar && buku.penulis ? (
          <div
            key={index}
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
                })
              );
            }}
            className="buku-card w-[360px] h-[280px] bg-gradient-to-br from-white/10 via-white/20 to-white/10 backdrop-blur-md border border-white/30 rounded-3xl shadow-lg overflow-hidden m-4 transition-transform hover:scale-[1.04] hover:shadow-2xl cursor-pointer flex"
          >
            <div className="grid grid-cols-[140px_1fr] h-full">
              <div className="relative flex flex-col bg-white/20 backdrop-blur-sm rounded-l-3xl overflow-hidden p-4">
                {/* Gambar */}
                <img
                  src={buku.gambar}
                  alt={buku.judul}
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
                    className="w-9 h-9 bg-white/30 hover:bg-white/50 backdrop-blur-sm rounded-full flex items-center justify-center text-red-500 shadow-md transition-all p-4"
                    title="Love"
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
    </>
  )
}

interface Buku{
  Berdasarkan: string;
  WarnaBadge: string;
  Icon: any;
  IconColor: string;
  Deskripsi: string;
}

const Bukutrend = ({Berdasarkan, WarnaBadge, Icon, IconColor, Deskripsi}: Buku) => {
  return(
    <>
    <div className="h-[300px] p-4 ">
      <div className="grid grid-cols-[15%_85%] space-x-5">
        <div className="grid grid-rows-[20%_80%]">
            <div className="  bg-white/4 border border-white/20 rounded-xl h-[250px]">
              <div className="flex text-xl font-medium text-slate-700 text-center p-2" style={{ fontFamily: "Inter, sans-serif" }}>
              <div className={`w-4 mt-2 ml-2 h-4 rounded-full ${WarnaBadge} shadow-md`}></div>
              <span className="ml-2 mt-1 text-neutral-200">{Berdasarkan}</span>
            </div>
      
            <hr className="mt-1"/>
            <div className="flex items-center justify-center mt-1 p-5">
              <div className="w-full h-[100px] rounded-xl border border-white/20 flex items-center justify-center">
                <span className={`text-4xl ${IconColor}`}>{Icon} <CountUp from={0}
                  to={100}
                  separator=","
                  direction="up"
                  duration={1}
                  className="count-up-text"
  
                /></span>
              </div>
            </div>

            <div className="text-xs pl-5 pb-5 mb-5 text-neutral-300"
            style={{ fontFamily: "Inter, sans-serif" }}>
              {Deskripsi}
            </div>
            
          </div>  

      </div>

      <div className="rounded-xl h-[250px]"
      style={{
        background:
        Berdasarkan === "Popularitas"
          ? "linear-gradient(to right, rgba(255, 0, 0, 0.2) 2%, transparent 100%)"
          : Berdasarkan === "Rating Tertinggi"
          ? "linear-gradient(to right, rgba(255, 223, 0, 0.2) 2%, transparent 100%)"
          : "linear-gradient(to right, rgba(0, 123, 255, 0.2) 2%, transparent 100%)",

          backgroundClip: "padding-box", // gradient tidak sampai ke border
          borderRadius: "12px", // pastikan ada border radius kalau mau halus
            }}>
              <ViewingBuku Berdasarkan={Berdasarkan}/>
            <div>
          </div>
        </div>
          
      </div>

    <hr className="mt-5 mb-5" />
          <div className="w-full h-[200px]">
            <span style={{ fontFamily: "Inter, sans-serif" }} className="text-neutral-200">
              Buku-buku yang saat ini ditampilkan merupakan hasil kurasi berdasarkan {Deskripsi}, yang secara khusus dipilih karena memenuhi kriteria sebagai {Berdasarkan}.
            </span>

          </div>
  </div>

    </>
  )

}


interface ViewBuku {
  Berdasarkan: string;
}

const ViewingBuku = ({ Berdasarkan }: ViewBuku) => {

  const cardRef = useRef<HTMLDivElement[]>([]);
  const Gambar = useRef<HTMLDivElement[]>([])

  const { isPending, error, data } = useQuery({
    queryKey: ["AmbilDataUserRiwayatPeminjaman", Berdasarkan],
    queryFn: () =>
      fetch("http://localhost:8080/user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          tujuan: "AmbilDataBukuView",
          berdasarkan: Berdasarkan,
        }),
      }).then((res) => {
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        return res.json();
      })
  });

  if (isPending)
    return (
      <div className="flex items-center justify-center">
        <span className="text-3xl text-center text-neutral-300 mt-[115px]" style={{ fontFamily: "Inter, sans-serif" }}>
          ...Loading
        </span>
      </div>
    );

  if (error)
    return (
      <div className="flex items-center justify-center flex-col">
        <span className="text-3xl text-center text-neutral-300 mt-[115px]" style={{ fontFamily: "Inter, sans-serif" }}>
          {"An error has occurred: " + error.message}
        </span>
        <span className="text-sm text-center text-neutral-200 mt-5" style={{ fontFamily: "Inter, sans-serif" }}>
          Ada Masalah jaringan
        </span>
      </div>
    );

  if (!data.HasilUser || data.HasilUser.length === 0)
    return (
      <div className="flex items-center justify-center flex-col">
        <span className="text-3xl text-center text-neutral-300 mt-[115px]" style={{ fontFamily: "Inter, sans-serif" }}>
          ..Failed
        </span>
        <span className="text-sm text-center text-neutral-200 mt-5" style={{ fontFamily: "Inter, sans-serif" }}>
          Data tidak ditemukan atau kosong
        </span>
      </div>
    );

  return (
   <div
    className="p-3 w-full flex items-start flex-wrap gap-4 rounded-xl"
    style={{
     
      boxShadow: "0 0px 0px rgba(74, 195, 247, 0.15)",
    }}
  >
  {data.HasilUser.map((buku: any, index: number) => (
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
  ))}

</div>

  );
};

interface Dicarinyo {
  Dicari: string;
}

 export const renderLoading = (message: string = "Sedang memuat...", icon?: any) => {
    return (
      <div
        style={{
          width: 300,
          margin: "auto",
          textAlign: "center",
          marginTop: 50,
        }}
      >
        {icon && (
          <Lottie
            animationData={icon}
            loop={message === "Memuat data..."}
            autoplay
          />
        )}
        <p>{message}</p>
      </div>
    );
  };

const PencarianBukuInit = ({ Dicari }: Dicarinyo) => {
 
  const bukuRef = useRef<(HTMLDivElement | null)[]>([]);
  const [BerhasilDapetBuku, setBerhasilDapetBuku] = useState(false)
  const Slugs = useDispatch();

  const { isLoading, error, data } = useQuery({
    queryKey: ["AmbilBukuberdasarkanPencarian", Dicari], 
    queryFn: () =>
      fetch("http://localhost:8080/user", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          tujuan: "AmbilDataBukuBerdasarkanPencarian",
          pencarian: Dicari,
        }),
      }).then((res) => {
        if (!res.ok) throw new Error("Network response was not ok");
        return res.json();
      }),
  });


   useEffect(() => {
    if (data?.HasilUser && data.HasilUser.length > 0) {
      setBerhasilDapetBuku(true);
    } else {
      setBerhasilDapetBuku(false);
    }
  }, [data]);

  // Animasi saat Dicari berubah dan buku sudah berhasil didapat
  useEffect(() => {
    if (BerhasilDapetBuku) {
      bukuRef.current.forEach((el) => {
        if (el) {
          animate(el, {
            opacity: [0, 1],
            scale: [0.8, 1],
            easing: "easeOutQuart",
            duration: 500,
          });
        }
      });
    }
  }, [Dicari, BerhasilDapetBuku]);


  if (isLoading) return renderLoading("Memuat data...", LoadingAnimation);

  if (error) return renderLoading("Terjadi kesalahan saat mengambil data.", FailureAnimation);

  // ✅ Success state
  if (data?.HasilUser && data.HasilUser.length > 0) {
    return (
      <div
       className="mt-5 flex flex-wrap gap-4 h-[600px] overflow-y-auto"
            style={{
              scrollbarWidth: "none", // Firefox
              msOverflowStyle: "none", // IE/Edge
            }}>
          {data.HasilUser.map((buku: any, index: number) => (
           <div
            key={index}
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
              console.log("slug jalan")
              console.log(buku.judul, buku.gambar, buku.penulis, buku.kategori, buku.bahasa, buku.tahun, buku.rating, buku.harga);
              Slugs(
                updatenilai({
                  Judul: buku.judul,
                  Gambar: buku.gambar,
                  Penulis: buku.penulis,
                  Genre: buku.genre,
                  Bahasa: buku.bahasa,
                  Tahun: buku.tahun,
                  Rating: buku.rating,
                  Harga: buku.harga,
                })
              );
            }}
            className="buku-card w-[360px] h-[280px] bg-gradient-to-br from-white/10 via-white/20 to-white/10 backdrop-blur-md border border-white/30 rounded-3xl shadow-lg overflow-hidden m-4 transition-transform hover:scale-[1.04] hover:shadow-2xl cursor-pointer flex"
          >
            <div className="grid grid-cols-[140px_1fr] h-full">
              <div className="relative flex flex-col bg-white/20 backdrop-blur-sm rounded-l-3xl overflow-hidden p-4">
                {/* Gambar */}
                <img
                  src={buku.gambar}
                  alt={buku.judul}
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
                    className="w-9 h-9 bg-white/30 hover:bg-white/50 backdrop-blur-sm rounded-full flex items-center justify-center text-red-500 shadow-md transition-all p-4"
                    title="Love"
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
          ))}
      </div>
    );
  }

  return renderLoading(`Tak Ditemukan Untuk Pencarian ${Dicari}`, FailureAnimation)
};
