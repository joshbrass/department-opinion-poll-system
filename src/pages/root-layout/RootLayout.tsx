
import Navbar from '../../components/navbar/Navbar'
import { Outlet } from 'react-router-dom'

const RootLayout = () => {
  return (
    <div>
        <Navbar/>
        <Outlet/>
    </div>
  )
}

export default RootLayout