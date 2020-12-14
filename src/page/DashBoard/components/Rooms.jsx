import React from "react";
import clsx from "clsx";
import PropTypes from "prop-types";
import Board from "./Board";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  useTheme,
  makeStyles,
  colors,
  IconButton,
} from "@material-ui/core";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import ArrowRightIcon from "@material-ui/icons/ArrowRight";
import AddIcon from "@material-ui/icons/Add";

const useStyles = makeStyles(() => ({
  root: {
    height: "100%",
  },
}));

const Rooms = ({ className, ...rest }) => {
  const classes = useStyles();
  const theme = useTheme();

  return (
    <Card className={clsx(classes.root, className)} {...rest}>
      <CardHeader
        title="Rooms"
        action={
          <IconButton style = {{padding: '12px 12px 0px 12px'}} aria-label="new room" onClick={() => console.log('Minh')}>
            <AddIcon style={{ fontSize: 30}} color="primary" />
          </IconButton>
        }
      />
      <Divider />
      <CardContent>
        <Board />
        <Board />
        <Board />
        <Board />
        <Board />
        <Board />
        <Board />
        <Board />
        <Board />
        <Board />
        <Board />
        <Board />
      </CardContent>
    </Card>
  );
};

Rooms.propTypes = {
  className: PropTypes.string,
};

export default Rooms;
