import React, {useEffect} from "react";
import {
    Container,
    Grid,
    makeStyles,
    Dialog,
    DialogTitle,
    DialogActions,
    Button,
} from "@material-ui/core";
import {Page} from "../../components";
import {Game, TabChat} from "./components";
import Player from "./components/player/Player";
import {userActions} from "../../actions";

import {useDispatch} from "react-redux";
import {useParams} from "react-router-dom";
import useRoom from "../../sockets/useRoom";

import {socket} from "../../helpers";
import usePlay from "../../sockets/usePlay";

const useStyles = makeStyles((theme) => ({
    root: {
        minHeight: "100%",
        paddingBottom: theme.spacing(3),
        paddingTop: theme.spacing(3),
    },
}));


const ChessBoard = ({match}) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const {id} = useParams();
    const {
        openDraw,
        isNext,
        timer,
        setTimer,
        isInvite,
        player,
        isPlay,
        open,
        openNewGame,
        winner,
        newGame,
        setReadyPlayer,
        playGame,
        inviteTo,
        endTimeTo,
        handleDraw,
        confirmDraw
    } = useRoom(id);

    const handleReady = () => {
        setReadyPlayer();
    }
    const handlePlay = () => {
        playGame()
    }
    const handleNewGame = () => {
        newGame();
    }
    useEffect(() => {
        dispatch(userActions.profile());
    }, []);

    const endTime = () =>{
        if(isNext && isPlay)
        {
            endTimeTo();
        }
    }
    const drawTo = () =>{
        if(isNext && isPlay)
        {
            handleDraw();
        }
    }
    return (
        <Page className={classes.root}
              title="Room"
        >
            <Container maxWidth={false}>
                <Grid container spacing={3}>
                    <Grid item lg={3} sm={12} md={12} xl={3} xs={12}>
                        <Player isFlag = {isNext && isPlay} timer={timer} setTimer={setTimer} player={player} handleReady={() => handleReady()} endTime = {endTime}
                                isInvite={isInvite} inviteTo={inviteTo} drawTo={drawTo}/>
                    </Grid>
                    <Grid item lg={6} sm={12} md={12} xl={6} xs={12}>
                        <Game isPlay={isPlay}/>
                    </Grid>
                    <Grid item lg={3} sm={12} md={12} xl={3} xs={12}>
                        <TabChat id={match.params.id}/>
                    </Grid>
                </Grid>
            </Container>
            <Dialog
                open={open}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogActions>
                    <Button onClick={handlePlay} color="primary" autoFocus>
                        Play Game
                    </Button>
                </DialogActions>
            </Dialog>
            <Dialog
                open={openNewGame}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{winner?`${winner} win`:"Draw"}</DialogTitle>
                <DialogActions>
                    {isPlay ? <Button onClick={handleNewGame} color="primary" autoFocus>
                        New Game
                    </Button> : null}
                </DialogActions>
            </Dialog>
            <Dialog
                open={openDraw}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{`${winner} draw`}</DialogTitle>
                <DialogActions>
                    <Button onClick={()=>confirmDraw(false)} color="primary" autoFocus>
                       Cancel
                    </Button>
                    <Button onClick={()=>confirmDraw(true)} color="primary" autoFocus>
                        Confirm
                    </Button>
                </DialogActions>
            </Dialog>
        </Page>
    );
};

export {ChessBoard};
