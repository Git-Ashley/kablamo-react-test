import { useCallback, useEffect, useState } from "react";

const formattedSeconds = (sec: number) =>
  Math.floor(sec / 60) + ":" + ("0" + (sec % 60)).slice(-2);

interface LapProps {
  index: number;
  lapSeconds: number;
  onDelete: () => void;
}

const Lap = ({ index, lapSeconds, onDelete }: LapProps) => (
  <div className="stopwatch-lap">
    <strong>{index}</strong>/ {formattedSeconds(lapSeconds)}{" "}
    <button onClick={onDelete}> X </button>
  </div>
);

interface StopwatchProps {
  initialSeconds?: number;
}

const Stopwatch = ({ initialSeconds = 0 }: StopwatchProps) => {
  const [secondsElapsed, setSecondsElapsed] = useState(initialSeconds);
  const [incrementer, setIncrementer] = useState<number | null>(null);
  const [laps, setLaps] = useState<{ key: number; value: number }[]>([]);
  const [totalLapsCreated, setTotalLapsCreated] = useState(0);

  useEffect(() => () => {
    // This cleanup is intended for when the component dismounts while the timer is still running.
    // It will have no effect if the interval was cleared in handleStopClick or handleResetClick.
    if (incrementer) {
      clearInterval(incrementer);
    }
  }, [incrementer]);

  const handleStartClick = useCallback(() => {
    const incrementerId = setInterval(
      () => setSecondsElapsed((currentVal) => ++currentVal),
      1000
    );

    setIncrementer(incrementerId);
  }, []);

  const handleStopClick = useCallback(() => {
    if (incrementer) {
      clearInterval(incrementer);
    }
    setIncrementer(null);
  }, [incrementer]);

  const handleResetClick = useCallback(() => {
    if (incrementer) {
      clearInterval(incrementer);
    }
    setLaps([]);
    setSecondsElapsed(0);
    setIncrementer(null);
  }, [incrementer]);

  const handleLapClick = useCallback(() => {
    setLaps([...laps, { key: totalLapsCreated, value: secondsElapsed }]);
    setTotalLapsCreated((currentVal) => ++currentVal);
  }, [laps, secondsElapsed, totalLapsCreated]);

  const handleDeleteClick = useCallback((index: number) => {
    const newLaps = [...laps];
    newLaps.splice(index, 1);
    setLaps(newLaps);
  }, [laps]);

  return (
    <div className="stopwatch">
      <h1 className="stopwatch-timer">{formattedSeconds(secondsElapsed)}</h1>

      {secondsElapsed === 0 || !incrementer ? (
        <button
          type="button"
          className="start-btn"
          onClick={handleStartClick}
        >
          start
        </button>
      ) : (
        <button
          type="button"
          className="stop-btn"
          onClick={handleStopClick}
        >
          stop
        </button>
      )}
      {secondsElapsed !== 0 && incrementer ? (
        <button type="button" onClick={handleLapClick}>
          lap
        </button>
      ) : null}
      {secondsElapsed !== 0 && !incrementer ? (
        <button type="button" onClick={handleResetClick}>
          reset
        </button>
      ) : null}
      <div className="stopwatch-laps">
        {laps.map((lap, i) => (
          <Lap
            key={lap.key}
            index={i + 1}
            lapSeconds={lap.value}
            onDelete={() => handleDeleteClick(i)}
          />
        ))}
      </div>
    </div>
  );
}

export default Stopwatch;