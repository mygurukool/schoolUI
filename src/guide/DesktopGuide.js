import { useTheme } from "@emotion/react";
import React from "react";
import ReactJoyride from "react-joyride";
import { useDispatch, useSelector } from "react-redux";
import useLanguages from "../hooks/useLanguage";
import { toggleGuide } from "../redux/action/utilActions";

const DesktopGuide = () => {
  const dispatch = useDispatch();
  const theme = useTheme();

  // const [run, setRun] = React.useState(false);
  const { groups, courses } = useSelector((state) => state.common);
  const { isGuideOpen: run, isWelcomeGuideOpen } = useSelector(
    (state) => state.util
  );
  const [step, setStep] = React.useState(1);

  const translate = useLanguages();

  const steps = [
    {
      content: <h2>{translate("BEGIN_JOURNEY")}</h2>,
      locale: {
        skip: <strong aria-label="skip">{translate("SKIP")}</strong>,
      },
      placement: "center",
      target: "body",
    },
    {
      content: (
        <h2>
          {groups?.length === 0
            ? translate("CREATE_GROUP_HERE")
            : translate("MANAGE_GROUP_HERE")}
        </h2>
      ),

      target: ".groupMenu",
    },
    {
      content: <h2>{translate("ADD_GROUP_HERE")}</h2>,

      target: ".addGroup",
    },
    {
      content: <h2>{translate("CHANGE_SELECT_GROUP_HERE")}</h2>,

      target: ".groupSelector",
    },

    {
      content: <h2>{translate("SELECT_COURSE_FROM_HERE")}</h2>,

      target: ".courseSelector",
    },
    {
      content: <h2>{translate("CREATE_COURSE_HERE")}</h2>,

      target: ".addCourse",
    },

    {
      content: <h2>{translate("CLICK_HERE_FOR_WHITEBOARD")}</h2>,

      target: ".whiteboardBtn",
    },
    {
      content: <h2>{translate("CLICK_HERE_FOR_CONFERENCE")}</h2>,

      target: ".conferenceBtn",
    },

    {
      content: <h2>{translate("HERE_IS_LIST_OF_ASSIGNMENTS")}</h2>,

      target: ".assignmentList",
    },

    {
      content: <h2>{translate("CHAT_WITH_TEACHER")}</h2>,

      target: ".chatBtn",
    },
    {
      content: <h2>{translate("SUBMIT_YOUR_ASSIGNMENT")}</h2>,

      target: ".turnInBtn",
    },
    {
      content: <h2>{translate("CLICK_HERE_TO_VIEW_CONTENT")}</h2>,

      target: ".audioVideo",
    },
    {
      content: <h2>{translate("HERE_IS_THE_LIST_OF_UPLOADED_FILES")}</h2>,

      target: ".uploadExercises",
    },
    {
      content: <h2>{translate("CLICK_HERE_TO_VIEW_FILE")}</h2>,

      target: ".viewFile",
    },
    {
      content: <h2>{translate("CLICK_HERE_TO_DOWNLOAD_FILE")}</h2>,

      target: ".downloadFile",
    },

    {
      content: <h2>{translate("CLICK_HERE_TO_UPLOAD_FILE")}</h2>,

      target: ".uploadFile",
    },
    {
      content: <h2>{translate("CLICK_HERE_TO_VIEW_UPLOADED_FILES")}</h2>,

      target: ".fileCard",
    },
    {
      content: <h2>{translate("CLICK_HERE_TO_CHECK_SUBMISSIONS")}</h2>,

      target: ".checkSubmission",
    },
  ];

  const handleStepChange = (state) => {
    if (state.action === "reset") {
      dispatch(toggleGuide());
      // setStep(0);
      setStep(state.index);
    } else {
      setStep(state.index);
    }
  };

  return (
    <div>
      <ReactJoyride
        continuous={true}
        scrollToFirstStep={true}
        showProgress={false}
        showSkipButton={true}
        disableScrollParentFix
        steps={steps}
        run={!isWelcomeGuideOpen && run}
        styles={{
          options: {
            zIndex: 10000,
            primaryColor: theme.palette.secondary.main,
          },
        }}
        callback={(state) => handleStepChange(state)}
      // stepIndex={step}
      />
    </div>
  );
};

export default DesktopGuide;
