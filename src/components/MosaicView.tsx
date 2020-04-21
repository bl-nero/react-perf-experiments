import React, { CSSProperties, ComponentType } from 'react';
import { MosaicElement, MosaicElementType, MosaicLayer, SplitType, animatedSplit } from '../models/mosaic';
import './MosaicView.css';

const layerStyleFor = (layer: MosaicLayer): CSSProperties => {
  switch (layer.splitType) {
    case SplitType.Horizontal: return { flexDirection: 'row' };
    case SplitType.Vertical: return { flexDirection: 'column' };
  }
}

interface MosaicViewProps {
  mosaic: MosaicElement;
  animationDepth: number,
  time: number;
}

interface InternalMosaicViewProps extends MosaicViewProps {
  ChildComponentType: ComponentType<MosaicViewProps>;
}

const InternalMosaicView = ({ mosaic, animationDepth, time, ChildComponentType }: InternalMosaicViewProps) => {
  switch (mosaic.type) {
    case MosaicElementType.Tile:
      return (
        <div className="MosaicView_tile" style={{ backgroundColor: mosaic.color }}>
        </div>
      );
    case MosaicElementType.Layer: {
      const split = animatedSplit(mosaic, time);
      const timeForSublayers = animationDepth > 1 ? time : 0;
      return (
        <div className="MosaicView_layer" style={layerStyleFor(mosaic)}>
          <div style={{ flexGrow: split }}>
            <ChildComponentType mosaic={mosaic.first} animationDepth={animationDepth - 1} time={timeForSublayers} />
          </div>
          <div style={{ flexGrow: 1 - split }}>
            <ChildComponentType mosaic={mosaic.second} animationDepth={animationDepth - 1} time={timeForSublayers} />
          </div>
        </div>
      );
    }
  }
};

export const MosaicView = (props: MosaicViewProps) => <InternalMosaicView {...props} ChildComponentType={MosaicView} />;

export const MosaicViewMemoized = React.memo(
  (props: MosaicViewProps) => <InternalMosaicView {...props} ChildComponentType={MosaicViewMemoized} />
);
