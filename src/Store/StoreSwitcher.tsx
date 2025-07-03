import { useParams } from 'react-router'
import CariBuku from './CariBuku'
import BarangTrend from './BarangTrend'
import Dukungan from './Dukungan'

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
    default:
      return <CariBuku /> // fallback
  }
}
