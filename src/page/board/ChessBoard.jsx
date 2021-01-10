import React, {useEffect, useState} from "react";
import {
    Container,
    Grid,
    makeStyles,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    Button,
    DialogTitle,
} from "@material-ui/core";
import {Page, Online} from "../../components";
import {Game, TabChat} from "./components";
import Player from "./components/player/Player";
import {userActions} from "../../actions";

import {useDispatch, useSelector} from "react-redux";
import {useParams} from "react-router-dom";
import useRoom from "../../sockets/useRoom";

const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: theme.palette.background.dark,
        minHeight: "100%",
        paddingBottom: theme.spacing(3),
        paddingTop: theme.spacing(3),
    },
}));

const ChessBoard = ({match}) => {
    const classes = useStyles();
    // const [open, setOpen] = useState(true);
    const dispatch = useDispatch();

    const {id} = useParams();
    const {player, open, setOpen, setReadyPlayer} = useRoom(id);

    const handleReady = () => {
        setReadyPlayer();
        console.log("sssss")
        setOpen(false);
    }
    useEffect(() => {
        dispatch(userActions.profile());
    }, []);

    return (
        <Page className={classes.root} title="Room">
            <Container maxWidth={false}>
                <Grid container spacing={3}>
                    <Grid item lg={3} sm={6} xl={3} xs={12}>
                        <Player player={player} handleReady={() => handleReady()}/>
                    </Grid>
                    <Grid item lg={6} md={12} xl={6} xs={12}>
                        <Game/>
                    </Grid>
                    <Grid item lg={3} md={6} xl={3} xs={12}>
                        <TabChat id={match.params.id}/>
                    </Grid>
                </Grid>
            </Container>
            <Dialog
                open={false}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{"Join the match"}</DialogTitle>
                <DialogActions>
                    <Button onClick={() => setOpen(false)} color="secondary">
                        Stand
                    </Button>
                    <Button onClick={handleReady} color="primary" autoFocus>
                        Ready
                    </Button>
                </DialogActions>
            </Dialog>
        </Page>
    );
};

export {ChessBoard};
