import React, { CSSProperties } from 'react';
import { MosaicElement, MosaicElementType, MosaicLayer, SplitType } from './mosaic';
import './MosaicView.css';

interface MosaicViewProps {
  mosaic: MosaicElement;
}

const layerStyleFor = (layer: MosaicLayer): CSSProperties => {
  switch (layer.splitType) {
    case SplitType.Horizontal: return { flexDirection: 'row' };
    case SplitType.Vertical: return { flexDirection: 'column' };
  }
}

export const MosaicView = ({ mosaic }: MosaicViewProps) => {
  switch (mosaic.type) {
    case MosaicElementType.Tile:
      return (
        <div className="MosaicView_tile" style={{ backgroundColor: mosaic.color }}>
        </div>
      );
    case MosaicElementType.Layer: {
      return (
        <div className="MosaicView_layer" style={layerStyleFor(mosaic)}>
          <div style={{ flexGrow: mosaic.split }}>
            <MosaicView mosaic={mosaic.first} />
          </div>
          <div style={{ flexGrow: 1 - mosaic.split }}>
            <MosaicView mosaic={mosaic.second} />
          </div>
        </div>
      );
    }
  }
}
