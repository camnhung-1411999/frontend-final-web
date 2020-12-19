import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import { Card, Avatar, CardHeader, CardMedia, CardContent, CardActions } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';

const useStyles = makeStyles((theme) => ({
    root: {
        width: "100%",
        height: "100%",
        // background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)'
    },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    },
    expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },
    avatar: {
        backgroundColor: red[500],
    },
    large: {
        width: theme.spacing(13),
        height: theme.spacing(13),
        margin: "5px auto",
        '@media (max-width: 780px)': {
            width: theme.spacing(7),
            height: theme.spacing(7),
            padding: "0"
        }
    },
    cardHeader: {
        fontSize: "24px",
        textAlign: "center",
        padding: "5px",
        '@media (max-width: 780px)': {
            fontSize: "14px",
            padding: "2px",

        }

    }
}));

export default function CardPerson(props) {
    const classes = useStyles();
    const [expanded, setExpanded] = React.useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    return (
        <Card className={classes.root}>
            <CardContent style={{ padding: 0 }}>
                <Typography  className={classes.cardHeader} variant="body2" component="h2">
                    Minh
                </Typography>
                <Avatar className={classes.large} src={props.image} />
                <Typography  className={classes.cardHeader} variant="body2" component="h2">
                    5 cups
                </Typography>
            </CardContent>
          
        </Card>
    );
}
