import { useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    const payload = { username, password };

    try {
      const response = await fetch("http://127.0.0.1:8000/auth/login/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await response.json();
      console.log("Server response:", data);

      if (response.ok) {
        if (data.access && data.refresh && data.user_data) {
          // Tároljuk a felhasználó adatokat és az admin státuszt
          localStorage.setItem("accessToken", data.access);
          localStorage.setItem("refreshToken", data.refresh);
          localStorage.setItem(
            "loggedInUser",
            JSON.stringify({
              username: data.user_data.username,
              isAdmin: data.user_data.isAdmin,
            })
          );
          
          navigate("/admin-dashboard")
          window.location.reload();
          
        } else {
          alert("Hiba történt a válaszban, hiányoznak az adatok.");
        }
      } else {
        alert("Hiba történt a bejelentkezés során.");
      }
    } catch (error) {
      console.error("Hiba a bejelentkezés során:", error);
      alert("Hiba történt a bejelentkezés során.");
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
              Bejelentkezés
            </button>
          </div>
          <div className="flex justify-center mt-4">
            <p className="text-sm text-gray-600">
              Még nincs fiókod? <a href="/register" className="text-blue-600 hover:underline">Regisztrálj itt!</a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
