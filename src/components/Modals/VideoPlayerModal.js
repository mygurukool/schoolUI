import React from "react";
import { makeStyles } from "@mui/styles";
import { useDispatch, useSelector } from "react-redux";
import { closeModal } from "../../redux/action/utilActions";
import ModalContainer from "../ModalContainer";
import parse from "html-react-parser";
import YouTube from "react-youtube";
const useStyles = makeStyles((theme) => ({
  root: {},
}));

const VideoPlayerModal = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { modalOpen, modalData } = useSelector((state) => state.util);

  const open = modalOpen === "youtube";

  const handleClose = () => {
    dispatch(closeModal());
  };

  const title = modalData?.title;
  const Component = modalData?.html;

  const opts = {
    height: "500",
    width: "100%",
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1,
    },
  };

  return (
    <ModalContainer
      open={open}
      title={title || "Play video"}
      onClose={() => handleClose()}
      size="md"
    >
      {/* {modalData?.videoId && parse(modalData?.html)} */}
      {modalData?.videoId && (
        <YouTube videoId={modalData?.videoId} opts={opts} onReady={() => {}} />
      )}
    </ModalContainer>
  );
};

export default VideoPlayerModal;
