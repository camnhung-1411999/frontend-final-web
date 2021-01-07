import React from "react";
import clsx from "clsx";
import PropTypes from "prop-types";
import {
  Box,
  Card,
  CardContent,
  Divider,
  makeStyles,
} from "@material-ui/core";

import BoxMessage from "./BoxMessage";
import "emoji-mart/css/emoji-mart.css";
import { Picker } from "emoji-mart";

const useStyles = makeStyles(() => ({
  root: {
  },
}));

const ChatOnline = ({ messages, className, ...rest }) => {
  const classes = useStyles();

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
             <BoxMessage
              style={{ height: "450px", border: "1px solid green" }}
              messages={messages}
            />
        </Box>
        <Box style={{ marginTop: "10px", color: 'green', fontSize:'2em', textAlign: 'center' }}>
            CHAT HISTORY
        </Box>
        
      </CardContent>
    </Card>
  );
};

ChatOnline.propTypes = {
  className: PropTypes.string,
};

export default ChatOnline;
