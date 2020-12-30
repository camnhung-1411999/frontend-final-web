import React, { useState, useEffect } from "react";
import { Box, Container, makeStyles } from "@material-ui/core";
import { Page } from "../../../components";
import Results from "./components/Results";
import Toolbar from "./components/Toolbar";
import { UserService } from "../../../services/index";
const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: "100%",
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3),
  },
}));

const ListUser = () => {
  const classes = useStyles();
  const init =[{
    "_id": "",
    "user": "",
    "name": "",
    "role": "",
    "status": false,
    "image": "",
    "totalMatch": null,
  }]
  const [customers, setCustomers] = useState(init);
  useEffect(() => {
    UserService.getAllUser().then(function (response) {
      setCustomers(response.data);
      console.log('list user',response.data);
    });
  })

 
  return (
    <Page className={classes.root} title="Customers">
      <Container maxWidth={false}>
        <Toolbar />
        <Box mt={3}>
          <Results customers={customers} />
        </Box>
      </Container>
    </Page>
  );
};

export default ListUser;
