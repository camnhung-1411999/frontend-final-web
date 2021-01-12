import {useEffect, useRef, useState} from "react";
import {socket} from "../helpers";
import {useSelector} from "react-redux";

const PLAYGAME = "playGame";
const JOINROOM = "joinRoom";
const READY = "ready";
const ENDGAME = "endGame";

const useRoom = (roomId) => {
    const user = useSelector(state => state.users.profile);
    const [isPlay, setPlay] = useState(false);
    const [player, setPlayer] = useState(null);
    const [open, setOpen] = useState(false);
    const [isInvite, setInvite] = useState(true);

    useEffect(() => {
        if (user) {
            socket.emit(JOINROOM, {roomId, user});
            socket.on(PLAYGAME, (data) => {
                setPlay(true);
            });
            socket.on(JOINROOM, (room) => {
                setPlay(room.player1 && room.player2 && (room.player1?.username === user.user || room.player2?.username === user.user))
                setInvite(room.player1?.username === user.user && !room.player2);
                setPlayer({player1: room.player1, player2: room.player2});
            })
            socket.on(READY, (room) => {
                setPlayer({player1: room.player1, player2: room.player2});
                setInvite(false);
                setOpen((room.player1?.username === user.user) && (room.player1 && room.player2))
            })

            socket.on(ENDGAME, (data) => {
                console.log("End Game", data)
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
        setPlay(true);
        socket.emit(PLAYGAME, {roomId});
    }

    return {player, isPlay, open, setOpen, setReadyPlayer, playGame, isInvite};
};

export default useRoom;
