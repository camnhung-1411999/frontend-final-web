import axios from "axios";
import { authHeader } from '../helpers';
import { urlConstants} from '../constants'
    

// const API_URL = "http://localhost:8000/rooms/";
const API_URL = urlConstants.API_URL_ROOM;

class RoomService {

    createRoom(data) {
        console.log('vooooooo');
        return axios.post(API_URL, {
            player: data,
        }, {
            headers: authHeader(),
        });
    }

    joinRoom(input) {
        return axios.put(API_URL + `join/${input.idroom}`, {
            player: input.player,
        }, {
            headers: authHeader(),
        });
    }

    outRoom(input) {
        return axios.put(API_URL + `out/${input.idroom}`, {
            player: input.player,
        }, {
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