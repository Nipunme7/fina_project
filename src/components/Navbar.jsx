import { Link } from 'react-router-dom'
import ThemeToggle from './ThemeToggle'
import '../styles/Navbar.css'

function Navbar() {
    return (
        <nav className="navbar">
            <div className="navbar-container">
                <Link to="/" className="navbar-logo">
                    AniTalk
                    <span className="logo-emoji">🍥</span>
                </Link>

                <div className="nav-menu">
                    <Link to="/" className="nav-link">Home</Link>
                    <Link to="/new" className="nav-link create-post-button">Create Post</Link>
                    <ThemeToggle />
                </div>
            </div>
        </nav>
    )
}

export default Navbar 