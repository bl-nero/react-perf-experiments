import Prando from "prando";

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
  readonly targetSplit: number;
  readonly split: number;
  readonly vibrationAmplitude: number;
}

export type MosaicElement = MosaicLayer | MosaicTile;

export const generateMosaic = (rng: Prando, depth: number): MosaicElement => {
  if (depth === 0) {
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
    targetSplit: split,
    split,
    vibrationAmplitude: Math.max(split, 1 - split, rng.next(0, 0.2)),
  };
}

const vibrationFrequency = 1;

export const animate = (mosaic: MosaicElement, time: number): MosaicElement => {
  switch (mosaic.type) {
    case MosaicElementType.Tile:
      return mosaic;
    case MosaicElementType.Layer: {
      const { first, second, vibrationAmplitude, split } = mosaic;
      return {
        ...mosaic,
        first: animate(first, time),
        second: animate(second, time),
        targetSplit: Math.sin(2 * Math.PI * time / 1000) * vibrationAmplitude + split,
      };
    }
  }
}

const randomColor = (rng: Prando): string => {
  return `rgb(${rng.next(0, 256)}, ${rng.next(0, 256)}, ${rng.next(0, 256)})`;
}