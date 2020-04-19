import React, { FunctionComponent, CSSProperties } from "react";
import { Circle, circleOffset } from "./circles";
import "./CirclesView.css";

interface CirclesViewProps {
  circle: Circle;
  time: number;
  isRoot?: boolean;
}

export const CirclesView: FunctionComponent<CirclesViewProps> = ({ circle, time, isRoot = true }) => {
  const style: CSSProperties = {
    position: 'absolute',
    backgroundColor: circle.color,
  };
  if (isRoot) {
    style.width = '100%';
    style.height = '100%';
  } else {
    const { x, y } = circleOffset(time, circle.angularSpeed, circle.phaseShift);
    style.transform = `translate(${x}%, ${y}%)`;
    // const rotation = circle.angularSpeed * time / 1000 + circle.phaseShift;
    // style.transform = `rotate(${rotation}rad)`;
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