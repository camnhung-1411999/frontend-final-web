import React, { useState } from "react";
import clsx from "clsx";
import PropTypes from "prop-types";
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Typography,
  colors,
  makeStyles,
  useTheme,
  TextareaAutosize,
  TextField,
  IconButton,
  Grid,
} from "@material-ui/core";
import SendIcon from "@material-ui/icons/Send";
import MoodIcon from "@material-ui/icons/Mood";
import BoxMessage from "./BoxMessage";
import "emoji-mart/css/emoji-mart.css";
import { Picker } from "emoji-mart";

const useStyles = makeStyles(() => ({
  root: {
    height: "100%",
  },
}));

const ChatOnline = ({ className, ...rest }) => {
  const classes = useStyles();
  const [flag, setFlag] = useState(true);

  return (
    <Card className={clsx(classes.root, className)} {...rest}>
      <CardHeader title="Username" />
      <Divider />
      <CardContent>
        <Box style= {{borderRadius: '10px', border: '1px solid blue', marginBottom: '5px'}} height={"300px"} position="relative">
          {flag ? <BoxMessage /> : <Picker />}
        </Box>
        <Divider />
        <Box style={{ marginTop: "10px" }}>
          <Grid container spacing={3}>
            <Grid item xs={9}>
              <TextField
                id="outlined-multiline-static"
                multiline
                rows={5}
                variant="outlined"
                style={{ width: "100%" }}
              />
            </Grid>
            <Grid item xs={3}>
              <Grid item xs={12} spacing={3}>
                <IconButton style={{ marginLeft: "15px" }}>
                  <SendIcon color="primary" style={{ fontSize: 40 }} />
                </IconButton>
              </Grid>
              <Grid item xs={12} spacing={3}>
                <IconButton
                  style={{ marginLeft: "15px", marginTop: "5px" }}
                  onClick={() => setFlag(!flag)}
                >
                  <MoodIcon  style={{ fontSize: 40, color :"orange" }} />
                </IconButton>
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </CardContent>
    </Card>
  );
};

ChatOnline.propTypes = {
  className: PropTypes.string,
};

export default ChatOnline;
