import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const [teams, setTeams] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const isAdmin = localStorage.getItem("isAdmin");
    if (isAdmin !== "true") {
      navigate("/login");
    } else {
      const storedTeams = JSON.parse(localStorage.getItem("teams")) || [];
      setTeams(storedTeams);
    }
  }, [navigate]);

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
    <div className="container mx-auto p-6">
      <h2 className="text-3xl font-semibold text-blue-600 mb-6">Adminisztrátori felület</h2>
      
      <div className="overflow-x-auto bg-white shadow-lg rounded-lg">
        <table className="min-w-full text-sm text-left text-gray-700">
          <thead className="bg-blue-100 text-xs text-gray-600 uppercase">
            <tr>
              <th className="px-6 py-4">Csapat neve</th>
              <th className="px-6 py-4">Iskola neve</th>
              <th className="px-6 py-4">Csapattagok</th>
              <th className="px-6 py-4">Tanár neve</th>
              <th className="px-6 py-4">Kategória</th>
              <th className="px-6 py-4">Nyelv</th>
              <th className="px-6 py-4">Akciók</th>
            </tr>
          </thead>
          <tbody>
            {teams.map((team) => (
              <tr key={team.username} className="border-b hover:bg-gray-50">
                <td className="px-6 py-4">{team.teamName}</td>
                <td className="px-6 py-4">{team.schoolName}</td>
                <td className="px-6 py-4">
                  {team.member1.name}, {team.member2.name}, {team.member3.name}
                  {team.substitute && `, ${team.substitute.name}`}
                </td>
                <td className="px-6 py-4">{team.teacherName}</td>
                <td className="px-6 py-4">{team.category}</td>
                <td className="px-6 py-4">{team.language}</td>
                <td className="px-6 py-4 flex space-x-2">
                  <button
                    onClick={() => handleDelete(team.username)}
                    className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition"
                  >
                    Törlés
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminDashboard;
