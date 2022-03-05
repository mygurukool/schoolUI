import React from "react";
import { makeStyles } from "@mui/styles";
import ModalContainer from "../ModalContainer";
import { Card, CardMedia, Stack, TextField } from "@mui/material";
import { HighlightOffTwoTone, YouTube } from "@mui/icons-material";
import youtube from "youtube-metadata-from-url";

import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import getVideoId from "get-video-id";
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
  const translate = useLanguages()
  const handleChange = (e) => {
    setError();
    const value = e.target.value;
    setLocalLink(value);
    setIsLoading(true);
    if (value?.includes("youtube") || value?.includes("youtube")) {
      youtube
        .metadata(value)
        .then((json) => {
          const { id } = getVideoId(value);
          setIsLoading(false);
          setMetaData({ ...json, videoId: id });
        })
        .catch((err) => {
          alert("No data found");
          setIsLoading(false);
        });
    } else {
      setError(translate("NOT_YOUTUBE_LINK"));
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
      alert(translate("PLAESE_ENTER_LINK"));
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
      title={translate("ADD_YOUTUBE_VIDEO_LINK")}
      size="sm"
      isLoading={isLoading}
    >
      <Stack direction="column" spacing={2}>
        <TextField
          label={translate("YOUTUBE_VIDEO_LINK")}
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
                  <HighlightOffTwoTone />
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
