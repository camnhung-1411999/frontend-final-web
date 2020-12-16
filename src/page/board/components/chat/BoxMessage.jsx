import React, { useEffect } from "react";
import clsx from "clsx";
import PropTypes from "prop-types";
import {
  Box,
  Card,
  CardContent,
  makeStyles,
  ListItem,
  Typography,
} from "@material-ui/core";
import { FixedSizeList } from "react-window";
import AutoSizer from "react-virtualized-auto-sizer";
import Avatar from "@material-ui/core/Avatar";
import FaceIcon from "@material-ui/icons/Face";
import { socket } from '../../../../helpers';

const useStyles = makeStyles(() => ({
  root: {
    height: "100%",
    borderRadius: "10px",
    padding: '5px'
  },
  box: {
    height: "100%",
  },
  item: {
    margin: "10px",
  },
}));

const renderRow = (props) => {
  const { index, data } = props;
  var css = {
    "justify-content": data[index].ownl ? "flex-end" : "flex-start",
    height: "max-content",
    top: 80 * index,
    position: "absolute",
    width: "100%",
  };
  return (
    <ListItem id={`id${index}`} button style={css} key={index}>
      {!data[index].ownl ? (
        <>
          <Avatar
            style={{
              marginRight: "2px",
              color: "#fff",
              backgroundColor: "#4caf50",
            }}
          >
            <FaceIcon />
          </Avatar>
          <Typography
            style={{
              borderRadius: "10px",
              padding: "5px",
              marginLeft: "2px",
              background: "#e4e6eb",
            }}
            variant="body2"
            gutterBottom
          >
            {data[index].message}
          </Typography>{" "}
        </>
      ) : (
        <>
          <Typography
            style={{
              borderRadius: "10px",
              padding: "5px",
              background: "#0084ff",
              marginLeft: "2px",
              color: "white",
            }}
            variant="body2"
            gutterBottom
          >
            {data[index].message}
          </Typography>
          <Avatar
            style={{
              marginLeft: "2px",
              color: "#fff",
              backgroundColor: "#ff5722",
            }}
          >
            <FaceIcon />
          </Avatar>
        </>
      )}
    </ListItem>
  );
};

renderRow.propTypes = {
  index: PropTypes.number.isRequired,
  style: PropTypes.object.isRequired,
};

const BoxMessage = ({ messages, className, ...rest }) => {
  const classes = useStyles();

  return (
    <Card className={clsx(classes.root, className)} {...rest}>
      <CardContent className={classes.box}>
        <Box className={classes.box} position="relative">
          <AutoSizer>
            {({ height, width }) => (
              <FixedSizeList
                height={height}
                width={width}
                itemSize={80}
                itemCount={messages.length}
                itemData={messages}
                justify-content={"flex-end"}
              >
                {renderRow}
              </FixedSizeList>
            )}
          </AutoSizer>
        </Box>
      </CardContent>
    </Card>
  );
};

BoxMessage.propTypes = {
  className: PropTypes.string,
};

export default BoxMessage;
