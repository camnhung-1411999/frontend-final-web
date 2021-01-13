import { urlConstants } from '../constants'
import axiosApiInstance from '../helpers/axiosApiInstance';

const API_URL = urlConstants.API_URL + "history/";

class HistoryService {
    adminGetByUser (user){
        return axiosApiInstance.get(API_URL+ 'history/' + user);
    }

    adminGetById(id) {
        return axiosApiInstance.get(API_URL +'find/' + id);
    }

    adminGetAll() {
        return axiosApiInstance.get(API_URL + 'list');
    }

    myHistory() {
        return axiosApiInstance.get(API_URL);
    }
}

export default HistoryService;
