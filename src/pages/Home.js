import React from "react";
import { makeStyles } from "@mui/styles";
import { Button, Grid, Typography, Stack, Divider, Link } from "@mui/material";
import clsx from "clsx";
import useResponsive from "../hooks/useResponsive";
import PlayIcon from '@mui/icons-material/PlayArrow';
const Home = (props) => {
    const classes = useStyles();
    const { isMobile, isDesktop, isTablet } = useResponsive()
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
                                <Typography variant="h3" className={classes.topTitle}><span>Learning is</span> joy. <br /><span>Teaching is a </span> pleasure.</Typography>
                                <Typography variant="subtitle1" className={classes.topSubTitle}>Digital Learning, a student dashboard with an intuitive and user-friendly UIUX, promoting focus, concentration, and fun-filled learning.</Typography>
                                <Stack flexDirection="row">
                                    <Button onClick={() => window.open("https://learn.mougli.school", "_blank")} color="primary" size="large" variant="contained" sx={{ mr: 2 }}>Start Learning</Button>
                                    <Button onClick={() => window.open("https://www.youtube.com/watch?v=dnh0x7cFR8c&ab_channel=MougliSchool", "_blank")} color="secondary" size="large" variant="outlined">Watch video</Button>
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
                                <Typography variant="h3">Free education <span>to the world</span></Typography>
                                <Typography variant="subtitle1">Education is a fundamental right of every world citizen, irrespective of their cultural, social, and economic background.</Typography>
                            </div>

                        </Grid>

                    </Grid>

                </div>

                <div className={classes.container}>
                    <div className={classes.workContainer}>
                        {/* <Grid container>
                            <Grid item lg={6}> */}
                        <Typography variant="h3"><span>How</span> free education <span>works?</span></Typography>
                        <Typography variant="subtitle1">Education reaches even the most remote villages on the planet.</Typography>
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
                                <img src="images/work.png" />
                            </Grid>
                        </Grid> */}
                    </div>

                    <Grid container spacing={2}>
                        <Grid item lg={4} md={4} sm={12} xs={12}>
                            <div className={classes.card}>
                                <div className={classes.cardIcon}>
                                    <img src="/images/icons/content.png" />
                                </div>
                                <Typography variant="h6">Content provider</Typography>
                                <Typography variant="subtitle2">Reputed Schools and Institutions across the globe can share their high-quality academic content with the rest of the world, allowing the students on our platform to benefit.<br /><br /> E.g. French-speaking schools in France or Canada open up their academic content to be accessible to the community.</Typography>
                            </div>
                        </Grid>
                        <Grid item lg={4} md={4} sm={12} xs={12}>
                            <div className={classes.card}>
                                <div className={classes.cardIcon}>
                                    <img src="/images/icons/educator.png" />
                                </div>
                                <Typography variant="h6">Educator</Typography>
                                <Typography variant="subtitle2">Utilizing the freely available high-quality content offered by content providers, educators will be able to educate the students. <br /><br />E.g. The French-speaking educators in the locality, local schools, or even volunteers sitting across the globe will be able to teach French-speaking students using our platform.</Typography>
                            </div>
                        </Grid>
                        <Grid item lg={4} md={4} sm={12} xs={12}>
                            <div className={classes.card}>
                                <div className={classes.cardIcon}>
                                    <img src="/images/icons/student.png" />
                                </div>
                                <Typography variant="h6">Students</Typography>
                                <Typography variant="subtitle2">With access to a laptop/ tablet, just one-click away from receiving the world's best education, being imparted by passionate educators who are the pioneers in their field.<br /><br />E.g., The French-speaking students in the most remote villages on the planet will receive education from the most passionate educators with high-quality content.</Typography>
                            </div>
                        </Grid>
                    </Grid>
                </div>

                <div className={classes.container}>

                    <div className={classes.uspContainer}>
                        <Grid container>

                            <Grid item lg={7} md={7} sm={7} className={classes.uspContent}>
                                <div className={classes.innerUspContent}>
                                    <Typography variant="h3" className={classes.uspTitle}><span>Our eLearning</span> USPs</Typography>
                                    <Typography variant="subtitle1" className={classes.educationSubTitle}>An educational dashboard integrating different platforms </Typography>
                                    <ul>
                                        <li>
                                            <Typography variant="subtitle1">Intuitive, K12 friendly UI</Typography>
                                        </li>
                                        <li>
                                            <Typography variant="subtitle1">One-page, one-click action </Typography>
                                        </li>
                                        <li>
                                            <Typography variant="subtitle1">Structured and categorized</Typography>
                                        </li>
                                        <li>
                                            <Typography variant="subtitle1">Children color Psychology</Typography>
                                        </li>
                                        <li>
                                            <Typography variant="subtitle1">Access to assignments while in Conference or Whiteboard</Typography>
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
                                    <Typography variant="h3" ><span>Integration</span></Typography>
                                    <Typography variant="subtitle1" >Our eLearning platform can swap and/or integrate the content of other apps. </Typography>
                                </div>
                            </Grid>
                            <Grid item lg={8}>
                                <Grid container >
                                    <Grid item lg={3} md={3} sm={3} sx={{ width: '100%', }}>
                                        <div className={classes.compBox}>
                                            <img src="/images/icons/gc.png" />
                                            <Typography variant="subtitle1">Google Classroom</Typography>
                                        </div>
                                    </Grid>
                                    <Grid item lg={3} md={3} sm={3} sx={{ width: '100%' }}>
                                        <div className={classes.compBox}>
                                            <img src="/images/icons/mt.png" />
                                            <Typography variant="subtitle1">MIcrosoft Teams</Typography>

                                        </div>
                                    </Grid>
                                    <Grid item lg={3} md={3} sm={3} sx={{ width: '100%' }}>
                                        <div className={classes.compBox}>
                                            <img src="/images/icons/conf.png" />
                                            <Typography variant="subtitle1">Conference tools <br />(Skype/ Zoom etc.)</Typography>
                                        </div>

                                    </Grid>
                                    <Grid item lg={3} md={3} sm={3} sx={{ width: '100%' }}>
                                        <div className={classes.compBox}>
                                            <img src="/images/icons/email.png" />
                                            <Typography variant="subtitle1">Content Exchange tools <br />(emails/ WhatsApp/ Telegram)</Typography>
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
                            <Grid item lg={7} md={7} sm={7} className={classes.uspContent}>
                                <div className={classes.innerTargetContent}>
                                    <Typography variant="h3">Target group</Typography>
                                    <Typography variant="subtitle1" className={classes.educationSubTitle}>Users who can benefit and take advantage of our eLearning platform</Typography>
                                    <ul>
                                        <li>
                                            <Typography variant="subtitle1">Academic schools, Language schools, Corporate institutions</Typography>
                                        </li>
                                        <li>
                                            <Typography variant="subtitle1">Private tutors, be it academic or extra-curricular like music</Typography>
                                        </li>
                                        <li>
                                            <Typography variant="subtitle1">Students</Typography>
                                        </li>
                                    </ul>
                                </div>
                            </Grid>

                        </Grid>
                    </div>
                </div>
                <div className={classes.container}>
                    <div className={classes.commuContainer}>
                        <div className={classes.commuContent}>
                            <Typography variant="h3" >Community</Typography>
                            <Typography variant="subtitle1" >We strongly believe in the concept of community, so we decided to create an open-source application. The goal was to give the community free access to the application while encouraging them to contribute to its future development and enhance the components serving different cultural aspects, which we alone can't achieve.</Typography>
                            <Typography variant="subtitle1" >We invite you to join our community of contributors, users, and promoters of the application. Join and become part of our vision and mission of providing free education to the world and taking constructive steps towards our collective mission.</Typography>
                            <Button variant="contained" size="large" color="black">Join our community</Button>
                        </div>
                        <div className={classes.commuImgContainer}>
                            <img src="/images/child3.png" />
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
                                    <Typography variant="h6" className={classes.packageName}>Free for ever</Typography>
                                    {/* <Typography variant="h3" >$0</Typography>
                                    <Typography variant="subtitle1" className={classes.perMonth}>Per month</Typography> */}
                                    <ul>
                                        <li>
                                            <Typography variant="subtitle2">Self-hosting by institutions</Typography>
                                        </li>
                                        <li>
                                            <Typography variant="subtitle2">Underprivileged state-run schools</Typography>
                                        </li>
                                        <li>
                                            <Typography variant="subtitle2">Volunteering educators, giving free education to the needy will get a free-hosted instance</Typography>
                                        </li>
                                        <li>
                                            <Typography variant="subtitle2">Private tutor with up to 5 students</Typography>
                                        </li>
                                        <li>
                                            <Typography variant="subtitle2">Customization</Typography>
                                        </li>
                                    </ul>
                                    <Button fullWidth variant="contained" color="black" size="large" onClick={() => { window.location.href = "mailto:contact@mougli.school" }}>Start Learning</Button>
                                </div>
                            </Grid>
                            <Grid item lg={3} md={6} sm={6} sx={{ width: '100%' }}>
                                <div className={classes.priceBox}>
                                    <Typography variant="h6" className={classes.packageName}>Private tutors</Typography>
                                    {/* <Typography variant="h3" >$0</Typography>
                                    <Typography variant="subtitle1" className={classes.perMonth}>Per month</Typography> */}
                                    <ul>
                                        <li>
                                            <Typography variant="subtitle2">Individual tutors</Typography>
                                        </li>
                                        <li>
                                            <Typography variant="subtitle2">User size up to 25</Typography>
                                        </li>
                                        <li>
                                            <Typography variant="subtitle2">Saas</Typography>
                                        </li>
                                        <li>
                                            <Typography variant="subtitle2">Customization</Typography>
                                        </li>
                                    </ul>
                                    <Button fullWidth variant="contained" color="black" size="large" onClick={() => { window.location.href = "mailto:contact@mougli.school" }}>Contact for Pricing</Button>
                                </div>
                            </Grid>
                            <Grid item lg={3} md={6} sm={6} sx={{ width: '100%' }}>
                                <div className={clsx(classes.priceBox, classes.recommeded)}>
                                    <div className={classes.recommededChip}><Typography variant="subtitle1">Recommended</Typography></div>
                                    <Typography variant="h6" className={classes.packageName}>Mid-sized institutions</Typography>
                                    {/* <Typography variant="h3" >$0</Typography>
                                    <Typography variant="subtitle1" className={classes.perMonth}>Per month</Typography> */}
                                    <ul>
                                        <li>
                                            <Typography variant="subtitle2">Academic schools, Language schools, Corporate institutions</Typography>
                                        </li>
                                        <li>
                                            <Typography variant="subtitle2">User size up to 500</Typography>
                                        </li>
                                        <li>
                                            <Typography variant="subtitle2">Select between self-hosting or Saas</Typography>
                                        </li>
                                        <li>
                                            <Typography variant="subtitle2">Corporate branding</Typography>
                                        </li>
                                        <li>
                                            <Typography variant="subtitle2">Priority customization</Typography>
                                        </li>
                                        <li>
                                            <Typography variant="subtitle2">10% of your payment will be used to sponsor free education</Typography>
                                        </li>
                                    </ul>
                                    <Button fullWidth variant="contained" color="black" size="large" onClick={() => { window.location.href = "mailto:contact@mougli.school" }}>Contact for Pricing</Button>
                                </div>
                            </Grid>
                            <Grid item lg={3} md={6} sm={6} sx={{ width: '100%' }}>
                                <div className={classes.priceBox}>
                                    <Typography variant="h6" className={classes.packageName}>Big Institutions</Typography>
                                    {/* <Typography variant="h3" >$0</Typography>
                                    <Typography variant="subtitle1" className={classes.perMonth}>Per month</Typography> */}
                                    <ul>
                                        <li>
                                            <Typography variant="subtitle2">Academic schools, Language schools, Corporate institutions</Typography>
                                        </li>
                                        <li>
                                            <Typography variant="subtitle2">User size 500+</Typography>
                                        </li>
                                        <li>
                                            <Typography variant="subtitle2">Select between self-hosting or Saas</Typography>
                                        </li>
                                        <li>
                                            <Typography variant="subtitle2">Corporate branding </Typography>
                                        </li>
                                        <li>
                                            <Typography variant="subtitle2">High priority customization</Typography>
                                        </li>
                                        <li>
                                            <Typography variant="subtitle2">10% of your payment will be used to sponsor free education</Typography>
                                        </li>
                                    </ul>
                                    <Button fullWidth variant="contained" color="black" size="large" onClick={() => { window.location.href = "mailto:contact@mougli.school" }}>Contact for Pricing</Button>
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
            '& h6:last-child': {
                color: "white",
            },
            '& $cardIcon': {
                background: '#F4D669',
            }
        },
        '& h6:last-child': {
            color: theme.palette.gray[1200],
            marginTop: theme.spacing(2),
        },
        '&:last-child': {
            border: 'none'
        }
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
        justifyContent: 'center',
        alignItems: 'center'
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
        borderRadius: theme.spacing(2),
        backgroundImage: 'url(background/community.png)',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
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
            paddingBottom: theme.spacing(3)
        },
    },
}));

export default Home;
