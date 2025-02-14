import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import IssueCard from "./IssueCard";

import "./app.css"
import HomePage from "../HomePage";
import LoginPage from "../LoginPage";
import Register from "./Register";
import DashboardPage from "../DashboardPage";
import ProfilePage from "../ProfilePage"; // استدعاء ملف CSS

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleTheme = () => {
    setIsDarkMode((prevMode) => !prevMode);
  };

  return (
    <div className={isDarkMode ? "dark-mode" : ""}>
      <div className="App">
        <h1>مرحبًا في تطبيق الثيمات</h1>
        <Router>
          <IssueCard />
          <main className="con">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<Register />} />
              <Route path="/dashboard" element={<DashboardPage />} />
              <Route path="/profile" element={<ProfilePage />} />
          {/*    <Route path="/posts" element={<PostsPage />} />*/}
              <Route path="/IssueCard" element={<IssueCard />} />
            </Routes>
          </main>
        </Router>
        <button onClick={toggleTheme} className="theme-toggle-btn">
          {isDarkMode ? "تفعيل الوضع الفاتح" : "تفعيل الوضع الداكن"}
        </button>
      </div>
    </div>
  );
}

export default App;