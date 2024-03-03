import React, { useState, useEffect, useRef } from "react";

const StopWatch = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [elapsedTime, setElapsedtime] = useState(0);
  const intervalidRef = useRef(null);
  const startTimeRef = useRef(0);

  useEffect(() => {
    if (isRunning) {
      intervalidRef.current = setInterval(() => {
        setElapsedtime(Date.now() - startTimeRef.current);
      }, 10);
    }
    return () => {
      clearInterval(intervalidRef.current);
    };
  }, [isRunning]);

  function start() {
    setIsRunning(true);
    startTimeRef.current = Date.now() - elapsedTime;
    console.log(startTimeRef);
  }

  function stop() {
    setIsRunning(false);
  }

  function reset() {
    setElapsedtime(0);
    setIsRunning(false);
  }

  function FormatTime() {
    let hours = Math.floor(elapsedTime / (1000 * 60 * 60));
    let minutes = Math.floor((elapsedTime / (1000 * 60)) % 60);
    let seconds = Math.floor((elapsedTime / 1000) % 60);
    let milliseconds = Math.floor((elapsedTime % 1000) / 10);

    return `${minutes}:${seconds}:${milliseconds}`;
  }
  return (
    <div
      style={{
        height: "100vh",
        fontFamily: "monospace",
        background: "black",
      }}
      className="d-flex flex-column align-items-center justify-content-center gap-4"
    >
      <div className="display fs-1 text-light">{FormatTime()}</div>
      <div className="d-flex gap-3 stopwatch fs-2">
        <button onClick={start} className=" btn btn-outline-success">
          Start
        </button>
        <button onClick={stop} className="btn btn-outline-danger">
          Stop
        </button>
        <button onClick={reset} className="btn btn-outline-primary">
          Reset
        </button>
      </div>
    </div>
  );
};

export default StopWatch;
