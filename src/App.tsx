import { useEffect, useRef, useState } from 'react';
import './App.css';
import Swiperrek from './Swiperrek';
import Footer from './Footer';
import Particles from './React_bits_compo/ParticlesBG';
import Stepper, { Step } from  './React_bits_compo/Stepper';
import '../src/React_bits_compo/Glass.css';
import ShinyText from './React_bits_compo/ShinyText';
import CardSwap, { Card } from './React_bits_compo/CardSwap/CardSwap'
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from 'swiper/modules';
import Masonry from './React_bits_compo/Masonry/Masonry';
import { animate } from 'animejs';
import CardProduk from './CardProduk';
import Header from './Header';

import ServiceCard from './ServiceCompo';
import PostFloodTester from './Postbtn';
import BadRequestTester from './XSSattack';



export default function App() {
  const [link, uselink] = useState("")
  const [loginData, setLoginData] = useState<{ sudah_login?: boolean; nama?: any; pw?: any }>({})
  const [namaPengguna, setnamapengguna] = useState("");
  const [pwPengguna, setPasswordpengguna] = useState("");

  const box1 = useRef(null);
  const box2 = useRef(null);
  const box3 = useRef(null);
  const box4 = useRef(null);
  const TextBawah = useRef(null);

  const antara = [box1, box2, box3, box4, TextBawah];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animate(entry.target, {
              opacity: [0, 1],
              translateY: [40, 0],
              easing: 'easeOutExpo',
              duration: 1200,
            });
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.3,
      }
    );

    antara.forEach((box:any) => {
      if (box.current) {
        // Atur default state dulu
        box.current.style.opacity = 0;
        box.current.style.transform = 'translateY(40px)';
        observer.observe(box.current);
      }
    });

    return () => observer.disconnect();
  }, []);

  const itemss = [
    {
      id: "1",
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR1u_vRbnUqz1VlSG81Q4YefkgyfaOgqLj0kg&s",
      url: "https://example.com/one",
      height: 400,
    },
    {
      id: "2",
      img: "https://www.datocms-assets.com/44232/1632764400-gn9104560d0.jpg",
      url: "https://example.com/two",
      height: 100,
    },
    {
      id: "3",
      img: "https://static01.nyt.com/images/2015/10/24/opinion/24manguel/24manguel-facebookJumbo.jpg?year=2015&h=550&w=1050&s=73323c30453d9b362009b3a101f57676969e5f8b29dab688e6ba88190cf5164d&k=ZQJBKqZ0VN",
      url: "https://example.com/three",
      height: 300,
    },
    {
      id: "4",
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTjGsekblNTno4NKdemZ6H2gMl62Bf5WgJCBA&s",
      url: "https://example.com/three",
      height: 200,
    },
    {
      id: "5",
      img: "https://picsum.photos/id/1020/600/800?grayscale",
      url: "https://example.com/three",
      height: 200,
    },
    {
      id: "6",
      img: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/Long_Room_Interior%2C_Trinity_College_Dublin%2C_Ireland_-_Diliff.jpg/1200px-Long_Room_Interior%2C_Trinity_College_Dublin%2C_Ireland_-_Diliff.jpg",
      url: "https://example.com/three",
      height: 300,
    },
    {
      id: "7",
      img: "https://www.hks.harvard.edu/sites/default/files/styles/hero_small_breakpoint/public/general_page/small_hero_image/HKSLibrary_SilentStudy_7_1MB.jpg?itok=QNf_wWaW",
      url: "https://example.com/three",
      height: 100,
    },
     {
      id: "8",
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRos2Oi7e1h1EuLieu3l41tR8HfN-3C63HNAw&s",
      url: "https://example.com/three",
      height: 100,
    },
     {
      id: "9",
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRWil5lnoRcXsEzAgqAVLAqTiqp8pzk5-DNCg&s",
      url: "https://example.com/three",
      height: 100,
    },
    {
      id: "10",
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTNuTjLC-wx5-Q5owWeu75SBeqa0TQQ_YBc8w&s",
      url: "https://example.com/three",
      height: 100,
    },
    {
      id: "11",
      img: "https://www.miltonandking.com/wp-content/uploads/2018/10/Wallpaper-Kemra-Bookshelf-1.jpg",
      url: "https://example.com/three",
      height: 100,
    },

    

    // ... more items
];



 
 useEffect(() => {
    // Ambil data dari localStorage pas awal render
    const savedNama = localStorage.getItem("userNama");
    const savedPw = localStorage.getItem("userPassword");

    if(savedNama && savedPw){
      setnamapengguna(savedNama)
      setPasswordpengguna(savedPw)
    }

    if (savedNama != "undefined" && savedPw != "undefined") {
      setLoginData({
        sudah_login: true,
        nama: savedNama,
        pw: savedPw,
      });
    } else {
      setLoginData({
        sudah_login: false,
        nama: "Teman",
        pw: "", // or you can leave it out if you don't want to set pw
      });
    }
  }, []);


  useEffect(() => {
    console.log("dia membuka", link)
  }, [link])

  function Renderlaman() {
    const { nama, pw, sudah_login } = loginData;

    const sudahLoginValid = nama && pw;

    if (link === "home" || link === "") {
      return sudahLoginValid ? (
        <Swiperrek nama={nama} pw={pw} sudah_login={sudah_login} />
      ) : (
        <Swiperrek />
      );
    } else if (link === "features") {
      return <>Belum siap</>;
    } else if (link === "insight") {
      return "belum siap";
    } else if (link.toLowerCase() === "login") {
      return sudahLoginValid ? (
        <Swiperrek nama={nama} pw={pw} sudah_login={sudah_login} />
      ) : (
        <Swiperrek />
      );
    }
  }

  
  const Renderan = Renderlaman();

  const mangaList = [
  {
    link_gambar: "https://prili.primakara.ac.id/uploads/books/thumbnails/1825.jpg", // contoh asumsi URL
    penulis: "Gege Akutami",
    studio_penerbit: "Elex Media Komputindo",
    nama: "Jujutsu Kaisen Vol. 8",
    harga: 69000,
    penerbit: "Elex Media Komputindo",
    tgl_terbit: "15 Sep 2022",
    halaman: 200,
    genre: "Fantasi, Aksi"
  },
  {
    link_gambar: "https://awsimages.detik.net.id/community/media/visual/2024/03/13/manga-jujutsu-kaisen-volume-26.jpeg?w=1200",
    penulis: "Gege Akutami",
    studio_penerbit: "Elex Media Komputindo",
    nama: "Jujutsu Kaisen Vol. 18",
    harga: 69000,
    penerbit: "Elex Media Komputindo",
    tgl_terbit: "10 Jan 2024",
    halaman: 192,
    genre: "Fantasi, Aksi"
  },
  {
    link_gambar: "https://cdn.gramedia.com/uploads/items/9786230022180_Jujutsukaisen_1.jpg",
    penulis: "Gege Akutami",
    studio_penerbit: "Elex Media Komputindo",
    nama: "Jujutsu Kaisen Vol. 13",
    harga: 69000,
    penerbit: "Elex Media Komputindo",
    tgl_terbit: "05 Jun 2023",
    halaman: 208,
    genre: "Fantasi, Aksi"
  },
  {
    link_gambar: "https://www.static-src.com/wcsstore/Indraprastha/images/catalog/full//107/MTA-65964464/elex_media_komputindo_komik_jujutsu_kaisen_vol_7_-_gege_akutami_full01_ulwuqb8n.jpg",
    penulis: "Gege Akutami",
    studio_penerbit: "Elex Media Komputindo",
    nama: "Jujutsu Kaisen Vol. 19",
    harga: 69000,
    penerbit: "Elex Media Komputindo",
    tgl_terbit: "20 Okt 2023",
    halaman: 208,
    genre: "Fantasi, Aksi"
  },
  // bisa ditambah lagi serupa
];

