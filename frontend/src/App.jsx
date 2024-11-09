import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import UserDashboard from "./pages/UserDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import EditTeam from "./pages/EditTeam";
import Header from "./components/Header";
import AddCategoryAndLanguage from "./pages/AddCategoryAndLanguage"; // import the new page

const App = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
    if (loggedInUser) {
      setUser(loggedInUser);
    }
  }, []);

  return (
    <Router>
      <Header />
      <Routes>
        <Route
          path="/"
          element={user ? (
            user.isAdmin ? (
              <Navigate to="/admin-dashboard" />
            ) : (
              <Navigate to="/user-dashboard" />
            )
          ) : (
            <LoginPage />
          )}
        />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/admin-dashboard" element={user && user.isAdmin ? <AdminDashboard /> : <Navigate to="/" />} />
        <Route path="/user-dashboard" element={user && !user.isAdmin ? <UserDashboard /> : <Navigate to="/" />} />
        <Route path="/edit-team/:username" element={user && user.isAdmin ? <EditTeam /> : <Navigate to="/" />} />
        {/* Add new route for the AddCategoryAndLanguage page */}
        <Route path="/add-category-language" element={user && user.isAdmin ? <AddCategoryAndLanguage /> : <Navigate to="/" />} />
      </Routes>
    </Router>
  );
};

export default App;
