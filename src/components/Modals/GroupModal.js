import React from "react";
import { makeStyles } from "@mui/styles";
import ModalContainer from "../ModalContainer";
import { useDispatch, useSelector } from "react-redux";
import { closeModal } from "../../redux/action/utilActions";

import FormCreator from "../Form/FormCreator";
import {
  createGroup,
  editGroup,
  getAllGroups,
} from "../../redux/action/groupActions";
import { ageGroups } from "../../constants";
import useLanguages from "../../hooks/useLanguage";

const useStyles = makeStyles((theme) => ({
  root: {},
}));

const GroupModal = () => {
  const translate = useLanguages();
  const dispatch = useDispatch();
  const { modalOpen, modalData } = useSelector((state) => state.util);
  const { organizationId, id } = useSelector((state) => state.user);
  const mode = modalData ? "edit" : "add";
  const open = modalOpen === "group";
  const handleClose = () => {
    dispatch(closeModal());
  };

  const handleSubmit = (data) => {
    if (mode === "add")
      dispatch(
        createGroup({ ...data, organizationId, userId: id }, () => {
          dispatch(
            getAllGroups({
              organizationId,
            })
          );
          handleClose();
        })
      );
    else {
      dispatch(
        editGroup({ ...data, organizationId, userId: id }, () => {
          dispatch(
            getAllGroups({
              organizationId,
            })
          );
          handleClose();
        })
      );
    }
  };

  const formData = [
    {
      type: "text",
      name: "groupName",
      label: translate("GROUP_NAME"),
      placeholder: translate("GROUP_NAME_PLACEHOLDER"),
      required: true,
      size: 12,
    },
    {
      type: "select",
      name: "ageGroupId",
      label: translate("AGE_GROUP"),
      options: ageGroups,
      placeholder: translate("AGE_GROUP"),
      optionLabelProp: 'text',
      optionValueProp: 'id',
      required: true,
      size: 12,
    },
  ];

  return (
    <ModalContainer
      open={open}
      hideButtons
      title={modalData ? "Edit Group" : "Create Group"}
      onClose={() => handleClose()}
      size="xs"
    >
      <FormCreator
        mode={mode}
        onSubmit={(e) => handleSubmit(e)}
        onCancel={handleClose}
        formData={formData}
        data={modalData}
      />
    </ModalContainer>
  );
};

export default GroupModal;

