import { Link } from "react-router";

export default function NavBar() {
  return (
    <nav className="navbar">
      <div className="nav-content">
        <Link to="/" className="nav-brand">
          Mocna Księga
        </Link>
        <div className="nav-links">
          <Link to="/" className="nav-link">
            Strona główna
          </Link>
          <button className="nav-link login-button">
            Zaloguj się
          </button>
        </div>
      </div>
    </nav>
  );
}
