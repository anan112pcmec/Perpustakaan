import { useParams } from "react-router"
import KoleksiBukuAdmin from "./KoleksiBuku/KoleksiBuk"
import DashboardAdmin from "./Dashboard"


export default function AdminSwitcher() {
  const { adminpage } = useParams()

  console.log("ini id store:", adminpage)

  if (adminpage == null) {
    return <DashboardAdmin/> 
  }

  switch (adminpage.toLowerCase()) {
    case 'koleksibuku':
      return <KoleksiBukuAdmin/>
    default:
      return <DashboardAdmin /> // fallback
  }
}
