import { useEffect, useState } from "react";
import { toast, ToastContainer, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Particles from "../React_bits_compo/ParticlesBG";
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import LeftDock from "../React_bits_compo/Left-Dock/LeftDock";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faThumbsUp,
  faShoppingCart,
  faStar,
  faFolderTree,
  faHeart,
  faArrowTrendUp,
  faBookOpen,
} from '@fortawesome/free-solid-svg-icons';
import { Link, Outlet } from "react-router";

export default function Store() {
  const [nama, setNama] = useState("");
  const [bolehTampilkanParticles, setBolehTampilkanParticles] = useState(false);

  useEffect(() => {
    const namanye = localStorage.getItem("userNama");
    const id = localStorage.getItem("Id_user");
    const KreditSkor = localStorage.getItem("KreditSkor");

    if (namanye && id && KreditSkor) {
      setNama(namanye);
      console.log("id bro", id);
      console.log("kredit skor bro", KreditSkor);
    } else {
      toast('🚫 Wah kamu belum login, harap login dulu!', {
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


      // Tampilkan Particles sebelum redirect
      setBolehTampilkanParticles(true);

      // Redirect setelah 2.2 detik
      setTimeout(() => {
        window.location.href = "/";
      }, 2200);
    }
  }, []);

    const items = [
  {
    icon: (
      <Link to="/store/caribuku">
        <FontAwesomeIcon icon={faFolderTree} className="text-white" />
      </Link>
    ),
    label: "Cari Buku",
  },
  {
    icon: (
      <Link to="/store/foryou">
        <FontAwesomeIcon icon={faThumbsUp} className="text-white" />
      </Link>
    ),
    label: "For you",
  },
  {
    icon: (
      <Link to="/store/dukungan">
        <FontAwesomeIcon icon={faBookOpen} className="text-white" />
      </Link>
    ),
    label: "Dukungan",
  },
  {
    icon: <FontAwesomeIcon icon={faStar} className="text-white" />,
    label: "Best Seller",
    onClick: () => alert("Best Seller!"),
  },
  {
    icon: <FontAwesomeIcon icon={faHeart} className="text-white" />,
    label: "Favorit",
    onClick: () => alert("Favorit!"),
  },
  {
    icon: <FontAwesomeIcon icon={faArrowTrendUp} className="text-white" />,
    label: "Trend",
    onClick: () => alert("Trend!"),
  },
  {
    icon: <FontAwesomeIcon icon={faShoppingCart} className="text-white" />,
    label: "Pembelian",
    onClick: () => alert("Pembelian!"),
  },
  {
    icon: 
      <Link to="/">
        <FontAwesomeIcon icon={faRightFromBracket} className="text-white"/>
      </Link>,
    label: "Kembali",
  }
];


  
  return (
    <>
    <div className="fixed inset-0 z-0 pointer-events-auto">
  <ToastContainer />

   <div
      style={{
        position: 'fixed',
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

    <div className="relative z-10 ">
      <div className="w-full min-h-screen flex">
        
        {/* Sidebar */}
        <aside className="flex-shrink-0 min-w-[60px] max-w-[100px] w-full flex justify-center items-start pt-4 mt-20">
          <LeftDock
            items={items}
            panelHeight={68}
            baseItemSize={50}
            magnification={70}
          />
        </aside>
        
        {/* Konten Utama */}
        <main className="flex-grow px-4 sm:px-6 md:px-8 text-gray-700 text-sm">
          <Outlet />
        </main>

      </div>
    </div>

</div>

      
    </>
  );
}
