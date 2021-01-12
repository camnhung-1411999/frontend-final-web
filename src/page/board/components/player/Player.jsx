import React, {useState} from "react";
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
    IconButton, Dialog, DialogActions, Button,
    DialogTitle,
    DialogContent,
    RadioGroup,
    FormControlLabel,
    Radio
} from "@material-ui/core";
import CardPerson from "./CardPerson";
// import ReplyIcon from '@material-ui/icons/Reply';
import FlagIcon from "@material-ui/icons/Flag";
import PanToolIcon from "@material-ui/icons/PanTool";
import MeetingRoomIcon from '@material-ui/icons/MeetingRoom';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import {Page} from "../../../../components";

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
        // margin: "15px 0px 15px 0px",
        border: "1px solid blue",
        margin: "5px",
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

function ConfirmationDialogRaw(props) {
    const { onClose, value: valueProp, open, options, ...other } = props;
    const [value, setValue] = React.useState(valueProp);
    const radioGroupRef = React.useRef(null);

    React.useEffect(() => {
        if (!open) {
            setValue(valueProp);
        }
    }, [valueProp, open]);

    const handleEntering = () => {
        if (radioGroupRef.current != null) {
            radioGroupRef.current.focus();
        }
    };

    const handleCancel = () => {
        onClose();
    };

    const handleOk = () => {
        onClose(value);
    };

    const handleChange = (event) => {
        setValue(event.target.value);
    };

    return (
        <Dialog
            disableBackdropClick
            disableEscapeKeyDown
            maxWidth="xs"
            onEntering={handleEntering}
            aria-labelledby="confirmation-dialog-title"
            open={open}
            {...other}
        >
            <DialogTitle id="confirmation-dialog-title">Invite</DialogTitle>
            <DialogContent dividers>
                <RadioGroup
                    ref={radioGroupRef}
                    aria-label="ringtone"
                    name="ringtone"
                    value={value}
                    onChange={handleChange}
                >
                    {options?.map((option) => (
                        <FormControlLabel value={option} key={option} control={<Radio />} label={option} />
                    ))}
                </RadioGroup>
            </DialogContent>
            <DialogActions>
                <Button autoFocus onClick={handleCancel} color="primary">
                    Cancel
                </Button>
                <Button onClick={handleOk} color="primary">
                    Ok
                </Button>
            </DialogActions>
        </Dialog>
    );
}

const Player = ({player, handleReady, isInvite}) => {
    const classes = useStyles();
    const [open, setOpen] = useState(false);

    const handleOutRoom = () => {

    }

    const handleDraw = () => {

    }

    const handleLose = () => {

    }

    const actions = [
        {
            title: "Out Room",
            icon: MeetingRoomIcon,
            color: colors.indigo[500],
            handleClick: handleOutRoom,

        },
        {
            title: "Draw",
            icon: PanToolIcon,
            color: colors.red[600],
            handleClick: handleDraw,

        },
        {
            title: "Lose",
            icon: FlagIcon,
            color: colors.orange[600],
            handleClick: handleLose,
        },
    ];
    const handleInvite = () =>{
        setOpen(true);
    }

    const handleClose = (newValue) => {
        setOpen(false);

        if (newValue) {
            // setValue(newValue);
        }
    };
    return (
        <Container
            maxWidth={false}
            style={{height: "100%"}}
        >
            <Grid
                container
                justify="space-between"
                alignItems="center"
                className={classes.grid}
            >
                <Grid item lg={12} sm={4} xl={12} xs={4}>
                    <CardPerson player={player?.player1} handleReady={handleReady}/>
                </Grid>

                <Grid item lg={12} md={4} xl={12} xs={4}>
                    <Card className={classes.card}>
                        <CardContent>
                            <Box className={classes.box} justifyContent="center" mt={2}>
                                {isInvite ? <IconButton onClick={ handleInvite}>
                                    < PersonAddIcon style={{fontSize: 50}} color="primary"/>
                                </IconButton> :
                                    actions.map(({color, icon: Icon, title, handleClick}) => (
                                        <Box
                                            key={title}
                                            p={1}
                                            textAlign="center"
                                            style={{margin: "0px 10px 0px 10px"}}
                                        >
                                            <IconButton onClick={handleClick}>
                                                <Icon style={{color}} color="action"/>
                                            </IconButton>
                                            <Typography
                                                color="textPrimary"
                                                variant="body1"
                                                style={{color}}
                                                component="div"
                                            >
                                                {title}
                                            </Typography>
                                        </Box>
                                    )) }
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item lg={12} md={4} xl={12} xs={4}>
                    {!isInvite ? <CardPerson player={player?.player2} handleReady={handleReady}/> : null}
                </Grid>
            </Grid>
            <ConfirmationDialogRaw
                classes={{
                    paper: classes.paper,
                }}
                id="ringtone-menu"
                keepMounted
                open={open}
                onClose={handleClose}
                value={null}
            />
        </Container>
    );
};

export default Player;
