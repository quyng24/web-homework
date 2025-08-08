import axios from "axios";
import {BASE_API} from './constant';
const API_RESULT = `${BASE_API}/results`

export const submitResultApi = async (val) => await axios.post(`${API_RESULT}/submit`, val, {withCredentials: true});
export const getLatestResultByUserAndTopic = async (id1, id2) => await axios.get(`${API_RESULT}/latest/${id1}/${id2}`);
export const getResultByUser = async (userId) => await axios.get(`${API_RESULT}/user/${userId}`);
export const getUserResultById = async (resultId) => await axios.get(`${API_RESULT}/result/${resultId}`);