import React, { useRef, useLayoutEffect } from 'react';
import { MosaicElement, MosaicElementType, SplitType, animatedSplit } from '../models/mosaic';
import './MosaicView.css';

interface DOMMosaicViewProps {
  mosaic: MosaicElement;
  time: number;
}

export const DOMMosaicView = ({ mosaic, time }: DOMMosaicViewProps) => {
  const rootRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (root) {
      while (root.lastChild) {
        root.lastChild.remove();
      }
      root.appendChild(renderMosaic(mosaic, time));
    }
  });

  return <div className="DOMMosaicView" ref={rootRef} />;
};

const renderMosaic = (mosaic: MosaicElement, time: number): HTMLElement => {
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
      root.appendChild(wrapMosaicChild(renderMosaic(mosaic.first, time), split));
      root.appendChild(wrapMosaicChild(renderMosaic(mosaic.second, time), 1 - split));
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
