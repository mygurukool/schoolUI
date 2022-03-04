import { useTheme } from "@emotion/react";
import React from "react";
import ReactJoyride from "react-joyride";
import { useDispatch, useSelector } from "react-redux";
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

  const steps = [
    {
      content: <h2>Let's begin our journey of learning!</h2>,
      locale: {
        skip: <strong aria-label="skip">SKIP</strong>,
      },
      placement: "center",
      target: "body",
    },
    {
      content: (
        <h2>
          {groups?.length === 0
            ? `Create new groups from here`
            : "Manage Groups from here"}
        </h2>
      ),

      target: ".groupMenu",
    },
    {
      content: <h2>Add New Group From Here</h2>,

      target: ".addGroup",
    },
    {
      content: <h2>Change and select groups from here</h2>,

      target: ".groupSelector",
    },

    {
      content: <h2> select courses from here</h2>,

      target: ".makeStyles-courseBtnContainer-83",
    },
    {
      content: <h2> create courses from here</h2>,

      target: ".addCourse",
    },

    {
      content: <h2> Here is the list of assignments</h2>,

      target: ".assignmentList",
    },

    {
      content: <h2> Chat with teacher</h2>,

      target: ".chatBtn",
    },
    {
      content: <h2> Submit Your Assignment</h2>,

      target: ".turnInBtn",
    },
    {
      content: <h2> Click here to view content</h2>,

      target: ".audioVideo",
    },
    {
      content: <h2> Click here to check submissions</h2>,

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
