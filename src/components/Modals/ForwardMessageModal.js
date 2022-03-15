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

  // const handleSubmit = () => {
  //   if (selected.length > 0) {
  //     onSubmit(selected);
  //   } else {
  //     onClose();
  //     setSelected([]);
  //   }
  // };

  const filterStudentFromExistingGroups = () => {
    const twoUsergroups = options?.groups.filter((g) => g.users.length === 2);
    const filteredStudents = options?.students.filter((s) => {
      const findGroup = twoUsergroups.find((g) => {
        const foundUser = g.users.find((u) => {
          return u.id === s.id || u.id === s._id;
        });
        if (foundUser) {
          return true;
        } else {
          return false;
        }
      });
      if (findGroup) {
        return false;
      } else {
        return true;
      }
    });
    return filteredStudents || [];
  };

  const filterTeachersFromExistingGroups = () => {
    const twoUsergroups = options?.groups.filter((g) => g.users.length === 2);
    const filteredStudents = options?.teachers.filter((s) => {
      const findGroup = twoUsergroups.find((g) => {
        const foundUser = g.users.find((u) => {
          return u.id === s.id || u.id === s._id;
        });
        if (foundUser) {
          return true;
        } else {
          return false;
        }
      });
      if (findGroup) {
        return false;
      } else {
        return true;
      }
    });
    return filteredStudents || [];
  };
  const translate = useLanguages();
  return (
    <ModalContainer
      open={open}
      title={translate("FORWARD_MESSAGE")}
      onClose={() => {
        setSelected([]);

        onClose();
      }}
      size="xs"
    >
      <List
        subheader={
          <ListSubheader component="div" id="nested-list-subheader">
            {translate("ACTIVE_CHATS")}
          </ListSubheader>
        }
      >
        {options?.groups?.map((g, i) => {
          const label = g.users.length > 2 ? "Group" : g.users[0].name;
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
        {filterStudentFromExistingGroups().map((g, i) => {
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
        {filterTeachersFromExistingGroups().map((g, i) => {
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
