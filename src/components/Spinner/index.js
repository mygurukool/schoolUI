import React from "react";
import { makeStyles } from "@mui/styles";
import { Backdrop, CircularProgress, Modal } from "@mui/material";

const useStyles = makeStyles((theme) => ({

    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: theme.palette.white
    },
}));

const Index = () => {
    const classes = useStyles();

    return (
        <Backdrop className={classes.backdrop} open={true} >
            <CircularProgress color="inherit" size={50} />
        </Backdrop>
    );
};
export default Index;
