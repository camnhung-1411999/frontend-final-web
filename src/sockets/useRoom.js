import {useEffect, useState} from "react";
import {socket} from "../helpers";
import {useSelector} from "react-redux";

const PLAYGAME = "playGame";
const JOINROOM = "joinRoom";
const READY = "ready";
const ENDGAME = "endGame"
const NEWGAME = "newGame";
const CREATEBOARD = "createBoard";
const PLAY = "play";

const useRoom = (roomId) => {
    const user = useSelector(state => state.users.profile);
    const [isPlay, setPlay] = useState(false);
    const [player, setPlayer] = useState(null);
    const [open, setOpen] = useState(false);
    const [isInvite, setInvite] = useState(true);
    const [openNewGame, setOpenNewGame] = useState(false);
    const [winner, setWinner] = useState("");
    const [timer, setTimer] = useState(0);
    const [game, setGame] = useState(null);
    const [isNext, setNext] = useState(false);
    const [openDraw, setOpenDraw] = useState(false);

    useEffect(() => {
        if (user) {
            socket.on(PLAY, (data) => {
                setTimer(30);
                setNext(true);
            });
            socket.emit(JOINROOM, {roomId, user});
            socket.on(PLAYGAME, (data) => {
                setGame(data)
                setPlay(true);
                setTimer(30);
                setOpenNewGame(false)
            });
            socket.on("resetTime", (data) => {
                setNext(data.user === user.user);
                setTimer(30);
            });
            socket.on(CREATEBOARD, (data) => {
                setGame(data);
                if (data.playing) {
                    const between = Math.floor((new Date().getTime() - new Date(data.datetime).getTime()) / 1000);
                    console.log(between);
                    if (between < 30) {
                        setTimer(30 - between)
                    } else
                        setTimer(0);
                }
                if (!data.playing) {
                    setOpen(user?.user === data.player1);
                    setTimer(0);
                }
            })
            socket.on(NEWGAME, (data) => {
                setPlay(true);
                setNext(data.player1 === user.user);
                setOpenNewGame(false)
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
                setOpenNewGame(true);
                setTimer(0);
                setWinner(data.winnerName);
                if (data.admin !== user.user) {
                    setPlay(false)
                }
            })
            socket.on("draw", (data) => {
                console.log(data)
                setOpenNewGame(true);
                setTimer(0);
                setWinner("");
                if (data.player1 !== user.user) {
                    setPlay(false)
                }
            });
            socket.on("drawRequest", (data) => {
                setWinner(data.name);
                if (data.user2 === user.user) {
                    setOpenDraw(true)
                }
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

    const newGame = () => {
        setOpenNewGame(false);
        setPlay(true);
        socket.emit(NEWGAME, {roomId});
    }

    const inviteTo = (username) => {
        socket.emit("invite", {user, username, roomId});
    }

    const endTimeTo = () => {
        const play = null;
        socket.emit("endTime", {roomId, user, game, play});
    }

    const handleOutRoom = () => {

    };

    const handleDraw = () => {

        socket.emit("drawRequest", {roomId, user, game});
    };

    const confirmDraw = (isConfirm) => {
        setOpenDraw(false);
        if (isConfirm) {
            socket.emit("draw", {roomId, user, game});

        } else
            socket.emit("cancelDraw", {roomId, user, game});
    };

    return {
        openDraw,
        isNext,
        timer,
        player,
        setTimer,
        isPlay,
        open,
        setOpen,
        openNewGame,
        winner,
        newGame,
        setReadyPlayer,
        playGame,
        isInvite,
        inviteTo,
        endTimeTo,
        handleDraw,
        confirmDraw
    };
};

export default useRoom;
