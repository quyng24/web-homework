import axios from "axios";
import { BASE_API } from "./constant";

const API_URL = `${BASE_API}/users`;

const getUsers = async () => await axios.get(API_URL);
const getUserById = async (id) => await axios.get(`${API_URL}/${id}`);
const deleteUser = async (id) => await axios.delete(`${API_URL}/${id}`);

export {getUsers, getUserById, deleteUser}