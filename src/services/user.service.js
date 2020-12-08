import axios from "axios";
import { authHeader } from '../helpers';


const API_URL = "http://localhost:8080/auth/";


class UserService {

  login(username, password) {
    return axios
      .post(API_URL + "signin", {
        username,
        password,
      })
      .then((response) => {
        if (response.data) {
          const data = {
            accessToken: response.data.accessToken,
          }
          localStorage.setItem("user", JSON.stringify(data));
        }
        return response.data;
      });
  }

  logout() {
    localStorage.removeItem("user");
  }

  signup(display_name, username, password,googleId) {
    return axios.post(API_URL + "signup", {
      display_name,
      username,
      password,
      googleId
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