import React from "react";
import { Switch, withRouter, useLocation } from "react-router-dom";
import { useTransition, animated } from "react-spring";

export const AnimatedSwitch = (props) => {
  const location = useLocation();

  console.log("location ", location);

  const transitions = useTransition(location, {
    keys: (l) => l.pathname,
    from: {
      opacity: 0,
      position: "absolute",
      transform: "translate3d(100%,0,0)",
    },
    enter: { opacity: 1, position: "static", transform: "translate3d(0%,0,0)" },
    leave: {
      opacity: 0,
      position: "absolute",
      transform: "translate3d(-50%,0,0)",
    },
  });

  return (
    <>
      {transitions(({ opacity, position, transform }, item) => (
        <animated.div
          style={{
            opacity: opacity,
            transform: transform,
            position: position,
          }}
        >
          <Switch location={item.item}>{props.children}</Switch>
        </animated.div>
      ))}
    </>
  );
};
export default AnimatedSwitch;
