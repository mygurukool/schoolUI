import React from "react";
import { makeStyles } from "@mui/styles";
import ModalContainer from "../ModalContainer";
import { Button, DialogActions } from "@mui/material";

const useStyles = makeStyles((theme) => ({
  root: {},
}));

const TeacherAccept = ({ open, onClose, onSubmit }) => {
  const classes = useStyles();
  return (
    <ModalContainer
      open={open}
      title="Additional Permissions"
      onClose={() => onClose()}
      size="xs"
    >
      Welcome! You are identified as Teacher. Please approve, to present you
      additional Permissions and Authorize MyGuruKool App to facilitate you with
      access control to all your Google Classroom Courses!
      <DialogActions>
        <Button color="primary" variant="contained" onClick={() => onSubmit()}>
          Yes I Approve
        </Button>
      </DialogActions>
    </ModalContainer>
  );
};

export default TeacherAccept;
