import React from "react";
import { makeStyles } from "@mui/styles";
import { Grid, Typography, Stack, IconButton } from "@mui/material";
import clsx from "clsx";
import { Twitter as TwitterIcon, LinkedIn as LinkedInIcon } from "@mui/icons-material";
import useLanguages from '../hooks/useLanguage'

const About = (props) => {
    const classes = useStyles();
    const translate = useLanguages()
    return (
        <div className={classes.root}>
            <div className={clsx(classes.aboutContainer, classes.container)}>
                <img src="/background/about.png" className={classes.bgImg} />
                <Typography variant="h3">{translate("ABOUT")} <span>{translate("US")}</span> </Typography>
                <Typography variant="subtitle1">{translate("ABOUT_TEXT_ONE")}<b>{translate("ABOUT_TEXT_TWO")}</b> {translate("ABOUT_TEXT_THREE")}</Typography>
                <Typography variant="subtitle1">{translate("ABOUT_TEXT_FOUR")}<span className={classes.spanText}>{translate("THE_VISION")} </span>{translate("ABOUT_TEXT_FIVE")}<span className={classes.rightToEdu}>{translate("RIGHT_TO_EDUCATION")}</span></Typography>
                <Typography variant="subtitle1">{translate("MOUGLI_SCHOOL")} <span className={classes.spanText}>{translate("MISSION")}</span> {translate("ABOUT_TEXT_SIX")}</Typography>
                <div className={classes.centerSection}>

                    <Typography variant="subtitle1" className={classes.leftText}>{translate("ABOUT_TEXT_SEVEN")}</Typography>
                    <div className={classes.circleContainer}>
                        <img src="/images/about/circle.svg" className={classes.circle} />
                        <Typography variant="subtitle1">Kashvi Bandhu</Typography>
                    </div>
                    <Typography variant="subtitle1" className={classes.rightText}>{translate("ABOUT_TEXT_EIGHT")} <br />{translate("ABOUT_TEXT_NINE")}</Typography>
                </div>

            </div>
            <div className={clsx(classes.photoBlock)}>
                <Grid container>
                    <Grid item lg={12} md={12} sm={12} xs={12}>
                        <div className={classes.photoBlockContainer}>
                            <div className={clsx(classes.imgBlock, classes.childImg)}>
                                <img src="/images/about/circle.svg" />
                                <Typography variant="subtitle1">Kashvi Bandhu</Typography>
                            </div>
                            <Typography variant="h6">{translate("THE_BOSS")}</Typography>
                            <Typography variant="body2">{translate("THE_BOSS_DESC")}</Typography>
                        </div>
                    </Grid>
                    <Grid item lg={6} md={6} sm={6} xs={6}>
                        <div className={classes.photoBlockContainer}>
                            <div className={classes.imgBlock}>
                                <img src="/images/about/naveen.png" />
                                <Typography variant="subtitle1">Naveen Bandhu</Typography>
                            </div>
                            <Typography variant="h6">{translate("JUST_ANOTHER_FATHER")}</Typography>
                            <Typography variant="body2">{translate("JUST_ANOTHER_FATHER_DESC")}</Typography>
                            <Stack flexDirection="row">
                                <IconButton color="primary" onClick={() => window.open("https://twitter.com/MougliSchool/")}><TwitterIcon /></IconButton>
                                <IconButton color="primary" onClick={() => window.open("https://www.linkedin.com/in/naveenbandhu/")}><LinkedInIcon /></IconButton>
                            </Stack>
                        </div>
                    </Grid>
                    <Grid item lg={6} md={6} sm={6} xs={6}>
                        <div className={classes.photoBlockContainer}>
                            <div className={classes.imgBlock}>
                                <img src="https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png" />
                                <Typography variant="subtitle1">Stephane Peiry</Typography>
                            </div>
                            <Typography variant="h6">{translate("FIRST_BELIEVER")}</Typography>
                            <Typography variant="body2">{translate("FIRST_BELIEVER_DESC")}</Typography>
                            <Stack flexDirection="row">
                                <IconButton color="primary"><TwitterIcon /></IconButton>
                                <IconButton color="primary"><LinkedInIcon /></IconButton>
                            </Stack>
                        </div>
                    </Grid>
                </Grid>
            </div>
            <div className={clsx(classes.whyContainer, classes.container)}>
                <Typography variant="h3"><span>{translate("WHY")}</span> {translate("CHOOSE")} <span>{translate("US")}</span></Typography>
                <Grid container spacing={5}>
                    <Grid item lg={6} md={6} sm={12} xs={12}>
                        <div className={classes.innerContainer}>
                            <div className={classes.imgContainer} style={{ background: '#4EC217' }}>
                                <img src="/images/about/ui.png" />
                            </div>
                            <Typography variant="h5">{translate("WHY_CHOOSE_TITLE_ONE")}</Typography>
                            <Typography variant="subtitle1">{translate("WHY_CHOOSE_SUBTITLE_ONE")}</Typography>
                        </div>
                    </Grid>
                    <Grid item lg={6} md={6} sm={12} xs={12}>
                        <div className={classes.innerContainer}>
                            <div className={classes.imgContainer} style={{ background: '#1CB0F1' }}>
                                <img src="/images/about/integration.png" />
                            </div>
                            <Typography variant="h5">{translate("WHY_CHOOSE_TITLE_TWO")}</Typography>
                            <Typography variant="subtitle1">{translate("WHY_CHOOSE_SUBTITLE_TWO")}</Typography>
                        </div>
                    </Grid>
                    <Grid item lg={6} md={6} sm={12} xs={12}>
                        <div className={classes.innerContainer}>
                            <div className={classes.imgContainer} style={{ background: '#ff9e42' }}>
                                <img src="/images/about/education.png" />
                            </div>
                            <Typography variant="h5">{translate("WHY_CHOOSE_TITLE_THREE")}</Typography>
                            <Typography variant="subtitle1">{translate("WHY_CHOOSE_SUBTITLE_THREE")}</Typography>
                        </div>
                    </Grid>
                    <Grid item lg={6} md={6} sm={12} xs={12}>
                        <div className={classes.innerContainer}>
                            <div className={classes.imgContainer} style={{ background: '#ecef21' }}>
                                <img src="/images/about/flexible.png" />
                            </div>
                            <Typography variant="h5">{translate("WHY_CHOOSE_TITLE_FOUR")}</Typography>
                            <Typography variant="subtitle1">{translate("WHY_CHOOSE_SUBTITLE_FOUR")}</Typography>
                        </div>
                    </Grid>
                </Grid>
            </div>
            <div className={clsx(classes.backContainer, classes.container)}>
                <Typography variant="h3">{translate("GIVING_BACK")} <span>/ {translate("FREE_EDUCATION_TO_WORLD")}</span></Typography>
                <Typography variant="subtitle1">{translate("GIVING_BACK_SUBTITLE")}</Typography>
                <ul>
                    <li>
                        <Typography variant="subtitle1">{translate("GIVING_BACK_POINT_ONE")}</Typography>
                    </li>
                    <li>
                        <Typography variant="subtitle1">{translate("GIVING_BACK_POINT_TWO")}</Typography>
                    </li>
                    <li>
                        <Typography variant="subtitle1">{translate("GIVING_BACK_POINT_THREE")}</Typography>
                    </li>
                    <li>
                        <Typography variant="subtitle1">{translate("GIVING_BACK_POINT_FOUR")}</Typography>
                    </li>

                </ul>
            </div>
        </div>
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
    bgImg: {
        width: '100%',
        height: '100%',
        marginBottom: theme.spacing(10),
    },
    aboutContainer: {

        '& h3': {
            color: '#FF5B35',
            marginBottom: theme.spacing(5),
            textAlign: 'center',
            '& span': {
                color: '#373737',
                // borderBottom: '10px solid #DEFF5A',
                display: "inline-block",
                lineHeight: theme.spacing(3)
            },
            '&:after': {
                content: '""',
                display: "block",
                margin: "20px auto 0",
                width: 60,
                borderTop: "4px solid #FF5B35",
                borderRadius: theme.spacing(4),
            }
        },
        '& h6': {
            marginBottom: theme.spacing(3),
            textAlign: "justify",
            color: theme.palette.gray[1200],

        },
    },
    spanText: {
        fontSize: theme.palette.fontSizes.md,
        color: '#ff9e42',
        // borderBottom: "1px solid #ff9e42",
        lineHeight: theme.spacing(3)
    },
    rightToEdu: {
        color: theme.palette.gray[1200],
        borderBottom: "1px solid #ff9e42",
        lineHeight: theme.spacing(3)
    },
    centerSection: {
        position: 'relative',
    },
    leftText: {
        [theme.breakpoints.up("xs")]: {
            float: 'none',
            width: "auto",
        },
        [theme.breakpoints.up("sm")]: {
            float: 'none',
            width: "auto",
        },
        [theme.breakpoints.up("md")]: {
            float: 'left',
            width: "49%",
        },
        [theme.breakpoints.up("lg")]: {
            float: 'left',
            width: "49%",
        },

        textAlign: "justify",
        '&:before': {
            [theme.breakpoints.up("xs")]: {
                float: 'none',
                width: "auto",
            },
            [theme.breakpoints.up("sm")]: {
                float: 'none',
                width: "auto",
            },
            [theme.breakpoints.up("md")]: {
                content: '""',
                width: "80px",
                height: "160px",
                float: "right",
                shapeOutside: "circle(farthest-side at right)"
            },
            [theme.breakpoints.up("lg")]: {
                content: '""',
                width: "80px",
                height: "160px",
                float: "right",
                shapeOutside: "circle(farthest-side at right)"
            },

        }
    },
    rightText: {
        [theme.breakpoints.up("xs")]: {
            float: 'none',
            width: "auto",
        },
        [theme.breakpoints.up("sm")]: {
            float: 'none',
            width: "auto",
        },
        [theme.breakpoints.up("md")]: {
            float: 'right',
            width: "49%",
        },
        [theme.breakpoints.up("lg")]: {
            float: 'right',
            width: "49%",
        },

        textAlign: "justify",
        '&:before': {
            [theme.breakpoints.up("xs")]: {
                float: 'none',
                width: "auto",
            },
            [theme.breakpoints.up("sm")]: {
                float: 'none',
                width: "auto",
            },
            [theme.breakpoints.up("md")]: {
                content: '""',
                width: "80px",
                height: "160px",
                float: "left",
                shapeOutside: "circle(farthest-side at left)"
            },
            [theme.breakpoints.up("lg")]: {
                content: '""',
                width: "80px",
                height: "160px",
                float: "left",
                shapeOutside: "circle(farthest-side at left)"
            },

        }
    },
    circleContainer: {
        position: "relative",
        width: "100%",
        height: '100%',
        '& img': {
            [theme.breakpoints.up("xs")]: {
                display: "none"
            },
            [theme.breakpoints.up("sm")]: {
                display: "none"
            },
            [theme.breakpoints.up("md")]: {
                display: "block"
            },
            [theme.breakpoints.up("lg")]: {
                display: "block"
            },
            width: '160px',
            height: '160px',
            // shapeOutside: 'circle()',
            position: 'absolute',
            top: -15,
            left: '50%',
            marginLeft: -80,
        },
        '& h6': {
            position: 'absolute',
            left: '50%',
            // top: "50%",
            transform: 'translate(-50%,200%)',
            opacity: 0,
            color: "#000"
        },
        '&:hover': {
            "& h6": {
                opacity: 1,
            },
            '& img': {
                opacity: 0.5,
            }
        }
    },
    circle: {


    },
    childImg: {
        [theme.breakpoints.up("xs")]: {
            display: "block"
        },
        [theme.breakpoints.up("sm")]: {
            display: "block"
        },
        [theme.breakpoints.up("md")]: {
            display: "none"
        },
        [theme.breakpoints.up("lg")]: {
            display: "none"
        },
    },
    photoBlock: {
        marginBottom: theme.spacing(5),
        '& h6': {
            textAlign: 'center'
        },
        '& p': {
            color: theme.palette.gray[1200],
            textAlign: 'center'
        }
    },
    photoBlockContainer: {
        display: 'flex',
        flexDirection: "column",
        justifyContent: 'center',
        alignItems: "center",
        marginBottom: theme.spacing(5),
        '&:hover': {
            "& h6": {
                opacity: 1,
            },
            '& img': {
                opacity: 0.5,
            }
        }
    },
    imgBlock: {
        [theme.breakpoints.up("xs")]: {
            width: theme.spacing(12),
            height: theme.spacing(12),
        },
        [theme.breakpoints.up("sm")]: {
            width: theme.spacing(15),
            height: theme.spacing(15),
        },
        [theme.breakpoints.up("md")]: {
            width: theme.spacing(18),
            height: theme.spacing(18),
        },
        [theme.breakpoints.up("lg")]: {
            width: theme.spacing(20),
            height: theme.spacing(20),
        },

        marginBottom: theme.spacing(5),
        borderRadius: theme.spacing(50),
        border: '2px solid rgba(0,0,0,0.5)',
        position: 'relative',
        transition: "all .2s ease-in-out",
        '& img': {
            width: '100%',
            height: '100%',
            borderRadius: theme.spacing(50),
        },
        '& h6': {
            position: 'absolute',
            left: '50%',
            top: "50%",
            transform: 'translate(-50%,-50%)',
            opacity: 0,
            color: "#000"
        },

    },

    whyContainer: {
        '& h3': {
            color: '#ff9e42 ',
            marginBottom: theme.spacing(5),
            textAlign: 'center',
            '& span': {
                color: '#373737',
                // borderBottom: '10px solid #DEFF5A',
                lineHeight: theme.spacing(3)
            },
            '&:after': {
                content: '""',
                display: "block",
                margin: "20px auto 0",
                width: 60,
                borderTop: "4px solid #ff9e42",
                borderRadius: theme.spacing(4),
            }
        },
    },
    innerContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: "column",
        height: '100%',
        '& h5': {
            marginBottom: theme.spacing(3),
        },
        '& h6': {
            color: theme.palette.gray[1200],
            textAlign: 'center'
        }
    },
    imgContainer: {
        padding: theme.spacing(3),
        width: theme.spacing(12),
        height: theme.spacing(12),
        marginBottom: theme.spacing(3),
        borderRadius: theme.spacing(5),
        border: '2px solid rgba(0,0,0,0.5)',
        '& img': {
            width: '100%',
            height: '100%'
        }
    },
    backContainer: {
        marginBottom: theme.spacing(3),
        '& h3': {
            color: '#1CB0F1',
            marginBottom: theme.spacing(3),
            textAlign: 'center',
            '& span': {
                color: '#373737',
                // borderBottom: '10px solid #DEFF5A',
                display: "inline-block",
                lineHeight: theme.spacing(3)
            },
            '&:after': {
                content: '""',
                display: "block",
                margin: "20px auto 0",
                width: 60,
                borderTop: "4px solid #1CB0F1",
                borderRadius: theme.spacing(4),
            }
        },
        '& h6': {
            textAlign: 'center',
        },
        '& ul': {
            paddingLeft: theme.spacing(3),
            paddingTop: theme.spacing(3),
            // listStyleImage: 'url(icons/check.svg)',
            '& li': {
                padding: theme.spacing(1.5, 1),
                '& h6': {
                    color: theme.palette.gray[1200],
                    textAlign: 'justify',
                }
            }
        },
    },
}));

export default About;
