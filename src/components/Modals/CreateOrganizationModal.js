import React from "react";
import { makeStyles } from "@mui/styles";
import ModalContainer from "../ModalContainer";
import { useDispatch, useSelector } from "react-redux";
import { closeModal, openModal } from "../../redux/action/utilActions";

import FormCreator from "../Form/FormCreator";

import useLanguages from "../../hooks/useLanguage";
import getFirstSessionOfOrganization from "../../helpers/getFirstSessionOfOrganization";
import { createOrganization } from "../../redux/action/organizationActions";
import axios from "axios";
import { platforms } from "../../constants";

const CreateOrganization = () => {
  const translate = useLanguages();
  const dispatch = useDispatch();
  const [countries, setCountries] = React.useState([]);

  const { modalOpen, modalData } = useSelector((state) => state.util);
  const { id, email, name } = useSelector((state) => state.user);
  const { currentGroup, currentCourse } = useSelector((state) => state.common);
  const groupId = currentGroup?.id || currentGroup?._id;
  console.log("modalData", modalData);
  const open = modalOpen === "organization";

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
    dispatch(
      createOrganization(
        {
          ...data,
          userId: id,
          email: email,
          name: name,
          currentGroup: currentGroup,
        },
        (res) => {
          const orgId = res.data.organization._id || res.data.organization.id;
          console.log("organization res", orgId);
          if (modalData.type === "group") {
            // console.log("org", res.data.data);
            dispatch(openModal("group", { organizationId: orgId }));
          } else if (modalData.type === "course") {
            dispatch(openModal("course", { organizationId: orgId }));
          } else if (modalData.type === "assignment") {
            dispatch(
              openModal("assignment", {
                organizationId: orgId,
                action: "new",
                ...(currentGroup.platformName === platforms.GOOGLE && {
                  groupName: currentGroup.groupName,
                }),
                ...(currentCourse.platformName === platforms.GOOGLE && {
                  gCourseId: currentCourse.id,
                  courseName: currentCourse.name,
                }),
              })
            );
          }
          // dispatch(getAllCourses({ groupId }));
          // handleClose();
        }
      )
    );
  };

  const formData = [
    {
      type: "text",
      name: "organizationName",
      label: translate("ORGANIZATION_NAME"),
      placeholder: translate("ORGANIZATION_NAME_PLACEHOLDER"),
      required: true,
      size: 12,
    },
    {
      type: "select",
      name: "organizationSize",
      size: 6,

      label: translate("ORGANIZATION_SIZE"),
      options: [
        {
          title: "1",
          value: "1",
        },
        {
          title: "2-10",
          value: "2-10",
        },
        {
          title: "11-20",
          value: "11-20",
        },
        {
          title: "20+",
          value: "20+",
        },
      ],
      optionLabelProp: "title",
      optionValueProp: "value",
      required: true,
    },
    {
      type: "autocomplete",
      name: "country",
      size: 6,
      label: translate("COUNTRY"),

      optionLabelProp: "title",
      optionValueProp: "value",
      optionIconProp: "icon",
      required: true,
      hasOptions: true,
    },

    {
      type: "textarea",
      name: "organizationAddress",
      label: translate("ORGANIZATION_ADDRESS"),
      placeholder: translate("ORGANIZATION_ADDRESS_PLACEHOLDER"),
      required: true,
      size: 12,
    },
    {
      type: "password",
      name: "password",
      label: translate("PASSWORD"),
      placeholder: translate("PASSWORD_PLACEHOLDER"),
      required: true,
      size: 12,
    },
  ];

  const getCountries = async () => {
    return await axios
      .get("https://restcountries.com/v3.1/all", {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods":
            "GET, POST, PATCH, PUT, DELETE, OPTIONS",
          "Access-Control-Allow-Headers": "Origin, Content-Type, X-Auth-Token",
        },
      })
      .then(async (res) => {
        const response = res.data;
        let con = [];
        await response.map((r) => {
          con.push({
            title: r.name.common,
            value: r.name.common,
            icon: r.flags.svg,
          });
        });
        return con;
      })
      .catch((error) => {
        console.log(error);
      });
  };

  React.useEffect(async () => {
    if (open) {
      const con = await getCountries();
      if (con) {
        setCountries(con);
      }
    }
  }, [open]);
  return (
    <ModalContainer
      open={open}
      title={"Create Organization"}
      onClose={() => handleClose()}
      size="sm"
      hideButtons
    >
      <FormCreator
        mode={"add"}
        onSubmit={(e) => handleSubmit(e)}
        onCancel={handleClose}
        formData={formData}
        data={{}}
        optionsData={{
          country: countries,
        }}
      />
    </ModalContainer>
  );
};

export default CreateOrganization;
