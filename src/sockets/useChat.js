import {useEffect, useState} from "react";
import {socket} from "../helpers";
import {useSelector} from "react-redux";

const SEND = "sendMessage";
const RECEIVE = "recievedMessage";
const JOINROOM = "joinRoom";


const useChat = (roomId) => {
    const [messages, setMessages] = useState([]);
    const user = useSelector(state => state.users.profile);


    useEffect(() => {
        socket.on(JOINROOM, (room) => {
            setMessages(room.chat)
        })
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
        setMessages((messages) => [...messages, {message: message, ownl: true, avatar: user.image}]);
        socket.emit(SEND, {
            body: {
                message: message,
                ownl: false,
                username: user.user,
                avatar: user.image,
                display_name: user.name,
            },
            roomId: roomId,
        });
    };

    return {messages, sendMessage};
};

export default useChat;