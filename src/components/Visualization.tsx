import React, { FunctionComponent, useMemo } from "react";
import Prando from "prando";
import { generateMosaic } from "../models/mosaic";
import { MosaicView, MosaicViewMemoized } from "./MosaicView";
import { generateCircles } from "../models/circles";
import { CirclesView, CirclesViewMemoized } from "./CirclesView";
import { DOMMosaicView } from "./DOMMosaicView";
import { DOMCirclesView } from "./DOMCirclesView";

export enum PatternType { Circles = 'Circles', 'Mosaic' = 'Mosaic' };

export enum RenderingAlgorithm { React = 'React', ReactMemo = 'React (memoize)', DOM = 'DOM' };

interface VisualizationProps {
  algorithm: RenderingAlgorithm,
  patternType: PatternType,
  patternDepth: number,
  animationDepth: number,
  time: number,
}

export const Visualization: FunctionComponent<VisualizationProps> = ({ algorithm, patternType, patternDepth, animationDepth, time }) => {
  const circlesModel = useMemo(
    () => patternType === 'Circles' ? generateCircles(new Prando(4), patternDepth) : null,
    [patternType, patternDepth]);
  const mosaicModel = useMemo(
    () => patternType === 'Mosaic' ? generateMosaic(new Prando(4), patternDepth) : null,
    [patternType, patternDepth]);

  switch (algorithm) {
    case RenderingAlgorithm.React:
      if (mosaicModel) {
        return (<MosaicView mosaic={mosaicModel} animationDepth={animationDepth} time={time} />);
      }
      if (circlesModel) {
        return (<CirclesView circle={circlesModel} animationDepth={animationDepth} time={time} />);
      }
      return null;
    case RenderingAlgorithm.ReactMemo:
      if (mosaicModel) {
        return (<MosaicViewMemoized mosaic={mosaicModel} animationDepth={animationDepth} time={time} />);
      }
      if (circlesModel) {
        return (<CirclesViewMemoized circle={circlesModel} animationDepth={animationDepth} time={time} />);
      }
      return null;
    case RenderingAlgorithm.DOM:
      if (mosaicModel) {
        return (<DOMMosaicView mosaic={mosaicModel} animationDepth={animationDepth} time={time} />);
      }
      if (circlesModel) {
        return (<DOMCirclesView circle={circlesModel} animationDepth={animationDepth} time={time} />);
      }
      return null;
  }
};