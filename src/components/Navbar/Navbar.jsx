import { useContext } from 'react'
import { NavLink } from 'react-router-dom'
import { FavoritesContext } from '../../context/FavoritesContext'
import './Navbar.css'

const Navbar = () => {
  const { favorites } = useContext(FavoritesContext)

  return (
    <nav className="navbar">
      <NavLink to="/" className="logo">
        Pokédex
      </NavLink>
      
      <ul className="links">
        <li>
          <NavLink 
            to="/" 
            className={({ isActive }) => isActive ? 'active' : ''}
          >
            Home
          </NavLink>
        </li>
        <li>
          <NavLink 
            to="/favorites" 
            className={({ isActive }) => isActive ? 'active' : ''}
          >
            Favoritos {favorites.length > 0 && `(${favorites.length})`}
          </NavLink>
        </li>
        <li>
          <NavLink 
            to="/contact" 
            className={({ isActive }) => isActive ? 'active' : ''}
          >
            Contacto
          </NavLink>
        </li>
      </ul>
    </nav>
  )
}

export default Navbar