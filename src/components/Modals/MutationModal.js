import React from "react";
import { makeStyles } from "@mui/styles";
import ModalContainer from "../ModalContainer";
import { useDispatch, useSelector } from "react-redux";
import { closeModal } from "../../redux/action/utilActions";

import FormCreator from "../Form/FormCreator";
import {
  createGroup,
  editGroup,
  getAllGroups,
} from "../../redux/action/groupActions";
import { ageGroups, SCOPES } from "../../constants";
import useLanguages from "../../hooks/useLanguage";
import { usePermissions } from "../PermissionGate";
import { Button, Checkbox, Divider, Stack, Typography } from "@mui/material";
import { changeUploadPermission } from "../../redux/action/organizationActions";
import { sendMutationEmail } from "../../redux/action/userActions";

const useStyles = makeStyles((theme) => ({
  root: {},
}));

const MutationModal = () => {
  const translate = useLanguages();
  const dispatch = useDispatch();
  const { modalOpen, modalData } = useSelector((state) => state.util);
  const { currentGroup } = useSelector((state) => state.common);
  const organizationId = currentGroup?.organizationId;
  const hasPermission = usePermissions({
    scopes: [SCOPES.CAN_CREATE_ASSIGNMENT_WORK],
  });
  const user = useSelector((state) => state.user);
  const hasUploadPermission = user.hasMutationPermission;

  const open = modalOpen === "mutation";
  const handleClose = () => {
    dispatch(closeModal());
  };

  const changePermission = () => {
    dispatch(
      changeUploadPermission({
        organizationId: currentGroup?.organizationId,
        hasPermission: !hasUploadPermission,
        acceptedBy: user,
      })
    );
  };

  const handleNotify = () => {
    dispatch(
      sendMutationEmail({
        organizationId: organizationId,
        group: currentGroup,
      })
    );
  };

  const handleSubmit = (data) => {};

  return (
    <ModalContainer
      open={open}
      title={"Mutation"}
      onClose={() => handleClose()}
      size="xs"
      // hideTitle
      {...(hasPermission && {
        onSubmit: () => handleNotify(),

        submitTitle: "Notify Teacher",
      })}
    >
      {hasPermission ? (
        <Stack direction="row">
          <Typography>
            "No approval for mutation has been provided. Please contact your
            teacher."
          </Typography>
        </Stack>
      ) : (
        <Stack direction="row">
          <Typography>"No approval for mutation has been provided.</Typography>
          <Divider />
          <Stack direction="row" spacing={1}>
            <Checkbox
              checked={hasUploadPermission}
              onChange={() => changePermission()}
            />
            <Typography variant="body1">
              "I understand and accept any mutation of Google Classroom content
              will be stored to Mougli School DB. I confirm it on behalf of my
              whole organisation".
            </Typography>
          </Stack>
        </Stack>
      )}
    </ModalContainer>
  );
};

export default MutationModal;
