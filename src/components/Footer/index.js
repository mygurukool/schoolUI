import React from "react";
import { makeStyles } from "@mui/styles";
import { Button, Grid, Link, Stack, Typography } from "@mui/material";
// import FacebookIcon from '@mui/icons-material/Facebook';
import EmailIcon from '@mui/icons-material/Email';
// import InstagramIcon from '@mui/icons-material/Instagram';
import { Twitter as TwitterIcon } from "@mui/icons-material";
import { useHistory } from "react-router-dom";

const Index = (props) => {
    const classes = useStyles();
    const history = useHistory()
    return (
        <div className={classes.footerContainer}>
            <Grid container spacing={2}>
                <Grid item lg={4} sm={4} md={4} xs={12}>
                    <div className={classes.logoContainer}>
                        <Grid container spacing={2}>
                            <Grid item lg={12}>
                                <img src="images/logo.png" />
                            </Grid>
                            <Grid item lg={12}>

                                <Stack flexDirection="row" alignItems="center" className={classes.socialIcons}>
                                    {/* <div className={classes.scInnerIcon}>
                                        <FacebookIcon />
                                    </div> */}
                                    <div className={classes.scInnerIcon} onClick={() => { window.location.href = "mailto:contact@mougli.school" }}>
                                        <EmailIcon />
                                    </div>
                                    {/* <div className={classes.scInnerIcon}>
                                        <InstagramIcon />
                                    </div> */}
                                    <div className={classes.scInnerIcon} onClick={() => window.open('https://twitter.com/MougliSchool')}>
                                        <TwitterIcon />
                                    </div>
                                </Stack>
                            </Grid>
                        </Grid>
                    </div>

                </Grid>
                <Grid item lg={4} sm={4} md={4} xs={6}>
                    <div className={classes.navigateContainer}>
                        <Typography variant="h6">Discover</Typography>
                        <ul>
                            <li>
                                <Button color="black" onClick={() => history.push('/')}>Home</Button>
                            </li>
                            <li>
                                <Button color="black" onClick={() => history.push('/about')}>About</Button>
                            </li>
                            <li>
                                <Button color="black"
                                    // onClick={() => history.push('/contact')}
                                    onClick={() => { window.location.href = "mailto:contact@mougli.school" }}
                                >Contact</Button>
                            </li>
                        </ul>
                    </div>

                </Grid>
                {/* <Grid item lg={4} sm={4} md={4} xs={6}>
                    <div className={classes.navigateContainer}>
                        <Typography variant="h6">Sitemap</Typography>
                        <ul>
                            <li>
                                <Button color="black" onClick={() => history.push('/')}>Home</Button>
                            </li>
                            <li>
                                <Button color="black" onClick={() => history.push('/about')}>About</Button>
                            </li>
                            <li>
                                <Button color="black">Contact</Button>
                            </li>
                        </ul>
                    </div>

                </Grid> */}
            </Grid>

            <Stack flexDirection="row" justifyContent="space-between" alignItems="center" className={classes.bottomFooter}>
                <Grid container spacing={2}>
                    <Grid item lg={9} xs={12} sm={8} md={9}>
                        <Typography>copyright {new Date().getFullYear()}</Typography>
                    </Grid>
                    <Grid item lg={3} xs={12} sm={4} md={3}>
                        <Stack flexDirection="row" justifyContent="space-between" alignItems="center">
                            <Typography><a onClick={() => { }}>Privacy policy</a> </Typography>
                            <Typography><a onClick={() => { }}>Terms & condition</a></Typography>
                        </Stack>
                    </Grid>
                </Grid>
            </Stack>
        </div>
    );
};


const useStyles = makeStyles((theme) => ({
    footerContainer: {
        background: '#F0F0F0',
        // minHeight: 300,
        display: 'flex',
        flexDirection: 'column',
        marginTop: theme.spacing(5),
        justifyContent: "space-between",
        [theme.breakpoints.up("xs")]: {
            padding: theme.spacing(2.5),
        },
        [theme.breakpoints.up("sm")]: {
            padding: theme.spacing(5),
        },
        [theme.breakpoints.up("md")]: {
            padding: theme.spacing(5),
        },
        [theme.breakpoints.up("lg")]: {
            padding: theme.spacing(5, 10),
        },
    },
    logoContainer: {
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: "center",
        flexDirection: 'column',
        '& img': {
            width: 120,
        },
    },
    navigateContainer: {
        '& ul': {
            listStyleType: 'none',

        }
    },

    scInnerIcon: {
        width: 45,
        height: 45,
        border: '1px solid #000',
        padding: theme.spacing(1),
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: theme.spacing(20),
        margin: theme.spacing(2, 2, 2, 0),
        transition: "all 0.3s ease-in-out",
        cursor: 'pointer',
        '&:hover': {
            background: '#000',
            color: '#F0F0F0',
        }
    },
    bottomFooter: {
        marginTop: theme.spacing(3),
        paddingTop: theme.spacing(3),
        borderTop: `1px solid ${theme.palette.gray[1100]}`,
        '& a': {
            color: 'black',
            textDecoration: "none",
            cursor: "pointer",
            '&:hover': {
                textDecoration: 'underline'
            }
        }
    }
}));

export default Index;
