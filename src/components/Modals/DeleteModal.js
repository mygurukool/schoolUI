import React, { useImperativeHandle } from "react";
import ModalContainer from "../ModalContainer";
import useLanguages from "../../hooks/useLanguage";

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
      title={<>
        {translate("SURE_WANT_TO_DELETE")} - <strong>{getTitle(data)}</strong>
      </>}
      onClose={() => handleClose()}
      size="xs"
      onSubmit={() => handleSubmit()}
      submitTitle={translate("DELETE")}
    ></ModalContainer>
  );
});

export default DeleteModal;
