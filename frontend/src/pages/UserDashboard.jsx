import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const UserDashboard = () => {
  const [team, setTeam] = useState(null); // Csapatadatok
  const navigate = useNavigate();

  // Frissítsük a tokent, ha lejárt
  const refreshAccessToken = async () => {
    const refreshToken = localStorage.getItem("refreshToken");
    if (!refreshToken) {
      navigate("/login"); // Ha nincs refresh token, irányítsuk át a login oldalra
      return;
    }

    try {
      const response = await fetch("http://127.0.0.1:8000/auth/token/refresh/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ refresh: refreshToken }),
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem("accessToken", data.access); // Frissítsük az access token-t
        fetchTeamData(); // Újra próbáljuk betölteni a csapat adatokat
      } else {
        console.error("Refresh token is invalid or expired.");
        alert("A refresh token érvénytelen vagy lejárt.");
      }
    } catch (error) {
      console.error("Error refreshing token:", error);
      alert("Hiba történt a token frissítésekor.");
    }
  };

  // Töltsük be a csapat adatokat
  const fetchTeamData = async () => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      navigate("/login"); // Ha nincs access token, irányítsuk át a login oldalra
      return;
    }

    try {
      const response = await fetch("http://127.0.0.1:8000/api/team-data/", {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${token}`, // Használjuk a token-t az Authorization fejlécben
        },
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Csapatadatok:", data); // Ellenőrizzük, hogy a csapatadatok rendben vannak
        setTeam(data); // Állítsuk be az adatokat
      } else if (response.status === 401) {
        refreshAccessToken(); // Ha lejárt a token, próbáljuk meg frissíteni
      } else {
        console.error("Nem sikerült betölteni a csapatadatokat.");
        alert("Nem sikerült betölteni a csapatadatokat.");
      }
    } catch (error) {
      console.error("Hiba történt a csapatadatok betöltésekor:", error);
      alert("Hiba történt a csapatadatok betöltésekor.");
    }
  };

  // Ha nincs bejelentkezett felhasználó, irányítsuk át a login oldalra
  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
    if (!loggedInUser) {
      navigate("/login"); // Ha nincs bejelentkezett felhasználó, irányítsuk át a login oldalra
    } else {
      fetchTeamData(); // Töltsük be a csapat adatokat
    }
  }, [navigate]);

  // A csapatadatok frissítése az adatbázisban
  const handleUpdate = async (e) => {
    e.preventDefault();
  
    const token = localStorage.getItem("accessToken");
    if (!token) {
      navigate("/login");
      return;
    }
  
    try {
      // Használjunk PUT kérést
      const response = await fetch("http://127.0.0.1:8000/api/team-data/", {
        method: "PUT",  // PUT metódus
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(team),
      });
  
      if (response.ok) {
        const data = await response.json();
        console.log("Sikeres mentés:", data);
        alert("A változtatások sikeresen elmentve!");
      } else {
        console.error("Nem sikerült menteni a csapatadatokat.");
        alert("Hiba történt az adatok mentésekor.");
      }
    } catch (error) {
      console.error("Hiba történt a csapatadatok mentésekor:", error);
      alert("Hiba történt az adatok mentésekor.");
    }
  };

  if (!team) {
    return <div>Betöltés...</div>; // Ha nincs csapatadat, jelenítsük meg a betöltés állapotot
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-400 to-blue-600 flex justify-center items-center py-12 px-6">
      <div className="max-w-3xl w-full bg-white shadow-lg rounded-lg p-8">
        <h2 className="text-3xl font-bold text-center text-blue-600 mb-8">Csapatadatok módosítása</h2>

        <form onSubmit={handleUpdate} className="space-y-6">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            {/* Csapat neve */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Csapat neve</label>
              <input
                type="text"
                value={team.team_name || ""}
                onChange={(e) => setTeam({ ...team, team_name: e.target.value })}
                className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Iskola neve */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Iskola neve</label>
              <input
                type="text"
                value={team.school_name || ""}
                onChange={(e) => setTeam({ ...team, school_name: e.target.value })}
                className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Első csapattag neve */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Első csapattag neve</label>
              <input
                type="text"
                value={team.members[0]?.name || ""}
                onChange={(e) =>
                  setTeam({
                    ...team,
                    members: [
                      { ...team.members[0], name: e.target.value },
                      ...team.members.slice(1),
                    ],
                  })
                }
                className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Első csapattag osztálya */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Első csapattag osztálya</label>
              <input
                type="text"
                value={team.members[0]?.grade || ""}
                onChange={(e) =>
                  setTeam({
                    ...team,
                    members: [
                      { ...team.members[0], grade: e.target.value },
                      ...team.members.slice(1),
                    ],
                  })
                }
                className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Második csapattag neve */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Második csapattag neve</label>
              <input
                type="text"
                value={team.members[1]?.name || ""}
                onChange={(e) =>
                  setTeam({
                    ...team,
                    members: [
                      team.members[0],
                      { ...team.members[1], name: e.target.value },
                      ...team.members.slice(2),
                    ],
                  })
                }
                className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Második csapattag osztálya */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Második csapattag osztálya</label>
              <input
                type="text"
                value={team.members[1]?.grade || ""}
                onChange={(e) =>
                  setTeam({
                    ...team,
                    members: [
                      team.members[0],
                      { ...team.members[1], grade: e.target.value },
                      ...team.members.slice(2),
                    ],
                  })
                }
                className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Harmadik csapattag neve */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Harmadik csapattag neve</label>
              <input
                type="text"
                value={team.members[2]?.name || ""}
                onChange={(e) =>
                  setTeam({
                    ...team,
                    members: [
                      team.members[0],
                      team.members[1],
                      { ...team.members[2], name: e.target.value },
                    ],
                  })
                }
                className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Harmadik csapattag osztálya */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Harmadik csapattag osztálya</label>
              <input
                type="text"
                value={team.members[2]?.grade || ""}
                onChange={(e) =>
                  setTeam({
                    ...team,
                    members: [
                      team.members[0],
                      team.members[1],
                      { ...team.members[2], grade: e.target.value },
                    ],
                  })
                }
                className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Pótló csapattag neve */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Pótló csapattag neve</label>
              <input
                type="text"
                value={team.substitute?.name || ""}
                onChange={(e) =>
                  setTeam({
                    ...team,
                    substitute: { ...team.substitute, name: e.target.value },
                  })
                }
                className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Pótló csapattag osztálya */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Pótló csapattag osztálya</label>
              <input
                type="text"
                value={team.substitute?.grade || ""}
                onChange={(e) =>
                  setTeam({
                    ...team,
                    substitute: { ...team.substitute, grade: e.target.value },
                  })
                }
                className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Tanár neve */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Tanár neve</label>
              <input
                type="text"
                value={team.teacher_name || ""}
                onChange={(e) => setTeam({ ...team, teacher_name: e.target.value })}
                className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Kategória */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Kategória</label>
              <input
                type="text"
                value={team.category || ""}
                onChange={(e) => setTeam({ ...team, category: e.target.value })}
                className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Programozási nyelv */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Programozási nyelv</label>
              <input
                type="text"
                value={team.programming_language || ""}
                onChange={(e) => setTeam({ ...team, programming_language: e.target.value })}
                className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          
          <div className="flex justify-center">
            <button
              type="submit"
              className="mt-6 inline-block px-6 py-3 text-white font-bold bg-blue-500 hover:bg-blue-600 rounded-lg shadow-md transition duration-300"
            >
              Mentés
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserDashboard;
