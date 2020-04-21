import React, { useState, useEffect } from 'react';
import './App.css';
import { PatternType, RenderingAlgorithm, Visualization } from './Visualization';

function App() {
  const [algorithm, setAlgorithm] = useState(RenderingAlgorithm.React);
  const [patternType, setPatternType] = useState<PatternType>(PatternType.Circles);
  const [patternDepth, setPatternDepth] = useState(6);
  const [animationDepth, setAnimationDepth] = useState(6);
  const [animated, setAnimated] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [frameLog, setFrameLog] = useState<number[]>([]);

  useEffect(() => {
    let frame = 0;
    const animateMosaic = (time: number) => {
      setCurrentTime(time);
      // console.log(frameLog);
      // console.log(newFrameLog);
      setFrameLog(log => [...log.filter(x => x >= time - 1000), time]);
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
        <div className="App_controlBarSection">
          Rendering algorithm:{' '}
          <select value={algorithm} onChange={event => setAlgorithm(event.target.value as RenderingAlgorithm)}>
            <option>{RenderingAlgorithm.React}</option>
            <option>{RenderingAlgorithm.ReactMemo}</option>
            <option>{RenderingAlgorithm.DOM}</option>
          </select>
        </div>
        <div className="App__controlBarSection">
          Pattern type:{' '}
          <select value={patternType} onChange={event => setPatternType(event.target.value as PatternType)}>
            <option>{PatternType.Circles}</option>
            <option>{PatternType.Mosaic}</option>
          </select>
        </div>
        <div className="App__controlBarSection">
          Pattern depth:{' '}
          <input
            type="number"
            min="1"
            max="16"
            value={patternDepth}
            onChange={event => setPatternDepth(Number.parseInt(event.target.value))}
          />
        </div>
        <div className="App__controlBarSection">
          Animation depth:{' '}
          <input
            type="number"
            min="1"
            max="16"
            value={animationDepth}
            onChange={event => setAnimationDepth(Number.parseInt(event.target.value))}
          />
        </div>
        <label className="App__controlBarSection">
          <input type="checkbox" checked={animated} onChange={event => setAnimated(event.target.checked)} />
          Animate!
        </label>
      </div>
      <div className="App__visualizationContainer">
        <Visualization
          algorithm={algorithm}
          patternType={patternType}
          patternDepth={patternDepth}
          time={currentTime}
          animationDepth={animationDepth}
        />
      </div>
      <div className="App__controlBarSection App__fpsMeter">
        {frameLog.length} FPS
      </div>
    </div>
  );
}

export default App;
