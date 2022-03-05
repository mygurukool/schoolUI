import React from "react";
import { makeStyles } from "@mui/styles";
import ModalContainer from "../ModalContainer";
import { Button, DialogActions } from "@mui/material";
import useModal from "../../hooks/useModal";
import { useDispatch, useSelector } from "react-redux";
import { setUserAsTeacher } from "../../redux/action/userActions";
import checkIfUserIsTeacher from "../../helpers/checkIfUserIsTeacher";
import useLanguages from "../../hooks/useLanguage";

const useStyles = makeStyles((theme) => ({
  root: {},
}));

const TeacherAccept = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const id = useSelector((state) => state.user.id);
  const teachers = useSelector((state) => state.common.teachers);

  const {
    open,
    openModal: openTeacherPrompt,
    closeModal: closeTeacherPrompt,
  } = useModal();

  const onApproveAsTeacher = () => {
    closeTeacherPrompt(false);

    dispatch(setUserAsTeacher());
  };
  const translate = useLanguages()
  React.useEffect(() => {
    const founData = checkIfUserIsTeacher(id, teachers);
    if (founData) {
      openTeacherPrompt();
    }
  }, [teachers]);
  return (
    <ModalContainer
      open={open}
      title="Additional Permissions"
      onClose={() => closeTeacherPrompt()}
      size="xs"
    >
      {translate("TEACHER_ACCEPT_MESSAGE")}
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
