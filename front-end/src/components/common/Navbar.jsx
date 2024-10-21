import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthService from "../service/AuthService";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { isAuthenticated, isAdmin, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    const confirmLogout = window.confirm("You sure you want to logout?");
    if (confirmLogout) {
      logout();
    }
  };

  return (
    <>
      <nav className="bg-crust">
        <ul className="p-4 flex">
          {
            <li className="mr-2 inline text-subtext-0 text-xl font-semibold transition-all hover:text-text">
              <Link to="/">Home</Link>
            </li>
          }
          {
            <li className="mr-2 inline text-subtext-0 text-xl font-semibold cursor-default">
              /
            </li>
          }
          {!isAuthenticated && (
            <li className="mr-2 inline text-subtext-0 text-xl font-semibold transition-all hover:text-text">
              <Link to="/login">Login</Link>
            </li>
          )}
          {!isAuthenticated && (
            <li className="mr-2 inline text-subtext-0 text-xl font-semibold cursor-default">
              /
            </li>
          )}

          {!isAuthenticated && (
            <li className="mr-2 inline text-subtext-0 text-xl font-semibold transition-all hover:text-text">
              <Link to="/registration">Registration</Link>
            </li>
          )}
          {isAuthenticated && (
            <li className="mr-2 inline text-subtext-0 text-xl font-semibold transition-all hover:text-text">
              <Link to="/tasks">My tasks</Link>
            </li>
          )}
          {isAuthenticated && (
            <li className="ml-auto mr-2 inline text-text text-xl font-semibold transition-all hover:text-red">
              <Link to="/" onClick={handleLogout}>
                Logout
              </Link>
            </li>
          )}
        </ul>
      </nav>
    </>
  );
}
