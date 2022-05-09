import React from "react";
import { makeStyles } from "@mui/styles";
import ModalContainer from "../ModalContainer";
import { useDispatch, useSelector } from "react-redux";
import { closeModal, openModal } from "../../redux/action/utilActions";

import FormCreator from "../Form/FormCreator";
import {
  createCourse,
  editCourse,
  getAllCourses,
} from "../../redux/action/coursesActions";
import useLanguages from "../../hooks/useLanguage";
import getFirstSessionOfOrganization from "../../helpers/getFirstSessionOfOrganization";

const useStyles = makeStyles((theme) => ({
  root: {},
}));

const CreateCourse = () => {
  const translate = useLanguages();
  const dispatch = useDispatch();
  const { modalOpen, modalData } = useSelector((state) => state.util);
  const { id } = useSelector((state) => state.user);
  const { currentGroup } = useSelector((state) => state.common);
  const groupId = currentGroup?.id || currentGroup?._id;
  const isEditMode = modalData && !modalData.organizationId;

  const hasSelectedGroup = modalData ? modalData?.selectedGroup : undefined;

  const mode = isEditMode ? "edit" : "add";
  const open = modalOpen === "course";

  const groups = useSelector((state) => state.common.groups);
  const handleClose = () => {
    const isFirstSession = getFirstSessionOfOrganization();
    if (isFirstSession) {
      dispatch(openModal("welcome", {}));
    } else {
      dispatch(closeModal());
    }
  };

  const handleSubmit = (data) => {
    if (mode === "add")
      dispatch(
        createCourse({ ...data, userId: id, currentGroup }, () => {
          dispatch(getAllCourses({ groupId }));
          handleClose();
        })
      );
    else {
      dispatch(
        editCourse({ ...data, userId: id }, () => {
          dispatch(getAllCourses({ groupId }));
          handleClose();
        })
      );
    }
  };

  const [defaultGroup, setDefaultGroup] = React.useState([]);
  const [defaultGroupIds, setDefaultGroupIds] = React.useState([]);

  React.useEffect(() => {
    if (open) {
      setDefaultGroup([
        ...groups,
        ...(hasSelectedGroup ? [hasSelectedGroup] : []),
      ]);
      setDefaultGroupIds(
        hasSelectedGroup
          ? [hasSelectedGroup?._id || hasSelectedGroup?.id]
          : [currentGroup?._id || currentGroup?.id]
      );
    }
  }, [open]);

  const createformData = [
    {
      type: "text",
      name: "courseName",
      label: translate("NAME"),
      placeholder: translate("NAME_PLACEHOLDER"),
      required: true,
      size: 12,
    },
    {
      type: "multiselect",
      name: "groupId",
      label: translate("CLASS_NAME"),
      placeholder: translate("CLASS_NAME_PLACEHOLDER"),
      required: true,
      size: 12,
      hasOptions: true,
      optionLabelProp: "groupName",
      optionValueProp: "_id",
    },
  ];

  console.log(
    "hasSelectedGroup",
    hasSelectedGroup,
    [...groups, ...(hasSelectedGroup ? [hasSelectedGroup] : [])],

    hasSelectedGroup
      ? [hasSelectedGroup?.id || hasSelectedGroup?._id]
      : [currentGroup?.id || currentGroup?._id]
  );

  return (
    <ModalContainer
      open={open}
      title={isEditMode ? "Edit Course" : "Create Course"}
      onClose={() => handleClose()}
      size="xs"
      hideButtons
    >
      <FormCreator
        mode={isEditMode ? "edit" : "add"}
        onSubmit={(e) => handleSubmit(e)}
        onCancel={handleClose}
        formData={createformData}
        data={{
          groupId: defaultGroupIds,
          ...modalData,
        }}
        optionsData={{
          groupId: defaultGroup,
        }}
      />
    </ModalContainer>
  );
};

export default CreateCourse;
