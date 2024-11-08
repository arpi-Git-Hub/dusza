import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Dashboard = () => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    axios.get("/api/user") // Teszt API hívás
      .then(response => {
        setUserData(response.data);
      })
      .catch(error => {
        console.error("Hiba történt az adatok lekérésekor: ", error);
      });
  }, []);

  if (!userData) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-lg text-gray-500">Adatok betöltése...</div>
      </div>
    );
  }

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900">Üdvözöljük, {userData.name}!</h1>

        <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-lg font-medium text-gray-700">Számlázás</h2>
            <p className="text-gray-500 mt-2">Aktuális egyenleg: {userData.balance} Ft</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-lg font-medium text-gray-700">Regisztrált e-mail</h2>
            <p className="text-gray-500 mt-2">{userData.email}</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-lg font-medium text-gray-700">Fiók státusza</h2>
            <p className="text-gray-500 mt-2">{userData.status}</p>
          </div>
        </div>

        <div className="mt-6">
          <Link to="/login" className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
            Kijelentkezés
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
