import { NavLink, Outlet } from 'react-router-dom'
import './style.css'

function Navbar() {
  function Link({ icon, to }) {
    return (
      <NavLink className='navbar-link' to={to}>
        <img src={icon} />
      </NavLink>
    )
  }

  return (
    <div className='navbar-layout'>
      <Outlet />
      <div className='navbar'>
        <Link icon="../../../calendar.png" to="/" title="Appointments" />
        <Link icon="../../../clients.png" to="clients" title="Clients" />
        <Link icon="../../../services.png" to="services" title="Services" />
        <Link icon="../../../settings.png" to="settings" title="Settings" />
      </div>
    </div>
  )
}

export default Navbar