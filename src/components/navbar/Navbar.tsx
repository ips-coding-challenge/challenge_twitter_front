import { Link } from 'react-router-dom'
import { useRecoilValue } from 'recoil'
import logo from '../../assets/tweeter.svg'
import { userState } from '../../state/userState'
import Menu from './Menu'
import UserMenu from './UserMenu'

const Navbar = () => {
  const user = useRecoilValue(userState)

  return (
    <div className="h-navbar border-b border-gray2 flex-none">
      <div className="w-full px-4 h-full flex items-center justify-between">
        <Link to="/">
          <img src={logo} alt="Logo Tweeter" />
        </Link>

        {user && (
          <>
            {/* Menu */}
            <Menu />
            {/* User menu */}
            <UserMenu />
          </>
        )}
      </div>
    </div>
  )
}

export default Navbar
