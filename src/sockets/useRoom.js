import { useEffect, useRef, useState } from "react";
import { socket } from "../helpers";
const PLAY = "play";
const JOIN = "joinRoom";

const useRoom = (roomId) => {
  const [messages, setMessages] = useState([]);
  const [boards, setBoards] = useState(Array(20 * 20).fill(null))
  const [isNext, setNext] = useState(true);

  const socketRef = useRef();

  // useEffect(() => {
  //   socket.emit(JOIN, roomId);
  // }, [])


  useEffect(() => {
    socket.emit(JOIN, roomId);
    socket.on(PLAY, (data) => {
      const incomingBoard = data.board.map((item) =>
        {
          console.log("item", item)
          console.log("item", item === "X")

          if(item === "X") return "O" ;
          if(item === "O") return "X" ;
        }
      )
      setNext(true);
      setBoards(incomingBoard);
    });

    return () => {
      socket.disconnect();
    };
  }, [roomId]);

  const playTo = (data) => {

    const incomingBoard = boards.map((item, index) =>
        index === data.index
          ? "X"
          : item
      )
    setBoards(incomingBoard);
    socket.emit(PLAY, {
      board: incomingBoard,
      roomId: data.roomId,
      isNext: true
    });
    setNext(false)
  };

  return { isNext, boards, playTo };
};

export default useRoom;
