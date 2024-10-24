import React, { useState } from "react";
import { useNavigate } from "react-router";
import AuthService from "../service/AuthService";
import { useAuth } from "../context/AuthContext";

export default function RegistrationPage() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    email: "",
  });
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await AuthService.registration(formData);
      if (response.token) {
        console.log(response);
        localStorage.setItem("token", response.token);
        login();
        navigate("/tasks");
      } else {
        setError(response.message);
      }
    } catch (e) {
      setError(e);
      setTimeout(() => {
        setError("");
      }, 5000);
    }
  };

  return (
    <>
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className="flex border border-subtext-1 rounded-lg">
          <div className="p-2">
            <h1 className="text-center text-xl font-semibold text-text">
              Registration:
            </h1>
            <form className="last:text-center" onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="Username"
                name="username"
                className="bg-crust rounded-lg p-2 my-2 border border-black focus:outline-none focus:border-subtext-0 text-subtext-1"
                value={formData.username}
                onChange={(e) => handleInputChange(e)}
              />
              <br />
              <input
                type="password"
                placeholder="Password"
                name="password"
                className="bg-crust rounded-lg p-2 my-2 border border-black focus:outline-none focus:border-subtext-0 text-subtext-1"
                value={formData.password}
                onChange={(e) => handleInputChange(e)}
              />
              <br />
              <input
                type="text"
                placeholder="Email"
                name="email"
                className="bg-crust rounded-lg p-2 my-2 border border-black focus:outline-none focus:border-subtext-0 text-subtext-1"
                value={formData.email}
                onChange={(e) => handleInputChange(e)}
              />
              <br />
              <input
                type="submit"
                className="px-2 py-1 rounded-lg text-subtext-1 bg-crust cursor-pointer transition-all hover:text-crust hover:bg-green w-fit"
                value="Register"
              />
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
