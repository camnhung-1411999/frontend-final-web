import React, { useState, useEffect } from "react";
import { Box, Container, Grid, makeStyles } from "@material-ui/core";
import { Pagination } from "@material-ui/lab";
import { Page } from "../../../components/Page";
import Toolbar from "./components/Toolbar";
import MatchCard from "./components/MatchCard";
import data from "./components/data";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: "100%",
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3),
  },
  productCard: {
    height: "100%",
  },
}));

const ListMatch = () => {
  const classes = useStyles();
  const [matches, setMatches] = useState(data);
  const [listMatches, setListMatches] = useState();

  useEffect(() => {
    setMatches(data);
    setListMatches(data);
  }, [])

  const handleSearch = (keyword,listMatches) => {
    const filter= listMatches.filter(item => item.winner.includes(keyword.keyword)||item.loser.includes(keyword.keyword));
    setMatches(filter);

  }
  return (
    <Page className={classes.root} title="Products">
      <Container maxWidth={false}>
        <Toolbar onClick={(keyword) => handleSearch(keyword,listMatches)}/>
        <Box mt={3}>
          <Grid container spacing={3}>
            {matches.map((match) => (
              <Grid item key={match._id} lg={4} md={6} xs={12}>
                <MatchCard
                  className={match.productCard}
                  product={match}
                />
              </Grid>
            ))}
          </Grid>
        </Box>
        <Box mt={3} display="flex" justifyContent="center">
          <Pagination color="primary" count={3} size="small" />
        </Box>
      </Container>
    </Page>
  );
};

export { ListMatch };
