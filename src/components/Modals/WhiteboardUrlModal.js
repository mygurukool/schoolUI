import React from "react";
import ModalContainer from "../ModalContainer";
import TextField from "@mui/material/TextField";

const WhiteBoardURlModal = ({ open, onClose, options, onSubmit }) => {
  const [url, setUrl] = React.useState();

  const handleSubmit = () => {
    onSubmit(url);
  };

  return (
    <ModalContainer
      open={open}
      title="WhiteBoard Url "
      onClose={() => {
        onClose();
      }}
      size="xs"
      onSubmit={handleSubmit}
    >
      <TextField
        label="Url"
        placeholder="Url"
        onChange={({ target: { value } }) => {
          setUrl(value);
        }}
      />
    </ModalContainer>
  );
};

export default WhiteBoardURlModal;
