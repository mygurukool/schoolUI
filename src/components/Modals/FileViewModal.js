import React, { useState } from "react";
import { makeStyles } from "@mui/styles";
import { useDispatch, useSelector } from "react-redux";
import ModalContainer from "../ModalContainer";
import { closeModal } from "../../redux/action/utilActions";
import { BASEURL } from "../../constants";
import { pdfjs, Document, Page } from "react-pdf";
import FileViewer from "@nuzz78/react-file-viewer";
import { Button, Pagination, Stack } from "@mui/material";
import ErrorDisplay from "../Error/ErrorDisplay";
import FileLoading from "../Loading/FileLoading";
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
  const [isFileLoaded, setIsFileLoaded] = useState(false);
  const [isError, setIsError] = useState(false);

  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  const handleClose = () => {
    dispatch(closeModal());
    setPageNumber(1);
    setNumPages(null);
    setIsFileLoaded(false);
    setIsError(false);
  };

  function onDocumentLoadSuccess({ numPages }) {
    setIsFileLoaded(true);
    setNumPages(numPages);
  }

  const onChangePage = (event, value) => {
    setPageNumber(value);
  };

  const { modalOpen, modalData } = useSelector((state) => state.util);

  const open = modalOpen === "fileview";
  console.log("modalOpen", modalData);
  const fileType = mime.extension(modalData?.mimetype);
  const url = "http://www.africau.edu/images/default/sample.pdf";

  const renderFile = (data) => {
    switch (fileType.toLocaleLowerCase()) {
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
          <Stack direction="column">
            {isFileLoaded && numPages && (
              <Stack direction="row">
                <Pagination count={numPages} onChange={onChangePage} />
              </Stack>
            )}
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
                onLoadSuccess={onDocumentLoadSuccess}
                onLoadError={(err) => setIsError(true)}
                error={() => <ErrorDisplay />}
                loading={() => <FileLoading />}
              >
                <Page pageNumber={pageNumber} />
              </Document>
            </div>
          </Stack>
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
              errorComponent={ErrorDisplay}
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
      onClose={() => handleClose()}
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
      {isError ? <ErrorDisplay /> : fileType && renderFile(modalData)}
    </ModalContainer>
  );
};

export default FileViewModal;
