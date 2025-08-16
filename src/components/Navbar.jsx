import { Link } from 'react-router-dom';
import '../css/Navbar.css';
import logo from '../assets/book-svgrepo-com(1).svg';

function Navbar() {
  return (
    <header>
      <nav className="Navbar-nav">
        <Link className="Navbar-link-logo" to="/">
          <img className="Navbar-logo" src={logo} alt="logo" />
        </Link>
        <ul className="Navbar-ul">
          <Link className="Navbar-link" to="/">
            <li className="Navbar-li">Hem</li>
          </Link>

          <Link className="Navbar-link" to="/favorites">
            <li className="Navbar-li">Favoriter </li>
          </Link>

          <Link className="Navbar-link" to="/profile">
            <li className="Navbar-li">Profil</li>
          </Link>
        </ul>
      </nav>
    </header>
  );
}

export default Navbar;
