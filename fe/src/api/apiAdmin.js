import axios from "axios";
import { BASE_API } from "./constant";
const API_CHART_ADMIN = `${BASE_API}/admin/topic-statistics`;

export const getApiChartAdmin = async () => await axios.get(API_CHART_ADMIN);