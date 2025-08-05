import axios from "axios";
import {BASE_API} from './constant';
const API_RESULT = `${BASE_API}/results`

const submitResultApi = async (val) => await axios.post(`${API_RESULT}/submit`, val, {withCredentials: true});
const getLatestResultByUserAndTopic = async (id1, id2) => await axios.get(`${API_RESULT}/latest/${id1}/${id2}`);
const getResultByUser = async (userId) => await axios.get(`${API_RESULT}/user/${userId}`);
const getUserResultById = async (resultId) => await axios.get(`${API_RESULT}/result/${resultId}`);

export { submitResultApi, getLatestResultByUserAndTopic, getResultByUser, getUserResultById};
