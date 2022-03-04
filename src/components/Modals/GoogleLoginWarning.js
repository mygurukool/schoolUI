import { Warning } from "@mui/icons-material";
import { Alert, Link, Stack, Typography } from "@mui/material";
import React from "react";
import ModalContainer from "../ModalContainer";

const sections = [
  {
    title: "List of Data to be stored and how it will be used",
    list: [
      "Your Email id, google id will be stored for login again and auto login functionaliy.",
    ],
  },
  {
    title: "Data Privacy",
    list: [
      "The data will not be shared with any 3rd party, but for mougl.school usage only.",
      "Your Data will be deleted after inactiviy of your account after 2 years.",
    ],
  },

  {
    title: "Privacy policy",
    description: "Please read our privacy policy for more information",

    link: {
      title: "Privacy Policy",
      path: "privacy",
    },
  },
];

const GoogleLoginWarning = ({ open, onClose, onSubmit }) => {
  return (
    <ModalContainer
      open={open}
      onClose={onClose}
      onSubmit={() => onSubmit()}
      title="Desclaimer"
      size="md"
      submitTitle="Continue"
    >
      <Stack direction="column" spacing={2}>
        <Stack direction="row" alignItems="center" justifyContent={"center"}>
          <Alert variant="filled" severity="warning">
            You are about to login with google
          </Alert>
        </Stack>
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
      <Typography variant="h6">{title}</Typography>

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
