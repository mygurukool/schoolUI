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
import { useDispatch } from "react-redux";
import { openModal } from "../../redux/action/utilActions";
import axios from "axios";
import { BASEURL, SCOPES } from "../../constants";
import {
  deleteExcerciseFile,
  uploadExcerciseFile,
} from "../../redux/action/studentActions";
import PermissionsGate from "../../components/PermissionGate";
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
  const dispatch = useDispatch();
  const title = getTitle(props);
  const assignmentId = props.assignmentId;
  const fileId = props.id || props._id;
  const files = props.files;

  const uploadInputRef = React.useRef();

  const onViewFile = (e, d) => {
    e.stopPropagation();

    if (d.ogTitle) {
      window.open(d.ogUrl, "_blank");
      return;
    }

    dispatch(openModal("fileview", d));
  };
  const onDownloadFile = (e, d) => {
    e.stopPropagation();
    if (d.ogTitle) {
      window.open(d.ogUrl, "_blank");
      return;
    }
    window.open(`${BASEURL}/file/download/${d.id || d._id}`);
  };

  const onUploadFile = (e, d) => {
    e.stopPropagation();

    uploadInputRef.current.click();
  };

  const handleUpload = (file) => {
    dispatch(uploadExcerciseFile({ file, assignmentId, fileId }));
  };

  const handleDelete = (e, fileId) => {
    e.stopPropagation();

    dispatch(deleteExcerciseFile({ fileId }));
  };

  return (
    <>
      <Accordion className={classes.root} elevation={0} variant="outlined">
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
            <input
              ref={uploadInputRef}
              hidden
              type="file"
              onChange={(e) => {
                const value = e.target.files[0];
                handleUpload(value);
              }}
              // {...register("file")}
            />
            <Typography variant="subtitle2">{title}</Typography>
            <div>
              <IconButton
                color="neutral"
                onClick={(event) => onViewFile(event, props)}
              >
                <ViewIcon fontSize="small" />
              </IconButton>
              <IconButton
                color="neutral"
                onClick={(event) => onDownloadFile(event, props)}
              >
                <DownloadIcon fontSize="small" />
              </IconButton>
              <PermissionsGate scopes={[SCOPES.CAN_CREATE_ASSIGNMENT_WORK]}>
                <IconButton
                  color="green"
                  onClick={(event) => onUploadFile(event)}
                >
                  <UploadIcon fontSize="small" />
                </IconButton>
              </PermissionsGate>
            </div>
          </div>
        </AccordionSummary>

        {files && files.length > 0 && (
          <AccordionDetails style={{ padding: 0, margin: 0 }}>
            <div style={{ width: "100%" }}>
              <List dense={true}>
                {files.map((f, fi) => {
                  console.log("fileID", f);
                  return (
                    <ListItem key={fi}>
                      <ListItemText primary={f.file.filename} />
                      <ListItemSecondaryAction>
                        <IconButton
                          color="primary"
                          onClick={(e) => onViewFile(e, f.file)}
                        >
                          <ViewIcon fontSize="small" />
                        </IconButton>
                        <IconButton
                          color="primary"
                          onClick={(e) => onDownloadFile(e, f.file)}
                        >
                          <DownloadIcon fontSize="small" />
                        </IconButton>
                        <IconButton
                          color="primary"
                          onClick={(e) => handleDelete(e, f.id || f._id)}
                        >
                          <DeleteIcon fontSize="small" />
                        </IconButton>
                      </ListItemSecondaryAction>
                    </ListItem>
                  );
                })}
              </List>
            </div>
          </AccordionDetails>
        )}
      </Accordion>
    </>
  );
};

export default Uploadexercise;

const getTitle = (a) => {
  if (a.ogTitle) return a.ogTitle;

  return a.filename || a.title;
  // switch (a.type) {
  //   case :

  //     break;

  //   default:
  //     break;
  // }
};
