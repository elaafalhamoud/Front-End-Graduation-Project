import React, { useState } from "react";
import { login } from "../Services/authService.js";
import { useNavigate } from "react-router-dom"; // استيراد useNavigate

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate(); // تهيئة navigate

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async () => {
    try {
      const response = await login(formData.email, formData.password);
      console.log(response);
      localStorage.setItem("token0", response.jwt);
      
      // التوجيه إلى الصفحة الرئيسية بعد تسجيل الدخول بنجاح
      navigate("/"); // أو أي مسار آخر تريده
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="login-container">
      <div className="login-wrapper">
        <div className="login-background"></div>

        <div className="login-box">
          <h1 className="login-title">Login</h1>

          <div className="input-group">
            <input
              autoComplete="off"
              id="email"
              name="email"
              type="text"
              value={formData.email}
              onChange={handleChange}
              className="input-field"
              placeholder="Email address"
            />
            {/*<label htmlFor="email" className="input-label">*/}
            {/*  Email Address*/}
            {/*</label>*/}
          </div>

          <div className="input-group">
            <input
              autoComplete="off"
              id="password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              className="input-field"
              placeholder="Password"
            />
            {/*<label htmlFor="password" className="input-label">*/}
            {/*  Password*/}
            {/*</label>*/}
          </div>

          <button onClick={handleSubmit} className="submit-btn">
            Submit
          </button>

          <div className="w-full flex justify-center">
            <button className="signup-btn">
              <a>Don't have an account?</a>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;