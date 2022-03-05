import React from "react";
import { makeStyles } from "@mui/styles";
import ModalContainer from "../ModalContainer";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import {
  Avatar,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  ListSubheader,
} from "@mui/material";
import { RenderAvatar } from "../Chat";
import useLanguages from "../../hooks/useLanguage";

const ForwardMessageModal = ({ open, onClose, options, onSubmit }) => {
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
      title="Forward Message"
      onClose={() => {
        setSelected([]);

        onClose();
      }}
      size="xs"
    >
      <List
        subheader={
          <ListSubheader component="div" id="nested-list-subheader">
            Groups
          </ListSubheader>
        }
      >
        {options?.groups?.map((g, i) => {
          const label = g.users.length > 2 ? "Group" : g.users[0].name;
          if (g.users.length > 2)
            return (
              <ListItem>
                <ListItemButton
                  onClick={() => {
                    onSubmit({
                      type: "group",
                      data: g,
                    });
                  }}
                >
                  <ListItemIcon>
                    <RenderAvatar recepiants={g.users} sliceAt={4} />
                  </ListItemIcon>
                  <ListItemText primary={`${label}`} />
                </ListItemButton>
              </ListItem>
            );
        })}
      </List>

      <List
        subheader={
          <ListSubheader component="div" id="nested-list-subheader">
            {translate("STUDENTS")}
          </ListSubheader>
        }
      >
        {options?.students?.map((g, i) => {
          const label = g.name;

          return (
            <ListItem>
              <ListItemButton
                onClick={() => {
                  onSubmit({
                    type: "student",
                    data: g,
                  });
                }}
              >
                <ListItemIcon>
                  <Avatar src={`https://source.unsplash.com`} />
                </ListItemIcon>
                <ListItemText primary={`${label}`} />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
      <List
        subheader={
          <ListSubheader component="div" id="nested-list-subheader">
            {translate("TEACHERS")}
          </ListSubheader>
        }
      >
        {options?.teachers?.map((g, i) => {
          const label = g.name;

          return (
            <ListItem>
              <ListItemButton
                onClick={() => {
                  onSubmit({
                    type: "teacher",
                    data: g,
                  });
                }}
              >
                <ListItemIcon>
                  <Avatar src={`https://source.unsplash.com`} />
                </ListItemIcon>
                <ListItemText primary={`${label}`} />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>

      {/* <Autocomplete
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
      /> */}
    </ModalContainer>
  );
};

export default ForwardMessageModal;
