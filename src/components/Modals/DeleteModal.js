import React, { useImperativeHandle } from "react";
import { makeStyles } from "@mui/styles";
import ModalContainer from "../ModalContainer";
import useLanguages from "../../hooks/useLanguage";

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

  const translate = useLanguages()

  return (
    <ModalContainer
      open={Boolean(data)}
      title={`${translate("SURE_WANT_TO_DELETE")} ${getTitle(data)}`}
      onClose={() => handleClose()}
      size="xs"
      onSubmit={() => handleSubmit()}
      submitTitle={translate("DELETE")}
    ></ModalContainer>
  );
});

export default DeleteModal;
