import React from "react";
import { makeStyles } from "@mui/styles";
import { Button, Grid, Typography, Stack, Divider, Link } from "@mui/material";
import clsx from "clsx";
import useResponsive from "../hooks/useResponsive";
import PlayIcon from '@mui/icons-material/PlayArrow';
import { useDispatch } from "react-redux";
import { pricingSelection, subjectSelection } from "../redux/action/utilActions";
import { useHistory } from "react-router-dom";
import useLanguage from "../hooks/useLanguage";



const Home = (props) => {
    const classes = useStyles();
    const { isMobile, isDesktop, isTablet } = useResponsive()
    const dispatch = useDispatch()
    const history = useHistory()
    const translate = useLanguage()
    return (
        <div>
            {/* <div className={classes.bg}>
                <img src="/images/icons/plane.png" className={classes.plane} />
                <img src="/images/icons/paper.png" className={classes.paper} />
            </div> */}
            <div className={classes.root}>
                {/* <div className={classes.bg}>
                    <div className={classes.topContainer}>
                        <Typography variant="h3" className={classes.topTitle}>Learning is joy. <br />Teaching is a pleasure.</Typography>
                        <Typography variant="subtitle1" className={classes.topSubTitle}>Digital Learning, Student dashboard with an intuitive and user-friendly UI, promoting focus, concentration, and fun-filled learning.</Typography>
                        <Stack flexDirection="row">
                            <Button onClick={() => window.open("https://learn.mougli.school", "_blank")} color="primary" size="large" variant="contained" sx={{ mr: 2 }}>Start Learning</Button>
                            <Button onClick={() => window.open("https://www.youtube.com/watch?v=dnh0x7cFR8c&ab_channel=MougliSchool", "_blank")} color="secondary" size="large" variant="outlined">Watch video</Button>
                        </Stack>
                    </div>
                </div> */}
                <div className={classes.landing}>
                    <Grid container>
                        <Grid item lg={6} sm={12} md={12} xs={12}>
                            <div className={classes.topContainer}>
                                <Typography variant="h3" className={classes.topTitle}><span>{translate("LEARNING_IS")}</span> {translate("JOY")}. <br /><span>{translate("TEACHING_IS")} </span> {translate("PLEASURE")}.</Typography>
                                <Typography variant="subtitle1" className={classes.topSubTitle}>{translate("HEADER_SUBTITTLE")}</Typography>
                                <Stack flexDirection="row">
                                    <Button onClick={() => window.open("https://learn.mougli.school", "_blank")} color="primary" size="large" variant="contained" sx={{ mr: 2 }}>{translate("START_LEARNING")}</Button>
                                    <Button onClick={() => window.open("https://www.youtube.com/watch?v=dnh0x7cFR8c&ab_channel=MougliSchool", "_blank")} color="secondary" size="large" variant="outlined">{translate("WATCH_VIDEO")}</Button>
                                </Stack>
                            </div>
                        </Grid>
                        <Grid item lg={6} sm={12} md={12} xs={12}>
                            <div className={classes.bg}>
                                {isDesktop ? <>
                                    <img src="/background/main.png" />
                                    <div className={classes.btnPlay} onClick={() => window.open("https://www.youtube.com/watch?v=dnh0x7cFR8c&ab_channel=MougliSchool", "_blank")} ><PlayIcon fontSize="large" /></div>

                                </> : isTablet ? <>
                                    <img src="/background/mobile-main.png" />
                                    <div className={classes.btnPlay} onClick={() => window.open("https://www.youtube.com/watch?v=dnh0x7cFR8c&ab_channel=MougliSchool", "_blank")} ><PlayIcon fontSize="large" /></div>

                                </> : <>
                                    <img src="/background/mobile-main.png" />
                                    <div className={classes.btnPlay} onClick={() => window.open("https://www.youtube.com/watch?v=dnh0x7cFR8c&ab_channel=MougliSchool", "_blank")} ><PlayIcon fontSize="large" /></div>
                                </>}

                            </div>
                            {/* <div className={classes.bg} /> */}
                        </Grid>
                    </Grid>

                </div>
                <div className={classes.container}>
                    <Grid container spacing={5} >
                        <Grid item lg={5} md={5} sm={5}>
                            <div className={classes.educationImgContainer}>
                                <img src="/images/childgraphic.png" />
                            </div>
                        </Grid>
                        <Grid item lg={7} md={7} sm={7}>
                            <div className={classes.educationContent}>
                                <Typography variant="h3">{translate("FREE_EDUCATION")} <span>{translate("TO_WORLD")}</span></Typography>
                                <Typography variant="subtitle1">{translate("FREE_EDUCATION_SUBTITLE")}</Typography>
                            </div>

                        </Grid>

                    </Grid>

                </div>

                <div className={classes.container}>
                    <div className={classes.workContainer}>
                        {/* <Grid container>
                            <Grid item lg={6}> */}
                        <Typography variant="h3"><span>{translate("HOW")}</span> {translate("FREE_EDUCATION")} <span>{translate("WORKS")}</span></Typography>
                        <Typography variant="subtitle1">{translate("HOW_FREE_EDUCATION_WORKS_SUBTITLE")}</Typography>
                        {/* <ul>
                            <li>
                                <Typography variant="subtitle1">Reputed schools across the world can share their content with the world</Typography>
                            </li>
                            <li>
                                <Typography variant="subtitle1">Volunteers around the world can use that content to teach local kids/ remote</Typography>
                            </li>
                        </ul> */}
                        {/* </Grid>
                            <Grid item lg={6} className={classes.workImgContainer}>
                                <img src="/images/work.png" />
                            </Grid>
                        </Grid> */}
                    </div>

                    <Grid container spacing={2}>
                        <Grid item lg={4} md={4} sm={12} xs={12}>
                            <div className={classes.card}>
                                <div className={classes.cardIcon}>
                                    <img src="/images/icons/content.png" />
                                </div>
                                <Typography variant="h5">{translate("CONTENT_PROVIDER")}</Typography>
                                <Typography variant="subtitle2">{translate("CONTENT_PROVIDER_SUBTITLE_ONE")}<br /><br /> {translate("CONTENT_PROVIDER_SUBTITLE_TWO")}</Typography>
                            </div>
                        </Grid>
                        <Grid item lg={4} md={4} sm={12} xs={12}>
                            <div className={classes.card}>
                                <div className={classes.cardIcon}>
                                    <img src="/images/icons/educator.png" />
                                </div>
                                <Typography variant="h5">Educator</Typography>
                                <Typography variant="subtitle2">{translate("EDUCATOR_SUBTITLE_ONE")}<br /><br /> {translate("EDUCATOR_SUBTITLE_TWO")}</Typography>
                            </div>
                        </Grid>
                        <Grid item lg={4} md={4} sm={12} xs={12}>
                            <div className={classes.card}>
                                <div className={classes.cardIcon}>
                                    <img src="/images/icons/student.png" />
                                </div>
                                <Typography variant="h5">{translate("STUDENTS")}</Typography>
                                <Typography variant="subtitle2">{translate("STUDENTS_SUBTIITLE_ONE")}<br /><br />{translate("STUDENTS_SUBTIITLE_TWO")}</Typography>
                            </div>
                        </Grid>
                    </Grid>
                </div>

                <div className={classes.container}>

                    <div className={classes.uspContainer}>
                        <Grid container>

                            <Grid item lg={7} md={7} sm={7} className={classes.uspContent}>
                                <div className={classes.innerUspContent}>
                                    <Typography variant="h3" className={classes.uspTitle}><span>{translate("OUR_LEARNING")}</span> {translate("USPS")}</Typography>
                                    <Typography variant="subtitle1" className={classes.educationSubTitle}>{translate("OUR_LEARNING_SUBTITLE")}</Typography>
                                    <ul>
                                        <li>
                                            <Typography variant="subtitle1">{translate("OUR_LEARNING_POINT_ONE")}</Typography>
                                        </li>
                                        <li>
                                            <Typography variant="subtitle1">
                                                {translate("OUR_LEARNING_POINT_TWO")}
                                            </Typography>
                                        </li>
                                        <li>
                                            <Typography variant="subtitle1">{translate("OUR_LEARNING_POINT_THREE")}</Typography>
                                        </li>
                                        <li>
                                            <Typography variant="subtitle1">{translate("OUR_LEARNING_POINT_FOUR")}</Typography>
                                        </li>
                                        <li>
                                            <Typography variant="subtitle1">{translate("OUR_LEARNING_POINT_FIVE")}</Typography>
                                        </li>
                                    </ul>
                                </div>
                            </Grid>
                            <Grid item lg={5} md={5} sm={5}>
                                <div className={classes.imgContainer}>
                                    <div className={classes.imgBox}>
                                        <img src="/images/childgraphic2.png" />
                                    </div>
                                </div>
                            </Grid>
                        </Grid>
                    </div>
                </div>
                <div className={classes.container}>
                    <div className={classes.compContainer}>
                        <Grid container className={classes.compGrid} spacing={5}>
                            <Grid item lg={4}>
                                <div className={classes.compContent}>
                                    <Typography variant="h3" ><span>{translate("INTEGRATION")}</span></Typography>
                                    <Typography variant="subtitle1" >{translate("INTEGRATION_SUBTITLE")}</Typography>
                                </div>
                            </Grid>
                            <Grid item lg={8}>
                                <Grid container >
                                    <Grid item lg={3} md={3} sm={3} sx={{ width: '100%', }}>
                                        <div className={classes.compBox}>
                                            <img src="/images/icons/gc.png" />
                                            <Typography variant="subtitle1">{translate("GC")}</Typography>
                                        </div>
                                    </Grid>
                                    <Grid item lg={3} md={3} sm={3} sx={{ width: '100%' }}>
                                        <div className={classes.compBox}>
                                            <img src="/images/icons/mt.png" />
                                            <Typography variant="subtitle1">{translate("MT")}</Typography>

                                        </div>
                                    </Grid>
                                    <Grid item lg={3} md={3} sm={3} sx={{ width: '100%' }}>
                                        <div className={classes.compBox}>
                                            <img src="/images/icons/conf.png" />
                                            <Typography variant="subtitle1">{translate("CONF_TOOLS")}<br />(Skype/ Zoom etc.)</Typography>
                                        </div>

                                    </Grid>
                                    <Grid item lg={3} md={3} sm={3} sx={{ width: '100%' }}>
                                        <div className={classes.compBox}>
                                            <img src="/images/icons/email.png" />
                                            <Typography variant="subtitle1">{translate("CONTENT_TOOLS")} <br />(emails/ WhatsApp/ Telegram)</Typography>
                                        </div>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </div>
                </div>
                <div className={classes.container}>

                    <div className={classes.uspContainer}>
                        <Grid container>
                            <Grid item lg={5} md={5} sm={5} >
                                <div className={classes.imgContainer}>
                                    <div className={classes.imgBox}>
                                        <img src="/images/childgraphic3.png" />
                                    </div>
                                </div>
                            </Grid>
                            <Grid item lg={7} md={7} sm={7} className={classes.targetContent}>
                                <div className={classes.innerTargetContent}>
                                    <Typography variant="h3">{translate("TARGET_GROUP")}</Typography>
                                    <Typography variant="subtitle1" className={classes.educationSubTitle}>{translate("TARGET_GROUP_SUBTITLE")}</Typography>
                                    <ul>
                                        <li>
                                            <Typography variant="subtitle1">{translate("TARGET_GROUP_POINT_ONE")}</Typography>
                                        </li>
                                        <li>
                                            <Typography variant="subtitle1">{translate("TARGET_GROUP_POINT_TWO")}</Typography>
                                        </li>
                                        <li>
                                            <Typography variant="subtitle1">{translate("TARGET_GROUP_POINT_THREE")}</Typography>
                                        </li>
                                    </ul>
                                </div>
                            </Grid>

                        </Grid>
                    </div>
                </div>
                <div className={classes.container}>
                    <div className={classes.commuContainer}>
                        <div className={classes.commuInnerContainer}>
                            <div className={classes.commuContent}>
                                <Typography variant="h3" >{translate("COMMUNITY")}</Typography>
                                <Typography variant="subtitle1" >{translate("COMMUNITY_TEXT_ONE")}</Typography>
                                <Typography variant="subtitle1" >{translate("COMMUNITY_TEXT_TWO")}</Typography>
                                <Button variant="contained" size="large" color="black" onClick={() => {
                                    dispatch(subjectSelection(4))
                                    history.push('/contact')
                                }}>{translate("JOIN_OUR_COMMUNITY")}</Button>
                            </div>
                            <div className={classes.commuImgContainer}>
                                <img src="/images/child3.png" />
                            </div>
                        </div>
                        <div className={classes.commuOuterContainer}>
                            <Grid container spacing={5}>
                                <Grid item lg={6}>
                                    <div className={classes.nominateContainer}>
                                        <Typography variant="h5" color="secondary">{translate("NOMINATE_SCHOOL")}</Typography>
                                        <Typography variant="subtitle1" >{translate("NOMINATE_SCHOOL_TEXT")}</Typography>
                                        <Button variant="contained" size="large" color="secondary">{translate("NOMINATE_SCHOOL_BTN")}</Button>
                                    </div>
                                </Grid>
                                <Grid item lg={6}>
                                    <div className={classes.nominateContainer}>
                                        <Typography variant="h5" color="secondary">{translate("SPONSOR")}</Typography>
                                        <Typography variant="subtitle1" >{translate("SPONSOR_TEXT")}</Typography>
                                        <Button variant="contained" size="large" color="secondary">{translate("SPONSOR_BTN")}</Button>
                                    </div>
                                </Grid>
                            </Grid>
                        </div>

                    </div>
                </div>
                <div className={classes.container}>

                    <div className={classes.priceContent}>
                        <Typography variant="h3" className={classes.PriceTitle}>Pricing</Typography>
                        <Typography variant="subtitle1">Choose the package that suits you.</Typography>
                    </div>
                    <div className={classes.priceContainer}>
                        <Grid container spacing={3}>
                            <Grid item lg={3} md={6} sm={6} sx={{ width: '100%' }}>
                                <div className={classes.priceBox}>
                                    <Typography variant="h6" className={classes.packageName}>{translate("FREE_FOR_EVER")}</Typography>
                                    {/* <Typography variant="h3" >$0</Typography>
                                    <Typography variant="subtitle1" className={classes.perMonth}>Per month</Typography> */}
                                    <ul>
                                        <li>
                                            <Typography variant="subtitle2">{translate("FREE_POINT_ONE")}</Typography>
                                        </li>
                                        <li>
                                            <Typography variant="subtitle2">{translate("FREE_POINT_TWO")}</Typography>
                                        </li>
                                        <li>
                                            <Typography variant="subtitle2">{translate("FREE_POINT_THREE")}</Typography>
                                        </li>
                                        <li>
                                            <Typography variant="subtitle2">{translate("FREE_POINT_FOUR")}</Typography>
                                        </li>
                                        <li>
                                            <Typography variant="subtitle2">{translate("FREE_POINT_FIVE")}</Typography>
                                        </li>
                                    </ul>
                                    <Button fullWidth variant="contained" color="black" size="large" onClick={() => { window.open("https://learn.mougli.school") }}>{translate("START_LEARNING")}</Button>
                                </div>
                            </Grid>
                            <Grid item lg={3} md={6} sm={6} sx={{ width: '100%' }}>
                                <div className={classes.priceBox}>
                                    <Typography variant="h6" className={classes.packageName}>{translate("PRIVATE_TUTORS")}</Typography>
                                    {/* <Typography variant="h3" >$0</Typography>
                                    <Typography variant="subtitle1" className={classes.perMonth}>Per month</Typography> */}
                                    <ul>
                                        <li>
                                            <Typography variant="subtitle2">{translate("PRIVATE_POINT_ONE")}</Typography>
                                        </li>
                                        <li>
                                            <Typography variant="subtitle2">{translate("PRIVATE_POINT_TWO")}</Typography>
                                        </li>
                                        <li>
                                            <Typography variant="subtitle2">{translate("PRIVATE_POINT_THREE")}</Typography>
                                        </li>
                                        <li>
                                            <Typography variant="subtitle2">{translate("PRIVATE_POINT_FOUR")}</Typography>
                                        </li>
                                    </ul>
                                    <Button fullWidth variant="contained" color="black" size="large" onClick={() => {
                                        dispatch(pricingSelection("Private tutors"))
                                        history.push('/contact')
                                    }
                                    }>{translate("CONTACT_FOR_PRICING")}</Button>
                                </div>
                            </Grid>
                            <Grid item lg={3} md={6} sm={6} sx={{ width: '100%' }}>
                                <div className={clsx(classes.priceBox, classes.recommeded)}>
                                    <div className={classes.recommededChip}><Typography variant="subtitle1">{translate("RECOMMENDED")}</Typography></div>
                                    <Typography variant="h6" className={classes.packageName}>{translate("MID-SIZED_INSTITUTIONS")}</Typography>
                                    {/* <Typography variant="h3" >$0</Typography>
                                    <Typography variant="subtitle1" className={classes.perMonth}>Per month</Typography> */}
                                    <ul>
                                        <li>
                                            <Typography variant="subtitle2">{translate("MID-SIZED_POINT_ONE")}</Typography>
                                        </li>
                                        <li>
                                            <Typography variant="subtitle2">{translate("MID-SIZED_POINT_TWO")}</Typography>
                                        </li>
                                        <li>
                                            <Typography variant="subtitle2">{translate("MID-SIZED_POINT_THREE")}</Typography>
                                        </li>
                                        <li>
                                            <Typography variant="subtitle2">{translate("MID-SIZED_POINT_FOUR")}</Typography>
                                        </li>
                                        <li>
                                            <Typography variant="subtitle2">{translate("MID-SIZED_POINT_FIVE")}</Typography>
                                        </li>
                                        <li>
                                            <Typography variant="subtitle2">{translate("MID-SIZED_POINT_SIX")}</Typography>
                                        </li>
                                    </ul>
                                    <Button fullWidth variant="contained" color="black" size="large" onClick={() => {
                                        dispatch(pricingSelection("Mid-sized institutions"))
                                        history.push('/contact')
                                    }}>{translate("CONTACT_FOR_PRICING")}</Button>
                                </div>
                            </Grid>
                            <Grid item lg={3} md={6} sm={6} sx={{ width: '100%' }}>
                                <div className={classes.priceBox}>
                                    <Typography variant="h6" className={classes.packageName}>{translate("BIG_INSTITUTIONS")}</Typography>
                                    {/* <Typography variant="h3" >$0</Typography>
                                    <Typography variant="subtitle1" className={classes.perMonth}>Per month</Typography> */}
                                    <ul>
                                        <li>
                                            <Typography variant="subtitle2">{translate("BIG_INST_POINT_ONE")}</Typography>
                                        </li>
                                        <li>
                                            <Typography variant="subtitle2">{translate("BIG_INST_POINT_TWO")}</Typography>
                                        </li>
                                        <li>
                                            <Typography variant="subtitle2">{translate("BIG_INST_POINT_THREE")}</Typography>
                                        </li>
                                        <li>
                                            <Typography variant="subtitle2">{translate("BIG_INST_POINT_FOUR")}</Typography>
                                        </li>
                                        <li>
                                            <Typography variant="subtitle2">{translate("BIG_INST_POINT_FIVE")}</Typography>
                                        </li>
                                        <li>
                                            <Typography variant="subtitle2">{translate("BIG_INST_POINT_SIX")}</Typography>
                                        </li>
                                    </ul>
                                    <Button fullWidth variant="contained" color="black" size="large" onClick={() => {
                                        dispatch(pricingSelection("Big Institutions"))
                                        history.push('/contact')
                                    }}>{translate("CONTACT_FOR_PRICING")}</Button>
                                </div>
                            </Grid>
                        </Grid>
                    </div>
                </div>

            </div>
        </div>

    );
};


