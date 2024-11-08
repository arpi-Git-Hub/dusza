import { useState } from 'react';

const RegisterPage = () => {
  const [teamName, setTeamName] = useState('');
  const [schoolName, setSchoolName] = useState('');
  const [member1, setMember1] = useState('');
  const [member2, setMember2] = useState('');
  const [member3, setMember3] = useState('');
  const [category, setCategory] = useState('');
  const [language, setLanguage] = useState('');

  const handleRegister = (e) => {
    e.preventDefault();
    // Teszt adatokat küldünk a konzolra
    console.log('Regisztráció:', {
      teamName,
      schoolName,
      member1,
      member2,
      member3,
      category,
      language,
    });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 py-12 px-6 sm:px-8">
      <div className="max-w-md w-full space-y-8 bg-white shadow-lg rounded-lg p-8">
        <h2 className="text-2xl font-semibold text-center text-blue-600">Csapat regisztráció</h2>
        <form onSubmit={handleRegister} className="mt-8 space-y-6">
          <div className="rounded-md shadow-sm space-y-4">
            <input
              type="text"
              placeholder="Csapat neve"
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={teamName}
              onChange={(e) => setTeamName(e.target.value)}
            />
            <input
              type="text"
              placeholder="Iskola neve"
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={schoolName}
              onChange={(e) => setSchoolName(e.target.value)}
            />
            <input
              type="text"
              placeholder="Tag 1 neve"
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={member1}
              onChange={(e) => setMember1(e.target.value)}
            />
            <input
              type="text"
              placeholder="Tag 2 neve"
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={member2}
              onChange={(e) => setMember2(e.target.value)}
            />
            <input
              type="text"
              placeholder="Tag 3 neve"
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={member3}
              onChange={(e) => setMember3(e.target.value)}
            />
            <input
              type="text"
              placeholder="Kategória"
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            />
            <input
              type="text"
              placeholder="Programozási nyelv"
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="w-full p-3 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Regisztráció
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
