import { callApiLogin, callApiLogout, callApiToken } from "../api/apiAuthen";

export const authProvider = {
  isAuthenticated: false,
  user: null,

  async init() {
    try {
      const res = await callApiToken();
      this.user = res.data;
      this.isAuthenticated = true;
    } catch (err) {
      console.error("Không xác thực được user:", err.message);
    }
  },

  async signin(email, password, callback) {
    try {
      await callApiLogin({ email, password });
      setTimeout(async () => {
        const res = await callApiToken();
        console.log(res.data)
        this.isAuthenticated = true;
        this.user = res.data.role;
        callback(res.data)
      }, 300)
    } catch (error) {
      const errMessage = error.response?.data?.message || "Lỗi kết nối đến server";
      console.error("Đăng nhập lỗi:", errMessage);
      callback(null, errMessage);
    }
  },

  async signout(callback) {
    try {
      await callApiLogout();
    } catch (err) {
      console.error("Lỗi khi đăng xuất:", err.message);
    }
    if (callback) setTimeout(callback, 200);
  },
};
