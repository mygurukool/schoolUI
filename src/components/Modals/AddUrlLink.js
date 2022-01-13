import React from "react";
import { makeStyles } from "@mui/styles";
import ModalContainer from "../ModalContainer";
import { Card, CardMedia, Stack, TextField } from "@mui/material";
import { Close, Link, YouTube } from "@mui/icons-material";

import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import axios from "axios";
import { BASEURL } from "../../constants";
const useStyles = makeStyles((theme) => ({
  root: {},
}));

const AddYoutubeLink = ({ open, data, onClose, onSubmit }) => {
  const classes = useStyles();
  const [localLink, setLocalLink] = React.useState();
  const [isLoading, setIsLoading] = React.useState(false);
  const [metaData, setMetaData] = React.useState();
  const [error, setError] = React.useState();

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
          alert("An Error Occcured");
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
      alert("Please Enter a link");
    }
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
      title="Add Website  Link"
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
              image={
                metaData?.ogImage?.url || "https://via.placeholder.com/140x100"
              }
              alt={metaData?.ogTitle}
            />
            <Stack direction="row" p={2}>
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
              <Stack>
                <IconButton
                  aria-label="previous"
                  onClick={() => {
                    setLocalLink();
                    setMetaData();
                  }}
                >
                  <Close />
                </IconButton>
              </Stack>
            </Stack>
          </Card>
        )}
      </Stack>
    </ModalContainer>
  );
};

export default AddYoutubeLink;
