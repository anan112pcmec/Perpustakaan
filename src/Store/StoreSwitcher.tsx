import { useParams } from 'react-router'
import CariBuku from './CariBuku/Caribuku'
import BarangTrend from './BarangTrend'
import Dukungan from './Dukungan'
import Foryou from './ForYou/Foryou'

export default function StoreSwitcher() {
  const { id_Store } = useParams()

  if (id_Store == null) {
    return <CariBuku /> 
  }

  switch (id_Store.toLowerCase()) {
    case 'caribuku':
      return <CariBuku />
    case 'barangtrend':
      return <BarangTrend />
    case 'dukungan':
      return <Dukungan />
    case "foryou":
      return <Foryou/>
    default:
      return <CariBuku /> // fallback
  }
}
