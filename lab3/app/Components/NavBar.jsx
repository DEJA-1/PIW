import { Link } from "react-router";
import { signInWithPopup, GoogleAuthProvider, signOut } from "firebase/auth";
import { useState, useEffect } from "react";
import { auth } from "../firebase";

export default function NavBar() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });
    return () => unsubscribe();
  }, []);

  const handleLogin = async () => {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error("Error signing in:", error);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <nav className="navbar">
      <div className="nav-content">
        <Link to="/" className="nav-brand">
          Mocna Księga
        </Link>
        <div className="nav-links">
          <Link to="/new" className="nav-link">
            Dodaj książkę
          </Link>
          {user ? (
            <button className="nav-link login-button" onClick={handleLogout}>
              Wyloguj się
            </button>
          ) : (
            <button className="nav-link login-button" onClick={handleLogin}>
              Zaloguj się
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}
