import React, { useState } from "react";
import { useNavigate } from "react-router";
import AuthService from "../service/AuthService";
import { useAuth } from "../context/AuthContext";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await AuthService.login(username, password);
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
          <div className="w-1/2 p-2">
            <form className="last:text-center" onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="Login"
                className="bg-crust rounded-lg p-2 my-2 border border-black focus:outline-none focus:border-subtext-0 text-subtext-1"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <input
                type="password"
                placeholder="Password"
                className="bg-crust rounded-lg p-2 my-2 border border-black focus:outline-none focus:border-subtext-0 text-subtext-1"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <input
                type="submit"
                className="px-2 py-1 rounded-lg text-subtext-1 bg-crust cursor-pointer transition-all hover:text-crust hover:bg-green w-fit"
                value="Login"
              />
            </form>
          </div>
          <div className="w-1/2 p-2">
            <h1>world</h1>
          </div>
        </div>
      </div>
    </>
  );
}
