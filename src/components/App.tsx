import React, { useState, useEffect } from 'react';
import './App.css';
import { PatternType, Visualization } from './Visualization';

function App() {
  const [patternType, setPatternType] = useState<PatternType>('Circles');
  const [levels, setLevels] = useState(6);
  const [animated, setAnimated] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);

  useEffect(() => {
    let frame = 0;
    const animateMosaic = (time: number) => {
      setCurrentTime(time);
      frame = requestAnimationFrame(animateMosaic);
    };
    if (animated) {
      frame = requestAnimationFrame(animateMosaic);
      return () => { cancelAnimationFrame(frame) };
    }
  }, [animated]);

  return (
    <div>
      <div className="App__controlBar">
        <div className="App__controlBarSection">
          Pattern type:{' '}
          <select value={patternType} onChange={event => setPatternType(event.target.value as PatternType)}>
            <option>Circles</option>
            <option>Mosaic</option>
          </select>
        </div>
        <div className="App__controlBarSection">
          Number of levels:{' '}
          <input
            type="number"
            min="1"
            max="10"
            value={levels}
            onChange={event => setLevels(Number.parseInt(event.target.value))}
          />
        </div>
        <label className="App__controlBarSection">
          <input type="checkbox" checked={animated} onChange={event => setAnimated(event.target.checked)} />
          Animate!
        </label>
      </div>
      <div className="App__visualizationContainer">
        <Visualization patternType={patternType} levels={levels} time={currentTime} />
      </div>
    </div>
  );
}

export default App;
