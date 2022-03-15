import React from "react";
import { makeStyles } from "@mui/styles";
import ModalContainer from "../ModalContainer";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import useLanguages from "../../hooks/useLanguage";

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
  const translate = useLanguages()
  return (
    <ModalContainer
      open={open}
      title={translate("SELECT_USERS")}
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
        onChange={(e, val) => {
          setSelected(val);
        }}
        renderInput={(params) => (
          <TextField {...params} label={translate("ADD_CHAT_USERS")} />
        )}
      />
    </ModalContainer>
  );
};

export default AddChatUsersModal;
