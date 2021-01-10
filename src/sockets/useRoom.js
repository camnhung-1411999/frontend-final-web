import {useEffect, useRef, useState} from "react";
import {socket} from "../helpers";
import {useSelector} from "react-redux";

const PLAY = "play";
const JOINROOM = "joinRoom";
const READY = "ready";

const useRoom = (roomId) => {
    const user = useSelector(state => state.users.profile);
    const [isNext, setNext] = useState(true);
    const [player, setPlayer] = useState(null);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        if (user) {
            socket.emit(JOINROOM, {roomId, user});
            socket.on(JOINROOM, (room) => {
                setOpen(!((room.player1?.username === user.user || room.player2?.username === user.user) || (room.player1 && room.player2)))
                setPlayer({player1: room.player1, player2: room.player2});
            })
            socket.on(READY, (room) => {
                setOpen(!((room.player1?.username === user.user || room.player2?.username === user.user) || (room.player1 && room.player2)))
                setPlayer({player1: room.player1, player2: room.player2});
            })
        }
    }, [user]);

    useEffect(() => {


        return () => {
            socket.disconnect();
        };
    }, [roomId]);

    const setReadyPlayer = () => {
        socket.emit(READY, {roomId, user});
    }

    return {player, open, setOpen, setReadyPlayer};
};

export default useRoom;
