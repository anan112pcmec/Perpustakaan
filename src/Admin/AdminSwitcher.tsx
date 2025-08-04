import { useParams } from "react-router"
import KoleksiBukuAdmin from "./KoleksiBuku/KoleksiBuk"
import DashboardAdmin from "./Dashboard"
import ManajemenAnggota from "./ManajemenAnggota/ManajemenAnggota"
import PeminjamanBuku from "./PeminjamanBuku/PeminjamanBuku"
import PenjualanBuku from "./PenjualanBuku/PenjualanBuku"


export default function AdminSwitcher() {
  const { adminpage } = useParams()

  console.log("ini id store:", adminpage)

  if (adminpage == null) {
    return <DashboardAdmin/> 
  }

  switch (adminpage.toLowerCase()) {
    case 'koleksibuku':
      return <KoleksiBukuAdmin/>
    case "manajemenanggota":
      return <ManajemenAnggota/>
    case "peminjamanbuku":
      return <PeminjamanBuku/>
    case "penjualanbuku":
      return <PenjualanBuku/>
    default:
      return <DashboardAdmin /> // fallback
  }
}
