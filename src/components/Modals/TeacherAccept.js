import React from "react";
import { makeStyles } from "@mui/styles";
import ModalContainer from "../ModalContainer";
import {
  Button,
  DialogActions,
  Divider,
  FormControlLabel,
  Stack,
  Typography,
  Checkbox,
} from "@mui/material";
import useModal from "../../hooks/useModal";
import { useDispatch, useSelector } from "react-redux";
import { setUserAsTeacher } from "../../redux/action/userActions";
import useLanguages from "../../hooks/useLanguage";
import { usePermissions } from "../PermissionGate";
import { SCOPES } from "../../constants";
import { changeUploadPermission } from "../../redux/action/organizationActions";

const useStyles = makeStyles((theme) => ({
  root: {},
}));

const TeacherAccept = () => {
  const dispatch = useDispatch();

  const teachers = useSelector((state) => state.common.teachers);
  const currentGroup = useSelector((state) => state.common.currentGroup);
  const user = useSelector((state) => state.user);

  const hasUploadPermission = user.hasMutationPermission;

  const {
    open,
    openModal: openTeacherPrompt,
    closeModal: closeTeacherPrompt,
  } = useModal();

  const onApproveAsTeacher = () => {
    closeTeacherPrompt(false);

    dispatch(setUserAsTeacher());
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

  const translate = useLanguages();
  const hasPermissions = usePermissions({
    scopes: [SCOPES.CAN_CHECK_SUBMISSIONS],
  });
  React.useEffect(() => {
    if (hasPermissions) {
      openTeacherPrompt();
    }
  }, [teachers]);
  return (
    <ModalContainer
      open={open}
      title="Additional Permissions"
      onClose={() => closeTeacherPrompt()}
      size="sm"
      hideButtons
    >
      <Stack direction="column" spacing={2}>
        <Typography>{translate("TEACHER_ACCEPT_MESSAGE")}</Typography>
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
      <DialogActions>
        <Button
          color="primary"
          variant="contained"
          onClick={() => onApproveAsTeacher()}
        >
          {translate("YES_I_APPROVE")}
        </Button>
      </DialogActions>
    </ModalContainer>
  );
};

export default TeacherAccept;
