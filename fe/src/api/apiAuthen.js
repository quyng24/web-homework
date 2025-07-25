import axios from "axios";
import { BASE_API } from "./constant";
const API_AUTHEN = `${BASE_API}/auth`;

const callApiLogin = async (valLogin) => await axios.post(`${API_AUTHEN}/login`, valLogin);
const callApiRegister = async (valRegister) => await axios.post(`${API_AUTHEN}/regiates`, valRegister);

export {callApiLogin, callApiRegister};