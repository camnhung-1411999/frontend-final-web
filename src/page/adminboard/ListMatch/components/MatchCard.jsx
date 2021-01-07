import React from "react";
import { useHistory } from "react-router-dom";
import PropTypes from "prop-types";
import clsx from "clsx";
import {
  Avatar,
  Box,
  Card,
  CardContent,
  Divider,
  Grid,
  Typography,
  Button,
  makeStyles,
} from "@material-ui/core";
import AccessTimeIcon from "@material-ui/icons/AccessTime";
import GetAppIcon from "@material-ui/icons/GetApp";
import logo from "../../../../assets/image/match.png";
import { colors } from '@material-ui/core';
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
  },
  matchAvatar: {
    width: 100,
    height: 100,
  },
  statsItem: {
    alignItems: "center",
    display: "flex",
  },
  statsIcon: {
    marginRight: theme.spacing(1),
  },

  box:{
    '&:hover': {
      "box-shadow": "-1px 10px 20px 0px #C4C4C4",
   },
  }
  
}));

const MatchCard = ({ className, product, ...rest }) => {
  const classes = useStyles();
  const history = useHistory();
  const handleClick = () => {
  history.push(`/adminboard/1/match`);
  };

  return (
      <Box boxShadow={4} className ={classes.box} >
    <Card className={clsx(classes.root, className)} {...rest} onClick={handleClick}>
      <CardContent>
      <Grid container>
      <Grid item xs={6}>
      <Box display="flex" justifyContent="center">
      <Avatar className ={classes.matchAvatar} alt="Product" src={logo} variant="square" fullWidth />
    </Box>
      </Grid>
      <Grid item xs={6}>
      <Box>
      <Typography variant="h3" color="textPrimary" gutterBottom>MATCH ID: {product.roomId} </Typography>
      <Typography color="textPrimary" >Player 1: {product.winner}</Typography>
      <Typography color="textPrimary" >Player 2: {product.loser}</Typography>
  
      </Box>
      </Grid>
    
    </Grid>
      
      </CardContent>
      <Box flexGrow={1} />
      <Divider />
      <Box p={2}>
        <Grid container justify="space-between" spacing={2}>
          <Grid className={classes.statsItem} item>
            <AccessTimeIcon className={classes.statsIcon} color="action" />
            <Typography color="textSecondary" display="inline" variant="body2">
              {product.createdAt}
            </Typography>
          </Grid>
   
        </Grid>
      </Box>
    </Card>
    </Box>
  );
};

MatchCard.propTypes = {
  className: PropTypes.string,
  product: PropTypes.object.isRequired,
};

export default MatchCard;
