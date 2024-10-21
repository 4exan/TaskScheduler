import axios from "axios";

export default class AuthService {
  static BASE_URL = "http://localhost:8080/task";

  static async createTask(formData, token) {
    try {
      const response = await axios.post(`${this.BASE_URL}/create`, userData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (err) {
      throw err;
    }
  }
}
