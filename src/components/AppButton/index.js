import React from "react";
import { makeStyles } from "@mui/styles";
import { Box, Button, IconButton } from '@mui/material';
const useStyles = makeStyles((theme) => ({
    hideXs: {
        [theme.breakpoints.up('xs')]: {
            display: 'none',
        },
        [theme.breakpoints.up('sm')]: {
            display: 'block',
        },
        [theme.breakpoints.up('md')]: {
            display: 'block',
        },
        [theme.breakpoints.up('lg')]: {
            display: 'block',
        },
    },
    hideSm: {
        [theme.breakpoints.up('xs')]: {
            display: 'block',
        },
        [theme.breakpoints.up('sm')]: {
            display: 'none',
        },
        [theme.breakpoints.up('md')]: {
            display: 'none',
        },
        [theme.breakpoints.up('lg')]: {
            display: 'none',
        },
    },
}));

const AppButton = ({ children, startIcon, variant, color, onClick, styleProps, ...props }) => {
    const classes = useStyles()
    return (
        <>
            <Box
                className={classes.hideXs}
            >
                <Button
                    color={color}
                    variant={variant}
                    startIcon={startIcon}
                    onClick={onClick}
                    {...styleProps}
                    {...props}
                >
                    {children}
                </Button>
            </Box>
            <Box
                className={classes.hideSm}
            >
                <IconButton
                    color={color}
                    onClick={onClick}
                    {...styleProps}
                    {...props}
                >
                    {startIcon}
                </IconButton>
            </Box>
        </>

    )
}

export default AppButton
