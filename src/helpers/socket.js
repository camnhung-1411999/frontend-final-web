import io from "socket.io-client";
import {urlConstants} from '../constants'

export const socket =  io(urlConstants.SOCKET_SERVER_URL)