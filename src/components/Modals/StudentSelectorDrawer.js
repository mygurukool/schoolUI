import React from "react";
import { makeStyles } from "@mui/styles";
import {
  Checkbox,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Stack,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { HighlightOffTwoTone } from "@mui/icons-material";
import useLanguages from "../../hooks/useLanguage";

const useStyles = makeStyles((theme) => ({
  root: {},
}));

const StudentSelectorDrawer = ({
  open,
  onClose,
  students: allStudents,
  setStudents,
  defaultSelected,
}) => {
  const [selectedStudents, setSelectedStudents] = React.useState([]);

  const handleClose = () => {
    setStudents(selectedStudents);
    onClose();
  };

  React.useEffect(() => {
    if (open) {
      setAllStudents();
      if (defaultSelected) {
        setSelectedStudents(defaultSelected || []);
      }
    }
  }, [open, allStudents]);
  const classes = useStyles();
  const isAllSelected = selectedStudents.length === allStudents.length;

  const onChangeStudent = (id) => {
    const isStudentSelected = selectedStudents.includes(id);
    if (isStudentSelected) {
      setSelectedStudents(selectedStudents.filter((s) => s !== id));
    } else {
      setSelectedStudents([...selectedStudents, id]);
    }
  };

  const setAllStudents = () => {
    setSelectedStudents(allStudents.map((a) => a?.id || a._id));
  };
  const translate = useLanguages()
  return (
    <Drawer
      open={open}
      onClose={handleClose}
      anchor={"right"}
      className={classes.drawerRoot}
      style={{
        zIndex: 1500,
      }}
    >
      <Box sx={{ width: 300 }} role="presentation">
        <Box px={2} py={2}>
          <Stack flexDirection="row" justifyContent="space-between" alignItems="center">
            <Typography variant="subtitle1">{translate("SELECT_STUDENTS")}</Typography>

            <IconButton color="error" onClick={handleClose} size="small">
              <HighlightOffTwoTone />
            </IconButton>
          </Stack>
        </Box>
        <Divider />
        <List>
          <ListItem>
            <Checkbox
              edge="start"
              checked={isAllSelected}
              onChange={() => setAllStudents()}
            />
            <ListItemText primary={translate("ALL_STUDENTS")} />
          </ListItem>

          {allStudents.map((s, si) => {
            return (
              <ListItem>
                <Checkbox
                  edge="start"
                  checked={selectedStudents.includes(s?.id || s._id)}
                  onChange={(e) => onChangeStudent(s?.id || s._id)}
                />
                <ListItemText primary={s.name} secondary={s.email} />
              </ListItem>
            );
          })}
        </List>
      </Box>
    </Drawer>
  );
};
export default StudentSelectorDrawer;
