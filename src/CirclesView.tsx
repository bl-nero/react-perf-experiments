import React, { FunctionComponent, CSSProperties } from "react";
import { Circle, circlePosition } from "./circles";

interface CirclesViewProps {
  circle: Circle;
  time: number;
  isRoot?: boolean;
}

export const CirclesView: FunctionComponent<CirclesViewProps> = ({ circle, time, isRoot = true }) => {
  const style: CSSProperties = {
    backgroundColor: circle.color,
  };
  if (isRoot) {
    style.width = '100%';
    style.height = '100%';
  } else {
    const { x, y } = circlePosition(time, circle.phaseShift);
    style.transform = `translate(${x}, ${y})`;
    style.width = '50%';
    style.height = '50%';
  }

  return (
    <div className="CirclesView" style={style}>
      {circle.subcircles.map((c, index) => (
        <CirclesView key={index} circle={c} time={time} isRoot={false} />
      ))}
    </div>
  );
};