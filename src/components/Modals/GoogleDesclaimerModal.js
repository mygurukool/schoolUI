import React from "react";
import ModalContainer from "../ModalContainer";
import { useDispatch, useSelector } from "react-redux";
import { closeModal, openModal } from "../../redux/action/utilActions";

import useLanguages from "../../hooks/useLanguage";
import { Typography } from "@mui/material";

const CreateOrganization = () => {
  const translate = useLanguages();
  const dispatch = useDispatch();
  const { modalOpen, modalData } = useSelector((state) => state.util);
  const { email } = useSelector((state) => state.user);

  const open = modalOpen === "googledesclaimer";

  return (
    <ModalContainer
      open={open}
      title={"Desclamer"}
      size="sm"
      onClose={() => dispatch(closeModal())}
    >
      <Typography>
        The data belongs to google classroom and you can not perform actions on
        it here. Please login to google classroom to modify
      </Typography>
    </ModalContainer>
  );
};

export default CreateOrganization;
