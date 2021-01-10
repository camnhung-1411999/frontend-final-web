import axios from "axios";
import { urlConstants} from '../constants';
import axiosApiInstance from '../helpers/axiosApiInstance';

const API_URL = urlConstants.API_URL+ 'rooms/';
class RoomService {

    createRoom(checked, password) {
        return axiosApiInstance.post(API_URL+'create', {public: checked, password: password});
    }

    joinRoom(id, password) {
        return axiosApiInstance.post(API_URL + `join/${id}`, {password});
    }

    getRoom(id) {
        return axiosApiInstance.get(API_URL + `${id}`);
    }

    outRoom(input) {
        return axiosApiInstance.put(API_URL + `out/${input.idroom}`, null);
    }

    listRoom() {
        return axiosApiInstance.get(API_URL);
    }

}
export default new RoomService();

