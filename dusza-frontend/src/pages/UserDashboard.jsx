import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const UserDashboard = () => {
  const [team, setTeam] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
    if (!loggedInUser) {
      navigate("/login");
    } else {
      setTeam(loggedInUser);
    }
  }, [navigate]);

  const handleUpdate = (e) => {
    e.preventDefault();
    // Itt végezhető el a csapatadatok módosítása
    const updatedTeams = JSON.parse(localStorage.getItem("teams")).map((t) =>
      t.username === team.username ? { ...t, ...team } : t
    );
    localStorage.setItem("teams", JSON.stringify(updatedTeams));
    alert("Sikeres módosítás!");
  };

  if (!team) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center py-12 px-6">
      <div className="max-w-3xl w-full bg-white shadow-lg rounded-lg p-8">
        <h2 className="text-3xl font-bold text-center text-blue-600 mb-8">Csapat adatainak módosítása</h2>

        <form onSubmit={handleUpdate} className="space-y-6">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-gray-700">Csapat neve</label>
              <input
                type="text"
                value={team.teamName}
                onChange={(e) => setTeam({ ...team, teamName: e.target.value })}
                className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Iskola neve</label>
              <input
                type="text"
                value={team.schoolName}
                onChange={(e) => setTeam({ ...team, schoolName: e.target.value })}
                className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Első csapattag neve</label>
              <input
                type="text"
                value={team.member1.name}
                onChange={(e) =>
                  setTeam({
                    ...team,
                    member1: { ...team.member1, name: e.target.value },
                  })
                }
                className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Első csapattag osztálya</label>
              <input
                type="text"
                value={team.member1.grade}
                onChange={(e) =>
                  setTeam({
                    ...team,
                    member1: { ...team.member1, grade: e.target.value },
                  })
                }
                className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Második csapattag neve</label>
              <input
                type="text"
                value={team.member2.name}
                onChange={(e) =>
                  setTeam({
                    ...team,
                    member2: { ...team.member2, name: e.target.value },
                  })
                }
                className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Második csapattag osztálya</label>
              <input
                type="text"
                value={team.member2.grade}
                onChange={(e) =>
                  setTeam({
                    ...team,
                    member2: { ...team.member2, grade: e.target.value },
                  })
                }
                className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Harmadik csapattag neve</label>
              <input
                type="text"
                value={team.member3.name}
                onChange={(e) =>
                  setTeam({
                    ...team,
                    member3: { ...team.member3, name: e.target.value },
                  })
                }
                className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Harmadik csapattag osztálya</label>
              <input
                type="text"
                value={team.member3.grade}
                onChange={(e) =>
                  setTeam({
                    ...team,
                    member3: { ...team.member3, grade: e.target.value },
                  })
                }
                className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Pótló neve</label>
              <input
                type="text"
                value={team.substitute ? team.substitute.name : ""}
                onChange={(e) =>
                  setTeam({
                    ...team,
                    substitute: { ...team.substitute, name: e.target.value },
                  })
                }
                className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Pótló osztálya</label>
              <input
                type="text"
                value={team.substitute ? team.substitute.grade : ""}
                onChange={(e) =>
                  setTeam({
                    ...team,
                    substitute: { ...team.substitute, grade: e.target.value },
                  })
                }
                className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Tanár neve</label>
              <input
                type="text"
                value={team.teacherName}
                onChange={(e) => setTeam({ ...team, teacherName: e.target.value })}
                className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Kategória</label>
              <input
                type="text"
                value={team.category}
                onChange={(e) => setTeam({ ...team, category: e.target.value })}
                className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Nyelv</label>
              <input
                type="text"
                value={team.language}
                onChange={(e) => setTeam({ ...team, language: e.target.value })}
                className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          
          <div className="mt-6 flex justify-center">
            <button
              type="submit"
              className="px-6 py-3 bg-blue-600 text-white font-bold text-lg rounded-md hover:bg-blue-700 focus:ring-2 focus:ring-blue-500"
            >
              Módosítások mentése
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserDashboard;
