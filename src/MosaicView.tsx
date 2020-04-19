import React, { CSSProperties } from 'react';
import { MosaicElement, MosaicElementType, MosaicLayer, SplitType, animatedSplit } from './mosaic';
import './MosaicView.css';

interface MosaicViewProps {
  mosaic: MosaicElement;
  time: number;
}

const layerStyleFor = (layer: MosaicLayer): CSSProperties => {
  switch (layer.splitType) {
    case SplitType.Horizontal: return { flexDirection: 'row' };
    case SplitType.Vertical: return { flexDirection: 'column' };
  }
}

export const MosaicView = ({ mosaic, time }: MosaicViewProps) => {
  switch (mosaic.type) {
    case MosaicElementType.Tile:
      return (
        <div className="MosaicView_tile" style={{ backgroundColor: mosaic.color }}>
        </div>
      );
    case MosaicElementType.Layer: {
      const split = animatedSplit(mosaic.split, mosaic.vibrationAmplitude, time);
      return (
        <div className="MosaicView_layer" style={layerStyleFor(mosaic)}>
          <div style={{ flexGrow: split }}>
            <MosaicView mosaic={mosaic.first} time={time}/>
          </div>
          <div style={{ flexGrow: 1 - split }}>
            <MosaicView mosaic={mosaic.second} time={time}/>
          </div>
        </div>
      );
    }
  }
}
