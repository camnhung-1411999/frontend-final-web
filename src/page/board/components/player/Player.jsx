import React from "react";
import {
  Card,
  CardActions,
  CardContent,
  Container,
  Grid,
  makeStyles,
  Box,
  Icon,
  Typography,
  colors,
  IconButton,
} from "@material-ui/core";
import CardPerson from "./CardPerson";
import ReplyIcon from '@material-ui/icons/Reply';
import FlagIcon from "@material-ui/icons/Flag";
import PanToolIcon from "@material-ui/icons/PanTool";
const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: "100%",
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3),
  },
  box: {
    display: "flex",
    "@media (max-width: 780px)": {
      display: "inherit",
    },
  },
  card: {
    margin: "15px 0px 15px 0px",
    border: "1px solid blue",
    "@media (max-width: 780px)": {
      margin: "15px",
    },
  },
  grid: {
    "@media (min-width: 1025px)": {
      transform: "translateY(10%)",
    },
  },
}));

const actions = [
  {
    title: "Back",
    icon: ReplyIcon,
    color: colors.indigo[500],
  },
  {
    title: "Draw",
    icon: PanToolIcon,
    color: colors.red[600],
  },
  {
    title: "Loser",
    icon: FlagIcon,
    color: colors.orange[600],
  },
];

const Player = () => {
  const classes = useStyles();

  return (
    <Container
      maxWidth={false}
      style={{ height: "100%"}}
    >
      <Grid
        container
        justify="space-between"
        alignItems="center"
        className={classes.grid}
      >
        <Grid item lg={12} sm={4} xl={12} xs={4}>
          <CardPerson />
        </Grid>

        <Grid item lg={12} md={4} xl={12} xs={4}>
          <Card className={classes.card}>
            <CardContent>
              <Box className={classes.box} justifyContent="center" mt={2}>
                {actions.map(({ color, icon: Icon, title }) => (
                  <Box
                    key={title}
                    p={1}
                    textAlign="center"
                    style={{ margin: "0px 10px 0px 10px" }}
                  >
                    <IconButton>
                      <Icon style={{ color }} color="action" />
                    </IconButton>
                    <Typography
                      color="textPrimary"
                      variant="body1"
                      style={{ color }}
                      component = "div"
                    >
                      {title}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item lg={12} md={4} xl={12} xs={4}>
          <CardPerson />
        </Grid>
      </Grid>
    </Container>
  );
};

export default Player;
