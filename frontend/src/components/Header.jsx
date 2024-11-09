import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const Header = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    // A bejelentkezett felhasználó adatainak beolvasása a localStorage-ból
    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
    if (loggedInUser) {
      setUser(loggedInUser);
    }
  }, []); // Üres lista, hogy csak egyszer fusson le, amikor a komponens betöltődik

  const handleLogout = () => {
    localStorage.clear();  // Kijelentkezés után töröljük az adatokat a localStorage-ból
    setUser(null);         // Kijelentkezés után töröljük a felhasználót
    navigate("/");         // Bejelentkezési oldalra irányít vissza
  };

  return (
    <header className="bg-blue-600 text-white py-4 flex items-center justify-between px-6">
      <Link to="/" className="text-2xl font-semibold">Csapatkezelő</Link>
      <nav className="flex items-center space-x-6">
        {user && (
          <>
            {user.isAdmin ? (
              <Link to="/admin-dashboard" className="hover:underline">
                Admin felület
              </Link>
            ) : (<Link to="/user-dashboard" className="hover:underline">
            Felhasználói felület
          </Link>)}
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-4 py-2 rounded-md"
            >
              Kijelentkezés
            </button>
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;
