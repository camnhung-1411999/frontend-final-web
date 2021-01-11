import axios from 'axios';
import { urlConstants } from '../constants'

const API_URL = urlConstants.API_URL + 'users/';
const axiosApiInstance = axios.create();

// Request interceptor for API calls
axiosApiInstance.interceptors.request.use(
  async config => {
    const accessToken = JSON.parse(localStorage.getItem('accessToken'));
    config.headers = {
      Authorization: 'Bearer ' + accessToken,
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    }
    return config;
  },
  error => {
    Promise.reject(error)
  });

// Response interceptor for API calls
axiosApiInstance.interceptors.response.use((response) => {
  return response
}, async function (error) {
  const originalRequest = error.config;
  if (error.response.status === 401 && !originalRequest._retry) {
    originalRequest._retry = true;
    const refreshToken = JSON.parse(localStorage.getItem('refreshToken'));
    const token = await axios.get(`${API_URL}refresh`, {
      headers: {
        Authorization: 'Bearer ' + refreshToken,
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
    })
    localStorage.setItem(
      "accessToken",
      JSON.stringify(token.data.accessToken)
    );
    localStorage.setItem(
      "refreshToken",
      JSON.stringify(token.data.refreshToken)
    );
    localStorage.setItem(
      "username",
      JSON.stringify(token.data.user)
    );
    return axiosApiInstance(originalRequest);
  }
  return Promise.reject(error);
});
export default axiosApiInstance;