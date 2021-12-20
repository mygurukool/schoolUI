import React from "react";
import { makeStyles } from "@mui/styles";
import ModalContainer from "../ModalContainer";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";

const useStyles = makeStyles((theme) => ({
  root: {},
}));

const AddChatUsersModal = ({ open, onClose, options, onSubmit }) => {
  const [selected, setSelected] = React.useState([]);

  const handleSubmit = () => {
    if (selected.length > 0) {
      onSubmit(selected);
    } else {
      onClose();
      setSelected([]);
    }
  };

  return (
    <ModalContainer
      open={open}
      title="Select Users"
      onClose={() => {
        setSelected([]);

        onClose();
      }}
      onSubmit={handleSubmit}
      size="xs"
      enableSubmit
    >
      <Autocomplete
        multiple
        options={options}
        groupBy={(option) => option.role}
        getOptionLabel={(option) => option.name}
        sx={{ width: 300 }}
        onChange={(e, val) => {
          setSelected(val);
        }}
        renderInput={(params) => (
          <TextField {...params} label="Add chat users" />
        )}
      />
    </ModalContainer>
  );
};

export default AddChatUsersModal;
