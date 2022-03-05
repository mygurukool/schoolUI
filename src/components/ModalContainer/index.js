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
  Divider,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/HighlightOffTwoTone";
import useLanguages from "../../hooks/useLanguage";

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
  fullScreen: {
    borderRadius: 0,
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
  submitTitle,
  fullScreen,
  hideButtons,
}) => {
  const classes = useStyles();
  const translate = useLanguages()
  return (
    <Dialog
      onClose={onClose}
      fullWidth={true}
      maxWidth={size || "lg"}
      aria-labelledby="customized-dialog-title"
      open={open}
      fullScreen={fullScreen}
    >
      <DialogTitle style={{ padding: "5px 15px" }}>
        <Box
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography className={classes.modalTitle} variant="subtitle1">{title}</Typography>
          <IconButton color="error" aria-label="close" onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>
      {children && <DialogContent dividers>{children}</DialogContent>}

      {!hideButtons && (
        <>
          <Divider />
          <DialogActions>
            {onClose && (
              <Button
                disabled={isLoading}
                variant="outlined"
                onClick={onClose}
                color="secondary"
              >
                {translate("CANCEL")}
              </Button>
            )}
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
                  submitTitle || translate("SUBMIT")
                )}
              </Button>
            )}
          </DialogActions>
        </>
      )}
    </Dialog>
  );
};
export default ModalContainer;
