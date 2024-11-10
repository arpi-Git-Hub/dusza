import React, { useState, useEffect } from "react";

const AddCategoryAndLanguage = () => {
  const [categoryName, setCategoryName] = useState("");
  const [languageName, setLanguageName] = useState("");
  const [recipientName, setRecipientName] = useState("");
  const [messageContent, setMessageContent] = useState("");
  const [categories, setCategories] = useState([]);
  const [languages, setLanguages] = useState([]);

  useEffect(() => {
    const fetchCategoriesAndLanguages = async () => {
      const categoryResponse = await fetch("http://18.192.213.181:8000/api/categories/");
      const languageResponse = await fetch("http://18.192.213.181:8000/api/programming-languages/");

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

  const handleAddCategory = async () => {
    const response = await fetch("http://18.192.213.181:8000/api/categories/add/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem("accessToken")}`,
      },
      body: JSON.stringify({ name: categoryName }),
    });

    const data = await response.json();
    if (response.ok) {
      alert(data.message);
      setCategoryName(""); 
    } else {
      alert(data.error);
    }
  };

  const handleAddLanguage = async () => {
    const response = await fetch("http://18.192.213.181:8000/api/programming-languages/add/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem("accessToken")}`,
      },
      body: JSON.stringify({ name: languageName }),
    });

    const data = await response.json();
    if (response.ok) {
      alert(data.message);
      setLanguageName(""); 
    } else {
      alert(data.error);
    }
  };

  const sendMessage = async (e) => {
    e.preventDefault();
    try {
        const response = await fetch('http://18.192.213.181:8000/api/send-message', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: recipientName,
                content: messageContent,
            }),
        });
        const data = await response.json();
        if (response.ok) {
            alert(data.message);
            setRecipientName('');
            setMessageContent('');
        } else {
            alert(data.error || "Hiba történt az üzenet küldésekor.");
        }
    } catch (error) {
        console.error("Hiba történt:", error);
        alert("Hiba történt az üzenet küldésekor.");
    }
};

  return (
      <div className="min-h-screen bg-gradient-to-r from-blue-400 to-blue-600 ml-15">
      <div className="container mx-auto p-6">
        <h2 className="text-3xl font-semibold text-white mb-6">Kategória és programozási nyelv hozzáadása</h2>
        
        <div className="overflow-x-auto bg-white shadow-lg rounded-lg">
          <table className="min-w-full text-sm text-center text-gray-700">
            <thead className="bg-blue-100 text-xs text-gray-600 uppercase">
              <tr>
                <th className="px-6 py-4">Kategória hozzáadása</th>
                <th className="px-6 py-4">Programozási nyelv</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b hover:bg-gray-50">
                <td>
                <input
                  type="text"
                  value={categoryName}
                  onChange={(e) => setCategoryName(e.target.value)}
                  placeholder="Kategória neve"
                  className="h-8 w-[255px] px-5 bg-gray-200 mx-6 my-6 rounded-md"
                />
                <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition mb-6" onClick={handleAddCategory}>Hozzáadás</button>
                </td>

                <td>
                <input
                  type="text"
                  value={languageName}
                  onChange={(e) => setLanguageName(e.target.value)}
                  placeholder="Programozási nyelv neve"
                  className="h-8 w-[255px] px-5 bg-gray-200 mx-6 my-6 rounded-md"
                />
                <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition mb-6" onClick={handleAddLanguage}>Hozzáadás</button>
                </td>
              </tr>
            </tbody>
          </table>
      </div>
      </div>


    <div className="container mx-auto p-6">
      <h2 className="text-3xl font-semibold text-white mb-6">Jelenleg elérhető kategóriák és programozási nyelvek</h2>
      
      <div className="overflow-x-auto bg-white shadow-lg rounded-lg">
        <table className="min-w-full text-sm text-center text-gray-700">
          <thead className="bg-blue-100 text-xs text-gray-600 uppercase">
            <tr>
              <th className="px-6 py-4">Kategóriák</th>
              <th className="px-6 py-4">Programozási nyelvek</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b hover:bg-gray-50">
              <td>
              <ul className="mx-6 my-6">
                {categories.map((category) => (
                  <li key={category.id}>{category.name}</li>
                ))}
              </ul>
              </td>

              <td>
              <ul className="mx-6 my-6">
                {languages.map((language) => (
                  <li key={language.id}>{language.name}</li>
                ))}
              </ul>
              </td>
            </tr>
          </tbody>
        </table>
    </div>
    </div>

    <div className="container mx-auto p-6">
    <div className="flex space-x-1 w-full">
      <div className="w-1/2">
          <h2 className="text-3xl font-semibold text-white mb-6">Üzenet írása</h2>
          <div className="overflow-x-auto bg-white shadow-lg rounded-lg p-10 mr-3 text-left">
          <form onSubmit={sendMessage}>
                        <label className="block text-sm font-medium text-gray-700">Címzett:</label>
                        <input
                            type="text"
                            value={recipientName}
                            onChange={(e) => setRecipientName(e.target.value)}
                            placeholder="Címzett neve"
                            className="mt-2 mb-5 w-1/2 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500"
                        />
                        <br />
                        <label className="block text-sm font-medium text-gray-700">Üzenet:</label>
                        <textarea
                            rows="5"
                            value={messageContent}
                            onChange={(e) => setMessageContent(e.target.value)}
                            placeholder="Üzenet írása"
                            className="mt-2 mb-5 w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 align-text-top"
                        />
                        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition mb-6">
                            Küldés
                        </button>
                    </form>
          </div>
      </div>

      <div className="w-1/2">
          <h2 className="text-3xl font-semibold text-white mb-6 ml-3">Határidő beállítása</h2>
          <div className="overflow-x-auto bg-white shadow-lg rounded-lg p-10 ml-3 text-center">
              dsa
          </div>
      </div>
    </div>
    </div>

    <div className="container mx-auto p-6">
    <div className="max-w-3xl w-full bg-white shadow-lg rounded-lg p-8 mx-auto min-w-full">
      <h2 className="text-3xl font-bold text-center text-blue-600 mb-8">Iskola hozzáadása</h2>
      <form  
      //</div>onSubmit={handleUpdate} 
      className="space-y-6">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-gray-700">Felhasználónév</label>
              <input 
              type="text" 
              className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Jelszó</label>
              <input 
              type="password" 
              className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Iskola neve</label>
              <input 
              type="text" 
              className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Iskola címe</label>
              <input 
              type="text" 
              className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Kapcsolattartó neve</label>
              <input 
              type="text" 
              className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Kapcsolattartó e-mail címe</label>
              <input 
              type="text" 
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


    <div className="container mx-auto p-6">
      <h2 className="text-3xl font-semibold text-white mb-6">Iskolák kezelése</h2>
      
      <div className="overflow-x-auto bg-white shadow-lg rounded-lg">
        <table className="min-w-full text-sm text-center text-gray-700">
          <thead className="bg-blue-100 text-xs text-gray-600 uppercase">
            <tr>
                <th className="px-6 py-4">Felhasználónév</th>
                <th className="px-6 py-4">Iskola neve</th>
                <th className="px-6 py-4">Iskola címe</th>
                <th className="px-6 py-4">Kapcsolattartó neve</th>
                <th className="px-6 py-4">Kapcsolattartó e-mail címe</th>
                <th className="px-6 py-4">Akciók</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b hover:bg-gray-50">
              <td className="px-6 py-4 flex items-center">
                <button
                  //onClick={() => handleDelete(team.username)}
                  className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition"
                >
                  Törlés
                </button>
                <button
                  //onClick={() => handleEdit(team.username)}
                  className="bg-blue-500 text-white ml-5 px-4 py-2 rounded-md hover:bg-blue-600 transition"
                >
                  Módosítás
                </button>
              </td>
            </tr>
          </tbody>
        </table>
    </div>
    </div> 
    </div>
  );
};

export default AddCategoryAndLanguage;
