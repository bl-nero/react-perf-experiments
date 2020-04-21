import React, { FunctionComponent, CSSProperties, ComponentType } from "react";
import { Circle } from "../models/circles";
import "./CirclesView.css";

interface CirclesViewProps {
  circle: Circle;
  animationDepth: number,
  time: number;
  isRoot?: boolean;
}

interface InternalCirclesViewProps extends CirclesViewProps {
  ChildComponentType: ComponentType<CirclesViewProps>;
}

const InternalCirclesView: FunctionComponent<InternalCirclesViewProps> = ({
  circle, animationDepth, time, isRoot = true, ChildComponentType
}) => {
  const rotation = circle.angularSpeed * time / 1000 + circle.phaseShift;
  const style: CSSProperties = {
    backgroundColor: circle.color,
  };
  if (isRoot) {
    style.width = '100%';
    style.height = '100%';
    style.transform = `rotate(${rotation}rad)`;
  } else {
    style.transform = `translateX(50%) rotate(${rotation}rad)`;
    style.width = '50%';
    style.height = '50%';
  }

  const timeForSubcircles = animationDepth > 1 ? time : 0;
  return (
    <div className="CirclesView" style={style}>
      {circle.subcircles.map((c, index) => (
        <ChildComponentType key={index} circle={c} animationDepth={animationDepth - 1} time={timeForSubcircles} isRoot={false} />
      ))}
    </div>
  );
};

export const CirclesView = (props: CirclesViewProps) => <InternalCirclesView {...props} ChildComponentType={CirclesView} />;

export const CirclesViewMemoized = React.memo(
  (props: CirclesViewProps) => <InternalCirclesView {...props} ChildComponentType={CirclesViewMemoized} />
);