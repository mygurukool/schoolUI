import assignmentApi from "../api/assignmentApi";
import { assignmentTypes, commonTypes } from "../types";

export const getAssignments = (data, cb, errorCb) => {
  return {
    type: assignmentTypes.GET_ASSIGMENT,
    payload: {
      request: {
        url: assignmentApi.GET_ASSIGNMENTS,
        method: "get",
        params: {
          courseId: data,
        },
      },
      enableMessage: false,
      cb: cb,
      errorCb: errorCb,
    },
  };
};

export const getSubmission = (data, cb, errorCb) => {
  return {
    type: commonTypes.GET_SUBMISSION,
    payload: {
      request: {
        url: assignmentApi.GET_SUBMISSION,
        method: "get",
        params: {
          id: data,
        },
      },
      enableMessage: false,
      cb: cb,
      errorCb: errorCb,
    },
  };
};

export const getStudentFiles = (data, cb, errorCb) => {
  return {
    type: assignmentTypes.GET_STUDENT_FILES,
    payload: {
      request: {
        url: assignmentApi.GET_STUDENT_FILES,
        method: "get",
        params: data,
      },
      enableMessage: false,
      cb: cb,
      errorCb: errorCb,
    },
  };
};

export const createAssignmet = (data, cb, errorCb) => {
  const formData = new FormData();
  Object.keys(data).forEach((key) => {
    if (key === "uploadExercises") {
      data.uploadExercises.forEach((f) => {
        if (f.type) {
          if (f.type === "link") {
            formData.append("uploadExercises", JSON.stringify([f.metaData]));
          } else {
            formData.append("uploadExercises", f.metaData);
          }
        }
      });
    } else if (key === "audioVideo") {
      formData.append("audioVideo", JSON.stringify(data.audioVideo));
    } else if (key === "students") {
      formData.append("students", JSON.stringify(data.students));
    } else {
      formData.append(key, data[key]);
    }
  });
  return {
    type: assignmentTypes.CREATE_ASSIGMENT,
    payload: {
      request: {
        url: assignmentApi.CREATE_ASSIGNMENT,
        method: "post",
        data: formData,
        headers: {
          "Content-type": "application/json",
        },
      },
      successMessage: "Assignmet Added successfully",
      errorMessage: "Failed to add assignment",
      enableMessage: true,
      cb: cb,
      errorCb: errorCb,
    },
  };
};

export const editAssignmet = (data, cb, errorCb) => {
  console.log("editAssignmet", data);
  const formData = new FormData();
  Object.keys(data).forEach((key) => {
    if (key === "uploadExercises") {
      data.uploadExercises.forEach((f) => {
        console.log("loop", f.metaData);
        if (f.type) {
          if (f.type === "link") {
            formData.append("uploadExercises", JSON.stringify([f.metaData]));
          } else {
            console.log("editAssignmet", f);
            formData.append("uploadExercises", f.metaData);
          }
        }
      });
    } else if (key === "audioVideo") {
      formData.append("audioVideo", JSON.stringify(data.audioVideo));
    } else if (key === "students") {
      formData.append("students", JSON.stringify(data.students));
    } else {
      formData.append(key, data[key]);
    }
  });
  return {
    type: assignmentTypes.EDIT_ASSIGMENT,
    payload: {
      request: {
        url: assignmentApi.EDIT_ASSIGNMENT,
        method: "put",
        data: formData,
        headers: {
          "Content-type": "application/json",
        },
      },
      successMessage: "Assignmet edited successfully",
      errorMessage: "Failed to edit assignment",
      enableMessage: true,
      cb: cb,
      errorCb: errorCb,
    },
  };
};

export const deleteAssignmet = (data, cb, errorCb) => {
  return {
    type: assignmentTypes.DELETE_ASSIGMENT,
    payload: {
      request: {
        url: assignmentApi.DELETE_ASSIGNMENT,
        method: "delete",
        data: data,
      },
      successMessage: "Assignmet deleted successfully",
      errorMessage: "Failed to delete assignment",
      enableMessage: true,
      cb: cb,
      errorCb: errorCb,
    },
  };
};

export const deleteUploadedFile = (data, cb, errorCb) => {
  return {
    type: assignmentTypes.DELETE_UPLOADED_FILE,
    payload: {
      request: {
        url: assignmentApi.DELETE_EXCERCISE_FILE,
        method: "delete",
        data: data,
      },
      successMessage: "file deleted successfully",
      errorMessage: "Failed to delete file",
      enableMessage: true,
      cb: cb,
      errorCb: errorCb,
    },
  };
};
