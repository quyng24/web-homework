import {BASE_API} from './constant';
import axios from 'axios';
const API_TOPIC = `${BASE_API}/topics`;

export const getTopics = async () => await axios.get(API_TOPIC);
export const getTopicById = async (id) => await axios.get(`${API_TOPIC}/${id}`);
export const createTopic = async (valTopic) => await axios.post(API_TOPIC, valTopic);
export const deleteTopic = async (id) => await axios.delete(`${API_TOPIC}/${id}`);
export const updateTopic = async (id, newTopic) => await axios.put(`${API_TOPIC}/${id}`, newTopic);