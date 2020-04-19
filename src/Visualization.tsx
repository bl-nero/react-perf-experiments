import React, { FunctionComponent, useMemo } from "react";
import Prando from "prando";
import { generateMosaic } from "./mosaic";
import { MosaicView } from "./MosaicView";
import { generateCircles } from "./circles";
import { CirclesView } from "./CirclesView";

export type PatternType = 'Circles' | 'Mosaic';

interface VisualizationProps {
  patternType: PatternType,
  levels: number,
  time: number,
}

export const Visualization: FunctionComponent<VisualizationProps> = ({ patternType, levels, time }) => {
  const circlesModel = useMemo(
    () => patternType === 'Circles' ? generateCircles(new Prando(4), levels) : null,
    [patternType, levels]);
  const mosaicModel = useMemo(
    () => patternType === 'Mosaic' ? generateMosaic(new Prando(4), levels) : null,
    [patternType, levels]);

  if (mosaicModel) {
    return <MosaicView mosaic={mosaicModel} time={time} />;
  }
  if (circlesModel) {
    return <CirclesView circle={circlesModel} time={time} />;
  }
  return null;
};