import React, { useState } from 'react';
import './App.css';
import { MosaicView } from './MosaicView';
import { MosaicElement, generateMosaic, animate } from "./mosaic";
import Prando from 'prando';

function App() {
  const [animated, setAnimated] = useState(false);
  const [mosaic, setMosaic] = useState(() => generateMosaic(new Prando(4), 3));

  requestAnimationFrame(time => {
    console.log('animating!');
    setMosaic(animate(mosaic, time));
    setAnimated(true);
  });

  if (!animated) {
    return null;
  }

  return (
    <div className="App">
      <MosaicView mosaic={mosaic} />
    </div>
  );
}

export default App;
