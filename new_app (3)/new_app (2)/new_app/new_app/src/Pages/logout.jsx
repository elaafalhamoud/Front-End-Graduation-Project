import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // حذف التوكن من localStorage لتسجيل الخروج
    localStorage.removeItem("token0");

    // توجيه المستخدم إلى صفحة تسجيل الدخول بعد تسجيل الخروج
    navigate("/login");
  }, [navigate]);

  return (

          setTimeout(()=>{
              return (
                  <div className="logout-container">
                      <h1>تم تسجيل الخروج بنجاح!</h1>
                      <p>شكرًا لاستخدامك تطبيقنا. يمكنك تسجيل الدخول مرة أخرى في أي وقت.</p>
                  </div>
              )
          },3000)

  );
};

export default Logout;