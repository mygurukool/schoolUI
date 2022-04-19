import React from "react";
import { makeStyles } from "@mui/styles";
import { ButtonBase, Grid, Typography } from "@mui/material";
import { Twitter as TwitterIcon } from "@mui/icons-material";
import FormCreator from "../components/Form/FormCreator";


const Contact = (props) => {
    const classes = useStyles();
    const subjects = [
        {
            label: "abc",
            value: 'abc'
        }
    ]

    const formData = [
        {
            type: "text",
            name: "name",
            label: "Name",
            placeholder: "Enter Name",
            required: true,
            size: 6,
        },
        {
            type: "text",
            name: "email",
            label: "Email address",
            placeholder: "Enter email address",
            required: true,
            size: 6,
        },
        {
            type: "text",
            name: "mobile",
            label: "Phone Number",
            placeholder: "Enter phone number",
            required: true,
            size: 6,
        },
        {
            type: "select",
            name: "subject",
            label: 'Subject',
            options: subjects,
            placeholder: 'Subject',
            optionLabelProp: 'label',
            optionValueProp: 'value',
            size: 6,
        },
        {
            type: "textarea",
            name: "message",
            label: 'Message',
            placeholder: 'Type a message',
            size: 12,
            rows: 5
        },
    ];
    return (
        <div className={classes.root}>
            <div className={classes.container}>
                <Grid container spacing={2}>
                    <Grid item lg={6}>
                        <div className={classes.socialContainer}>
                            <Typography variant="h4">Let's get social</Typography>
                            <Grid container spacing={2} className={classes.socialIconContainer}>
                                <Grid item lg={3}>
                                    <div className={classes.socialIcon}>
                                        <TwitterIcon />
                                    </div>
                                </Grid>
                                <Grid item lg={3}>
                                    <div className={classes.socialIcon}>
                                        <TwitterIcon />
                                    </div>
                                </Grid>
                                <Grid item lg={3}>
                                    <div className={classes.socialIcon}>
                                        <TwitterIcon />
                                    </div>
                                </Grid>
                            </Grid>
                        </div>
                    </Grid>
                    <Grid item lg={6}>
                        <div className={classes.formContainer}>
                            <Typography variant="h4">Get in touch</Typography>
                            <Typography variant="subtitle1">Please fill in the form to contact us for support</Typography>
                            <FormCreator
                                mode={"add"}
                                onSubmit={(e) => { }}
                                formData={formData}
                            />
                        </div>
                    </Grid>
                </Grid>
            </div>
        </div >
    );

};


const useStyles = makeStyles((theme) => ({
    root: {
        paddingTop: theme.spacing(10),
    },
    container: {
        [theme.breakpoints.up("xs")]: {
            padding: theme.spacing(2),
            paddingBottom: theme.spacing(5),
        },
        [theme.breakpoints.up("sm")]: {
            padding: theme.spacing(4),
            paddingBottom: theme.spacing(5),
        },
        [theme.breakpoints.up("md")]: {
            padding: theme.spacing(6),
            paddingBottom: theme.spacing(5),
        },
        [theme.breakpoints.up("lg")]: {
            padding: theme.spacing(6),
            paddingBottom: theme.spacing(5),
        },
        [theme.breakpoints.up("xl")]: {
            padding: theme.spacing(10),
            paddingBottom: theme.spacing(5),
        },
    },
    socialContainer: {
        padding: theme.spacing(3, 4),
        borderRadius: theme.spacing(2),
        background: '#eee',
        height: "100%"
    },
    socialIconContainer: {
        paddingTop: theme.spacing(3),
    },
    socialIcon: {
        width: theme.spacing(15),
        height: theme.spacing(15),
        background: "#fff",
        transition: "all 0.3s ease-in-out",
        display: 'flex',
        justifyContent: "center",
        alignItems: 'center',
        borderRadius: theme.spacing(2),
        cursor: 'pointer',
        '& svg': {
            fontSize: theme.palette.fontSizes["2xl"],
        },
        '&:hover': {
            background: theme.palette.primary.main,
            '& svg': {
                color: '#fff'
            }
        }
    },
    formContainer: {
        padding: theme.spacing(3, 4),
        '& h6': {
            margin: theme.spacing(1, 0, 3, 0),
            color: theme.palette.gray[1200],
        }
    },
}));

export default Contact;
