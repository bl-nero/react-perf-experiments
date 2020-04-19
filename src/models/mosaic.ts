import Prando from "prando";
import { randomColor } from "./randomColor";

export enum MosaicElementType {
  Tile,
  Layer,
}

export enum SplitType {
  Horizontal = 0,
  Vertical = 1,
}

export interface MosaicTile {
  readonly type: MosaicElementType.Tile;
  readonly color: string;
}

export interface MosaicLayer {
  readonly type: MosaicElementType.Layer;
  readonly first: MosaicElement;
  readonly second: MosaicElement;
  readonly splitType: SplitType;
  readonly split: number;
  readonly vibrationAmplitude: number;
  readonly vibrationFrequency: number;
}

export type MosaicElement = MosaicLayer | MosaicTile;

export const generateMosaic = (rng: Prando, depth: number): MosaicElement => {
  if (depth <= 1) {
    return {
      type: MosaicElementType.Tile,
      color: randomColor(rng),
    };
  }
  const split = rng.next();
  return {
    type: MosaicElementType.Layer,
    first: generateMosaic(rng, depth - 1),
    second: generateMosaic(rng, depth - 1),
    splitType: rng.nextInt(0, 1),
    split,
    vibrationAmplitude: Math.min(split, 1 - split, rng.next(0, 0.1)),
    vibrationFrequency: rng.next(0.1, 0.5),
  };
}

export const animatedSplit = ({split, vibrationAmplitude, vibrationFrequency}: MosaicLayer, time: number) =>
  Math.sin(2 * Math.PI * time * vibrationFrequency / 1000) * vibrationAmplitude + split;