import React from "react";
import { makeStyles } from "@mui/styles";
import { useDispatch, useSelector } from "react-redux";
import ModalContainer from "../ModalContainer";
import { closeModal } from "../../redux/action/utilActions";
import { BASEURL } from "../../constants";
import { pdfjs, Document, Page } from "react-pdf";
import FileViewer from "@nuzz78/react-file-viewer";
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;
const mime = require("mime-types");

const useStyles = makeStyles((theme) => ({
  root: {},
  img: {
    width: "80%",
    minHeight: "50vh",
    resizeMode: "contain",
  },
}));

const FileViewModal = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const { modalOpen, modalData } = useSelector((state) => state.util);

  const open = modalOpen === "fileview";

  const fileType = mime.extension(modalData?.mimetype);
  const url = "http://www.africau.edu/images/default/sample.pdf";
  const renderFile = (data) => {
    switch (fileType) {
      case "png" || "jpg" || "jpeg" || "gif":
        return (
          <img
            src={`${BASEURL}/file/view/${modalData?.id}`}
            className={classes.img}
            alt={modalData.title}
          />
        );

      case "pdf":
        return (
          <div
            style={{
              height: "50vh",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Document
              file={{
                url: `${BASEURL}/file/view/${modalData?.id}`,
              }}
              onLoadSuccess={(s) => console.log("modalData load scc", s)}
              onLoadError={(err) => console.log("modalData load Err", err)}
            >
              <Page pageNumber={1} />
            </Document>
          </div>
        );

      case "docx":
        return (
          <div
            style={{
              height: "50vh",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <FileViewer
              fileType={mime.extension(modalData?.mimetype)}
              filePath={`${BASEURL}/file/view/${modalData?.id}`}
              errorComponent={<div>An error occured</div>}
              onError={(err) => alert(JSON.stringify(err))}
            />
          </div>
        );

      default:
        break;
    }
  };
  return (
    <ModalContainer
      open={open}
      onClose={() => dispatch(closeModal())}
      title={modalData?.filename || "Upload Excersice"}
      size="xl"
      fullScreen
    >
      {/* {modalData && (
          <FileViewer
            fileType={mime.extension(modalData?.mimetype)}
            filePath={`${BASEURL}/file/view/${modalData?.id}`}
            errorComponent={<div>An error occured</div>}
            onError={(err) => alert(JSON.stringify(err))}
            
          />
        )} */}
      {fileType && renderFile(modalData)}
    </ModalContainer>
  );
};

export default FileViewModal;
