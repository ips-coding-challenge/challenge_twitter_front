import { Link } from 'react-router-dom'
import logo from '../assets/tweeter.svg'

const Navbar = () => {
  return (
    <div className="h-navbar flex items-center border-b border-gray2">
      <div className="p-2">
        <Link to="/">
          <img src={logo} alt="Logo Tweeter" />
        </Link>
      </div>
    </div>
  )
}

export default Navbar
