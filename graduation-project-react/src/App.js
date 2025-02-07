import React, { useState } from "react";
import "./App.css"; // استيراد ملف CSS
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Home from "./Pages/Home";
function App() {
  // حالة للتحكم في الوضع الداكن
  const [isDarkMode, setIsDarkMode] = useState(false);
  // دالة لتبديل بين الوضعين الفاتح والداكن
  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div className={isDarkMode ? "dark-mode" : ""}>
      <div className="App">
        <h1>مرحبًا في تطبيق الثيمات</h1>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/Register" element={<Register />} />
            {/* <Route path="/add" element={<AddIssue />} />
          <Route path="/edit" element={<EditIssue />} /> */}
          </Routes>
        </BrowserRouter>

        {/* الزر لتبديل الثيم بين الفاتح والداكن */}
        <button onClick={toggleTheme} className="theme-toggle-btn">
          {isDarkMode ? "تفعيل الوضع الفاتح" : "تفعيل الوضع الداكن"}
        </button>
      </div>
    </div>
  );
}

export default App;
