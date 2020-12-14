import axios from "axios";
import { authHeader } from '../helpers';

// const API_URL = "https://api-caro-web.herokuapp.com/users/";
const API_URL = "http://localhost:8000/rooms/";

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
        return axios.get(API_URL);
    }

}
export default new RoomService();