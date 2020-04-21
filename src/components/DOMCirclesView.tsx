import React, { FunctionComponent, useRef, useLayoutEffect } from "react";
import { Circle } from "../models/circles";
import "./CirclesView.css";

interface DOMCirclesViewProps {
  circle: Circle;
  animationDepth: number,
  time: number;
}

export const DOMCirclesView: FunctionComponent<DOMCirclesViewProps> = ({ circle, animationDepth, time }) => {
  const rootRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (root) {
      while (root.lastChild) {
        root.lastChild.remove();
      }
      root.appendChild(renderCircles(circle, animationDepth, time));
    }
  });

  return <div className="DOMCirclesView" ref={rootRef} />;
};

const renderCircles = (circle: Circle, animationDepth: number, time: number, isRoot = true) => {
  const rotation = circle.angularSpeed * (animationDepth > 0 ? time : 0) / 1000 + circle.phaseShift;
  const circleElement = document.createElement('div');
  circleElement.className = 'CirclesView';
  const {style} = circleElement;
  style.backgroundColor = circle.color;
  if (isRoot) {
    style.width = '100%';
    style.height = '100%';
    style.transform = `rotate(${rotation}rad)`;
  } else {
    style.transform = `translateX(50%) rotate(${rotation}rad)`;
    style.width = '50%';
    style.height = '50%';
  }
  for (let subcircle of circle.subcircles) {
    circleElement.appendChild(renderCircles(subcircle, time, animationDepth - 1, false));
  }
  return circleElement;
};