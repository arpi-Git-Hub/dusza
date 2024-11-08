import { Link, useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Kijelentkezés: Töröljük a bejelentkezési adatokat a localStorage-ból
    localStorage.removeItem("isAdmin");
    localStorage.removeItem("username");
    localStorage.removeItem("teamName");
    localStorage.removeItem("schoolName");
    localStorage.removeItem("teacherName");
    navigate("/"); // Visszairányítunk a bejelentkezési oldalra
  };

  const isAdmin = localStorage.getItem("isAdmin") === "true";
  const username = localStorage.getItem("username");

  return (
    <header className="bg-blue-600 text-white py-4">
      <div className="container mx-auto flex justify-between items-center">
        <div>
          <Link to="/" className="text-xl font-semibold">Csapatkezelő</Link>
        </div>

        <div className="space-x-6">
          {/* Ha be van jelentkezve felhasználó */}
          {username && (
            <span className="text-lg">{`Üdv, ${username}`}</span>
          )}

          <nav className="flex items-center space-x-4">
            {/* Különböző navigációs lehetőségek az admin és a felhasználó számára */}
            {!username ? (
              <>
                <Link to="/" className="hover:underline">Bejelentkezés</Link>
                <Link to="/register" className="hover:underline">Regisztráció</Link>
              </>
            ) : (
              <>
                <Link to="/user-dashboard" className="hover:underline">
                  Felhasználói felület
                </Link>
                {isAdmin && (
                  <Link to="/admin-dashboard" className="hover:underline">
                    Admin felület
                  </Link>
                )}
                <button
                  onClick={handleLogout}
                  className="bg-red-500 text-white px-4 py-2 rounded-md"
                >
                  Kijelentkezés
                </button>
              </>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