const useStyles = makeStyles((theme) => ({
    // root: {
    //     // padding: theme.spacing(2, 10),
    //     background: "#fff"
    // },
    landing: {
        width: '100%',

        [theme.breakpoints.up("xs")]: {
            height: 'auto',
        },
        [theme.breakpoints.up("sm")]: {
            height: 'auto',
        },
        [theme.breakpoints.up("md")]: {
            height: 'auto',
        },
        [theme.breakpoints.up("lg")]: {
            height: '100vh',
        },
        // position: 'absolute',
        // background: "#F4F4F1",
        // backgroundImage: 'url(background/main.png)',
        // backgroundSize: "cover",
        // backgroundRepeat: 'no-repeat',
    },

    bg: {
        width: '100%',
        height: '100%',
        position: "relative",
        '& img': {
            width: '100%',
            height: '100%',
            borderRadius: '40px 0 0 40px'
        },
        [theme.breakpoints.up("xs")]: {
            padding: theme.spacing(0, 0.5),
        },
        [theme.breakpoints.up("sm")]: {
            padding: theme.spacing(0, 5),
        },
        [theme.breakpoints.up("md")]: {
            padding: theme.spacing(0, 7),

        },
        [theme.breakpoints.up("lg")]: {
            padding: theme.spacing(0),
        },
        // background: "#F4F4F1",
        // backgroundImage: 'url(background/main.png)',
        // backgroundSize: "cover",
        // backgroundRepeat: 'no-repeat',
    },
    btnPlay: {
        position: "absolute",
        left: '50%',
        top: "50%",
        transform: 'translate(-50%,-50%)',

        padding: theme.spacing(1),
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: theme.spacing(20),
        transition: "all 0.3s ease-in-out",
        cursor: 'pointer',
        background: '#fff',
        color: '#DD6363',
        [theme.breakpoints.up("xs")]: {
            width: 60,
            height: 60,
        },
        [theme.breakpoints.up("sm")]: {
            width: 80,
            height: 80,
        },
        [theme.breakpoints.up("md")]: {
            width: 100,
            height: 100,
        },
        [theme.breakpoints.up("lg")]: {
            width: 100,
            height: 100,
        },
        '&:hover': {
            background: '#DD6363',
            color: '#fff',
            boxShadow: '13px 23px 48px rgba(0, 0, 0, 0.5)'
        },
    },
    plane: {
        width: 'auto',
        top: 200,
        left: 250,
        position: 'absolute',
    },
    paper: {
        width: 'auto',
        top: 500,
        right: 450,
        position: 'absolute',
    },
    topContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: "flex-start",
        flexDirection: 'column',
        padding: theme.spacing(0, 10),
        [theme.breakpoints.up("xs")]: {
            padding: theme.spacing(10, 2.5, 5, 2.5),
            height: 'auto',
            justifyContent: 'flex-start',
        },
        [theme.breakpoints.up("sm")]: {
            padding: theme.spacing(15, 5, 5, 5),
            height: 'auto',
            justifyContent: 'flex-start',
        },
        [theme.breakpoints.up("md")]: {
            padding: theme.spacing(15, 7),
            justifyContent: 'flex-start',
            height: 'auto',
        },
        [theme.breakpoints.up("lg")]: {
            padding: theme.spacing(0, 10),
            justifyContent: 'center',
            height: '100vh',

        },
    },
    topTitle: {
        fontWeight: 400,
        color: '#ff9e42',
        '& span': {
            color: '#373737',
            // borderBottom: '10px solid #DEFF5A',
            display: "inline-block",
            lineHeight: theme.spacing(3)
        },
        '&:after': {
            content: '""',
            display: "block",
            marginTop: "20px",
            width: 60,
            borderTop: "4px solid #ff9e42",
            borderRadius: theme.spacing(4),
        }
    },
    topTitleSec: {
        color: theme.palette.secondary.main,
    },
    topSubTitle: {
        // width: '50%',
        padding: theme.spacing(5, 0),
        color: theme.palette.gray[1200]
    },
    container: {
        // margin: theme.spacing(15, 0),
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
    // educationContainer: {
    //     '& img': {
    //         width: 400,
    //         height: 400,
    //         objectFit: 'cover',
    //         borderRadius: `500px`,
    //         padding: theme.spacing(2),
    //     }
    // },
    educationContent: {
        display: 'flex',
        justifyContent: "center",
        flexDirection: 'column',
        height: '100%',
        '& h3': {
            marginBottom: theme.spacing(3),
            color: '#FF5B35',
            '& span': {
                color: '#373737',
                // borderBottom: '10px solid #DEFF5A',
                display: "inline-block",
                lineHeight: theme.spacing(3)
            },
            '&:after': {
                content: '""',
                display: "block",
                marginTop: "20px",
                width: 60,
                borderTop: "4px solid #FF5B35",
                borderRadius: theme.spacing(4),
            }
        },
        '& h6': {
            color: theme.palette.gray[1200]
        }
    },
    educationImgContainer: {
        [theme.breakpoints.up("xs")]: {
            padding: theme.spacing(2),
        },
        [theme.breakpoints.up("sm")]: {
            padding: theme.spacing(2),
        },
        [theme.breakpoints.up("md")]: {
            padding: theme.spacing(5),
        },
        [theme.breakpoints.up("lg")]: {
            padding: theme.spacing(5),
        },
        '& img': {
            width: '100%',
            height: '100%',
            objectFit: 'cover',
        },
    },
    educationSubTitle: {
        paddingTop: theme.spacing(3),
        color: theme.palette.gray[1200]
    },
    cardContainer: {
        display: "flex",
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        marginTop: theme.spacing(5),
    },
    card: {
        [theme.breakpoints.up("xs")]: {
            padding: theme.spacing(2.5),
        },
        [theme.breakpoints.up("sm")]: {
            padding: theme.spacing(2.5),
        },
        [theme.breakpoints.up("md")]: {
            padding: theme.spacing(5),
        },
        [theme.breakpoints.up("lg")]: {
            padding: theme.spacing(6),
        },
        // borderRight: `2px solid #DDC8A2`,
        borderRadius: theme.spacing(2),
        background: '#F1F1F1',
        width: "100%",
        minHeight: '100%',
        transition: 'all 0.3s ease-in-out',
        boxShadow: 'none',
        '&:hover': {
            boxShadow: '10px 10px 0px #F4D669',
            background: '#1CB0F1',
            color: "white",
            transform: "translateY(-10px)",
            '& h6': {
                color: "white",
            },
            '& $cardIcon': {
                background: '#F4D669',
                borderColor: '#fff',
            }
        },
        '& h6': {
            color: theme.palette.gray[1200],
            marginTop: theme.spacing(2),
        },

    },
    cardIcon: {
        width: 65,
        height: 65,
        borderRadius: theme.spacing(3),
        padding: theme.spacing(2.2),
        background: '#1CB0F1',
        marginBottom: theme.spacing(3),
        border: '2px solid rgba(0,0,0,0.5)',
        '& img': {
            width: "100%",
            height: "100%",
        }
    },
    uspContainer: {
        display: "flex",
    },
    imgContainer: {
        width: '100%',
        display: 'flex',
        justifyContent: "center",
        alignItems: "center",
    },
    imgBox: {
        padding: theme.spacing(2),
        '& img': {
            width: '100%',
            objectFit: 'cover',
        }
    },
    uspContent: {
        display: 'flex',
        alignItems: 'center'
    },
    targetContent: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    innerUspContent: {
        [theme.breakpoints.up("xs")]: {
            paddingRight: 0,
        },
        [theme.breakpoints.up("sm")]: {
            paddingRight: theme.spacing(0),
        },
        [theme.breakpoints.up("md")]: {
            paddingRight: theme.spacing(7),
        },
        [theme.breakpoints.up("lg")]: {
            paddingRight: theme.spacing(8),
        },
        [theme.breakpoints.up("xl")]: {
            paddingRight: theme.spacing(12),
        },
        '& h3': {
            // color: "#1CB0F1"
            color: '#4EC217',
            '& span': {
                color: '#373737',
                // borderBottom: '10px solid #DEFF5A',
                display: "inline-block",
                lineHeight: theme.spacing(3)
            },
            '&:after': {
                content: '""',
                display: "block",
                marginTop: "20px",
                width: 60,
                borderTop: "4px solid #4EC217",
                borderRadius: theme.spacing(4),
            }
        },
        '& ul': {
            paddingLeft: theme.spacing(3),
            paddingTop: theme.spacing(3),
            listStyleImage: 'url(/images/icons/check.svg)',
            '& li': {
                padding: theme.spacing(1.5, 1),

            }
        }
    },
    innerTargetContent: {
        [theme.breakpoints.up("xs")]: {
            paddingLeft: 0,
        },
        [theme.breakpoints.up("sm")]: {
            paddingLeft: theme.spacing(0),
        },
        [theme.breakpoints.up("md")]: {
            paddingLeft: theme.spacing(7),
        },
        [theme.breakpoints.up("lg")]: {
            paddingLeft: theme.spacing(0),
        },
        [theme.breakpoints.up("xl")]: {
            paddingLeft: theme.spacing(0),
        },
        '& h3': {
            color: "#E87B63",
            '&:after': {
                content: '""',
                display: "block",
                marginTop: "20px",
                width: 60,
                borderTop: "4px solid #E87B63",
                borderRadius: theme.spacing(4),
            }
        },
        '& ul': {
            paddingLeft: theme.spacing(3),
            paddingTop: theme.spacing(3),
            listStyleImage: 'url(/images/icons/check.svg)',
            '& li': {
                padding: theme.spacing(1.5, 1),
            }
        }
    },
    compContainer: {
        [theme.breakpoints.up("xs")]: {
            padding: theme.spacing(3),

        },
        [theme.breakpoints.up("sm")]: {
            padding: theme.spacing(4),

        },
        [theme.breakpoints.up("md")]: {
            padding: theme.spacing(5),

        },
        [theme.breakpoints.up("lg")]: {
            padding: theme.spacing(7),

        },
        [theme.breakpoints.up("xl")]: {
            padding: theme.spacing(7),

        },
        // borderTop: '2px solid #1626BB',
        // borderBottom: '2px solid #1626BB', 
        borderRadius: theme.spacing(2),
        backgroundImage: 'url(background/compititor.png)',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
    },
    compContent: {
        '& h3': {
            paddingBottom: theme.spacing(2),
            [theme.breakpoints.up("xs")]: {
                textAlign: "center"
            },
            [theme.breakpoints.up("sm")]: {
                textAlign: "center"
            },
            [theme.breakpoints.up("md")]: {
                textAlign: "center"
            },
            [theme.breakpoints.up("lg")]: {
                textAlign: "left"
            },
            [theme.breakpoints.up("xl")]: {
                textAlign: "left"
            },
            // '& span': {
            //     color: '#373737',
            //     borderBottom: '10px solid #EED241',
            //     display: "inline-block",
            //     lineHeight: theme.spacing(3)
            // }
        },
        '& h6': {
            color: '#515151',
        },
    },
    compGrid: {
        // borderTop: '2px solid #DDC8A2',
        // borderBottom: '2px solid #DDC8A2',
        display: 'flex',
        justifyContent: "center",
        alignItems: "center",

    },
    compBox: {
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        [theme.breakpoints.up("xs")]: {
            marginBottom: theme.spacing(3),
        },
        [theme.breakpoints.up("sm")]: {
            marginBottom: theme.spacing(3),
        },
        [theme.breakpoints.up("md")]: {
            marginBottom: 0,
        },
        [theme.breakpoints.up("lg")]: {
            marginBottom: 0,
        },
        [theme.breakpoints.up("xl")]: {
            marginBottom: 0,
        },
        '& img': {
            [theme.breakpoints.up("xs")]: {
                width: 60,
                height: 60,
                marginBottom: theme.spacing(0.5)
            },
            [theme.breakpoints.up("sm")]: {
                width: 'auto',
                height: 'auto',
                marginBottom: theme.spacing(0.5)
            },
            [theme.breakpoints.up("md")]: {
                width: 'auto',
                height: 'auto',
                marginBottom: theme.spacing(2)
            },
            [theme.breakpoints.up("lg")]: {
                width: 'auto',
                height: 'auto',
                marginBottom: theme.spacing(2)
            },
            [theme.breakpoints.up("xl")]: {
                width: 'auto',
                height: 'auto',
                marginBottom: theme.spacing(2)
            },

        },
        '& h6': {
            textAlign: 'center'
        }
    },
    workContainer: {
        marginBottom: theme.spacing(3),
        '& h3': {
            color: '#1CB0F1',
            marginBottom: theme.spacing(3),
            '& span': {
                color: '#373737',
                // borderBottom: '10px solid #DEFF5A',
                display: "inline-block",
                lineHeight: theme.spacing(3)
            },
            '&:after': {
                content: '""',
                display: "block",
                marginTop: "20px",
                width: 60,
                borderTop: "4px solid #1CB0F1",
                borderRadius: theme.spacing(4),
            }
        },
        '& h6': {
            color: theme.palette.gray[1200]
        },
        '& ul': {
            paddingLeft: theme.spacing(3),
            paddingTop: theme.spacing(3),
            color: theme.palette.gray[1200],
            // listStyleImage: 'url(icons/check.svg)',
            '& li': {
                padding: theme.spacing(1.5, 1),
                '& h6': {
                    color: theme.palette.gray[1200]
                }
            }
        },
        '& img': {
            objectFit: 'cover',
            width: '100%',
            height: '100%',
            borderRadius: theme.spacing(2)
        }
    },
    workImgContainer: {
        '& img': {
            width: '100%',
            height: 160,
            objectFit: 'contain'
        }
    },
    priceBox: {
        [theme.breakpoints.up("xs")]: {
            padding: theme.spacing(2.5),

        },
        [theme.breakpoints.up("sm")]: {
            padding: theme.spacing(2.5),

        },
        [theme.breakpoints.up("md")]: {
            padding: theme.spacing(3),

        },
        [theme.breakpoints.up("lg")]: {
            padding: theme.spacing(3),

        },
        borderRadius: theme.spacing(2),
        background: '#F1F1F1',
        minHeight: '100%',
        width: '100%',
        '& ul': {
            padding: theme.spacing(3, 0, 3, 3),
            // listStyleImage: 'url(icons/check.svg)',
            '& li': {
                padding: theme.spacing(1.5, 1),
            }
        },
        transition: 'all 0.3s ease-in-out',
        // '&:hover': {
        //     boxShadow: '10px 10px 0px #F4D669',
        //     background: '#E87B63',
        //     color: "white",
        //     transform: "translateY(-10px)",
        // },
    },
    packageName: {
        // paddingBottom: theme.spacing(3),
    },
    recommeded: {
        background: '#FF5B35',
        color: '#fff',
        // transform: "scale(1.05)",
        position: 'relative',
        '& $perMonth': {
            color: '#D7D7D7',
        },
        boxShadow: '10px 10px 0px #F4D669',
    },
    recommededChip: {
        position: "absolute",
        top: -25,
        background: '#29ff94',
        borderRadius: theme.spacing(1),
        padding: theme.spacing(0.5, 1),
        boxShadow: '0px 10px 35px rgba(0,0,0,0.25)',
        color: '#000',
    },
    perMonth: {
        color: theme.palette.gray[1200],
    },
    priceContent: {
        marginBottom: theme.spacing(5),
        '& h3': {
            color: '#FF5B35',
            '&:after': {
                content: '""',
                display: "block",
                marginTop: "20px",
                width: 60,
                borderTop: "4px solid #FF5B35",
                borderRadius: theme.spacing(4),
            }
        },
        '& h6': {
            paddingTop: theme.spacing(3),
            color: theme.palette.gray[1200]
        }
    },
    commuContainer: {
        border: '1px solid #FFE2D1',
        borderRadius: theme.spacing(2),
    },
    commuInnerContainer: {
        borderRadius: theme.spacing(2, 2, 0, 0),

        [theme.breakpoints.up("xs")]: {
            padding: theme.spacing(3),

        },
        [theme.breakpoints.up("sm")]: {
            padding: theme.spacing(4),

        },
        [theme.breakpoints.up("md")]: {
            padding: theme.spacing(5),

        },
        [theme.breakpoints.up("lg")]: {
            padding: theme.spacing(7),

        },
        [theme.breakpoints.up("xl")]: {
            padding: theme.spacing(7),

        },
        backgroundImage: 'url(background/community.png)',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
    },
    commuOuterContainer: {
        [theme.breakpoints.up("xs")]: {
            padding: theme.spacing(3),

        },
        [theme.breakpoints.up("sm")]: {
            padding: theme.spacing(4),

        },
        [theme.breakpoints.up("md")]: {
            padding: theme.spacing(5),

        },
        [theme.breakpoints.up("lg")]: {
            padding: theme.spacing(7),

        },
        [theme.breakpoints.up("xl")]: {
            padding: theme.spacing(7),

        },
    },
    nominateContainer: {
        '& h5': {
            paddingBottom: theme.spacing(2)
        },
        '& h6': {
            color: '#515151',
            textAlign: 'justify',
            paddingBottom: theme.spacing(3)
        },
    },
    commuImgContainer: {
        position: 'relative',
        '& img': {
            position: 'absolute',
            right: 0,
            bottom: -68,
            [theme.breakpoints.up("xs")]: {
                display: 'none'
            },
            [theme.breakpoints.up("sm")]: {
                display: 'none'
            },
            [theme.breakpoints.up("md")]: {
                display: 'none'
            },
            [theme.breakpoints.up("lg")]: {
                display: 'block',
                width: '30%',
            },
        }
    },
    commuContent: {
        [theme.breakpoints.up("xs")]: {
            width: 'auto',

        },
        [theme.breakpoints.up("sm")]: {
            width: 'auto',

        },
        [theme.breakpoints.up("md")]: {
            width: 'auto',
        },
        [theme.breakpoints.up("lg")]: {
            width: '70%',
        },
        '& h3': {
            paddingBottom: theme.spacing(2)
        },
        '& h6': {
            color: '#515151',
            textAlign: 'justify',
            paddingBottom: theme.spacing(3)
        },
    },
}));

export default Home;
