import { Link } from 'react-router-dom'
import logo from '../../assets/tweeter.svg'
import Menu from './Menu'
import MenuMobile from './MenuMobile'
import UserMenu from './UserMenu'

const Navbar = () => {
  return (
    <div className="h-navbar border-b border-gray2 flex-none">
      <div className="w-full px-4 h-full flex items-center justify-between">
        <Link to="/">
          <img src={logo} alt="Logo Tweeter" />
        </Link>

        {/* Menu */}
        <Menu />
        {/* User menu */}
        <UserMenu />
      </div>
    </div>
  )
}

export default Navbar
