/* eslint-disable react-hooks/exhaustive-deps */
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
import "emoji-mart/css/emoji-mart.css";
import BoxMessage from "./BoxMessage";
const useStyles = makeStyles(() => ({
  root: {
    height: "100%",
  },
}));

const ChatOnline = () => {
  const classes = useStyles();
  const chat = [{username:"nhi",message:"hii"},{username:"nhung",message:"hello"}];
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
              messages={chat}
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
