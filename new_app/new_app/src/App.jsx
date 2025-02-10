import React, { useState } from "react";
import "./App.css"; // Import CSS file
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./Pages/HomePage"; // الصفحة الرئيسية
import LoginPage from "./Pages/LoginPage"; // صفحة تسجيل الدخول
import RegisterPage from "./Pages/RegisterPage"; // صفحة التسجيل
import DashboardPage from "./Pages/RegisterPage"; // الصفحة الرئيسية البديلة (Dashboard)
import ProfilePage from "./Pages/ProfilePage"; // صفحة الملف الشخصي أو صفحة أخرى

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleTheme = () => {
    setIsDarkMode((prevMode) => !prevMode);
  };
  return (
    <div className={isDarkMode ? "dark-mode" : ""}>
      <div className="App">
        <h1>مرحبًا في تطبيق الثيمات</h1>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<HomePage />} /> {/* الصفحة الرئيسية */}
            <Route path="/login" element={<LoginPage />} /> {/* صفحة تسجيل الدخول */}
            <Route path="/register" element={<RegisterPage />} /> {/* صفحة التسجيل */}
            <Route path="/dashboard" element={<DashboardPage />} /> {/* الصفحة الرئيسية البديلة */}
            <Route path="/profile" element={<ProfilePage />} /> {/* صفحة الملف الشخصي */}
          </Routes>
        </BrowserRouter>

        {/* Button to toggle theme between light and dark */}
        <button onClick={toggleTheme} className="theme-toggle-btn">
          {isDarkMode ? "تفعيل الوضع الفاتح" : "تفعيل الوضع الداكن"}
        </button>
      </div>
    </div>
  );
}

export default App;
