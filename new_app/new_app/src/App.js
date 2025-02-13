import React, { useState } from 'react';
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Home from "./Pages/Home";
import Logout from "./Pages/logout"; // تأكد من أن اسم الملف "Logout" بحرف كبير

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleTheme = () => {
    setIsDarkMode((prevMode) => !prevMode);
  };

  return (
    <div className={isDarkMode ? "dark-mode" : ""}>
      <BrowserRouter>
        <button onClick={toggleTheme} className="theme-toggle-btn">
          {isDarkMode ? "تفعيل الوضع الفاتح" : "تفعيل الوضع الداكن"}
        </button>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/logout" element={<Logout />} />
          {/* يمكنك إضافة المزيد من المسارات هنا */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
