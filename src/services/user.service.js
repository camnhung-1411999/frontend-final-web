import axios from "axios";
import { urlConstants } from '../constants'
import axiosApiInstance from '../helpers/axiosApiInstance';

const API_URL = urlConstants.API_URL + "users/";

class UserService {
  login(data) {
    return axios.post(API_URL + "login", { data }).then((response) => {
      if (response.data) {
        console.log(response.data)
        localStorage.setItem(
          "accessToken",
          JSON.stringify(response.data.accessToken)
        );
        localStorage.setItem(
          "refreshToken",
          JSON.stringify(response.data.refreshToken)
        );
        localStorage.setItem(
            "username",
            JSON.stringify(response.data.user)
        );
      }
      return response.data;
    });
  }

  loginSocial(input) {
    return axios
      .post(API_URL + "social", {
        user: input.user,
        password: input.password,
        name: input.name,
        role: input.role,
        status: true,
      }).then(async (response) => {
        if (response.data) {
          localStorage.setItem(
            "accessToken",
            JSON.stringify(response.data.accessToken)
          );
          localStorage.setItem(
            "refreshToken",
            JSON.stringify(response.data.refreshToken)
          );
        }
        return response.data;
      });
  }

  logout() {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("username");

    return axiosApiInstance.put(API_URL + "logout");
  }

  register(input) {
    return axios
      .post(API_URL + "signup", input)
      .then((response) => {
        return response.data;
      });
  }

  resetPassword(input) {
    return axios.post(API_URL + "reset", { user: input });
  }
  subRegiser(data) {
    return axios
      .post(API_URL + "subsignup", data)
      .then((response) => {
        return response.data;
      });
  }

  async update(data) {
    return await axiosApiInstance.put(
      API_URL,
      data
    );
  }

  async updateByAdmin(data) {
    return await axios.put(
      API_URL + 'block',
      data
    );
  }

  updatePwd(data) {
    return axios.put(API_URL + 'resetpassword', data)
  }
  getUser() {
    return axiosApiInstance.get(API_URL);
  }

  async getUserById(id) {
    console.log('id',id)
    return await axiosApiInstance.get(API_URL+`${id}`);
  }

  async getAllUser() {
    return await axiosApiInstance.get(API_URL+'list');
  }

  getUserOnline() {
    return axiosApiInstance.get(API_URL + "online");
  }

  getCurrentUser() {
    const token = localStorage.getItem('accessToken');
    if (token) {
      return axiosApiInstance.get(API_URL);
    }
    return token;
  }

  updateAvatar(file) {
    return axiosApiInstance.post(
      API_URL + "avatar",
      { file }
    );
  }
  getListRank() {
    return axiosApiInstance.get(API_URL + 'rank');
  }
}
export default new UserService();
