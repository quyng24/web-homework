import { callApiLogin } from "../api/apiAuthen";

export const authProvider = {
  isAuthenticated: false,
  user: null,

  init() {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      this.user = JSON.parse(storedUser);
      this.isAuthenticated = true;
    }
  },

  async signin(email, password, callback) {
    try {
      const res = await callApiLogin({ email, password });
      const data = res.data;
      this.isAuthenticated = true;
      this.user = data.user;
      localStorage.setItem("user", JSON.stringify(data.user));
      callback(data.user);
    } catch (error) {
      const errMessage = error.response?.data?.message || "Lỗi kết nối đến server";
      console.error("Đăng nhập lỗi:", errMessage);
      callback(null, errMessage);
    }
  },

  signout(callback) {
    this.isAuthenticated = false;
    this.user = null;
    localStorage.removeItem("user");
    setTimeout(callback, 100);
  },
};
