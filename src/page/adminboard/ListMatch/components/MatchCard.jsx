import React from "react";
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
  
}));

const MatchCard = ({ className, product, ...rest }) => {
  const classes = useStyles();

  return (
      <Box boxShadow={4} >
    <Card className={clsx(classes.root, className)} {...rest}>
      <CardContent>
      <Grid container>
      <Grid item xs={6}>
      <Box display="flex" justifyContent="center">
      <Avatar className ={classes.matchAvatar} alt="Product" src={logo} variant="square" fullWidth />
    </Box>
      </Grid>
      <Grid item xs={6}>
      <Box>
      <Typography variant="h3" color="textPrimary" gutterBottom>MATCH ID: {product.title} </Typography>
      <Typography color="textPrimary" >Player 1: Nhi</Typography>
      <Typography color="textPrimary" >Player 2: Minh</Typography>
  
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
