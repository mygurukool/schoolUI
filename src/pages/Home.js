import React from "react";
import { makeStyles } from "@mui/styles";
import HomeNavbar from "../components/HomeNavbar";
import { Button, Grid, Typography, Stack, Divider, Link } from "@mui/material";
import clsx from "clsx";
import FacebookIcon from '@mui/icons-material/Facebook';
import EmailIcon from '@mui/icons-material/Email';
import InstagramIcon from '@mui/icons-material/Instagram';

const Home = (props) => {
    const classes = useStyles();
    return (
        <div>
            {/* <div className={classes.bg}>
                <img src="/images/icons/plane.png" className={classes.plane} />
                <img src="/images/icons/paper.png" className={classes.paper} />
            </div> */}
            <HomeNavbar />
            <div className={classes.root}>
                <div className={classes.bg}>
                    <img src="/images/icons/plane.png" className={classes.plane} />
                    <img src="/images/icons/paper.png" className={classes.paper} />
                    <div className={classes.topContainer}>
                        <Typography variant="h2" className={classes.topTitle}>Learning is joy. <br />Teaching is a pleasure.</Typography>
                        <Typography variant="body2" className={classes.topSubTitle}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Dui pretium cursus fermentum magna felis id.</Typography>
                        <Button onClick={() => window.open("https://learn.mougli.school", "_blank")} className={classes.startLearning} size="large" variant="contained">Start Learning</Button>
                    </div>
                </div>
                <div className={classes.container}>
                    <Grid container spacing={5} >
                        <Grid item lg={5}>
                            <div className={classes.educationImgContainer}>
                                <img src="/images/childgraphic.png" />
                            </div>
                        </Grid>
                        <Grid item lg={7}>
                            <div className={classes.educationContent}>
                                <Typography variant="h3">Free education to the world</Typography>

                                <Typography variant="subtitle1">Education is a fundamental right of every world citizen,  irrespective of the country they are resident of, their country’s economical condition, their country's political ranking in the world</Typography>
                            </div>

                        </Grid>

                    </Grid>

                </div>

                <div className={classes.container}>
                    <div className={classes.workContainer}>
                        {/* <Grid container>
                            <Grid item lg={6}> */}
                        <Typography variant="h3">How does it work</Typography>
                        <ul>
                            <li>
                                <Typography variant="subtitle1">Reputed schools across the world can share their content with the world</Typography>
                            </li>
                            <li>
                                <Typography variant="subtitle1">Volunteers around the world can use that content to teach local kids/ remote</Typography>
                            </li>
                        </ul>
                        {/* </Grid>
                            <Grid item lg={6} className={classes.workImgContainer}>
                                <img src="images/work.png" />
                            </Grid>
                        </Grid> */}
                    </div>

                    <Grid container spacing={2}>
                        <Grid item lg={4}>
                            <div className={classes.card}>
                                <div className={classes.cardIcon}>
                                    <img src="/images/icons/content.png" />
                                </div>
                                <Typography variant="h6">Content provider</Typography>
                                <Typography variant="subtitle2">French-speaking school(s) from France, Canada can opt to open up their academic content</Typography>
                            </div>
                        </Grid>
                        <Grid item lg={4}>
                            <div className={classes.card}>
                                <div className={classes.cardIcon}>
                                    <img src="/images/icons/educator.png" />
                                </div>
                                <Typography variant="h6">Educator</Typography>
                                <Typography variant="subtitle2">Volunteers in African nations/ french speaking citizens across the world can use Mougli.school to teach African students/ students from french-speaking societies across the world</Typography>
                            </div>
                        </Grid>
                        <Grid item lg={4}>
                            <div className={classes.card}>
                                <div className={classes.cardIcon}>
                                    <img src="/images/icons/student.png" />
                                </div>
                                <Typography variant="h6">Students</Typography>
                                <Typography variant="subtitle2">With access to a laptop/ tablet world's best quality of education is just one click away, tutored by educators with a passion</Typography>
                            </div>
                        </Grid>
                    </Grid>
                </div>

                <div className={classes.container}>

                    <div className={classes.uspContainer}>
                        <Grid container>

                            <Grid item lg={7} className={classes.uspContent}>
                                <div className={classes.innerUspContent}>
                                    <Typography variant="h3" className={classes.uspTitle}>Mougli School USP</Typography>
                                    <Typography variant="subtitle1" className={classes.educationSubTitle}>How Mougli school is better than its competitors </Typography>
                                    <ul>
                                        <li>
                                            <Typography variant="subtitle1">Intuitive Kid friendly GUI</Typography>
                                        </li>
                                        <li>
                                            <Typography variant="subtitle1">Problems kids face with today's digital tools, its usage complications, distraction, etc</Typography>
                                        </li>
                                        <li>
                                            <Typography variant="subtitle1">GUI grows with the kid</Typography>
                                        </li>
                                    </ul>
                                </div>
                            </Grid>
                            <Grid item lg={5}>
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
                        <Grid container className={classes.compGrid}>
                            <Grid item lg={4}>
                                <div className={classes.compContent}>
                                    <Typography variant="h3" >Competitors</Typography>
                                    <Typography variant="subtitle1" >Mougli school app will replace</Typography>
                                </div>
                            </Grid>
                            <Grid item lg={8}>
                                <Stack flexDirection="row" justifyContent="space-between" alignItems="flex-start">
                                    <Stack flexDirection="column" justifyContent="space-between" alignItems="center" className={classes.compBox}>
                                        <img src="/images/icons/gc.png" />
                                        <Typography variant="subtitle1">Google Classroom</Typography>
                                    </Stack>
                                    <Stack flexDirection="column" justifyContent="space-between" alignItems="center" className={classes.compBox}>
                                        <img src="/images/icons/mt.png" />
                                        <Typography variant="subtitle1">MS Teams</Typography>
                                    </Stack>
                                    <Stack flexDirection="column" justifyContent="space-between" alignItems="center" className={classes.compBox}>
                                        <img src="/images/icons/conf.png" />
                                        <Typography variant="subtitle1">Conference tools <br />(Skype/ Zoom etc.)</Typography>
                                    </Stack>
                                    <Stack flexDirection="column" justifyContent="space-between" alignItems="center" className={classes.compBox}>
                                        <img src="/images/icons/email.png" />
                                        <Typography variant="subtitle1">Content Exchange tools <br />(emails/ WhatsApp/ Telegram)</Typography>
                                    </Stack>
                                </Stack>
                            </Grid>
                        </Grid>
                    </div>
                </div>
                <div className={classes.container}>

                    <div className={classes.uspContainer}>
                        <Grid container>
                            <Grid item lg={5}>
                                <div className={classes.imgContainer}>
                                    <div className={classes.imgBox}>
                                        <img src="/images/childgraphic3.png" />
                                    </div>
                                </div>
                            </Grid>
                            <Grid item lg={7} className={classes.uspContent}>
                                <div className={classes.innerTargetContent}>
                                    <Typography variant="h3">Target group</Typography>
                                    <Typography variant="subtitle1" className={classes.educationSubTitle}>Mougli school app potential users</Typography>
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
                            <Typography variant="subtitle1" >We believe in Community, built the application as an Open-source project, to let the community use the application for free and also encourage the community to contribute to its development in the future.</Typography>
                            <Typography variant="subtitle1" >We invite you to join our community of contributors, users, and promoters of the app, its vision of free education for the world.</Typography>
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
                            <Grid item lg={3} >
                                <div className={classes.priceBox}>
                                    <Typography variant="h6" className={classes.packageName}>Forever Free</Typography>
                                    <Typography variant="h3" >$0</Typography>
                                    <Typography variant="subtitle1" className={classes.perMonth}>Per month</Typography>
                                    <ul>
                                        <li>
                                            <Typography variant="subtitle1">Self-hosting by institutions (github link here)</Typography>
                                        </li>
                                        <li>
                                            <Typography variant="subtitle1">Underprivileged state-run schools</Typography>
                                        </li>
                                        <li>
                                            <Typography variant="subtitle1">Volunteering educators, giving free education to the needy will get a free-hosted instance</Typography>
                                        </li>
                                        <li>
                                            <Typography variant="subtitle1">Individual tutor up to  2 students</Typography>
                                        </li>
                                    </ul>
                                    <Button fullWidth variant="contained" color="black" size="large">Request demo</Button>
                                </div>
                            </Grid>
                            <Grid item lg={3}>
                                <div className={classes.priceBox}>
                                    <Typography variant="h6" className={classes.packageName}>Private tutors</Typography>
                                    <Typography variant="h3" >$0</Typography>
                                    <Typography variant="subtitle1" className={classes.perMonth}>Per month</Typography>
                                    <ul>
                                        <li>
                                            <Typography variant="subtitle1">Individual tutors</Typography>
                                        </li>
                                        <li>
                                            <Typography variant="subtitle1">User size up to 25</Typography>
                                        </li>
                                        <li>
                                            <Typography variant="subtitle1">Saas</Typography>
                                        </li>
                                        <li>
                                            <Typography variant="subtitle1">Contact for pricing </Typography>
                                        </li>
                                    </ul>
                                    <Button fullWidth variant="contained" color="black" size="large">Request demo</Button>
                                </div>
                            </Grid>
                            <Grid item lg={3}>
                                <div className={clsx(classes.priceBox, classes.recommeded)}>
                                    <Typography variant="h6" className={classes.packageName}>Middle-size Institutions <br /> (Recommended)</Typography>
                                    <Typography variant="h3" >$0</Typography>
                                    <Typography variant="subtitle1" className={classes.perMonth}>Per month</Typography>
                                    <ul>
                                        <li>
                                            <Typography variant="subtitle1">Academic schools, Language schools, Corporate institutions</Typography>
                                        </li>
                                        <li>
                                            <Typography variant="subtitle1">User size up to 500</Typography>
                                        </li>
                                        <li>
                                            <Typography variant="subtitle1">Select between self-hosting or Saas</Typography>
                                        </li>
                                        <li>
                                            <Typography variant="subtitle1">Contact for pricing </Typography>
                                        </li>
                                    </ul>
                                    <Button fullWidth variant="contained" color="black" size="large">Request demo</Button>
                                </div>
                            </Grid>
                            <Grid item lg={3}>
                                <div className={classes.priceBox}>
                                    <Typography variant="h6" className={classes.packageName}>Big Institutions</Typography>
                                    <Typography variant="h3" >$0</Typography>
                                    <Typography variant="subtitle1" className={classes.perMonth}>Per month</Typography>
                                    <ul>
                                        <li>
                                            <Typography variant="subtitle1">Academic schools, Language schools, Corporate institutions</Typography>
                                        </li>
                                        <li>
                                            <Typography variant="subtitle1">User size 500+</Typography>
                                        </li>
                                        <li>
                                            <Typography variant="subtitle1">Select between self-hosting or Saas</Typography>
                                        </li>
                                        <li>
                                            <Typography variant="subtitle1">Contact for pricing </Typography>
                                        </li>
                                    </ul>
                                    <Button fullWidth variant="contained" color="black" size="large">Request demo</Button>
                                </div>
                            </Grid>
                        </Grid>
                    </div>
                </div>

                <div className={classes.footerContainer}>
                    <Grid container>
                        <Grid item lg={4}>
                            <div className={classes.logoContainer}>

                                <img src="images/logo.png" />
                                <Stack flexDirection="row" alignItems="center" className={classes.socialIcons}>
                                    <div className={classes.scInnerIcon}>
                                        <FacebookIcon />
                                    </div>
                                    <div className={classes.scInnerIcon}>
                                        <EmailIcon />
                                    </div>
                                    <div className={classes.scInnerIcon}>
                                        <InstagramIcon />
                                    </div>
                                </Stack>
                            </div>

                        </Grid>
                        <Grid item lg={4}>
                            <div className={classes.navigateContainer}>
                                <Typography variant="subtitle1">Discover</Typography>
                                <ul>
                                    <li>
                                        <Typography>Home</Typography>
                                    </li>
                                    <li>
                                        <Typography>About</Typography>
                                    </li>
                                    <li>
                                        <Typography>Contact</Typography>
                                    </li>
                                </ul>
                            </div>

                        </Grid>
                        <Grid item lg={4}>
                            <div className={classes.navigateContainer}>
                                <Typography variant="subtitle1">Sitemap</Typography>
                                <ul>
                                    <li>
                                        <Typography>Home</Typography>
                                    </li>
                                    <li>
                                        <Typography>About</Typography>
                                    </li>
                                    <li>
                                        <Typography>Contact</Typography>
                                    </li>
                                </ul>
                            </div>

                        </Grid>
                    </Grid>

                    <Stack flexDirection="row" justifyContent="space-between" alignItems="center" className={classes.bottomFooter}>
                        <Grid container>
                            <Grid item lg={9}>
                                <Typography>copyright 2022</Typography>
                            </Grid>
                            <Grid item lg={3}>
                                <Stack flexDirection="row" justifyContent="space-between" alignItems="center" >
                                    <Typography>Privacy policy</Typography>
                                    <Typography>Terms & condition</Typography>
                                </Stack>
                            </Grid>
                        </Grid>
                    </Stack>
                </div>
            </div>
        </div>

    );
};


