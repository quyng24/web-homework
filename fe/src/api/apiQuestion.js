import axios from 'axios';
import {BASE_API} from './constant';
const API_QUESTION = `${BASE_API}/questions`

export const getQuestionsByTopicId = async (id) => await axios.get(`${API_QUESTION}/${id}`);
export const createQuestion = async (valQuestion) => await axios.post(API_QUESTION, valQuestion);
export const deleteQuestion = async (id) => await axios.delete(`${API_QUESTION}/${id}`);
export const updateQuestion = async (id, valQuestion) => await axios.put(`${API_QUESTION}/${id}`, valQuestion);