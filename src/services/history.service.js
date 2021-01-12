import axios from "axios";
import { urlConstants } from '../constants'
import axiosApiInstance from '../helpers/axiosApiInstance';

const API_URL = urlConstants.API_URL + "history/";

class HistoryService {
    create (data){
        return axiosApiInstance.post(API_URL, data);
    }

    getHistoryByUser() {
        return axiosApiInstance.get(API_URL);
    }

    getAllHistory() {
        return axiosApiInstance.get(API_URL + 'list');
    }
}

export default HistoryService;
