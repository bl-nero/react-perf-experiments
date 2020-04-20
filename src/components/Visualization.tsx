import React, { FunctionComponent, useMemo } from "react";
import Prando from "prando";
import { generateMosaic } from "../models/mosaic";
import { MosaicView } from "./MosaicView";
import { generateCircles } from "../models/circles";
import { CirclesView } from "./CirclesView";
import { DOMMosaicView } from "./DOMMosaicView";
import { DOMCirclesView } from "./DOMCirclesView";

export enum PatternType { Circles = 'Circles', 'Mosaic' = 'Mosaic' };

export enum RenderingAlgorithm { React = 'React', DOM = 'DOM' };

interface VisualizationProps {
  algorithm: RenderingAlgorithm,
  patternType: PatternType,
  patternDepth: number,
  time: number,
}

export const Visualization: FunctionComponent<VisualizationProps> = ({ algorithm, patternType, patternDepth, time }) => {
  const circlesModel = useMemo(
    () => patternType === 'Circles' ? generateCircles(new Prando(4), patternDepth) : null,
    [patternType, patternDepth]);
  const mosaicModel = useMemo(
    () => patternType === 'Mosaic' ? generateMosaic(new Prando(4), patternDepth) : null,
    [patternType, patternDepth]);

  switch (algorithm) {
    case RenderingAlgorithm.React:
      if (mosaicModel) {
        return (<MosaicView mosaic={mosaicModel} time={time} />);
      }
      if (circlesModel) {
        return (<CirclesView circle={circlesModel} time={time} />);
      }
      return null;
    case RenderingAlgorithm.DOM:
      if (mosaicModel) {
        return (<DOMMosaicView mosaic={mosaicModel} time={time} />);
      }
      if (circlesModel) {
        return (<DOMCirclesView circle={circlesModel} time={time} />);
      }
      return null;
  }
};