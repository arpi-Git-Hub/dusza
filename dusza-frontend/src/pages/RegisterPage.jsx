import { useState } from "react";
import { useNavigate } from "react-router-dom";

const RegisterPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [teamName, setTeamName] = useState("");
  const [schoolName, setSchoolName] = useState("");
  const [member1Name, setMember1Name] = useState("");
  const [member1Grade, setMember1Grade] = useState("");
  const [member2Name, setMember2Name] = useState("");
  const [member2Grade, setMember2Grade] = useState("");
  const [member3Name, setMember3Name] = useState("");
  const [member3Grade, setMember3Grade] = useState("");
  const [substituteName, setSubstituteName] = useState("");
  const [substituteGrade, setSubstituteGrade] = useState("");
  const [teacherName, setTeacherName] = useState("");
  const [category, setCategory] = useState("");
  const [language, setLanguage] = useState("");
  const [registrationDate, setRegistrationDate] = useState(new Date().toISOString());

  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();

    if (!username || !password || !teamName || !schoolName || !member1Name || !member1Grade || !member2Name || !member2Grade || !member3Name || !member3Grade || !category || !language || !teacherName) {
      alert("Minden kötelező mezőt ki kell tölteni!");
      return;
    }

    const newTeam = {
      username,
      password,
      teamName,
      schoolName,
      member1: { name: member1Name, grade: member1Grade },
      member2: { name: member2Name, grade: member2Grade },
      member3: { name: member3Name, grade: member3Grade },
      substitute: substituteName ? { name: substituteName, grade: substituteGrade } : null,
      teacherName,
      category,
      language,
      registrationDate
    };

    const storedTeams = JSON.parse(localStorage.getItem("teams")) || [];
    storedTeams.push(newTeam);
    localStorage.setItem("teams", JSON.stringify(storedTeams));

    alert("Sikeres regisztráció!");
    navigate("/");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-400 to-blue-600">
      <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-xl shadow-2xl">
        <h2 className="text-3xl font-bold text-center text-blue-600 mb-6">Csapat regisztráció</h2>
        <form onSubmit={handleRegister} className="space-y-6">
          {/* Felhasználónév */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Felhasználónév</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="mt-2 block w-full p-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Jelszó */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Jelszó</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-2 block w-full p-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Csapat neve */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Csapat neve</label>
            <input
              type="text"
              value={teamName}
              onChange={(e) => setTeamName(e.target.value)}
              className="mt-2 block w-full p-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Iskola neve */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Iskola neve</label>
            <input
              type="text"
              value={schoolName}
              onChange={(e) => setSchoolName(e.target.value)}
              className="mt-2 block w-full p-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Csapattagok */}
          <div className="space-y-4">
            <h3 className="font-semibold text-gray-700">Csapattagok:</h3>
            <div>
              <label className="block text-sm font-medium text-gray-700">Csapattag 1 neve</label>
              <input
                type="text"
                value={member1Name}
                onChange={(e) => setMember1Name(e.target.value)}
                className="mt-2 block w-full p-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Csapattag 1 évfolyam</label>
              <input
                type="text"
                value={member1Grade}
                onChange={(e) => setMember1Grade(e.target.value)}
                className="mt-2 block w-full p-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Csapattag 2 neve</label>
              <input
                type="text"
                value={member2Name}
                onChange={(e) => setMember2Name(e.target.value)}
                className="mt-2 block w-full p-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Csapattag 2 évfolyam</label>
              <input
                type="text"
                value={member2Grade}
                onChange={(e) => setMember2Grade(e.target.value)}
                className="mt-2 block w-full p-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Csapattag 3 neve</label>
              <input
                type="text"
                value={member3Name}
                onChange={(e) => setMember3Name(e.target.value)}
                className="mt-2 block w-full p-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Csapattag 3 évfolyam</label>
              <input
                type="text"
                value={member3Grade}
                onChange={(e) => setMember3Grade(e.target.value)}
                className="mt-2 block w-full p-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            {/* Pótló tag */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Pótló tag neve (nem kötelező)</label>
              <input
                type="text"
                value={substituteName}
                onChange={(e) => setSubstituteName(e.target.value)}
                className="mt-2 block w-full p-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Pótló tag évfolyam (nem kötelező)</label>
              <input
                type="text"
                value={substituteGrade}
                onChange={(e) => setSubstituteGrade(e.target.value)}
                className="mt-2 block w-full p-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Felkészítő tanár */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Felkészítő tanár neve</label>
            <input
              type="text"
              value={teacherName}
              onChange={(e) => setTeacherName(e.target.value)}
              className="mt-2 block w-full p-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Kategória */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Kategória</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="mt-2 block w-full p-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="">Válassz egy kategóriát</option>
              <option value="junior">Junior</option>
              <option value="senior">Senior</option>
            </select>
          </div>

          {/* Nyelv */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Nyelv</label>
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="mt-2 block w-full p-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="">Válassz egy nyelvet</option>
              <option value="javascript">JavaScript</option>
              <option value="python">Python</option>
            </select>
          </div>

          {/* Regisztráció */}
          <div>
            <button type="submit" className="w-full bg-blue-600 text-white py-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500">
              Regisztrálás
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