const DataService = [
  {
    icon: "gambar/gambarPelayanan.png",
    namaservice: "Pelayanan",
    deskripsi: "Pelayanan Kami Bertujuan Untuk Membantu Seluruh Pengguna Aplikasi dan yang terhubung dengan sistem Kami"
  },
]


 
  return (
  <>
  
    {/* Particles sebagai background */}
    {/* Particles Background Interactive */}
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 0, // paling belakang
        pointerEvents: 'auto', // agar bisa di-hover
      }}
      className="glow-bg"
    >
      <Particles
        particleColors={['#60f542', '#25b7c4']}
        particleCount={100}
        particleSpread={10}
        speed={0.1}
        particleBaseSize={100}
        moveParticlesOnHover={true}
        alphaParticles={false}
        disableRotation={false}
      />
    </div>

    {/* Konten utama di atasnya */}
    <div className="relative z-10">
      <div>
        <Header/>
      </div>

      {/* Grid konten */}
      <div className="grid grid-cols-[70%_30%] gap-4">
        <div>
          {Renderan}
        </div>
  
      <div>
        <div style={{ height: '600px', position: 'relative' }}>
          <CardSwap
            cardDistance={60}
            verticalDistance={70}
            delay={5000}
            pauseOnHover={true}
          >
            <Card>
              <div
                style={{
                  height: "45px",
                  background: "linear-gradient(to top, rgba(190, 250, 237, 0.2) 2%, transparent 100%)",
                  boxShadow: "0 0px 0px rgba(74, 195, 247, 0.15)",
                  fontFamily: "Urbanist, sans-serif"
                }}
                className="border-b border-neutral-300 p-2 text-neutral-200 text-xl font-medium" 

              >
                <i className="fa-solid fa-cubes-stacked ml-3"></i> <span className='ml-2'>Produk Kami</span>
                
              </div>

              <div>
                <Swiper
                  slidesPerView={1}
                  loop={true}
                  speed={2000} // durasi transisi antar slide (ms)
                  autoplay={{
                    delay: 0,            // tidak ada jeda antar geseran
                    disableOnInteraction: false,
                    pauseOnMouseEnter: false,
                  }}
                  modules={[Autoplay]}
                >
                  
                  {mangaList.map((item, index) => (
                    <SwiperSlide key={index}>
                      <CardProduk {...item} />
                    </SwiperSlide>
                  ))}
                
                </Swiper>
              </div>


            </Card>
            <Card>
              <div
                style={{
                  height: "45px",
                   background: "linear-gradient(to top, rgba(190, 250, 237, 0.2) 2%, transparent 100%)",
                  boxShadow: "0 0px 0px rgba(74, 195, 247, 0.15)",
                  fontFamily: "Urbanist, sans-serif"
                }}
                className="border-b border-green-200 p-2 text-lime-100 text-xl "
              >
                <i className="fa-solid fa-tree ml-3"></i> <span className='ml-2'>Lingkungan Kami</span>
              </div>
              <div className="pb-11 h-full" >
                <div className="grid grid-rows-[7fr_3fr] h-full rounded-lg overflow-hidden shadow-lg">
                  <div className="">
                    <Masonry
                    itemss={itemss}
                    ease="power3.out"
                    duration={0.6}
                    stagger={0.05}
                    animateFrom="bottom"
                    scaleOnHover={true}
                    hoverScale={0.95}
                    blurToFocus={true}
                    colorShiftOnHover={false}
                  />
                  </div>
                  <div className="bg-white/10 p-3 text-xs text-neutral-200" style={{ fontFamily: "Inter, sans-serif" }}>
                    BiblioVerse adalah ekosistem digital yang menghubungkan perpustakaan, toko buku, dan pembaca dari berbagai penjuru.  
                    Di sini, kamu bisa merasakan suasana perpustakaan yang tenang sekaligus menikmati kemudahan menjelajah ribuan buku seperti berada di toko buku modern.  
                    Jelajahi koleksi kami yang terus berkembang—mulai dari karya sastra klasik, buku pelajaran, hingga rilisan terbaru dari penulis favoritmu.  
                    Temukan pengalaman membaca yang nyaman, tertata, dan bebas gangguan—semuanya dalam satu platform.
                  </div>

                </div>
              </div>

      

            </Card>
            <Card>
              <div
                style={{
                  height: "45px",
                  background: "linear-gradient(to top, rgba(220, 240, 255, 0.25) 2%, transparent 100%)",
                  boxShadow: "0 0px 0px rgba(120, 180, 250, 0.15)",
                  fontFamily: "Urbanist, sans-serif"
                }}
                className="border-b border-blue-200 p-2 text-blue-900 text-xl"
              >
                <i className="fa-solid fa-headset ml-3"></i> <span className='ml-2'>Service Kami</span>
              </div>

                {DataService.map((item, index) => (
                    <SwiperSlide key={index}>
                      <ServiceCard {...item}/>
                    </SwiperSlide>
                  ))}



            </Card>
            
          </CardSwap>
        </div>
        <Stepper
        initialStep={1}
        onStepChange={(step) => console.log("User di step:", step)}
        onFinalStepCompleted={() => console.log("User selesai onboarding!")}
        backButtonText="Kembali"
        nextButtonText="Lanjut"
        className='mb-[100px]'
      >
        {/* Step 1 - Intro */}
        <Step>
          <div className='' style={{
            height: "600px",
          }}>
          <div className='mt-4 text-4xl text-neutral-200 ' style={{ fontFamily: "Inter, sans-serif" }}>
            <span className="text-white">Crafting </span>
            <span className="text-emerald-500">purpose driven </span>
            <span className="text-white">experiences </span>
            <span className="text-white">that </span>
            <span className="text-emerald-500">inspire</span>
            <span className="text-white"> & </span>
            <span className="text-emerald-500">engage</span>
            <span className="text-white">.</span>
          </div>

          <p className="mt-6 text-white/80 max-w-2xl text-lg">
            Selamat datang di <strong className="text-white">Library Faiz</strong> — platform digital untuk
            menemukan, membeli, atau meminjam buku favoritmu. Kami hadir untuk membuat pengalaman membaca
            lebih nyaman, personal, dan bermakna. <strong>Pencet Jelajahi sekarang </strong><br /><br />
            
          </p>

          </div>
        </Step>

        {/* Step 2 - Eksplorasi Buku */}
        <Step>
          <div className='h-[20px]' style={{
            height: "400px",
          }}>
          <div className='mt-4 text-4xl text-neutral-200' style={{ fontFamily: "Inter, sans-serif" }}>
            <span className="text-emerald-500">Langkah kecil</span>
            <span className="text-white"> untuk awal yang </span>
            <span className="text-lime-400">besar</span>
            <span className="text-white">.</span>
          </div>

          <p className="mt-6 text-white/80 max-w-2xl text-lg">
            Sebelum menjelajahi koleksi kami, silakan isi data dirimu terlebih dahulu. Informasi seperti Gmail dan kata sandi akan membantu kami memberikan pengalaman yang lebih aman dan personal.
          </p>


          </div>
        </Step>

        {/* Step 3 - Transaksi & Peminjaman */}
        <Step>
          <div className='h-[20px]' style={{
            height: "400px",
          }}>
          <div className='mt-4 text-4xl text-neutral-200 ' style={{ fontFamily: "Inter, sans-serif" }}>
            <span className="text-white">Buy or </span>
            <span className="text-lime-400">Borrow</span>
            <span className="text-white"> in seconds.</span>
          </div>

          <p className="mt-6 text-white/80 max-w-2xl text-lg">
            Pilih untuk membeli buku cetak atau cukup pinjam versi digitalnya. Semua transaksi aman, cepat, dan
            transparan.
          </p>

          <div className="mt-4 flex space-x-3">
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded shadow">
              Beli Buku
            </button>
            <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded shadow">
              Pinjam Buku
            </button>
          </div>
          </div>
        </Step>

        {/* Step 4 - Akun & Profil */}
        <Step>
          <div className='h-[20px]' style={{
            height: "400px",
          }}>
          <div className='mt-4 text-4xl text-neutral-200 ' style={{ fontFamily: "Inter, sans-serif" }}>
            <span className="text-lime-400">Create</span>
            <span className="text-white"> your profile, </span>
            <span className="text-lime-400">track</span>
            <span className="text-white"> your journey.</span>
          </div>

          <p className="mt-6 text-white/80 max-w-2xl text-lg">
            Buat akun untuk menyimpan histori bacaan, transaksi, dan wishlist buku favoritmu. Nikmati fitur
            personalisasi penuh.
          </p>

          <div className="mt-4 space-y-3">
            <input
              type="text"
              placeholder="Nama lengkap"
              className="px-4 py-2 w-full bg-white/10 border border-white/20 text-white rounded"
            />
            <input
              type="email"
              placeholder="Email aktif"
              className="px-4 py-2 w-full bg-white/10 border border-white/20 text-white rounded"
            />
          </div>
          </div>
        </Step>

        {/* Step 5 - Rekomendasi Pintar */}
        <Step>
          <div className='h-[20px]' style={{
            height: "400px",
          }}>
          <div className='mt-4 text-4xl text-neutral-200 ' style={{ fontFamily: "Inter, sans-serif" }}>
            <span className="text-white">Get </span>
            <span className="text-lime-400">smart </span>
            <span className="text-white">book </span>
            <span className="text-lime-400">recommendations</span>
            <span className="text-white">.</span>
          </div>

          <p className="mt-6 text-white/80 max-w-2xl text-lg">
            Sistem kami menganalisis preferensimu untuk memberi saran buku paling relevan dan menarik. Baca
            lebih banyak, temukan lebih cepat.
          </p>

          <div className="mt-4">
            <button className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded">
              Lihat Rekomendasi
            </button>
          </div>
          </div>
        </Step>

        {/* Step 6 - Siap Memulai */}
        <Step>
          <div className='h-[20px]' style={{
            height: "400px",
          }}>
          <div className='mt-4 text-4xl text-neutral-200 ' style={{ fontFamily: "Inter, sans-serif" }}>
            <span className="text-lime-400">You're ready</span>
            <span className="text-white"> to explore.</span>
          </div>

          <p className="mt-6 text-white/80 max-w-2xl text-lg">
            Sekarang kamu sudah tahu dasar-dasarnya. Saatnya memulai petualangan membaca yang lebih personal,
            menyenangkan, dan bermakna bersama Library Faiz.
          </p>

          <p className="mt-4 text-green-400 font-semibold">
            Tekan "Lanjut" untuk masuk ke halaman utama.
          </p>
          </div>
        </Step>
      </Stepper>


      </div>
    </div>
    <div className="ml-5 max-w-8xl  space-y-6 grid grid-cols-[40%_60%] gap-10">
    <div className='space-y-10'>
    <div className='grid grid-cols-[50%_50%] gap-3 mt-2' style={{ width:"100%", height:"200px" }}>
      <div ref={box1} className='border bg-white/10 border-white/20 rounded-3xl transparent rounded'>
        <div className='grid grid-cols-[90%_10%] p-6'>
          <div>
            <div style={{ borderRadius: "100px", width: "50px", marginLeft: "10px" }}
                className='border bg-white/10 border-white/20 flex justify-center p-4'>
              <i className="text-emerald-400 fa-solid fa-book-open"></i>
            </div>
          </div>
          <div></div>
          <span style={{ fontFamily: "Inter, sans-serif" }}
                className='text-neutral-300 ml-2 font-medium text-xl mt-4 mb-3'>Book Collection</span>
          <br />
          <span className='text-neutral-200 ml-2'>Discover thousands of books</span><br />
          <span className='text-neutral-200 ml-2'>across all genres and topics</span><br />
          <span className='text-neutral-200 ml-2'>to enrich your reading list.</span>
        </div>
      </div>

      <div ref={box2} className='border bg-white/10 border-white/20 rounded-3xl transparent rounded'>
        <div className='grid grid-cols-[90%_10%] p-6'>
          <div>
            <div style={{ borderRadius: "100px", width: "50px", marginLeft: "10px" }}
                className='border bg-white/10 border-white/20 flex justify-center p-4'>
              <i className="text-blue-400 fa-solid fa-lightbulb"></i>
            </div>
          </div>
          <div></div>
          <span style={{ fontFamily: "Inter, sans-serif" }}
                className='text-neutral-300 ml-2 font-medium text-xl mt-4 mb-3'>Expand Your Knowledge</span>
          <br />
          <span className='text-neutral-200 ml-2'>Engage with articles and</span><br />
          <span className='text-neutral-200 ml-2'>resources that broaden your</span><br />
          <span className='text-neutral-200 ml-2'>intellectual horizons.</span>
        </div>
      </div>
    </div>

    <div className='grid grid-cols-[50%_50%] gap-3 mt-2' style={{ width:"100%", height:"200px" }}>
      <div ref={box3} className='border bg-white/10 border-white/20 rounded-3xl transparent rounded'>
        <div className='grid grid-cols-[90%_10%] p-6'>
          <div>
            <div style={{ borderRadius: "100px", width: "50px", marginLeft: "10px" }}
                className='border bg-white/10 border-white/20 flex justify-center p-4'>
              <i className="text-yellow-400 fa-solid fa-university"></i>
            </div>
          </div>
          <div></div>
          <span style={{ fontFamily: "Inter, sans-serif" }}
                className='text-neutral-300 ml-2 font-medium text-xl mt-4 mb-3'>Library Access</span>
          <br />
          <span className='text-neutral-200 ml-2'>Get unlimited access to digital</span><br />
          <span className='text-neutral-200 ml-2'>and physical library resources</span><br />
          <span className='text-neutral-200 ml-2'>wherever you are.</span>
        </div>
      </div>

      <div ref={box4} className='border bg-white/10 border-white/20 rounded-3xl transparent rounded'>
        <div className='grid grid-cols-[90%_10%] p-6'>
          <div>
            <div style={{ borderRadius: "100px", width: "50px", marginLeft: "10px" }}
                className='border bg-white/10 border-white/20 flex justify-center p-4'>
              <i className="text-red-400 fa-solid fa-brain"></i>
            </div>
          </div>
          <div></div>
          <span style={{ fontFamily: "Inter, sans-serif" }}
                className='text-neutral-300 ml-2 font-medium text-xl mt-4 mb-3'>Critical Thinking</span>
          <br />
          <span className='text-neutral-200 ml-2'>Develop analytical skills to</span><br />
          <span className='text-neutral-200 ml-2'>understand complex ideas and</span><br />
          <span className='text-neutral-200 ml-2'>make informed decisions.</span>
        </div>
      </div>
    </div>
  </div>


    <div className='ml-5' ref={TextBawah} >
      <div className='text-xl'  style={{ fontFamily: "Inter, sans-serif" }}>
         <ShinyText text="Perpustakaan Faiz / Byte Craft" disabled={false} speed={10} className='text-lime-300 text-xl' />
      </div>
      <div className='mt-4 text-6xl text-neutral-200 ' style={{ fontFamily: "Inter, sans-serif" }}>Ciptakan Generasi</div>
      <div className='mt-4 text-5xl text-neutral-200 ' style={{ fontFamily: "Inter, sans-serif" }}>Emas Bangsa</div>
      <div className='mt-4 text-[14px] text-neutral-500'> 
        <span>
          Saya mendirikan <em>Baca & Tumbuh</em>, sebuah komunitas yang berfokus pada budaya membaca, pembelajaran, dan eksplorasi pengetahuan secara menyeluruh.
        </span>
        <br />
        <span>
          Misi kami adalah menghubungkan para pecinta buku, pelajar, pendidik, serta siapa pun yang ingin terus berkembang melalui literasi.
        </span>
        <br />
        <span>
          Kami menyambut semua kalangan—baik yang baru mulai gemar membaca, yang sedang mendalami literatur, maupun yang ingin memperluas wawasan akademis.
        </span>
        <br />
        <span>
          Komunitas ini mendorong kebiasaan membaca yang konsisten, akses edukasi yang terbuka, serta menyediakan ruang untuk berbagi rekomendasi buku, berdiskusi, dan berbagi pengalaman.
        </span>
        
        <span>          Dengan membangun kolaborasi dan semangat cinta terhadap pengetahuan, kami berharap bisa membentuk generasi yang haus belajar, berpikiran terbuka, dan berdaya saing tinggi.
        </span>

      </div>

      
      

      
    </div>
  </div>

  <div className='mt-32'>
  <Footer />
  </div> 
</div>

  </>
);

}
