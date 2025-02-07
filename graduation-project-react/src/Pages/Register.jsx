import React, { useState } from "react";
import { register } from "../Services/authService.js";
const Register = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    username: "",
    repeatPassword: "",
  });
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = async () => {
    try {
      const response = await register(
        formData.username,
        formData.email,
        formData.password
      );
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
     <div className="register-container">
      <div className="register-wrapper">
        <div className="register-background"></div>

        <div className="register-box">
          <h1 className="register-title">Register</h1>

          <div className="input-group">
            <input
              autoComplete="off"
              id="username"
              name="username"
              type="text"
              value={formData.username}
              onChange={handleChange}
              className="input-field"
              placeholder="Username"
            />
            <label htmlFor="username" className="input-label">
              Username
            </label>
          </div>

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
            <label htmlFor="email" className="input-label">
              Email Address
            </label>
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
            <label htmlFor="password" className="input-label">
              Password
            </label>
          </div>

          <div className="input-group">
            <input
              autoComplete="off"
              id="repeatPassword"
              name="repeatPassword"
              type="password"
              value={formData.repeatPassword}
              onChange={handleChange}
              className="input-field"
              placeholder="Repeat Password"
            />
            <label htmlFor="repeatPassword" className="input-label">
              Repeat Password
            </label>
          </div>

          <button onClick={handleSubmit} className="submit-btn">
            Submit
          </button>

          <div className="w-full flex justify-center">
            <button className="login-btn">
              <a href="#">Already have an account?</a>
            </button>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};
export default Register;
