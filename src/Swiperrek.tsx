// Swiperrek.js
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectFlip, Navigation } from 'swiper/modules';
import '../node_modules/swiper/swiper.css';
import '../node_modules/swiper/modules/effect-flip.css';
import { useState, useEffect, useRef, memo, useMemo } from 'react';
import { animate } from 'animejs';

export const LoginPage = (props: any) => {
  const [nama, setNama] = useState("");
  const [password, setPassword] = useState("");
  const [Memilih, setMemilih] = useState("");
  const [kirim, setkirimdata] = useState(false);
  const [formtype, setForm] = useState("Login");
  const Namaisian = useRef(null)
  const Passwordisian = useRef(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const namainput = useRef<HTMLInputElement>(null);
  const passwordInput = useRef<HTMLInputElement>(null);
  const [statuslog, setstatlog] = useState(false);

  useEffect(() => {
    const storedNama:any = localStorage.getItem("userNama");
    const storedPassword:any = localStorage.getItem("userPassword");
    if (storedNama && storedPassword) {
      setNama(storedNama);
      setPassword(storedPassword);
    }
  }, []);


  function Handleuser(konteks:any){
    if(konteks == "Login_Aplikasi"){
      console.log("Bro mencoba login");
      console.log(namainput.current?.value);
      console.log(passwordInput.current?.value);
      if(namainput.current?.value && passwordInput.current?.value){
        setMemilih("Login");
        setkirimdata(true);
        console.log("semua telah di set");
      }
    } else if (konteks === "Mendaftar_Aplikasi"){
      console.log("Bro mencoba Daftar");
      console.log(namainput.current?.value);
      console.log(passwordInput.current?.value);
      if(namainput.current?.value && passwordInput.current?.value){
        setMemilih("Mendaftar");
        setkirimdata(true);
        console.log("semua telah di set");
      }
    }
  }

   useEffect(() => {
    if(kirim == true){
      console.log("kita siap mengirim");
      if(Memilih == "Login"){
        console.log("Dia mau login");
        console.log("ngirim data");

        fetch("http://localhost:8080/endpoint.go", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    tujuan: "login",
                    nama: namainput.current?.value,
                    password: passwordInput.current?.value,
                }),
            })
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                const status: any = data.status;
                if (status === "berhasil" && data.data) {
                  setstatlog(true)
                    const namasah: string = data.data.Nama;
                    const pwsah: string = data.data.Password;
                    console.log(`namanya ${namasah} terkonfirmasi`)
                    localStorage.setItem("userNama", namasah || "Teman");
                    localStorage.setItem("Id_user", data.data.ID || "");
                    localStorage.setItem("KreditSkor", data.data.Kreditskor || "");
                    setNama(namasah || "");
                    localStorage.setItem("userPassword", pwsah || "");
                    setPassword(pwsah || "");
                    
                } else {
                  console.log("Gagal dalam login");
                  setstatlog(false)
                }
            })
            .catch((err) => {
                console.error("Gagal mengirim ke backend:", err);
                
            });
        console.log("pengiriman data telah dilaksanakan");

      } else if(Memilih == "Mendaftar"){
        console.log("Dia mau daftar");
        console.log("ngirim data")

                fetch("http://localhost:8080/endpoint.go", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    tujuan: "daftarakun",
                    nama: namainput.current?.value,
                    password: passwordInput.current?.value,
                }),
            })
            .then((res) => res.json())
            .then((data) => {
                if (data.status === "berhasil") {
                    alert("Akun berhasil terdaftar!");
                } else {
                    alert("Gagal mendaftar: " + data.penjelasan);
                }
            })
            .catch((err) => {
                console.error("Gagal mengirim ke backend:", err);
                alert("Terjadi kesalahan jaringan saat mengirim data.");
            });

        console.log("pengiriman data telah dilaksanakan")
      } else {
        console.log("Dia tak jelas");
      }

      setMemilih("");
      setkirimdata(false);
    } else {
      console.log("selesai proses");
    }
   },[kirim])

   useEffect(() => {
    animate("#Header", {
      opacity: [0, 1],
      translateY: [-50, 0],
      duration: 600,
      easing: "easeOutExpo",
    });

    animate("#form_input", {
      scale: [0.95, 1],
      opacity: [0, 1],
      duration: 500,
      easing: "easeOutExpo",
      delay: 200,
    });
  }, [formtype]);

   useEffect(() => {
    if (containerRef.current) {
      console.log("Container element:", containerRef.current);
    }
  }, []);

  if(nama !== "" && password !== ""){
    return (
    <div className="flex min-h-[75vh] flex-col items-center justify-center text-white px-4">
      <div className=" max-w-md w-full animate-fade-in" style={{ fontFamily: "Inter, sans-serif" }}>
        <p className="text-xl neutral-200 mb-4">
          Selamat datang kembali, <span className="font-bold">{nama}</span>
        </p>

       <p className='text-base neutral-200 mt-2 mb-4'>
          Hai <strong>{nama}</strong>, kamu sudah berhasil terdaftar dan masuk ke dalam sistem kami.
          Selamat datang di dunia<br className='my-2' />
          Sekarang kamu bisa mulai menjelajahi koleksi buku, menemukan bacaan favorit, 
          dan menyesuaikan pengalaman membaca sesuai minatmu.<br className='my-2' />
          Silakan tekan arahan di layar sebelah kanan untuk mulai petualangan literasi kamu 🚀📚.
        </p>

        <button
          onClick={() => {
            localStorage.removeItem("userNama");
            localStorage.removeItem("userPassword");
            setNama("");
            setPassword("");
            setstatlog(false);
          }}
          className="bg-red-400 hover:bg-red-300 text-white font-semibold py-2 px-6 rounded-lg transition duration-300"
        >
          Logout
        </button>
      </div>
    </div>
  );

  } else {
    return(
    <div id="Header" className="flex min-h-[85vh] flex-col items-center justify-center">
      <h2 className="text-4xl font-bold text-center mb-6">
        {formtype === "Login" ? "Selamat Datang Kembali" : "Buat Akun Baru"}
      </h2>

      <p className="text-cyan-200 text-right mt-10 mb-10">
        {formtype === "Login"
          ? "Masuk ke platform BiblioVerse untuk mulai menjelajah buku"
          : "Daftar ke BiblioVerse dan mulai perjalanan membaca kamu!"}
      </p>

      <form id="form_input" className="space-y-6 max-w-md mx-auto w-full">
        <div>
          <label htmlFor="nama" className="block text-sm mb-1">
            Nama
          </label>
          <input
            type="text"
            id="nama"
            className="w-full px-4 py-3 rounded-lg bg-white/20 border border-white/30 text-white"
            placeholder="Nama Lengkap"
            ref={namainput}
          />
        </div>

        <div>
          <label htmlFor="password" className="block text-sm mb-1">
            Password
          </label>
          <input
            type="password"
            id="password"
            className="w-full px-4 py-3 rounded-lg bg-white/20 border border-white/30 text-white"
            placeholder="••••••••"
            ref={passwordInput}
          />
        </div>

        <button
          type="button"
          className="w-full py-3 bg-cyan-600 hover:bg-cyan-500 text-white rounded-lg font-semibold transition duration-300"
          onClick={() =>
            Handleuser(formtype === "Login" ? "Login_Aplikasi" : "Mendaftar_Aplikasi")
          }
        >
          {formtype === "Login" ? "Masuk" : "Daftar"}
        </button>
      </form>

      <p className="text-center text-sm text-neutral-400 mt-6">
        {formtype === "Login" ? "Belum punya akun?" : "Sudah punya akun?"}{" "}
        <span
          className="text-cyan-200 hover:underline cursor-pointer"
          onClick={() =>
            setForm((prev) => (prev === "Login" ? "Mendaftar" : "Login"))
          }
        >
          {formtype === "Login" ? "Daftar" : "Masuk"}
        </span>
      </p>
    </div>

        
  )
  }

  

}




