import React from "react";
import { makeStyles } from "@mui/styles";
import { Card, CardContent, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import FormCreator from "../../components/Form/FormCreator";
import axios from "axios";
import { createOrganization } from "../../redux/action/organizationActions";
import { useHistory } from "react-router";
import { PERMISSIONS, ROLES } from "../../constants";
import { loginUser, logoutUser } from "../../redux/action/userActions";
import { openModal } from "../../redux/action/utilActions";
import useLanguages from "../../hooks/useLanguage";
import i18n from '../../i18n'

const RegisterForm = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [countries, setCountries] = React.useState([]);
  const history = useHistory();
  const isLogged = useSelector((state) => state.user.isLogged);

  React.useEffect(() => {
    if (isLogged) {
      history.push(`/${i18n.language}`);
    }
  }, [isLogged]);
  const getCountries = async () => {
    return await axios
      .get("https://restcountries.com/v3.1/all", {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods":
            "GET, POST, PATCH, PUT, DELETE, OPTIONS",
          "Access-Control-Allow-Headers": "Origin, Content-Type, X-Auth-Token",
        },
      })
      .then(async (res) => {
        const response = res.data;
        let con = [];
        await response.map((r) => {
          con.push({
            title: r.name.common,
            value: r.name.common,
            icon: r.flags.svg,
          });
        });
        return con;
      })
      .catch((error) => {
        console.log(error);
      });
  };

  React.useEffect(async () => {
    const con = await getCountries();
    if (con) {
      setCountries(con);
    }
  }, []);

  const onAdd = (data) => {
    dispatch(logoutUser());
    dispatch(
      createOrganization(
        {
          ...data,
          role: ROLES.organizationOwner,
          permissions: PERMISSIONS[ROLES.organizationOwner],
        },
        () => {
          // history.push("/login");

          dispatch(
            loginUser({ ...data, loginType: "mygurukool" }, () => {
              dispatch(openModal("welcome"));
            })
          );
        }
      )
    );
  };
  const translate = useLanguages()

  const formData = [
    {
      type: "text",
      name: "name",
      label: translate("YOUR_NAME"),
      placeholder: translate("YOUR_NAME_PLACEHOLDER"),
      required: true,
      size: 12,
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
      type: "password",
      name: "password",
      label: translate("PASSWORD"),
      placeholder: translate("PASSWORD_PLACEHOLDER"),
      required: true,
      size: 6,
    },
    {
      type: "text",
      name: "organizationName",
      label: translate("ORGANIZATION_NAME"),
      placeholder: translate("ORGANIZATION_NAME_PLACEHOLDER"),
      required: true,
      size: 12,
    },
    {
      type: "select",
      name: "organizationSize",
      size: 6,

      label: translate("ORGANIZATION_SIZE"),
      options: [
        {
          title: "1",
          value: "1",
        },
        {
          title: "2-10",
          value: "2-10",
        },
        {
          title: "11-20",
          value: "11-20",
        },
        {
          title: "20+",
          value: "20+",
        },
      ],
      optionLabelProp: "title",
      optionValueProp: "value",
      required: true,
    },
    {
      type: "autocomplete",
      name: "country",
      size: 6,
      label: translate("COUNTRY"),

      optionLabelProp: "title",
      optionValueProp: "value",
      optionIconProp: "icon",
      required: true,
      hasOptions: true,
    },

    {
      type: "textarea",
      name: "organizationAddress",
      label: translate("ORGANIZATION_ADDRESS"),
      placeholder: translate("ORGANIZATION_ADDRESS_PLACEHOLDER"),
      required: true,
      size: 12,
    },
  ];

  return (
    <div className={classes.root}>
      {/* <NavBar /> */}
      <div className={classes.container}>
        <Card elevation={0} className={classes.card}>
          <CardContent>
            <Typography variant="h4" mb={2}>{translate("REGISTER_NOW")}</Typography>
            <Typography variant="body2" mb={2}>
              {translate("PLEASE_FILL_THE_DETAILS")}
            </Typography>
            <FormCreator
              mode={"add"}
              onSubmit={(e) => onAdd(e)}
              formData={formData}
              submitText="Create"
              optionsData={{
                country: countries,
              }}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
export default RegisterForm;




const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
    width: "100vw",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: theme.palette.white,
    backgroundImage: "url(/background/bg1.jpg)",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
  container: {
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    margin: theme.spacing(8),
    [theme.breakpoints.up("xs")]: {
      width: "100%",
      margin: theme.spacing(1),
    },
    [theme.breakpoints.up("sm")]: {
      width: "100%",
      margin: theme.spacing(4),
    },
    [theme.breakpoints.up("md")]: {
      width: "80%",
      margin: theme.spacing(8),
    },
    [theme.breakpoints.up("lg")]: {
      width: "65%",
      margin: theme.spacing(8),
    },
    [theme.breakpoints.up("xl")]: {
      width: "65%",
      margin: theme.spacing(8),
    },
  },
  topTitle: {
    color: theme.palette.secondary.main,
    letterSpacing: theme.spacing(0.2),
    textTransform: "uppercase",
    fontSize: theme.palette.fontSizes.sm,
    fontWeight: theme.palette.fontWeights.bold,
    marginBottom: theme.spacing(2),
  },
  title: {
    color: theme.palette.primary.main,
    fontWeight: theme.palette.fontWeights.bolder,
    textTransform: "capitalize",
    fontSize: theme.palette.fontSizes["4xl"],
    marginBottom: theme.spacing(2),
  },
  card: {
    background: "rgba(255,255,255,1)",
    backdropFilter: "blur(20px)",
    padding: theme.spacing(2.5, 4),
    width: "100%",
    borderRadius: theme.spacing(5),
    boxShadow: "40px 40px 90px rgba(0, 0, 0, 0.12)",
    [theme.breakpoints.up("xs")]: {
      padding: theme.spacing(1, 2),
    },
    [theme.breakpoints.up("sm")]: {
      padding: theme.spacing(2, 3.5),
    },
    [theme.breakpoints.up("md")]: {
      padding: theme.spacing(2.5, 4),
    },
    [theme.breakpoints.up("lg")]: {
      padding: theme.spacing(2.5, 4),
    },
    [theme.breakpoints.up("xl")]: {
      padding: theme.spacing(2.5, 4),
    },
  },
  subTitle: {
    color: theme.palette.gray[1200],
    letterSpacing: theme.spacing(0.1),
    fontSize: theme.palette.fontSizes.base,
    fontWeight: theme.palette.fontWeights.semiBold,
    marginBottom: theme.spacing(2),
  },
  link: {
    letterSpacing: theme.spacing(0.1),
    fontSize: theme.palette.fontSizes.base,
    margin: theme.spacing(2, 0),
    fontWeight: theme.palette.fontWeights.semiBold,
    cursor: "pointer",
  },
}));

