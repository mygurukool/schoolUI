import React from "react";
import { makeStyles } from "@mui/styles";
import { Card, CardContent, Typography } from "@mui/material";
import { useParams, useHistory } from "react-router-dom";
import FormCreator from "../../components/Form/FormCreator";
import { useDispatch, useSelector } from "react-redux";
import {
  acceptInvitation,
  getInvitationDetails,
} from "../../redux/action/commonActions";
import { PERMISSIONS } from "../../constants";
import removeToken from "../../helpers/removeToken";
import { logoutUser } from "../../redux/action/userActions";
const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    height: "100vh",
    backgroundColor: theme.palette.primary.main,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
}));

const Invitation = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();

  const { invitation } = useSelector((state) => state.common);

  const handleJoin = (data) => {
    dispatch(logoutUser());
    if (data.password !== data.repassword) {
      alert("passwords do not match");
      return;
    }
    dispatch(
      acceptInvitation(
        {
          ...data,
          ...invitation,
          role: type.toUpperCase(),
          permissions: PERMISSIONS[type.toUpperCase()],
        },
        () => {
          removeToken();
          history.push("/login");
        }
      )
    );
  };

  const { type, id } = useParams();

  React.useEffect(() => {
    dispatch(getInvitationDetails(id));
  }, [id, dispatch]);

  return (
    <div className={classes.root}>
      <Card sx={{ width: "50%" }}>
        <CardContent>
          <Typography variant="h6" textAlign="center">
            Congratulation, You have been invited to join the class of{" "}
            {invitation?.groupName} by {invitation?.inviteeName}
          </Typography>
        </CardContent>
        <CardContent>
          <FormCreator
            mode={"add"}
            onSubmit={(e) => handleJoin(e, "mygurukool")}
            formData={formData}
            submitText="Login"
            data={{}}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default Invitation;
const formData = [
  {
    type: "email",
    name: "email",
    label: "Email Address",
    placeholder: "Enter email address",
    required: true,
    size: 12,
  },
  {
    type: "text",
    name: "name",
    label: "Full Name",
    placeholder: "Enter Your Name",
    required: true,
    size: 12,
  },
  {
    type: "password",
    name: "password",
    label: "Password",
    placeholder: "Enter New Password",
    required: true,
    size: 12,
  },
  {
    type: "password",
    name: "repassword",
    label: "Renter Password",
    placeholder: "Renter New  Password",
    required: true,
    size: 12,
  },
];
