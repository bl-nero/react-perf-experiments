import React, { useRef, useLayoutEffect } from 'react';
import { MosaicElement, MosaicElementType, SplitType, animatedSplit } from '../models/mosaic';
import './MosaicView.css';

interface DOMMosaicViewProps {
  mosaic: MosaicElement;
  animationDepth: number;
  time: number;
}

export const DOMMosaicView = ({ mosaic, animationDepth, time }: DOMMosaicViewProps) => {
  const rootRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (root) {
      while (root.lastChild) {
        root.lastChild.remove();
      }
      root.appendChild(renderMosaic(mosaic, animationDepth, time));
    }
  });

  return <div className="DOMMosaicView" ref={rootRef} />;
};

const renderMosaic = (mosaic: MosaicElement, animationDepth: number, time: number): HTMLElement => {
  const root = document.createElement('div');
  switch (mosaic.type) {
    case MosaicElementType.Tile: {
      root.className = 'MosaicView_tile';
      root.style.backgroundColor = mosaic.color;
      break;
    }
    case MosaicElementType.Layer: {
      root.className = 'MosaicView_layer';
      root.style.flexDirection = mosaic.splitType === SplitType.Horizontal ? 'row' : 'column';

      const split = animatedSplit(mosaic, time);
      const timeForSublayers = animationDepth > 1 ? time : 0;
      root.appendChild(wrapMosaicChild(renderMosaic(mosaic.first, animationDepth - 1, timeForSublayers), split));
      root.appendChild(wrapMosaicChild(renderMosaic(mosaic.second, animationDepth - 1, timeForSublayers), 1 - split));
      break;
    }
  }
  return root;
}

const wrapMosaicChild = (child: HTMLElement, flexGrow: number) => {
  const container = document.createElement('div');
  container.style.flexGrow = flexGrow.toString();
  container.appendChild(child);
  return container;
}
