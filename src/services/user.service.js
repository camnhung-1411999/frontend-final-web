import axios from "axios";
import { authHeader } from '../helpers';
import { urlConstants } from '../constants'

const API_URL = urlConstants.API_URL + "users/";

class UserService {
  login(data) {
    return axios.post(API_URL + "login", { data }).then((response) => {
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

  loginSocial(input) {
    return axios
      .post(API_URL + "social", {
        user: input.user,
        password: input.password,
        name: input.name,
        role: input.role,
        status: false,
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
    const auth = authHeader();
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    return axios.put(API_URL + "logout", null, {
      headers: auth,
    });
  }

  register(input) {
    return axios
      .post(API_URL + "signup", input)
      .then((response) => {
        return response.data;
      });
  }

  resetPassword(input){
    return axios.post(API_URL + "reset", {user: input});
  }
  subRegiser(data){
    return axios
      .post(API_URL + "subsignup", data)
      .then((response) => {
        return response.data;
      });
  }

  async update(data) {
    return await axios.put(
      API_URL,
      data,
      {
        headers: authHeader(),
      }
    );
  }

  updatePwd(data) {
    return axios.put(API_URL + 'resetpassword', data)
  }
  getUser() {
    return axios.get(API_URL, {
      headers: authHeader(),
    });
  }

  getUserOnline() {
    return axios.get(API_URL + "online");
  }

  getCurrentUser() {
    const token = localStorage.getItem('accessToken');
    if(token)
    {
      return axios.get(API_URL,{
        headers: authHeader(),
      });
    }
    return token;
  }

  updateAvatar(file) {
    return axios.post(
      API_URL + "avatar",
      { file },
      {
        headers: authHeader(),
      }
    );
  }
}
export default new UserService();
