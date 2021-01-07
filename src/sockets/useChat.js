import { useEffect, useState } from "react";
import { socket } from "../helpers";
const SEND = "sendMessage";
const RECEIVE = "recievedMessage";


const useChat = (roomId) => {
    const [messages, setMessages] = useState([]);
    useEffect(() => {
        socket.on(RECEIVE, (message) => {
            const incomingMessage = {
                ...message,
            };
            setMessages((messages) => [...messages, incomingMessage]);
        });

        return () => {
            socket.disconnect();
        };
    }, [roomId]);

    const sendMessage = (message) => {
        setMessages((messages) => [...messages, { message: message, ownl: true }]);
        socket.emit(SEND, {
            body: { message: message, ownl: false },
            roomId: roomId,
        });
    };

    return { messages, sendMessage };
};

export default useChat;