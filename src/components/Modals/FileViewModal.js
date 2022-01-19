import React from "react";
import { makeStyles } from "@mui/styles";
import { useDispatch, useSelector } from "react-redux";
import ModalContainer from "../ModalContainer";
import { closeModal } from "../../redux/action/utilActions";
import FileViewer from "@nuzz78/react-file-viewer";
import { BASEURL } from "../../constants";
const mime = require("mime-types");

const useStyles = makeStyles((theme) => ({
  root: {},
}));

const FileViewModal = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const { modalOpen, modalData } = useSelector((state) => state.util);

  const open = modalOpen === "fileview";

  console.log("modalData", modalData);

  return (
    <ModalContainer
      open={open}
      onClose={() => dispatch(closeModal())}
      title={modalData?.filename || "Upload Excersice"}
      size="xl"
    >
      {modalData && (
        <FileViewer
          fileType={mime.extension(modalData?.mimetype)}
          filePath={`${BASEURL}/file/view/${modalData?.id}`}
          errorComponent={<div>An error occured</div>}
          onError={(err) => alert(JSON.stringify(err))}
        />
      )}
    </ModalContainer>
  );
};

export default FileViewModal;
