/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
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
import "emoji-mart/css/emoji-mart.css";
import BoxMessage from "./BoxMessage";

const useStyles = makeStyles(() => ({
  root: {
    height: "100%",
  },
}));

const ChatOnline = ({messages}) => {
  const classes = useStyles();

  return (
    <Card className={clsx(classes.root)}>
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
              style={{ height: "450px", border: "1px solid blue" }}
              messages={messages}
            />

        </Box>
        <Divider />
      </CardContent>
    </Card>
  );
};

ChatOnline.propTypes = {
  className: PropTypes.string,
};

export default ChatOnline;
