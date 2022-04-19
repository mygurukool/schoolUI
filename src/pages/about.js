import React from "react";
import { makeStyles } from "@mui/styles";
import { Button, Grid, Typography, Stack, Divider, Link, IconButton } from "@mui/material";
import clsx from "clsx";
import { Twitter as TwitterIcon, LinkedIn as LinkedInIcon } from "@mui/icons-material";
import useResponsive from "../hooks/useResponsive";

const About = (props) => {
    const classes = useStyles();
    const { isMobile, isDesktop, isTablet } = useResponsive()
    return (
        <div className={classes.root}>
            <div className={clsx(classes.aboutContainer, classes.container)}>
                <img src="/background/about.png" className={classes.bgImg} />
                <Typography variant="h3">About <span>Us</span> </Typography>
                <Typography variant="subtitle1">Mougli School at its core believes in ‘<b>Learning is joy, Teaching is a pleasure.</b>’. Education is the foundation for a happier and healthier society and a basic right to which every individual is entitled.</Typography>
                <Typography variant="subtitle1">At Mougli school we aim to provide you with a platform that promises to make studying a fun-filled activity with a buddy who speaks your language. This venture was started by Founder Naveen Bandhu in the year 2020, with <span className={classes.spanText}>the vision</span> to provide access to free education across the world. His goal is to make education an absolute necessity instead of a need, which is one of the primary reasons behind the start of Mougli School. <span className={classes.rightToEdu}>Right to Education!</span></Typography>
                <Typography variant="subtitle1">Mougli School <span className={classes.spanText}>mission</span> is an open-source project, free community license for self-installation, and also encourages the community to contribute to its development in the future.</Typography>
                <div className={classes.centerSection}>

                    <Typography variant="subtitle1" className={classes.leftText}>The seed of this idea was sown when he saw his child struggle while using corporate communication tools as a schooling platform during the pandemic. The existing schooling platforms lack user-friendliness and have their own usage complications. This has led to de-motivation in kids about schooling and in turn, has affected their performance in examinations. </Typography>
                    <div className={classes.circleContainer}>
                        <img src="/images/about/circle.svg" className={classes.circle} />
                        <Typography variant="subtitle1">Kashvi Bandhu</Typography>
                    </div>
                    <Typography variant="subtitle1" className={classes.rightText}>All these psychological impacts left on children by the corporate tools gave rise to the becoming of the Mougli School. <br />Why tear your hair out using these complicated corporate tools for your child’s learning, when we can make it way more simpler and fun for you here at Mougli?</Typography>
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
                            <Typography variant="h6">The Boss, problem owner</Typography>
                            <Typography variant="body2">Class 5, when Covid’19 started</Typography>
                        </div>
                    </Grid>
                    <Grid item lg={6} md={6} sm={6} xs={6}>
                        <div className={classes.photoBlockContainer}>
                            <div className={classes.imgBlock}>
                                <img src="/images/about/naveen.png" />
                                <Typography variant="subtitle1">Naveen Bandhu</Typography>
                            </div>
                            <Typography variant="h6">Just another father</Typography>
                            <Typography variant="body2">The only aim is to see his kid smile</Typography>
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
                            <Typography variant="h6">First believer</Typography>
                            <Typography variant="body2">Sleeved up, joined the mission!</Typography>
                            <Stack flexDirection="row">
                                <IconButton color="primary"><TwitterIcon /></IconButton>
                                <IconButton color="primary"><LinkedInIcon /></IconButton>
                            </Stack>
                        </div>
                    </Grid>
                </Grid>
            </div>
            <div className={clsx(classes.whyContainer, classes.container)}>
                <Typography variant="h3"><span>Why</span> Choose <span>Us</span></Typography>
                <Grid container spacing={5}>
                    <Grid item lg={6} md={6} sm={12} xs={12}>
                        <div className={classes.innerContainer}>
                            <div className={classes.imgContainer} style={{ background: '#4EC217' }}>
                                <img src="/images/about/ui.png" />
                            </div>
                            <Typography variant="h5">Child-Friendly User Interface</Typography>
                            <Typography variant="subtitle1">At Mougli we have found an answer to your kid’s difficulties and monotonies while studying: an intuitive and interactive user interface that grows with your child. The User Interface keeps on changing in terms of its color, look, and feel as per the age of the child and level of education. We have also introduced a one-click action, structured display that does not steal the joy of learning.</Typography>
                        </div>
                    </Grid>
                    <Grid item lg={6} md={6} sm={12} xs={12}>
                        <div className={classes.innerContainer}>
                            <div className={classes.imgContainer} style={{ background: '#1CB0F1' }}>
                                <img src="/images/about/integration.png" />
                            </div>
                            <Typography variant="h5">Integration</Typography>
                            <Typography variant="subtitle1">There is no innovation without integration.  We at Mougli have tried to add a cherry on the cake by providing you with an improved and never before seen user interface and advanced structure, which will surely make your experience seamless. Our tool gives you the flexibility to access your data from Microsoft Teams and Google Classroom and represent them with a user interface that is surely going to keep your children hooked.</Typography>
                        </div>
                    </Grid>
                    <Grid item lg={6} md={6} sm={12} xs={12}>
                        <div className={classes.innerContainer}>
                            <div className={classes.imgContainer} style={{ background: '#ff9e42' }}>
                                <img src="/images/about/education.png" />
                            </div>
                            <Typography variant="h5">Gurukul System of Education</Typography>
                            <Typography variant="subtitle1">We are highly influenced by the Gurukul System of Education and have tried to take inspiration and create something along similar lines. Gurukul System identifies and hones the unique strengths of every individual student. And Mougli School is a dashboard where your child’s interests and uniqueness will find a home to nourish and excel. We try to promote an education system where academics and extra-curricular activities are at par.</Typography>
                        </div>
                    </Grid>
                    <Grid item lg={6} md={6} sm={12} xs={12}>
                        <div className={classes.innerContainer}>
                            <div className={classes.imgContainer} style={{ background: '#ecef21' }}>
                                <img src="/images/about/flexible.png" />
                            </div>
                            <Typography variant="h5">Flexibility</Typography>
                            <Typography variant="subtitle1">No one understands the importance of customizing better than us. Hence you can trust us with your needs and preferences, we will address and implement them with customization specially meant for your institution. We take pride in providing a unique service that no other platform in the market can boast of. No institution is small for us to request customization, we believe in building relations, not empires.</Typography>
                        </div>
                    </Grid>
                </Grid>
            </div>
            <div className={clsx(classes.backContainer, classes.container)}>
                <Typography variant="h3">Giving Back <span>/ Free Education To The World</span></Typography>
                <Typography variant="subtitle1">One of the primary mottos behind the inception of Mougli School was to facilitate free education to the world.</Typography>
                <ul>
                    <li>
                        <Typography variant="subtitle1">Right to Education for every citizen of the world is what we seek to promote through our application, Mougli School. We aim to reach the most remote of the villages and the underprivileged, who have been denied their right to education.</Typography>
                    </li>
                    <li>
                        <Typography variant="subtitle1">Giving back to society is where our principle lies. We want to make a statement through our platform and extend our support to as many people as we can in their journey of learning.</Typography>
                    </li>
                    <li>
                        <Typography variant="subtitle1">Making education more accessible to all has been the mantra at Mougli School. You can also do your bit by purchasing a licensed product on our platform and becoming a sponsor!</Typography>
                    </li>
                    <li>
                        <Typography variant="subtitle1">Sponsoring free education for the needy gets easier with Mougli. When you buy a licensed product, Mougli school will spend a % of the license fee you pay for the purchase on providing and promoting free education. Voila, this way you get to make a difference in someone's life.</Typography>
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
