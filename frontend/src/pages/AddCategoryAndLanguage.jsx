import React, { useState, useEffect } from "react";

const AddCategoryAndLanguage = () => {
  const [categoryName, setCategoryName] = useState("");
  const [languageName, setLanguageName] = useState("");
  const [categories, setCategories] = useState([]);
  const [languages, setLanguages] = useState([]);

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

  const handleAddCategory = async () => {
    const response = await fetch("http://127.0.0.1:8000/api/categories/add/", {
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
    const response = await fetch("http://127.0.0.1:8000/api/programming-languages/add/", {
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

  return (
    <div>
      <h2>Add New Category and Programming Language</h2>

      <div>
        <h3>Add Category</h3>
        <input
          type="text"
          value={categoryName}
          onChange={(e) => setCategoryName(e.target.value)}
          placeholder="Category Name"
        />
        <button onClick={handleAddCategory}>Add Category</button>
      </div>

      <div>
        <h3>Add Programming Language</h3>
        <input
          type="text"
          value={languageName}
          onChange={(e) => setLanguageName(e.target.value)}
          placeholder="Programming Language Name"
        />
        <button onClick={handleAddLanguage}>Add Programming Language</button>
      </div>

      <div>
        <h3>Existing Categories</h3>
        <ul>
          {categories.map((category) => (
            <li key={category.id}>{category.name}</li>
          ))}
        </ul>
      </div>

      <div>
        <h3>Existing Programming Languages</h3>
        <ul>
          {languages.map((language) => (
            <li key={language.id}>{language.name}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AddCategoryAndLanguage;
