import React from "react";
import { makeStyles } from "@mui/styles";
import { useDispatch, useSelector } from "react-redux";
import { closeModal } from "../../redux/action/utilActions";
import ModalContainer from "../ModalContainer";
import parse from "html-react-parser";
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
  console.log("modalData", modalData);
  return (
    <ModalContainer
      open={open}
      title={title || "Play video"}
      onClose={() => handleClose()}
      size="lg"
    >
      {modalData?.html && parse(modalData?.html)}
    </ModalContainer>
  );
};

export default VideoPlayerModal;
