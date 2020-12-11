import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import GridItem from "../components/GridItem";
import GridContainer from "../components/GridContainer";
import Table from "../components/Table";
import Card from "../components/Card";
import CardHeader from "../components/CardHeader";
import CardBody from "../components/CardBody";

const styles = {
  cardCategoryWhite: {
    "&,& a,& a:hover,& a:focus": {
      color: "rgba(255,255,255,.62)",
      margin: "0",
      fontSize: "14px",
      marginTop: "0",
      marginBottom: "0"
    },
    "& a,& a:hover,& a:focus": {
      color: "#FFFFFF"
    }
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none",
    "& small": {
      color: "#777",
      fontSize: "65%",
      fontWeight: "400",
      lineHeight: "1"
    }
  }
};

const useStyles = makeStyles(styles);

export default function TableList() {
  const classes = useStyles();
  return (
    <GridContainer>
      <GridItem xs={12} sm={12} md={12}>
        <Card>
          <CardHeader color="primary">
            <h4 className={classes.cardTitleWhite}>User Table</h4>
            <p className={classes.cardCategoryWhite}>
              Information of users
            </p>
          </CardHeader>
          <CardBody>
            <Table
              tableHeaderColor="primary"
              tableHead={["Name", "Username", "Role", "Status"]}
              tableData={[
                ["Dakota Rice", "Niger111", "user", "Online"],
                ["Minerva Hooper", "Curaçao111", "user", "Online"],
                ["Sage Rodriguez", "Netherlands111", "user", "Offline"],
                ["Philip Chaney", "aw11", "user", "Online"],
                ["Doris Greene", "Malawi11", "user", "Offline"],
                ["Mason Porter", "Chile11", "user", "Offline"]
              ]}
            />
          </CardBody>
        </Card>
      </GridItem>
      
    </GridContainer>
  );
}
