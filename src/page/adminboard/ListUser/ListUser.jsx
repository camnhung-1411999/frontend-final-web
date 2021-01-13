import React, { useState, useEffect } from "react";
import { Box, Container, makeStyles } from "@material-ui/core";
import { Page } from "../../../components";
import Results from "./components/Results";
import Toolbar from "./components/Toolbar";
import { userService } from "../../../services/index";
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
  const [users, setUsers] = useState(init);
  const [listUser, setListUser] = useState(init);

  useEffect(() => {
    userService.getAllUser().then(function (response) {
      setListUser(response.data);
      setUsers(response.data);
    });
  }, [])

  const handleSearch = (keyword,listUser) => {
    const filter= listUser.filter(item => item?.user?.includes(keyword.keyword));
    setUsers(filter);

  }

 
  return (
    <Page className={classes.root} title="Customers">
      <Container maxWidth={false}>
        <Toolbar  onClick={(keyword) => handleSearch(keyword,listUser)}/>
        <Box mt={3}>
          <Results customers={users} />
        </Box>
      </Container>
    </Page>
  );
};

export default ListUser;
