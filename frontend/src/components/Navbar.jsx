import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const Navbar = () => {
  const { user, logout } = useAuth()

  return (
    <header className="nav">
      <div className="nav__brand">
        <span className="nav__logo" />
        <span>TaskFlow</span>
      </div>
      <nav className="nav__actions">
        {user ? (
          <>
            <span className="nav__user">{user.name}</span>
            <button type="button" className="btn btn--ghost" onClick={logout}>
              Logout
            </button>
          </>
        ) : (
          <>
            <Link className="btn btn--ghost" to="/login">
              Login
            </Link>
            <Link className="btn btn--primary" to="/register">
              Sign up
            </Link>
          </>
        )}
      </nav>
    </header>
  )
}

export default Navbar
