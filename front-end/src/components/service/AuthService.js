import axios from "axios";

export default class AuthService {
  static BASE_URL = "http://localhost:8080/auth";

  static async registration(userData, token) {
    try {
      const response = await axios.post(
        `${this.BASE_URL}/registration`,
        userData,
      );
      return response.data;
    } catch (err) {
      throw err;
    }
  }

  static async login(username, password) {
    try {
      const response = await axios.post(`${this.BASE_URL}/login`, {
        username,
        password,
      });
      return response.data;
    } catch (err) {
      throw err;
    }
  }

  static async tokenValidation(token) {
    try {
      const response = await axios.get(`${this.BASE_URL}/validate`, {
        headers: { Authorization: `Bearer ${token}` },
      });
    } catch (err) {
      throw err;
    }
  }

  /**AUTHENTICATION CHECKER */

  static logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
  }

  static isAuthenticated() {
    const token = localStorage.getItem("token");
    return !!token;
  }

  static isAdmin() {
    const role = localStorage.getItem("role");
    return role === "ADMIN";
  }

  static isUser() {
    const role = localStorage.getItem("role");
    return role === "USER";
  }

  static adminOnly() {
    return this.isAuthenticated() && this.isAdmin();
  }
}
