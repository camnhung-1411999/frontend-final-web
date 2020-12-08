import axios from "axios";
import { authHeader } from '../helpers';


const API_URL = "http://localhost:8000/users/";


class UserService {

  login(data) {
    return axios
      .post(API_URL + "login", data).then((response) => {
        if (response.data) {
          localStorage.setItem("accessToken", JSON.stringify(response.data.accessToken));
          localStorage.setItem("refreshToken", JSON.stringify(response.data.refreshToken));
        }
        return response.data;
      });
  }

  logout() {
    localStorage.removeItem("user");
  }

  signup(display_name, username, password,googleId) {
    return axios.post(API_URL + "signup", {
      user,
      password,
      name,
    }).then((response) => {
      if (response.data) {
        const data = {
          accessToken: response.data.accessToken,
        }
        localStorage.setItem("user", JSON.stringify(data));
      }
      return response.data;
    });
  }

  // register(display_name, username, password,googleId) {
  //   return axios.post(API_URL + "signup", {
  //     display_name,
  //     username,
  //     password,
  //     googleId
  //   }).then((response) => {
  //     if (response.data) {
  //       const data = {
  //         accessToken: response.data.accessToken,
  //       }
  //       localStorage.setItem("user", JSON.stringify(data));
  //     }
  //     return response.data;
  //   });
  // }

  update(display_name, old_password, new_password) {
    return axios.post(API_URL + "update", {
      display_name,
      old_password,
      new_password,
    }, {
      headers: authHeader(),
    });
  }

  getUser() {
    return axios.get(API_URL + "getUser", {
      headers: authHeader(),
    });
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem('user'));
  }
}
export default new UserService();