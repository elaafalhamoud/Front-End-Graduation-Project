import React, { useState } from 'react';
import './App.css'; // استيراد ملف CSS

function App() {
  // حالة للتحكم في الوضع الداكن
  const [isDarkMode, setIsDarkMode] = useState(false);

  // دالة لتبديل بين الوضعين الفاتح والداكن
  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div className={isDarkMode ? 'dark-mode' : ''}>
      <div className="App">
        <h1>مرحبًا في تطبيق الثيمات</h1>
        
        {/* الزر لتبديل الثيم بين الفاتح والداكن */}
        <button onClick={toggleTheme} className="theme-toggle-btn">
          {isDarkMode ? 'تفعيل الوضع الفاتح' : 'تفعيل الوضع الداكن'}
        </button>
      </div>
    </div>
  );
}

export default App;