const useStyles = makeStyles((theme) => ({
    root: {
        // padding: theme.spacing(2, 10),
        background: "#F4F4F1"
    },
    bg: {
        width: '100%',
        height: '100vh',
        // position: 'absolute',
        background: "#F4F4F1",
        backgroundImage: 'url(background/main.png)',
        backgroundSize: "100%",
        zIndex: -1
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
        padding: theme.spacing(15, 20, 0, 20),
        textAlign: 'center',
        height: '100vh',
    },
    topTitle: {
        textAlign: 'center',
        fontWeight: 400,
    },
    topTitleSec: {
        color: theme.palette.secondary.main,
    },
    topSubTitle: {
        textAlign: 'center',
        padding: theme.spacing(3, 0),
    },
    container: {
        // margin: theme.spacing(15, 0),
        padding: theme.spacing(10),
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
            color: '#FF5B35'
        },
        '& h6': {
            color: theme.palette.gray[1200]
        }
    },
    educationImgContainer: {
        position: "relative",
        '& img': {
            width: 450,
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
        padding: theme.spacing(8),
        margin: theme.spacing(1),
        // borderRight: `2px solid #DDC8A2`,
        borderRadius: theme.spacing(2),
        background: '#F1F0E6',
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
        borderRadius: theme.spacing(50),
        padding: theme.spacing(2.2),
        background: '#1CB0F1',
        marginBottom: theme.spacing(3),
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
        '& img': {
            width: '100%',
            height: 500,
            objectFit: 'cover',

        }
    },
    uspContent: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    innerUspContent: {
        paddingRight: theme.spacing(12),
        '& h3': {
            color: "#1CB0F1"
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
        paddingLeft: theme.spacing(12),
        '& h3': {
            color: "#1CB0F1"
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
        padding: theme.spacing(10, 10),
        // borderTop: '2px solid #1626BB',
        // borderBottom: '2px solid #1626BB', 
        borderRadius: theme.spacing(2),
        backgroundImage: 'url(background/compititor.png)',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
    },
    compContent: {
        '& h3': {
            paddingBottom: theme.spacing(2)
        },
        '& h6': {
            color: '#515151',
            paddingBottom: theme.spacing(3)
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
        '& img': {
            marginBottom: theme.spacing(2)
        },
        '& h6': {
            textAlign: 'center'
        }
    },
    workContainer: {
        marginBottom: theme.spacing(3),
        '& h3': {
            color: '#4EC217'
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
        padding: theme.spacing(3.5),
        borderRadius: theme.spacing(2),
        background: '#F1F0E6',
        minHeight: '100%',
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
        paddingBottom: theme.spacing(3),
    },
    recommeded: {
        background: '#FF5B35',
        color: '#EBEBEB',
        transform: "translateY(-30px)",
        '& h3': {
            color: '#fff',
        },
        '& $perMonth': {
            color: '#D7D7D7',
        },
        boxShadow: '10px 10px 0px #F4D669',
    },
    perMonth: {
        color: theme.palette.gray[1200],
    },
    priceContent: {
        marginBottom: theme.spacing(5),
        '& h3': {
            color: '#FF5B35'
        },
        '& h6': {
            paddingTop: theme.spacing(3),
            color: theme.palette.gray[1200]
        }
    },
    commuContainer: {
        padding: theme.spacing(10),
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
            bottom: -90,
        }
    },
    commuContent: {
        width: '70%',
        '& h3': {
            paddingBottom: theme.spacing(2)
        },
        '& h6': {
            color: '#515151',
            paddingBottom: theme.spacing(3)
        },
    },
    footerContainer: {
        padding: theme.spacing(5),
        background: '#F1F0E6',
        minHeight: 300,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: "space-between",
    },
    logoContainer: {
        '& img': {
            width: 120,
        },
    },
    navigateContainer: {
        '& ul': {
            listStyleType: 'none',
            '& li': {
                padding: theme.spacing(1, 0)
            }
        }
    },

    scInnerIcon: {
        width: 40,
        height: 40,
        border: '1px solid #000',
        padding: theme.spacing(1),
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: theme.spacing(20),
        margin: theme.spacing(2, 2, 2, 0)
    },
    bottomFooter: {
        paddingTop: theme.spacing(2),
        borderTop: `1px solid ${theme.palette.gray[1100]}`,
    }
}));

export default Home;
