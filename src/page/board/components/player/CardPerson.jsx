import React, {useState} from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import {
    Avatar,
    Box,
    Card,
    IconButton,
    CardContent,
    Divider,
    Typography,
    makeStyles,
} from "@material-ui/core";

import {green} from "@material-ui/core/colors";
import GetAppIcon from '@material-ui/icons/GetApp';
import "./player.css";

const useStyles = makeStyles(() => ({
    cardPerson: {
        border: "1px solid blue",
        margin: "5px"
    },
    avatar: {
        height: 100,
        width: 100,
        marginTop: "10px",
    },
    input: {
        display: "none",
    },
    fabProgress: {
        color: green[500],
        position: "absolute",
    },
    buttonProgress: {
        color: green[500],
        position: "absolute",
    },
}));

const CardPerson = ({className, player, handleReady, ...rest}) => {
    const classes = useStyles();



    return (
        <Card className={clsx(classes.cardPerson, className)} {...rest}>
            <CardContent>
                <Box alignItems="center" display="flex" flexDirection="column">
                    {player ? <Avatar className={classes.avatar} src={player?.avatar}/> :
                        <IconButton className="buttonReady" style={{color: "white"}} aria-label="ready" component="span"
                                    onClick={handleReady}>
                            <GetAppIcon style={{fontSize: 100}}/>
                        </IconButton>}
                    <Typography
                        color="textPrimary"
                        gutterBottom
                        variant="h4"
                        component="div"
                        style={{marginTop: "40px"}}
                    >
                        {player ? player?.display_name : "READY"}
                    </Typography>
                </Box>
            </CardContent>
            <Divider/>
        </Card>
    );
};

CardPerson.propTypes = {
    className: PropTypes.string,
};

export default CardPerson;
