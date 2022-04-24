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

  const open = modalOpen === "desclaimer";

  return (
    <ModalContainer
      open={open}
      title={"Disclaimer"}
      size="sm"
      onClose={() =>
        dispatch(
          openModal("organization", { organizationEmail: email, ...modalData })
        )
      }
      cancelText={"Accept"}
    >
      <Typography>The data will be stored on the mougli servers.</Typography>
    </ModalContainer>
  );
};

export default CreateOrganization;
