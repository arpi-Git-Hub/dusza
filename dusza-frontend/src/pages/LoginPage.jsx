import { useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    // Ellenőrizni, hogy a felhasználónév és jelszó helyes-e
    const storedTeams = JSON.parse(localStorage.getItem("teams")) || [];
    const adminPassword = "admin123"; // Admin jelszó

    // Admin bejelentkezés
    if (username === "admin" && password === adminPassword) {
      localStorage.setItem("isAdmin", "true");
      navigate("/admin-dashboard");
      return;
    }

    // Felhasználói bejelentkezés
    const userTeam = storedTeams.find(
      (team) => team.username === username && team.password === password
    );

    if (userTeam) {
      localStorage.setItem("isAdmin", "false");
      localStorage.setItem("loggedInUser", JSON.stringify(userTeam));
      navigate("/user-dashboard");
    } else {
      alert("Hibás felhasználónév vagy jelszó!");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-400 to-blue-600">
      <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-xl shadow-2xl">
        <h2 className="text-3xl font-bold text-center text-blue-600 mb-6">Bejelentkezés</h2>
        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">Felhasználónév</label>
            <input
              type="text"
              placeholder="Felhasználónév"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="mt-2 block w-full p-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Jelszó</label>
            <input
              type="password"
              placeholder="Jelszó"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-2 block w-full p-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <button
              type="submit"
              className="w-full p-4 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Belépés
            </button>
          </div>
          <div className="flex justify-center mt-4">
            <p className="text-sm text-gray-600">
              Nincs fiókod? <a href="/register" className="text-blue-600 hover:underline">Regisztrálj itt!</a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
