import React, {useState, useEffect} from "react";
import {Dialog, DialogTitle, DialogActions, Button} from "@material-ui/core";
import {history, socket} from "../helpers";
import {userService} from "../services";

function DialogInvite() {
    const [open, setOpen] = useState(false);
    const [userInvite, setUserInvite] = useState("");
    const [roomId, setRoomId] = useState("");

    useEffect(() => {
        socket.on("invite", async (data) => {
            await userService.getCurrentUser().then((reponse) => {
                setOpen(data.username === reponse.data.user);
                setUserInvite(data.user.name);
                setRoomId(data.roomId)
            })
        })
    }, []);

    const handleJoin = () =>{
        setOpen(false);
        history.push(`board/${roomId}`);
    }

    return (
        <Dialog
            open={open}
            onClose={() => setOpen(false)}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">{`${userInvite} invite you`}</DialogTitle>
            <DialogActions>
                <Button onClick={() => setOpen(false)} color="primary" autoFocus>
                    Cancel
                </Button>
                <Button onClick={handleJoin} color="primary" autoFocus>
                    Accept
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export {DialogInvite};
