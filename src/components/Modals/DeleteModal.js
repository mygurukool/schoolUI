import React, { useImperativeHandle } from "react";
import { makeStyles } from "@mui/styles";
import ModalContainer from "../ModalContainer";
import { useDispatch, useSelector } from "react-redux";

const useStyles = makeStyles((theme) => ({
  root: {},
}));

const DeleteModal = React.forwardRef(({ getTitle, onSubmit }, ref) => {
  const [data, setData] = React.useState(undefined);

  const handleClose = () => {
    setData(undefined);
  };

  const handleOpen = (data) => {
    setData(data);
  };
  useImperativeHandle(ref, () => ({
    open: handleOpen,
    close: handleClose,
  }));

  const handleSubmit = () => {
    handleClose();
    onSubmit(data);
  };
  return (
    <ModalContainer
      open={Boolean(data)}
      title={`Are you sure you want to delete ${getTitle(data)}`}
      onClose={() => handleClose()}
      size="xs"
      onSubmit={() => handleSubmit()}
      submitTitle="Delete"
    ></ModalContainer>
  );
});

export default DeleteModal;
