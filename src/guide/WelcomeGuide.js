import { useTheme } from "@emotion/react";
import React from "react";
import ReactJoyride from "react-joyride";
import { useDispatch, useSelector } from "react-redux";
import { toggleWelcomeGuide, toggleGuide } from "../redux/action/utilActions";

const DesktopGuide = () => {
  const theme = useTheme();

  const dispatch = useDispatch();
  const { isWelcomeGuideOpen: run } = useSelector((state) => state.util);
  const [step, setStep] = React.useState(1);

  const steps = [
    {
      disableBeacon: true,
      content: <h2>Click here for tour guide!</h2>,
      target: ".guideBtn",
      title: "Guide",
      locale: {
        last: <strong aria-label="skip">Close</strong>,
      },
    },
  ];

  const handleStepChange = (state) => {
    if (state.action === "reset") {
      dispatch(toggleWelcomeGuide());
    }
  };

  return (
    <div>
      <ReactJoyride
        continuous={true}
        scrollToFirstStep={false}
        showProgress={false}
        showSkipButton={false}
        disableScrollParentFix
        steps={steps}
        run={run}
        styles={{
          options: {
            zIndex: 10000,
            primaryColor: theme.palette.secondary.main,
          },
        }}
        // stepIndex={step}
        callback={handleStepChange}
      />
    </div>
  );
};

export default DesktopGuide;
