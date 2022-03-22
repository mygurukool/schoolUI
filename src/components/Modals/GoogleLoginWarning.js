import { Warning } from "@mui/icons-material";
import { Alert, Link, Stack, Typography } from "@mui/material";
import React from "react";
import useLanguages from "../../hooks/useLanguage";
import ModalContainer from "../ModalContainer";
import {
  openModal,
} from "../../redux/action/utilActions";
import { useDispatch, useSelector } from "react-redux";
const GoogleLoginWarning = () => {
  const dispatch = useDispatch()
  const handleClose = () => {
    dispatch(openModal("welcome"))
  }
  const translate = useLanguages()
  const { modalOpen } = useSelector((state) => state.util);
  const open = modalOpen === "googlewarning";
  const sections = [
    {
      title: translate("LIST_OF_DATA_TO_BE_STORED_AND_HOW_IT_WILL_BE_USED"),
      list: [
        translate("YOUR_IDS_WILL_BE_STORED"),
      ],
    },
    {
      title: translate("DATA_PRIVACY"),
      list: [
        translate("DATA_WILL_NOT_BE_SHARED"),
        translate("DATA_WILL_BE_DELETED"),
      ],
    },
    {
      title: translate("PRIVACY_POLICY"),
      description: translate("READ_PRIVACY_POLICY"),

      link: {
        title: translate("PRIVACY_POLICY"),
        path: translate("PRIVACY"),
      },
    },
  ];


  return (
    <ModalContainer
      open={open}
      onClose={handleClose}
      title={translate("DISCLAIMER")}
      size="md"
      submitTitle="Continue"
    >
      <Stack direction="column" spacing={2}>
        {/* <Stack direction="row" alignItems="center" justifyContent={"center"}>
          <Alert variant="filled" severity="warning">
            {translate("YOU_ARE_ABOUT_TO_LOGIN_WITH_GOOGLE")}
          </Alert>
        </Stack> */}
        {sections.map((s, si) => {
          return <ContentSection {...s} key={si} />;
        })}
      </Stack>
    </ModalContainer>
  );
};

export default GoogleLoginWarning;

const ContentSection = ({ title, description, list, link }) => {
  return (
    <Stack direaction="column" spacing={1}>
      <Typography variant="subtitle1">{title}</Typography>

      {description && <Typography variant="body2">{description}</Typography>}
      {list && (
        <ul>
          {list.map((a, ai) => {
            return (
              <li key={ai} style={{ marginLeft: 20 }}>
                <Typography variant="body2">{a}</Typography>
              </li>
            );
          })}
        </ul>
      )}
      {link && (
        <Link href={`/${link.path}`}>
          <Typography>{link.title}</Typography>
        </Link>
      )}
    </Stack>
  );
};
