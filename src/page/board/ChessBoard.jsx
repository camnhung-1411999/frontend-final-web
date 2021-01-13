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
    const {isInvite, player, isPlay, open, openNewGame, winner, newGame, setReadyPlayer, playGame, inviteTo} = useRoom(id);

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

    return (
        <Page className={classes.root}
              title="Room"
        >
            <Container maxWidth={false}>
                <Grid container spacing={3}>
                    <Grid item lg={3} sm={12} md={12} xl={3} xs={12}>
                        <Player player={player} handleReady={() => handleReady()} isInvite={isInvite} inviteTo={inviteTo}/>
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
                {/*<DialogTitle id="alert-dialog-title">{"Join the match"}</DialogTitle>*/}
                <DialogActions>
                    {/*<Button onClick={() => setOpen(false)} color="secondary">*/}
                    {/*    Stand*/}
                    {/*</Button>*/}
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
                <DialogTitle id="alert-dialog-title">{`${winner} win`}</DialogTitle>
                <DialogActions>
                    {/*<Button onClick={() => setOpen(false)} color="secondary">*/}
                    {/*    Stand*/}
                    {/*</Button>*/}
                    {winner ? <Button onClick={handleNewGame} color="primary" autoFocus>
                        New Game
                    </Button> : null}
                </DialogActions>
            </Dialog>
        </Page>
    );
};

export {ChessBoard};
