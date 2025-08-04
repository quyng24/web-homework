import axios from "axios";
import { BASE_API } from "./constant";
const API_AUTHEN = `${BASE_API}/auth`;

const callApiRegister = async (valRegister) => await axios.post(`${API_AUTHEN}/regiates`, valRegister);
const callApiLogin = async (valLogin) => await axios.post(`${API_AUTHEN}/login`, valLogin, {withCredentials: true});
const callApiToken = async () =>  await axios.get(`${API_AUTHEN}/me`, {withCredentials: true});
const callApiLogout = async () => await axios.post(`${API_AUTHEN}/logout`, {}, {withCredentials: true});

export {callApiLogin, callApiRegister, callApiToken, callApiLogout};