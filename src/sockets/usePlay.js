import {useEffect, useRef, useState} from "react";
import {socket} from "../helpers";
import {useSelector} from "react-redux";
import {userActions} from "../actions";

const PLAY = "play";
const CREATEBOARD = "createBoard";
const WIN = "win";
const PLAYGAME = "playGame";
const NEWGAME = "newGame";

const usePlay = (roomId) => {
    const [boards, setBoards] = useState(Array(20 * 20).fill(null))
    const user = useSelector(state => state.users.profile);
    const [isNext, setNext] = useState(true);
    const [game, setGame] = useState(null);
    const [index, setIndex] = useState(0);
    const [value, setValue] = useState("");

    useEffect(() => {
        if (user) {
            socket.on(PLAYGAME, (data) => {
                console.log("vao day 1")
                setGame(data)
                setBoards(Array(20 * 20).fill(null))
                setIndex(null);
                setValue("")
                if (data.player1 === user.user) {
                    setNext(true);
                }
            });
            socket.on(CREATEBOARD, (data) => {
                setGame(data);
                console.log(data)
                if (data.playing) {
                    if (data.board.length > 0) {
                        const incomingBoard = Array(20 * 20).fill(null);
                        data.board.map((item) => {
                                incomingBoard[item.index] = item.value;
                            }
                        )
                        setBoards(incomingBoard);
                        setValue(data.board[data.board.length - 1].value);
                        setIndex(data.board[data.board.length - 1].index);
                        setNext(!((data.board[data.board.length - 1].value === "X" && user?.user === data.player1) || (data.board[data.board.length - 1].value === "O" && user?.user === data.player2)));
                    } else {
                        setBoards(Array(20 * 20).fill(null));

                        setNext(user?.user === data.player1);
                    }
                    setIndex(data.index);
                    setValue(data.value);

                } else {
                    setNext(false);
                }
            });
        }
    }, [user]);

    useEffect(() => {

        socket.on(PLAY, (data) => {
            setNext(true);
            // setIndex(data.index);
            // setValue(data.value);
            setBoards(data.board);
        });

        return () => {
            socket.disconnect();
        };
    }, [roomId]);

    const playTo = (data) => {
        const incomingBoard = boards.map((item, index) =>
            index === data.index
                ? game.player1 === user.user ? "X" : "O"
                : item
        )
        setBoards(incomingBoard);
        socket.emit(PLAY, {
            board: incomingBoard,
            roomId: data.roomId,
            index: data.index,
            value: game.player1 === user.user ? "X" : "O",
            isNext: true,
        });
        setNext(false)
        setIndex(data.index);
        setValue(game.player1 === user.user ? "X" : "O");
    };
    const winTo = (data) => {
        // setNext(false);
        const incomingBoard = boards.map((item, index) =>
            index === data.index
                ? game.player1 === user.user ? "X" : "O"
                : item
        )
        setBoards(incomingBoard);
        const play = {
            board: incomingBoard,
            roomId: data.roomId,
            index: data.index,
            value: game.player1 === user.user ? "X" : "O",
            isNext: true,
        }
        socket.emit(WIN, {roomId, user, game, play});
    }
    return {isNext, index, boards, value, playTo, winTo};
};

export default usePlay;
