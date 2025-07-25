import {BASE_API} from './constant';
import axios from 'axios';
const API_TOPIC = `${BASE_API}/topics`;

const getTopics = async () => await axios.get(API_TOPIC);
const getTopicById = async (id) => await axios.get(`${API_TOPIC}/${id}`);
const createTopic = async (valTopic) => await axios.post(API_TOPIC, valTopic);
const deleteTopic = async (id) => await axios.delete(`${API_TOPIC}/${id}`);
const updateTopic = async (id, newTopic) => await axios.put(`${API_TOPIC}/${id}`, newTopic);

export {getTopics, getTopicById, createTopic, deleteTopic, updateTopic};