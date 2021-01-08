import React, { useEffect, useState } from "react";
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
import { Page, Online } from "../../components";
import { Game, TabChat } from "./components";
import Player from "./components/player/Player";
import { roomService } from "../../services";
import { useParams } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: "100%",
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3),
  },
}));

const ChessBoard = ({ match }) => {
  const classes = useStyles();
  const [open, setOpen] = useState(true);
  const { id } = useParams();

  const handleReady = () =>{
    setOpen(false);
  }

  return (
    <Page className={classes.root} title="Room">
      <Container maxWidth={false}>
        <Grid container spacing={3}>
          <Grid item lg={4} sm={6} xl={3} xs={12}>
            <Player />
          </Grid>
          <Grid item lg={4} md={12} xl={6} xs={12}>
            <Game />
          </Grid>
          <Grid item lg={4} md={6} xl={3} xs={12}>
            <TabChat id={match.params.id} />
          </Grid>
        </Grid>
      </Container>
      <Dialog
        open={open}
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

export { ChessBoard };
