import React from "react";
import { makeStyles } from "@mui/styles";
import ModalContainer from "../../components/ModalContainer";

const useStyles = makeStyles((theme) => ({
  root: {},
}));

const VideoModal = ({ open, onClose, video }) => {
  const classes = useStyles();
  console.log("video", video);
  return (
    <ModalContainer
      title={video?.title}
      open={open}
      onClose={onClose}
      size="lg"
    >
      {video && (
        <iframe
          id="video"
          width="100%"
          heigh="100%"
          src={video.alternateLink}
          frameBorder="0"
          allow="accelerometer, autoplay; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      )}
    </ModalContainer>
  );
};

export default VideoModal;
