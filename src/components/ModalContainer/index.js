import React from "react";
import { makeStyles, styled } from "@mui/styles";
import {
  Dialog,
  IconButton,
  Typography,
  DialogTitle,
  DialogContent,
  Box,
  DialogActions,
  Button,
  CircularProgress,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/CloseOutlined";

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: "relative",
    background: theme.palette.white,
    borderBottom: `1px solid ${theme.palette.gray[700]}`,
    color: theme.palette.text.primary,
  },
  modalTitle: {
    fontWeight: theme.palette.fontWeights.bold,
    textTransform: "capitalize",
    fontSize: theme.palette.fontSizes.md,
    color: theme.palette.text.primary,
  },
}));

const ModalContainer = ({
  open,
  Footer,
  onClose,
  title,
  isLoading,
  children,
  onSubmit,
  size,
}) => {
  const classes = useStyles();

  return (
    <Dialog
      onClose={onClose}
      fullWidth={true}
      maxWidth={size || "lg"}
      aria-labelledby="customized-dialog-title"
      open={open}
    >
      <DialogTitle style={{ padding: "5px 15px" }}>
        <Box
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography className={classes.modalTitle}>{title}</Typography>
          <IconButton aria-label="close" onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>
      <DialogContent dividers>{children}</DialogContent>

      {onSubmit && (
        <DialogActions>
          <Button
            disabled={isLoading}
            variant="outlined"
            onClick={onClose}
            color="secondary"
          >
            Cancel
          </Button>
          {onSubmit && (
            <Button
              type="submit"
              variant="contained"
              color="primary"
              onClick={onSubmit}
            >
              {isLoading ? (
                <CircularProgress color="inherit" size={25} />
              ) : (
                "Save changes"
              )}
            </Button>
          )}
        </DialogActions>
      )}
    </Dialog>
  );
};
export default ModalContainer;
