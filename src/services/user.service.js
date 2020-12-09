import axios from "axios";
import { authHeader } from '../helpers';


// const API_URL = "https://api-caro-web.herokuapp.com/users/";
const API_URL = "http://localhost:8000/users/";


class UserService {

  login(data) {
    return axios
      .post(API_URL + "login", {data}).then((response) => {
        console.log('login', response)
        if (response.data) {
          localStorage.setItem("accessToken", JSON.stringify(response.data.accessToken));
          localStorage.setItem("refreshToken", JSON.stringify(response.data.refreshToken));
        }
        return response.data;
      });
  }

  loginSocial(data) {
    return axios
      .post(API_URL + "social", {data}).then((response) => {
        console.log('sssssssss', response)
        if (response.data) {
          localStorage.setItem("accessToken", JSON.stringify(response.data.accessToken));
          localStorage.setItem("refreshToken", JSON.stringify(response.data.refreshToken));
        }
        return response.data;
      });
  }

  logout(user) {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    return axios.put(API_URL, {
      user,
      status: false,
    });
  }

  signup(data) {
    return axios.post(API_URL + 'signup', {data}).then((response) => {
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

  getUserOnline(){
    return axios.get(API_URL + "online",{
      headers: authHeader(),
    })
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem('accessToken'));
  }
}
export default new UserService();