import React, {useEffect} from "react";
import clsx from "clsx";
import PropTypes from "prop-types";
import {
  Box,
  Card,
  CardContent,
  makeStyles,
  ListItem,
  ListItemText,
} from "@material-ui/core";
import { FixedSizeList } from "react-window";
import AutoSizer from "react-virtualized-auto-sizer";
import { useDispatch, useSelector } from "react-redux";

const useStyles = makeStyles(() => ({
  root: {
    height: "100%",
    borderRadius: "10px"
  },
  box: {
    height: "100%",
  },
  item: {
    margin: "10px",
  },
}));
const renderRow = props => {
  const { index, style } = props;
  return (
      <ListItem button style={style} key={index}>
        <ListItemText primary={`asdasda${index + 1}`} />
      </ListItem>
  );
};

renderRow.propTypes = {
  index: PropTypes.number.isRequired,
  style: PropTypes.object.isRequired,
};

const BoxMessage = ({ className, ...rest }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  return (
    <Card className={clsx(classes.root, className)} {...rest}>
      <CardContent className={classes.box}>
        <Box className={classes.box} position="relative">
          <AutoSizer>
            {({ height, width }) => (
              <FixedSizeList
                height={height}
                width={width}
                itemSize={50}
                itemCount={10}
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

export default BoxMessage ;
