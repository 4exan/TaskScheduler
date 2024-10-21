import "./App.css";
import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./components/context/AuthContext";
import Navbar from "./components/common/Navbar";
import HomePage from "./components/page/HomePage";
import LoginPage from "./components/auth/LoginPage";
import RegistrationPage from "./components/auth/RegistrationPage";
import TaskPage from "./components/page/TaskPage";
import ErrorPage from "./components/page/ErrorPage";

function App() {
  const { isAuthenticated } = useAuth();
  return (
    <BrowserRouter>
      <div className="App">
        <Navbar />
        <div className="content">
          <Routes>
            <Route exact path="/" element={<HomePage />} />
            <Route exact path="/login" element={<LoginPage />} />
            <Route exact path="/registration" element={<RegistrationPage />} />
            {isAuthenticated && (
              <>
                <Route path="/tasks" element={<TaskPage />} />
              </>
            )}
            <Route path="*" element={<ErrorPage />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
