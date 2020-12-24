import axios from "axios";
import { authHeader } from '../helpers';
import { urlConstants} from '../constants'

const API_URL = urlConstants.API_URL+ 'rooms/';
class RoomService {

    createRoom(checked, password) {
        return axios.post(API_URL+'create', {public: checked, password: password}, {
            headers: authHeader(),
        });
    }

    joinRoom(id) {
        return axios.put(API_URL + `join/${id}`, null, {
            headers: authHeader(),
        });
    }

    getRoom(id) {
        return axios.get(API_URL + `${id}`, {
            headers: authHeader(),
        });
    }

    outRoom(input) {
        return axios.put(API_URL + `out/${input.idroom}`, null, {
            headers: authHeader(),
        });
    }

    listRoom() {
        return axios.get(API_URL,{
            headers: authHeader(),
        });
    }

}
export default new RoomService();

