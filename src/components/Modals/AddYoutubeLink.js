import React from "react";
import { makeStyles } from "@mui/styles";
import ModalContainer from "../ModalContainer";
import { Card, CardMedia, Stack, TextField } from "@mui/material";
import { Close, YouTube } from "@mui/icons-material";
import youtube from "youtube-metadata-from-url";

import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";

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
    if (value?.includes("youtube") || value?.includes("youtube")) {
      youtube
        .metadata(value)
        .then((json) => {
          setIsLoading(false);
          setMetaData(json);
        })
        .catch((err) => {
          alert("No data found");
          setIsLoading(false);
        });
    } else {
      setError("Not a youtube link");
      setIsLoading(false);
    }
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
      type: "youtube",
      metaData: { ...metaData, videoUrl: localLink },
    });
    handleClose();
  };
  return (
    <ModalContainer
      open={open}
      onClose={handleClose}
      onSubmit={() => handleSubmit()}
      title="Add Youtube Video Link"
      size="sm"
      isLoading={isLoading}
    >
      <Stack direction="column" spacing={2}>
        <TextField
          label="Youtube Video Link"
          variant="outlined"
          error={error}
          helperText={error}
          fullWidth
          value={localLink || ""}
          onChange={handleChange}
          InputProps={{
            startAdornment: <YouTube color="secondary" />,
          }}
        />

        {metaData && (
          <Card sx={{ display: "flex" }} variant="outlined">
            <CardMedia
              component="img"
              sx={{ width: 151 }}
              image={metaData?.thumbnail_url}
              alt={metaData?.thumbnail_url}
            />
            <Stack direction="row" p={2}>
              <Stack>
                <Typography component="div" variant="h6">
                  {metaData?.title}
                </Typography>
                <Typography
                  variant="subtitle1"
                  color="text.secondary"
                  component="div"
                >
                  {metaData?.author_name}
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
