import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  closeModal,
} from "../../redux/action/utilActions";
import ModalContainer from "../ModalContainer";

const ComingSoonModal = () => {
  const { modalOpen } = useSelector((state) => state.util);

  const dispatch = useDispatch();
  const open = modalOpen === "msLogin";


  const handleClose = () => {
    dispatch(closeModal());
  };

  return (
    <>
      <ModalContainer
        open={open}
        title="Microsoft Teams"
        onClose={() => handleClose()}
        size="xs"
        onSubmit={() => window.open('https://mougli.school')}
        submitTitle="Contact Us"
      >Contact us to provide integration details. Google classroom integration and organisation at Mougli school are ready to use.</ModalContainer>
    </>
  );
};

export default ComingSoonModal;
