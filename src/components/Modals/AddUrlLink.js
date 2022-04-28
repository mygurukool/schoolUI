import React from "react";
import { makeStyles } from "@mui/styles";
import ModalContainer from "../ModalContainer";
import { Card, CardMedia, Stack, TextField } from "@mui/material";
import { HighlightOffTwoTone, Link, YouTube } from "@mui/icons-material";

import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import axios from "axios";
import { BASEURL } from "../../constants";
import { useDispatch } from "react-redux";
import { showSnackBar } from "../../redux/action/snackActions";
import { urlRegex } from "../../helpers/regex";
import useLanguages from "../../hooks/useLanguage";
const useStyles = makeStyles((theme) => ({
  root: {},
}));

const AddYoutubeLink = ({ open, data, onClose, onSubmit }) => {
  const classes = useStyles();
  const [localLink, setLocalLink] = React.useState();
  const [isLoading, setIsLoading] = React.useState(false);
  const [metaData, setMetaData] = React.useState();
  const [error, setError] = React.useState();
  const dispatch = useDispatch();
  const translate = useLanguages()
  const handleChange = (e) => {
    setError();
    const value = e.target.value;
    setLocalLink(value);
    setIsLoading(true);

    axios({
      method: "post",

      url: `${BASEURL}/metadata`,
      data: {
        url: value,
      },
    })
      .then((res) => {
        if (res.data.error) {
          dispatch(translate("AN_ERROR_OCCURED"), "error");
          // setMetaData({
          //   ogUrl: value,
          //   ogTitle: value,
          // })
          setMetaData();
        } else {
          setMetaData(res.data);
        }
        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);
      });
  };
  const handleClose = () => {
    setLocalLink();
    setIsLoading(false);
    setMetaData();
    onClose();
  };
  const handleSubmit = () => {
    if (!metaData) {
      dispatch(showSnackBar(translate("PLAESE_ENTER_LINK"), "error"));
      return;
    }
    // if (!urlRegex.test(metaData)) {
    //   dispatch(showSnackBar("Please Enter a valid link", "error"));
    //   return
    // }
    onSubmit({
      type: "link",
      metaData: metaData,
    });
    handleClose();
  };
  return (
    <ModalContainer
      open={open}
      onClose={handleClose}
      onSubmit={() => handleSubmit()}
      title={translate("ADD_WEBSITE_LINK")}
      size="sm"
      isLoading={isLoading}
    >
      <Stack direction="column" spacing={2}>
        <TextField
          label="Website Link"
          variant="outlined"
          error={error}
          helperText={error}
          fullWidth
          value={localLink || ""}
          onChange={handleChange}
          InputProps={{
            startAdornment: <Link color="secondary" />,
          }}
        />

        {metaData && (
          <Card sx={{ display: "flex" }} variant="outlined">
            <CardMedia
              component="img"
              sx={{ width: 151 }}
              image={metaData?.ogImage?.url || "/images/link.png"}
              alt={metaData?.ogTitle}
            />
            <Stack
              flexDirection="row"
              justifyContent="space-between"
              width="100%"
              p={2}
            >
              <Stack>
                <Typography component="div" variant="h6">
                  {metaData?.ogTitle}
                </Typography>
                <Typography
                  variant="subtitle1"
                  color="text.secondary"
                  component="div"
                >
                  {metaData?.ogSiteName}
                </Typography>
              </Stack>
              <IconButton
                color="error"
                onClick={() => {
                  setLocalLink();
                  setMetaData();
                }}
              >
                <HighlightOffTwoTone />
              </IconButton>
            </Stack>
          </Card>
        )}
      </Stack>
    </ModalContainer>
  );
};

export default AddYoutubeLink;
