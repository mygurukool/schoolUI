import React, { useState } from "react";
import { makeStyles } from "@mui/styles";
import { ButtonBase, Grid, Typography } from "@mui/material";
import { Twitter as TwitterIcon, YouTube as YouTubeIcon, } from "@mui/icons-material";
import FormCreator from "../components/Form/FormCreator";
import { useDispatch, useSelector } from "react-redux";
import { pricingSelection, subjectSelection, submitContact } from "../redux/action/utilActions";
import DiscordIcon from "../assets/icons/Discord";
import SendIcon from '@mui/icons-material/Send';
import useLanguages from "../hooks/useLanguage";

const Contact = (props) => {
    const classes = useStyles();
    const [subjectSelect, setSubjectSelect] = useState()
    const dispatch = useDispatch()
    const translate = useLanguages()
    const subjects = [
        {
            label: "General",
            value: 1
        },
        {
            label: "Nominate School for free education",
            value: 2
        },
        {
            label: "Pricing",
            value: 3
        },
        {
            label: "Join the community",
            value: 4
        },
    ]

    const nominateFields = [
        {
            type: "text",
            name: "schoolName",
            label: translate("SCHOOL_NAME"),
            placeholder: translate("SCHOOL_NAME_PLACEHOLDER"),
            required: true,
            size: 12,
        },
        {
            type: "text",
            name: "contactPerson",
            label: translate("CONTACT_PERSON"),
            placeholder: translate("CONTACT_PERSON_PLACEHOLDER"),
            required: true,
            size: 6,
        },
        {
            type: "email",
            name: "schoolEmail",
            label: translate("SCHOOL_EMAIL"),
            placeholder: translate("SCHOOL_EMAIL_PLACEHOLDER"),
            required: true,
            size: 6,
        },
        {
            type: "mobile",
            name: "schoolMobile",
            label: translate("SCHOOL_MOBILE"),
            placeholder: translate("SCHOOL_MOBILE_PLACEHOLDER"),
            required: true,
            size: 6,
        },
        {
            type: "url",
            name: "schoolWebsite",
            label: translate("SCHOOL_WEBSITE"),
            placeholder: translate("SCHOOL_WEBSITE_PLACEHOLDER"),
            required: true,
            size: 6,
        },

        {
            type: "textarea",
            name: "schoolAddress",
            label: translate("SCHOOL_ADDRESS"),
            placeholder: translate("SCHOOL_ADDRESS_PLACEHOLDER"),
            size: 12,
            rows: 2
        },
    ]

    const productTypes = [
        {
            label: "Free for ever",
        },
        {
            label: "Private tutors",
        },
        {
            label: "Mid-sized institutions",
        },
        {
            label: "Big Institutions",
        },
    ]

    const pricingFields = [
        {
            type: "select",
            name: "productType",
            label: translate("PRODUCT_TYPE"),
            options: productTypes,
            placeholder: translate("PRODUCT_TYPE"),
            optionLabelProp: 'label',
            optionValueProp: 'label',
            size: 12,
        },
        ...nominateFields
    ]

    const subjectFormData = [
        {
            type: "select",
            name: "subject",
            label: translate("SUBJECT"),
            options: subjects,
            placeholder: translate("SUBJECT"),
            optionLabelProp: 'label',
            optionValueProp: 'value',
            onSelect: (data) => { dispatch(pricingSelection()); dispatch(subjectSelection()); setSubjectSelect(data) },
            size: 12,
            required: true
        },
    ]

    const formData = [
        {
            type: "text",
            name: "name",
            label: translate("NAME"),
            placeholder: translate("NAME_PLACEHOLDER"),
            required: true,
            size: 6,
        },
        {
            type: "email",
            name: "email",
            label: translate("EMAIL_ADDRESS"),
            placeholder: translate("EMAIL_ADDRESS_PLACEHOLDER"),
            required: true,
            size: 6,
        },
        {
            type: "mobile",
            name: "mobile",
            label: translate("MOBILE_ADDRESS"),
            placeholder: translate("MOBILE_ADDRESS_PLACEHOLDER"),
            required: true,
            size: 6,
        },
        {
            type: "url",
            name: "website",
            label: translate("WEBSITE"),
            placeholder: translate("WEBSITE_PLACEHOLDER"),
            required: true,
            size: 6,
        },


        ...(subjectSelect === 2 ? [...nominateFields] : subjectSelect === 3 ? [...pricingFields] : []),

        {
            type: "textarea",
            name: "message",
            label: translate("MESSAGE"),
            placeholder: translate("MESSAGE"),
            size: 12,
            rows: 5
        },
    ];

    const pricing = useSelector(state => state.util.pricingSelection)
    const subSelection = useSelector(state => state.util.subjectSelection)
    const handleSubmit = async (data) => {
        dispatch(submitContact({
            ...data,
            subject: subjects.find(s => s.value === subjectSelect)?.label
        }))

    }
    return (
        <div className={classes.root}>
            <div className={classes.container}>
                <Grid container spacing={2}>
                    <Grid item lg={6} xs={12} sm={12} md={6}>
                        <div className={classes.socialContainer}>
                            <div className={classes.circle1}></div>
                            <div className={classes.circle2}></div>
                            <div className={classes.curveLines}></div>
                            <Typography variant="h3">{translate("LETS_GET_SOCIAL")}</Typography>
                            <Grid container spacing={2} className={classes.socialIconContainer}>
                                <Grid item lg={3} xs={4} md={4} sm={3}>
                                    <div className={classes.socialIcon} onClick={() => window.open("https://twitter.com/MougliSchool")}>
                                        <TwitterIcon />
                                    </div>
                                </Grid>
                                <Grid item lg={3} xs={4} md={4} sm={3}>
                                    <div className={classes.socialIcon} onClick={() => window.open("https://www.youtube.com/channel/UCu0h6ZJHEiej0EBYc4xlbXA")}>
                                        <YouTubeIcon />
                                    </div>
                                </Grid>
                                <Grid item lg={3} xs={4} md={4} sm={3}>
                                    <div className={classes.socialIcon} onClick={() => window.open("https://discord.gg/XsddTqdq4g")}>
                                        <DiscordIcon />
                                    </div>
                                </Grid>
                            </Grid>
                        </div>
                    </Grid>
                    <Grid item lg={6} xs={12} sm={12} md={6}>
                        <div className={classes.formContainer}>
                            <Typography variant="h3">{translate("GET_IN_TOUCH")}</Typography>
                            {(subSelection || subjectSelect) === 4 ? <Typography variant="subtitle1">{translate("JOIN_COMMUNITY_VIA")} <b>{translate("LETS_GET_SOCIAL")}</b>. <br />{translate("WE_UNDERSTAND")} {translate("PLEASE_FILL_CONTACT_DETAILS")}</Typography> : <Typography variant="subtitle1"> {translate("PLEASE_FILL_CONTACT_DETAILS")}</Typography>}

                            <FormCreator
                                watchFields={['subject']}
                                onWatchChange={(data) => { setSubjectSelect(data[0]) }}
                                formData={subjectFormData}
                                data={{ subject: pricing ? 3 : subSelection || subjectSelect }}
                            />
                            <FormCreator
                                onSubmit={(e) => handleSubmit(e)}
                                submitBtnText={translate("SEND_MESSAGE")}
                                btnIcon={<SendIcon />}
                                // watchFields={['subject']}
                                // onWatchChange={(data) => { setSubjectSelect(data[0]) }}
                                data={{ productType: pricing, }}
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
        [theme.breakpoints.up("xs")]: {
            padding: theme.spacing(3),
        },
        [theme.breakpoints.up("sm")]: {
            padding: theme.spacing(4),
        },
        [theme.breakpoints.up("md")]: {
            padding: theme.spacing(4),
        },
        [theme.breakpoints.up("lg")]: {
            padding: theme.spacing(4, 5),
        },
        minHeight: 400,
        borderRadius: theme.spacing(2),
        background: '#3E2093',
        height: "100%",
        color: '#fff',
        position: 'relative',
        '& h3': {
            marginBottom: theme.spacing(3),
            '&:after': {
                content: '""',
                display: "block",
                marginTop: "20px",
                width: 60,
                borderTop: "4px solid #FA949D",
                borderRadius: theme.spacing(4),
            }
        },
    },
    circle1: {
        [theme.breakpoints.up("xs")]: {
            width: 100,
            height: 100,
        },
        [theme.breakpoints.up("sm")]: {
            width: 150,
            height: 150,
        },
        [theme.breakpoints.up("md")]: {
            width: 175,
            height: 175,
        },
        [theme.breakpoints.up("lg")]: {
            width: 250,
            height: 250,
        },

        position: 'absolute',
        bottom: 0,
        right: 0,
        backgroundImage: 'url(/images/circle1.png)',
        backgroundSize: 'cover',
        backgroundRepeat: "no-repeat",
        borderBottomRightRadius: theme.spacing(2),
    },
    circle2: {
        [theme.breakpoints.up("xs")]: {
            width: 60,
            height: 60,
            bottom: 45,
            right: 45,
        },
        [theme.breakpoints.up("sm")]: {
            width: 80,
            height: 80,
            bottom: 70,
            right: 70,
        },
        [theme.breakpoints.up("md")]: {
            width: 100,
            height: 100,
            bottom: 70,
            right: 70,
        },
        [theme.breakpoints.up("lg")]: {
            width: 150,
            height: 150,
            bottom: 100,
            right: 100,
        },

        position: 'absolute',

        backgroundImage: 'url(/images/circle2.png)',
        backgroundSize: 'cover',
        backgroundRepeat: "no-repeat",
        zIndex: 10,
    },
    curveLines: {
        width: '100%',
        [theme.breakpoints.up("xs")]: {
            height: 20,
        },
        [theme.breakpoints.up("sm")]: {
            height: 40,
        },
        [theme.breakpoints.up("md")]: {
            height: 35,
        },
        [theme.breakpoints.up("lg")]: {
            height: 40,
        },
        position: 'absolute',
        bottom: 20,
        right: 0,
        backgroundImage: 'url(/images/curvelines.png)',
        backgroundSize: 'cover',
        backgroundRepeat: "no-repeat",
        zIndex: 10,
    },
    socialIconContainer: {
        paddingTop: theme.spacing(3),
    },
    socialIcon: {

        [theme.breakpoints.up("xs")]: {
            width: theme.spacing(10),
            height: theme.spacing(10),
        },
        [theme.breakpoints.up("sm")]: {
            width: theme.spacing(12),
            height: theme.spacing(12),
        },
        [theme.breakpoints.up("md")]: {
            width: theme.spacing(12),
            height: theme.spacing(12),
        },
        [theme.breakpoints.up("lg")]: {
            width: theme.spacing(15),
            height: theme.spacing(15),
        },
        background: "#7E53F9",
        transition: "all 0.3s ease-in-out",
        display: 'flex',
        justifyContent: "center",
        alignItems: 'center',
        borderRadius: theme.spacing(3),
        cursor: 'pointer',
        border: '3px solid #fff',
        '& svg': {
            fontSize: theme.palette.fontSizes["2xl"],
            color: '#fff',
            fill: '#fff',
            width: 40,
            height: 40,
        },
        '&:hover': {
            background: '#FA949D',
            // '& svg': {
            //     color: '#fff',
            //     fill: '#fff'
            // }
        }
    },
    formContainer: {
        [theme.breakpoints.up("xs")]: {
            padding: theme.spacing(2, 1),
        },
        [theme.breakpoints.up("sm")]: {
            padding: theme.spacing(2, 1),
        },
        [theme.breakpoints.up("md")]: {
            padding: theme.spacing(2, 2),
        },
        [theme.breakpoints.up("lg")]: {
            padding: theme.spacing(3, 4),
        },
        '& h3': {
            color: '#3E2093',
            marginBottom: theme.spacing(3),
            '&:after': {
                content: '""',
                display: "block",
                marginTop: "20px",
                width: 60,
                borderTop: "4px solid #FA949D",
                borderRadius: theme.spacing(4),
            }
        },
        '& h6': {
            margin: theme.spacing(1, 0, 5, 0),
            color: theme.palette.gray[1200],
            '& b': {
                color: "#FA949D"
            }
        }
    },
}));

export default Contact;
