import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const EditTeam = () => {
  const { username } = useParams();
  const [teamData, setTeamData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("loggedInUser"));
    if (!userData || userData.isAdmin !== true) {
      navigate("/login");
    } else {
      fetchTeamData();
    }
  }, [navigate]);

  const fetchTeamData = async () => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/auth/admin-dashboard/${username}/`, {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });

      const data = await response.json();
      if (response.ok) {
        setTeamData(data.user_data);
      } else {
        alert("Hiba történt a csapat adatainak betöltése során.");
      }
    } catch (error) {
      console.error("Hiba a csapat adatainak lekérésekor:", error);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const updatedTeamData = {
      team_name: event.target.team_name.value,
      school_name: event.target.school_name.value,
      member1_name: event.target.member1_name.value,
      member1_grade: event.target.member1_grade.value,
      member2_name: event.target.member2_name.value,
      member2_grade: event.target.member2_grade.value,
      member3_name: event.target.member3_name.value,
      member3_grade: event.target.member3_grade.value,
      substitute_name: event.target.substitute_name.value,
      substitute_grade: event.target.substitute_grade.value,
      teacher_name: event.target.teacher_name.value,
      category: event.target.category.value,
      programming_language: event.target.programming_language.value,
    };

    try {
      const response = await fetch(`http://127.0.0.1:8000/auth/admin-dashboard/${username}/`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("accessToken")}`,
        },
        body: JSON.stringify(updatedTeamData),
      });

      if (response.ok) {
        alert("A csapat adatainak módosítása sikeres!");
        navigate("/admin-dashboard");
      } else {
        alert("Hiba történt a csapat adatainak mentésekor.");
      }
    } catch (error) {
      console.error("Hiba a csapat adatainak mentésekor:", error);
    }
  };

  if (!teamData) {
    return <div>Betöltés...</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-400 to-blue-600 flex justify-center items-center py-12 px-6">
      <div className="max-w-3xl w-full bg-white shadow-lg rounded-lg p-8">
        <h2 className="text-3xl font-bold text-center text-blue-600 mb-8">Csapat adatainak szerkesztése</h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            {/* Csapat neve */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Csapat neve</label>
              <input
                type="text"
                name="team_name"
                defaultValue={teamData.team_name}
                className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Iskola neve */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Iskola neve</label>
              <input
                type="text"
                name="school_name"
                defaultValue={teamData.school_name}
                className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Első csapattag neve */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Első csapattag neve</label>
              <input
                type="text"
                name="member1_name"
                defaultValue={teamData.member1_name}
                className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Első csapattag osztálya */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Első csapattag osztálya</label>
              <input
                type="text"
                name="member1_grade"
                defaultValue={teamData.member1_grade}
                className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Második csapattag neve */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Második csapattag neve</label>
              <input
                type="text"
                name="member2_name"
                defaultValue={teamData.member2_name}
                className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Második csapattag osztálya */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Második csapattag osztálya</label>
              <input
                type="text"
                name="member2_grade"
                defaultValue={teamData.member2_grade}
                className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Harmadik csapattag neve */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Harmadik csapattag neve</label>
              <input
                type="text"
                name="member3_name"
                defaultValue={teamData.member3_name}
                className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Harmadik csapattag osztálya */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Harmadik csapattag osztálya</label>
              <input
                type="text"
                name="member3_grade"
                defaultValue={teamData.member3_grade}
                className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Pótló csapattag neve */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Pótló csapattag neve</label>
              <input
                type="text"
                name="substitute_name"
                defaultValue={teamData.substitute_name}
                className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Pótló csapattag osztálya */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Pótló csapattag osztálya</label>
              <input
                type="text"
                name="substitute_grade"
                defaultValue={teamData.substitute_grade}
                className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Tanár neve */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Tanár neve</label>
              <input
                type="text"
                name="teacher_name"
                defaultValue={teamData.teacher_name}
                className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Kategória */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Kategória</label>
              <input
                type="text"
                name="category"
                defaultValue={teamData.category}
                className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Programozási nyelv */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Programozási nyelv</label>
              <input
                type="text"
                name="programming_language"
                defaultValue={teamData.programming_language}
                className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="flex justify-center">
            <button
              type="submit"
              className="w-full py-3 bg-blue-500 text-white text-lg font-semibold rounded-md shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            >
              Módosítás mentése
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditTeam;
