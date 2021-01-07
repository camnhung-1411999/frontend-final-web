import React, { useState, useEffect } from "react";
import clsx from "clsx";
import PropTypes from "prop-types";
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Divider,
  makeStyles,
  TextField,
  IconButton,
  Grid,
} from "@material-ui/core";
import SendIcon from "@material-ui/icons/Send";
import MoodIcon from "@material-ui/icons/Mood";
import BoxMessage from "./BoxMessage";
import "emoji-mart/css/emoji-mart.css";
import { Picker } from "emoji-mart";
import useChat from '../../../../sockets/useChat';

const useStyles = makeStyles(() => ({
  root: {
    height: "100%",
  },
}));

const ChatOnline = ({ idroom, className, ...rest }) => {
  const classes = useStyles();
  const [flag, setFlag] = useState(true);
  const [message, setMessage] = useState("");
  const { messages, sendMessage } = useChat(idroom);
  console.log(message);

  const addEmoji = (e) => {
    setMessage(message + " " + e.native);
  };
  console.log(messages)

  const handleSend = () => {
    /* call api lưu message*/
    sendMessage(message);
    setMessage("");
    setFlag(true);
  };
 
  return (
    <Card className={clsx(classes.root, className)} {...rest}>
      <Divider />
      <CardContent>
        <Box
          style={{
            borderRadius: "10px",
            marginBottom: "5px",
          }}
          height={"450px"}
          position="relative"
        >
          {flag ? (
            <BoxMessage
              style={{ height: "450px", border: "1px solid blue" }}
              messages={messages}
            />
          ) : (
            <Picker style={{ width: "100%" }} onSelect={(e) => addEmoji(e)} />
          )}
        </Box>
        <Divider />
        <Box style={{ marginTop: "10px" }}>
          <Grid container>
            <Grid item xs={9}>
              <TextField
                id="outlined-multiline-static"
                multiline
                rows={5}
                variant="outlined"
                value={message}
                style={{ width: "100%" }}
                onChange={(e) => setMessage(e.target.value)}
              />
            </Grid>
            <Grid item xs={3}>
              <Grid item xs={12}>
                <IconButton style={{ marginLeft: "15px" }} onClick={handleSend}>
                  <SendIcon color="primary" style={{ fontSize: 40 }} />
                </IconButton>
              </Grid>
              <Grid item xs={12}>
                <IconButton
                  style={{ marginLeft: "15px", marginTop: "5px" }}
                  onClick={() => setFlag(!flag)}
                >
                  <MoodIcon style={{ fontSize: 40, color: "orange" }} />
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
