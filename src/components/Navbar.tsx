import logo from '../assets/tweeter.svg'

const Navbar = () => {
  return (
    <div className="h-navbar flex items-center border-b border-gray2">
      <div className="p-2">
        <img src={logo} alt="Logo Tweeter" />
      </div>
    </div>
  )
}

export default Navbar
