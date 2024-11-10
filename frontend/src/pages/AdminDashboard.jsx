import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const [teams, setTeams] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("loggedInUser"));
    if (!userData || userData.isAdmin !== true) {
      navigate("/login"); // Ha nem admin, irányítsuk a login oldalra
    } else {
      // Az admin számára kérhetjük le az összes csapat adatát a backendből
      fetchTeams();
    }
  }, [navigate]);

  const fetchTeams = async () => {
    try {
      const response = await fetch("http://18.192.213.181:8000/auth/admin-dashboard/", {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });

      const data = await response.json();
      if (response.ok) {
        setTeams(data.user_data);
        localStorage.setItem("teams", JSON.stringify(data.user_data));
      } else {
        alert("Hiba történt a csapatok lekérése során.");
      }
    } catch (error) {
      console.error("Hiba a csapatok lekérésekor:", error);
    }
  };

  const handleDelete = (username) => {
    const updatedTeams = teams.filter((team) => team.username !== username);
    localStorage.setItem("teams", JSON.stringify(updatedTeams));
    setTeams(updatedTeams);
    alert("A csapat törlésre került.");
  };

  const handleEdit = (username) => {
    navigate(`/edit-team/${username}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-400 to-blue-600 ml-15">
      <div className="container mx-auto p-6">
        <h2 className="text-3xl font-semibold text-white mb-6">Adminisztrátori felület</h2>
        
        <div className="overflow-x-auto bg-white shadow-lg rounded-lg">
          <table className="min-w-full text-sm text-left text-gray-700">
            <thead className="bg-blue-100 text-xs text-gray-600 uppercase">
              <tr>
                <th className="px-6 py-4">Csapat neve</th>
                <th className="px-6 py-4">Iskola neve</th>
                <th className="px-6 py-4">Csapattagok</th>
                <th className="px-6 py-4">Tanár neve</th>
                <th className="px-6 py-4">Kategória</th>
                <th className="px-6 py-4">Programozási nyelv</th>
                <th className="px-6 py-4">Pótló tag neve</th>
                <th className="px-6 py-4">Akciók</th>
              </tr>
            </thead>
            <tbody>
              {teams.map((team) => (
                <tr key={team.username} className="border-b hover:bg-gray-50">
                  <td className="px-6 py-4">{team.team_name}</td>
                  <td className="px-6 py-4">{team.school_name}</td>
                  <td className="px-6 py-4">
                    {team.member1_name}, {team.member2_name}, {team.member3_name}
                    {team.substitute_name && `, ${team.substitute_name}`}
                  </td>
                  <td className="px-6 py-4">{team.teacher_name}</td>
                  <td className="px-6 py-4">{team.category}</td>
                  <td className="px-6 py-4">{team.programming_language}</td>
                  <td className="px-6 py-4">{team.substitute_name ? team.substitute_name : 'Nincs'}</td>
                  <td className="px-6 py-4 flex items-center">
                    <button
                      onClick={() => handleDelete(team.username)}
                      className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition"
                    >
                      Törlés
                    </button>
                    <button
                      onClick={() => handleEdit(team.username)}
                      className="bg-blue-500 text-white ml-5 px-4 py-2 rounded-md hover:bg-blue-600 transition"
                    >
                      Módosítás
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
