import axios from 'axios';
// config
import { HOST } from '../config';
// ----------------------------------------------------------------------
const axiosInstance = axios.create({
  baseURL: HOST,
  validateStatus: () => true
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject((error.response && error.response.data) || 'Something went wrong')
);

export default axiosInstance;
