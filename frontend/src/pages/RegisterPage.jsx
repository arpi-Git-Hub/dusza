import { useState, useEffect } from "react";
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
  const [categories, setCategories] = useState([]);
  const [languages, setLanguages] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategoriesAndLanguages = async () => {
      const categoryResponse = await fetch("http://127.0.0.1:8000/api/categories/");
      const languageResponse = await fetch("http://127.0.0.1:8000/api/programming-languages/");

      const categoryData = await categoryResponse.json();
      const languageData = await languageResponse.json();

      if (categoryResponse.ok) {
        setCategories(categoryData.categories);
      }
      if (languageResponse.ok) {
        setLanguages(languageData.programmingLanguages);
      }
    };
    fetchCategoriesAndLanguages();
  }, []);

  const handleRegister = async (e) => {
    e.preventDefault();
    const payload = {
      username,
      password,
      team_name: teamName,
      school_name: schoolName,
      member1_name: member1Name,
      member1_grade: member1Grade,
      member2_name: member2Name,
      member2_grade: member2Grade,
      member3_name: member3Name,
      member3_grade: member3Grade,
      substitute_name: substituteName,
      substitute_grade: substituteGrade,
      teacher_name: teacherName,
      category_id: category,  // category id küldése
      programming_language_id: language,  // programming_language id küldése
    };
  
    try {
      const response = await fetch("http://127.0.0.1:8000/auth/register/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
  
      if (response.ok) {
        navigate("/");
      } else {
        const errorData = await response.json();
        alert(`A regisztráció nem sikerült: ${errorData.error || "Ismeretlen hiba"}`);
      }
    } catch (error) {
      console.error("Hiba:", error);
      alert("Hiba történt a regisztráció során.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-400 to-blue-600">
      <div className="max-w-lg w-full space-y-8 bg-white p-8 rounded-xl shadow-lg">
        <h2 className="text-3xl font-bold text-center text-blue-600 mb-8">Csapat regisztráció</h2>
        <form onSubmit={handleRegister} className="space-y-6">
          {/* Felhasználónév */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Felhasználónév</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full p-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Jelszó */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Jelszó</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Csapat neve */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Csapat neve</label>
            <input
              type="text"
              value={teamName}
              onChange={(e) => setTeamName(e.target.value)}
              className="w-full p-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Iskola neve */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Iskola neve</label>
            <input
              type="text"
              value={schoolName}
              onChange={(e) => setSchoolName(e.target.value)}
              className="w-full p-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Csapattagok */}
          <div className="space-y-6">
            <h3 className="font-semibold text-lg text-gray-700">Csapattagok</h3>
            
            {[{name: member1Name, grade: member1Grade, setterName: setMember1Name, setterGrade: setMember1Grade},
              {name: member2Name, grade: member2Grade, setterName: setMember2Name, setterGrade: setMember2Grade},
              {name: member3Name, grade: member3Grade, setterName: setMember3Name, setterGrade: setMember3Grade}
            ].map((member, index) => (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4" key={index}>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Csapattag {index + 1} neve</label>
                  <input
                    type="text"
                    value={member.name}
                    onChange={(e) => member.setterName(e.target.value)}
                    className="w-full p-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Csapattag {index + 1} évfolyam</label>
                  <input
                    type="number"
                    value={member.grade}
                    onChange={(e) => member.setterGrade(e.target.value)}
                    className="w-full p-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
              </div>
            ))}

            {/* Pótló tag */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Pótló tag neve (nem kötelező)</label>
              <input
                type="text"
                value={substituteName}
                onChange={(e) => setSubstituteName(e.target.value)}
                className="w-full p-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Pótló tag évfolyam (nem kötelező)</label>
              <input
                type="number"
                value={substituteGrade}
                onChange={(e) => setSubstituteGrade(e.target.value)}
                className="w-full p-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Felkészítő tanár */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Felkészítő tanár neve</label>
            <input
              type="text"
              value={teacherName}
              onChange={(e) => setTeacherName(e.target.value)}
              className="w-full p-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Kategória */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Kategória</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}  // Itt is állapotot módosítunk
              className="mt-2 block w-full p-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="">Válassz egy kategóriát</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}> {/* Itt küldd az ID-t, ne a nevet */}
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          {/* Nyelv */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Nyelv</label>
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}  // Itt is állapotot módosítunk
              className="mt-2 block w-full p-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="">Válassz egy nyelvet</option>
              {languages.map((lang) => (
                <option key={lang.id} value={lang.id}> {/* Itt küldd az ID-t, ne a nevet */}
                  {lang.name}
                </option>
              ))}
            </select>
          </div>

          {/* Regisztráció gomb */}
          <div className="space-y-4">
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Regisztrálás
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
