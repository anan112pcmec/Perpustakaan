import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
   faHouse,
  faBookOpen,
  faHistory,
  faShoppingCart,
  faSearch,
  faCogs,
  faUserCircle,
  faInfoCircle,
} from '@fortawesome/free-solid-svg-icons';
import Dock from './React_bits_compo/Dock/Dock';

export default function Header(){
    const items = [
      {
        icon: <FontAwesomeIcon icon={faHouse} className="text-white" />,
        label: "Beranda",
        onClick: () => {
            window.location.href = "/";
        },
      },
      {
        icon: <FontAwesomeIcon icon={faInfoCircle} className="text-white" />,
        label: "Tentang Kami",
        onClick: () => alert("Tentang Kami!"),
      },
      {
        icon: <FontAwesomeIcon icon={faHistory} className="text-white" />,
        label: "Sejarah",
        onClick: () => alert("Sejarah!"),
      },
      {
        icon: <FontAwesomeIcon icon={faShoppingCart} className="text-white" />,
        label: "Pembelian",
        onClick: () => alert("Pembelian!"),
      },
      {
        icon: <FontAwesomeIcon icon={faSearch} className="text-white" />,
        label: "Cari Buku",
        onClick: () => {
          window.location.href = "store";
        }
    
      },
      {
        icon: <FontAwesomeIcon icon={faBookOpen} className="text-white" />,
        label: "Katalog Buku",
        onClick: () => alert("Katalog Buku!"),
      },
      {
        icon: <FontAwesomeIcon icon={faUserCircle} className="text-white" />,
        label: "Akun Saya",
        onClick: () => alert("Akun Saya!"),
      },
      {
        icon: <FontAwesomeIcon icon={faCogs} className="text-white" />,
        label: "Pengaturan",
        onClick: () => alert("Pengaturan!"),
      },
    ];
    
    return(<>
        <div>
        <Dock 
        items={items}
        panelHeight={68}
        baseItemSize={50}
        magnification={70}
        />
        </div>
    </>)
}