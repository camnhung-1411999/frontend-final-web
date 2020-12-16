import axios from "axios";
import { authHeader } from '../helpers';
import { urlConstants} from '../constants'
    

// const API_URL = "http://localhost:8000/rooms/";
const API_URL = urlConstants.API_URL_ROOM;

class RoomService {

    createRoom(data) {
        return axios.post(API_URL+'create', null, {
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