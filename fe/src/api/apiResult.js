import axios from "axios";
import {BASE_API} from './constant';
const API_SUBMIT = `${BASE_API}/result/submit`;
const API_GET_RESULT = `${BASE_API}/result/user/:userId`;

const getResultApi = async (id) => await axios.get(`${API_GET_RESULT}/${id}`);
const submitResultApi = async (val) => await axios.post(API_SUBMIT, val);

export {getResultApi, submitResultApi};