export default function Swiperrek({ sudah_login, nama, pw }: any) {
  const fadeInRef = useRef(null);
  const swiperRef = useRef<any>(null);
  const TeksUtama = useRef<any>(null);

  const Elemennya = useRef<HTMLDivElement>(null);
  const [tampilkanPelajari, setTampilkanPelajari] = useState(false);

  useEffect(()=>{
    if(tampilkanPelajari){
      animate('#pembelajaran', {
        opacity: [0, 1],
        translateY: [60, 0],
        easing: 'easeOutCubic',
        duration: 600,
        loop: false,
      });
    } else{
      animate('#pembelajaran', {
          opacity: [1, 0],        // dari terlihat ke hilang
          translateY: [0, -60],   // dari posisi sekarang ke atas 60px
          easing: 'easeInCubic',  // easing untuk animasi keluar, biasanya easeIn
          duration: 600,
          loop: false,
        });
    }
    
  }, [tampilkanPelajari])

  const PelajariLanjut = () => {
    if(tampilkanPelajari == true){
      setTampilkanPelajari(false);
    } else{
      setTampilkanPelajari(true);
    }
    
  };

  function Pelajari(){
    if(tampilkanPelajari){
      return(
        <>
         <div id='pembelajaran' className="mt-10 max-w- text-left text-neutral-200">
            <h2 className="text-3xl font-bold mb-6">Bagaimana Layanan Kami Bekerja</h2>

            <p className="mb-4">
              Kami memulai dengan satu tujuan sederhana: membuat pengalaman perjalanan dengan kereta lebih mudah dan nyaman.
              Dengan teknologi terbaru, sistem pemesanan kami dirancang untuk ramah pengguna dan efisien.
            </p>

            <p className="mb-4">
              Sejarah kami bermula dari kebutuhan masyarakat akan moda transportasi yang cepat dan terjangkau.
              Sejak awal, kami berkomitmen untuk menyediakan layanan yang tidak hanya efisien, tetapi juga manusiawi dan terpercaya.
            </p>

            <p className="mb-6">
              Untuk memulai, cukup gunakan platform kami: pilih jadwal, pesan tiket, dan nikmati perjalanan.
              Dukungan pelanggan tersedia setiap saat, dan kami hadir di seluruh Indonesia untuk melayani Anda.
            </p>

            <div className="flex space-x-4 mt-4">
              <a href="#" aria-label="Facebook" className="text-blue-600 hover:text-blue-800">
                <i className="fab fa-facebook fa-lg"></i>
              </a>
              <a href="#" aria-label="Instagram" className="text-pink-500 hover:text-pink-700">
                <i className="fab fa-instagram fa-lg"></i>
              </a>
              <a href="#" aria-label="Twitter" className="text-blue-400 hover:text-blue-600">
                <i className="fab fa-twitter fa-lg"></i>
              </a>
              <a href="#" aria-label="LinkedIn" className="text-blue-700 hover:text-blue-900">
                <i className="fab fa-linkedin fa-lg"></i>
              </a>
            </div>
          </div>

        </>
      )
    } else{
      return(
        <></>
      )
    }
  } 

 const pelajaranel = useMemo(() => Pelajari(), [tampilkanPelajari]);

  const scrollKeKomen = () => {
    const offset = 20;
    if (Elemennya.current) {
      const y = Elemennya.current.getBoundingClientRect().top + window.pageYOffset - offset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };


  function Namajelas() {
    // Check if nama is not null, not empty, and not undefined
    if (nama != null && nama !== "" && nama !== undefined) {
      return nama;
    } else {
      return "Teman";
    }
  }

  const namanya = Namajelas();

  useEffect(() => {
    const paragraf = document.querySelector('.fade-in p');
    const leading = document.querySelector('leading-tight');
    const tombolUtama = document.querySelectorAll('.fade-in button');
    const swiperElement = document.querySelector('.mySwiper');
     const hurufElements = document.querySelectorAll('.huruf');
     const fiturCards = document.querySelectorAll('.fade-in > section.grid > div');
     
    if (paragraf) {
      animate([paragraf, leading,], {
        opacity: [0, 1],
        translateY: [60, 0],
        easing: 'easeOutCubic',
        duration: 1200,
        loop: false,
      });
    }

    tombolUtama.forEach((btn, _) => {
      animate(btn, {
        opacity: [0, 1],
        scale: [0.8, 1],
        easing: 'easeOutBack',
        duration: 1200,
        loop: false,
      });
    });

    if (swiperElement) {
      const observer = new IntersectionObserver((entries, observerInstance) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            animate(swiperElement, {
              opacity: [0, 1],
              translateX: [1000, 0], 
              easing: 'easeOutExpo',
              duration: 1200
            });
            observerInstance.unobserve(swiperElement); // supaya animasi cuma sekali
          }
        });
      });

      hurufElements.forEach((el, _) => {
      animate(el, {
        opacity: [0, 1],
        translateY: [20, 0],
        easing: 'easeOutExpo',
        duration: 1200,
        direction: 'normal',
        loop: false,
      });
    });

    // Animasi card fitur (fade + slide up stagger)
    fiturCards.forEach((card, i) => {
      animate(card, {
        opacity: [0, 1],
        translateY: [40, 0],
        easing: 'easeOutExpo',
        duration: 1200,
        loop: false,
      });
    });

    // Animasi statistik (scale + fade stagger)
    const stats = document.querySelectorAll('.fade-in > section.mt-12 > div');
    stats.forEach((stat, i) => {
      animate(stat, {
        opacity: [0, 1],
        scale: [0.6, 1],
        easing: 'easeOutBack',
        duration: 1200,
        loop: false,
      });
    });

    // Animasi section "Tentang BiblioVerse"
    const tentangSection = document.querySelectorAll('.fade-in ~ div .text-white');
    tentangSection.forEach((el, i) => {
      animate(el, {
        opacity: [0, 1],
        translateY: [30, 0],
        easing: 'easeOutCubic',
        duration: 1200,
        loop: false,
      });
    });

    // Ikon sosial media
    const sosmedIcons = document.querySelectorAll('.fade-in ~ div .flex.gap-4 a');
    sosmedIcons.forEach((icon, i) => {
      animate(icon, {
        opacity: [0, 1],
        translateY: [20, 0],
        easing: 'easeOutExpo',
        duration: 1200,
        loop: false,
      });
    });

    animate(TeksUtama,{
      opacity: [0, 1],
        translateY: [20, 0],
        easing: 'easeOutExpo',
        duration: 1200,
        loop: false,
    });

      observer.observe(swiperElement);
    }

    // Animasi huruf per huruf di judul (sudah ada)
    

  }, []);

  return (
   <div className="max-w-h text-white font-sans  sm:px-12 lg:px-20  ">
  <main className=" pb-24 sm:pt-24 sm:pb-32 md:pt-32 md:pb-40">
    <section
  className="text-left"
  ref={fadeInRef}
>
  <h2 ref={TeksUtama} className='mt-4 text-6xl text-neutral-200 ' style={{ fontFamily: "Inter, sans-serif" }}>
    Halo {nama}, Ayo Membaca Buku Disini Temukan buku lebih murah lebih gampang
    
  </h2>
  <p className="mt-12 text-lg sm:text-xl text-gray-600 font-light leading-relaxed max-w-2xl">
    Platform modern untuk eksplorasi, peminjaman, dan jual beli buku — semua dalam satu tempat.
  </p>
  <div className="mt-8 flex flex-wrap justify-center gap-6">
    <button onClick={()=> scrollKeKomen()} className="px-10 py-4 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl font-semibold shadow-md transition duration-300">
      Mulai Sekarang
    </button>
    <button onClick={()=> PelajariLanjut()} className="px-10 py-4 border border-white text-white rounded-xl font-semibold hover:bg-white hover:text-cyan-700 transition duration-300">
      Pelajari Lebih Lanjut
    </button>
  </div>

  {pelajaranel}
</section>
    <Swiper
      effect="flip"
      modules={[EffectFlip, Navigation]}
      className="mySwiper"
      style={{
        marginTop: "200px",
      }}
      speed={800}
      flipEffect={{ slideShadows: false }}
      onSwiper={(swiper) => (swiperRef.current = swiper)}
    >
      <SwiperSlide>
        <div ref={Elemennya}></div>
        <div  className="max-w-5xl min-h-[90vh] mx-auto bg-white/4 border border-white/20 rounded-3xl p-8 sm:p-12 md:p-16 flex flex-col justify-between backdrop-blur-lg fade-in">
          <section style={{ fontFamily: "Inter, sans-serif" }}>
            <h2
              className="text-2xl sm:text-3xl md:text-6xl mb-8 flex justify-center flex-wrap overflow-hidden tracking-wide"
              id="judul"
              style={{
                height:"70px"
              }}
            > Mulai Dengan Kami
            </h2>
            <p className="text-lg sm:text-xl text-neutral-300 max-w-2xl mx-auto leading-relaxed font-light">
              BiblioVerse memadukan kenyamanan perpustakaan digital dengan pasar buku terbaik.
            </p>
            <button
              className="mt-2 mb-2 block mx-auto px-6 py-3 bg-lime-500 text-white rounded-lg hover:bg-lime-400 transition duration-300"
              onClick={() => swiperRef.current?.slideNext()}
            >
              Jelajahi Sekarang
            </button>

          </section>

          <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8 text-white">
            {[
              {
                title: "Desain Menarik",
                desc: "UI bertema neon & glass untuk pengalaman baca yang immersive.",
                icon: "fa-solid fa-book-open-reader",
              },
              {
                title: "Koleksi Luas",
                desc: "Dari buku klasik hingga rilis terbaru, semua ada di sini.",
                icon: "fa-solid fa-list",
              },
              {
                title: "Belanja & Pinjam",
                desc: "Beli buku atau pinjam secara digital dengan mudah.",
                icon: "fa-solid fa-cart-shopping",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="bg-white/10 p-6 rounded-xl border border-white/20 transition hover:bg-white/20 hover:shadow-lg"
              >
                <h3 className="mb-3 flex items-center" style={{ fontFamily: "Inter, sans-serif" }}>
                  <i className={`${item.icon} mr-3 text-emerald-400 text-2xl`}></i>
                  {item.title}
                </h3>
                <p className="text-base text-gray-300 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </section>

          <section className="mt-5 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 text-center">
            {[
              { value: "10K +", label: "Judul Buku" },
              { value: "4.9 ★", label: "Rating Pengguna" },
              { value: "500 +", label: "Penjual Terverifikasi" },
              { value: "24/7", label: "Layanan Aktif" },
            ].map((stat, i) => (
              <div
                key={i}
                className="p-6 border border-white/10 rounded-xl bg-white/5 backdrop-blur-md shadow-sm"
                style={{ fontFamily: "Inter, sans-serif" }}
              >
                <h4 className="text-3xl sm:text-4xl text-emerald-200">
                  {stat.value}
                </h4>
                <p className="text-base text-white/70 mt-2 font-medium">{stat.label}</p>
              </div>
            ))}
          </section>
        </div>
      </SwiperSlide>

      <SwiperSlide>
        <div className="max-w-5xl min-h-[40vh] mx-auto bg-white/4 border border-white/20 rounded-3xl p-8 sm:p-12 md:p-16 grid grid-cols-1 md:grid-cols-2 gap-10 backdrop-blur-lg fade-in">
          <LoginPage namanya={nama} login={sudah_login} />

          <div className="flex flex-col justify-center rounded-2xl p-6 sm:p-8 md:p-10 text-white" style={{ fontFamily: "Inter, sans-serif" }}>
            <h3 className="text-3xl font-bold text-emerald-400 mb-6">
              Tentang Perpustakaan
            </h3>
            <p className="text-base sm:text-lg text-white/80 mb-6 leading-relaxed font-light">
              BiblioVerse adalah platform perpustakaan modern dan marketplace buku digital yang menghubungkan pembaca dan penjual di seluruh Indonesia.
            </p>

            <div>
              <h4 className="text-lg font-semibold text-emerald-300 mb-3">
                Pusat Bantuan
              </h4>
              <ul className="text-base text-white/70 space-y-2 leading-snug">
                <li>
                  <strong>Email:</strong> support@biblioverso.id
                </li>
                <li>
                  <strong>Telepon:</strong> +62 811 2233 4455
                </li>
                <li>
                  <strong>Alamat:</strong> Jl. Buku No. 99, Bandung, Indonesia
                </li>
                <li>
                  <strong>Jam Operasional:</strong> Senin - Jumat, 08:00 - 17:00
                </li>
              </ul>
            </div>

            <div className="mt-8">
              <h4 className="text-lg font-semibold text-emerald-300 mb-3">
                Ikuti Kami
              </h4>
              <div className="flex gap-6 text-emerald-300 text-2xl">
                <a href="#" className="hover:text-white transition">
                  <i className="fab fa-facebook"></i>
                </a>
                <a href="#" className="hover:text-white transition">
                  <i className="fab fa-twitter"></i>
                </a>
                <a href="#" className="hover:text-white transition">
                  <i className="fab fa-instagram"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
      </SwiperSlide>
      </Swiper>
  </main>
</div>

);

};


