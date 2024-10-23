import axios from "axios";

export default class TaskService {
  static BASE_URL = "http://localhost:8080/task";

  static async createTask(formData, token) {
    try {
      const response = await axios.post(`${this.BASE_URL}/create`, formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (err) {
      throw err;
    }
  }

  static async getMyTasks(token) {
    try {
      const response = await axios.get(`${this.BASE_URL}/get-all`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (err) {
      throw err;
    }
  }

  static async updateTask(toke, taskId, formData) {
    try {
      const response = await axios.put(`${this.BASE_URL}/update/${taskId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (err) {
      throw err;
    }
  }

  static async deleteTask(taskId, token) {
    try {
      const response = await axios.delete(`${this.BASE_URL}/remove/${taskId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (err) {
      throw err;
    }
  }

  static async toggleComplete(taskId, token) {
    try {
      await axios.put(
        `${TaskService.BASE_URL}/set-completed/${taskId}`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
    } catch (err) {
      throw err;
    }
  }
}
