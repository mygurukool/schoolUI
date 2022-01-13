import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
  ListSubheader,
  Typography,
} from "@mui/material";
import React from "react";
import ViewIcon from "@mui/icons-material/VisibilityTwoTone";
import DownloadIcon from "@mui/icons-material/GetAppTwoTone";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import UploadIcon from "@mui/icons-material/BackupTwoTone";
import DeleteIcon from "@mui/icons-material/DeleteTwoTone";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    "&:before": {
      background: "none",
    },
  },
  AccordionSummary: {
    margin: 0,
    "& .MuiAccordionSummary-content.Mui-expanded": {
      margin: 0,
    },
  },
}));

const Uploadexercise = ({ ...props }) => {
  const classes = useStyles();
  const title = getTitle(props);

  const onDownloadFile = () => {};

  return (
    <>
      <Accordion className={classes.root} elevation={0}>
        <AccordionSummary
          className={classes.AccordionSummary}
          expandIcon={<ExpandMoreIcon />}
          aria-label="Expand"
          aria-controls="additional-actions1-content"
          id="additional-actions1-header"
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              width: "100%",
            }}
          >
            <Typography variant="subtitle2">{title}</Typography>
            <div>
              <IconButton
                color="secondary"
                onClick={(event) => event.stopPropagation()}
              >
                <ViewIcon fontSize="small" />
              </IconButton>
              <IconButton
                color="secondary"
                onClick={(event) => event.stopPropagation()}
              >
                <DownloadIcon fontSize="small" />
              </IconButton>
              <IconButton
                color="secondary"
                onClick={(event) => event.stopPropagation()}
              >
                <UploadIcon fontSize="small" />
              </IconButton>
            </div>
          </div>
        </AccordionSummary>
        <AccordionDetails style={{ padding: 0, margin: 0 }}>
          <div style={{ width: "100%" }}>
            <List dense={true}>
              <ListItem>
                <ListItemText primary="Single-line item" />
                <ListItemSecondaryAction>
                  {/* <IconButton color="primary">
                    <ViewIcon fontSize="small" />
                  </IconButton> */}
                  <IconButton color="primary" onClick={onDownloadFile}>
                    <DownloadIcon fontSize="small" />
                  </IconButton>
                  <IconButton color="primary">
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            </List>
          </div>
        </AccordionDetails>
      </Accordion>
    </>
  );
};

export default Uploadexercise;

const getTitle = (a) => {
  return a.filename;
  // switch (a.type) {
  //   case :

  //     break;

  //   default:
  //     break;
  // }
};
