import {useEffect, useRef, useState} from "react";
import {socket} from "../helpers";
import {useSelector} from "react-redux";

const PLAYGAME = "playGame";
const JOINROOM = "joinRoom";
const READY = "ready";

const useRoom = (roomId) => {
    const user = useSelector(state => state.users.profile);
    const [isPlay, setPlay] = useState(false);
    const [player, setPlayer] = useState(null);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        if (user) {
            socket.emit(JOINROOM, {roomId, user});
            socket.on(JOINROOM, (room) => {
                setPlay(room.player1 && room.player2 && (room.player1?.username === user.user || room.player2?.username === user.user))
                setPlayer({player1: room.player1, player2: room.player2});
            })
            socket.on(READY, (room) => {
                setPlayer({player1: room.player1, player2: room.player2});
                setOpen((room.player1?.username === user.user) && (room.player1 && room.player2))
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

    const playGame = () => {
        setOpen(false);
        socket.emit(PLAYGAME, {roomId});
    }

    return {player, isPlay, open, setOpen, setReadyPlayer, playGame};
};

export default useRoom;
