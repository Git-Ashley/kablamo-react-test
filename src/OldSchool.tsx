import { Component } from "react";

const formattedSeconds = (sec: number) =>
  Math.floor(sec / 60) + ":" + ("0" + (sec % 60)).slice(-2);

interface LapProps {
  index: number;
  lapSeconds: number;
  onDelete: () => void;
}

const Lap = (props: LapProps) => (
  <div className="stopwatch-lap">
    <strong>{props.index}</strong>/ {formattedSeconds(props.lapSeconds)}{" "}
    <button onClick={props.onDelete}> X </button>
  </div>
);

interface StopwatchProps {
  initialSeconds: number;
}

interface StopwatchState {
  secondsElapsed: number;
  incrementer: number | null;
  laps: { key: number; value: number }[];
  totalLapsCreated: number;
}

export default class Stopwatch extends Component<StopwatchProps, StopwatchState> {
  constructor(props: StopwatchProps) {
    super(props);
    this.state = {
      secondsElapsed: props.initialSeconds,
      incrementer: null,
      laps: [],
      totalLapsCreated: 0,
    };
  }

  handleStartClick = () => {
    const incrementer = setInterval(
      () =>
        this.setState({
          secondsElapsed: this.state.secondsElapsed + 1,
        }),
      1000
    );

    this.setState({ incrementer });
  };

  handleStopClick = () => {
    const { incrementer } = this.state;
    if (incrementer) {
      clearInterval(incrementer);
    }
    this.setState({
      incrementer: null,
    });
  };

  handleResetClick = () => {
    const { incrementer } = this.state;
    if (incrementer) {
      clearInterval(incrementer);
    }
    this.setState({
      laps: [],
      secondsElapsed: 0,
      incrementer: null,
    });
  };

  handleLapClick = () => {
    const { laps, secondsElapsed, totalLapsCreated } = this.state;
    this.setState({
      laps: laps.concat({ key: totalLapsCreated, value: secondsElapsed }),
      totalLapsCreated: totalLapsCreated + 1,
    });
  };

  handleDeleteClick = (index: number) => {
    const newLaps = [...this.state.laps];
    newLaps.splice(index, 1);
    this.setState({ laps: newLaps });
  };

  componentWillUnmount = () => {
    if (this.state.incrementer) {
      clearInterval(this.state.incrementer);
    }
  };

  render() {
    const { secondsElapsed, incrementer, laps } = this.state;

    return (
      <div className="stopwatch">
        <h1 className="stopwatch-timer">{formattedSeconds(secondsElapsed)}</h1>

        {secondsElapsed === 0 || !incrementer ? (
          <button
            type="button"
            className="start-btn"
            onClick={this.handleStartClick}
          >
            start
          </button>
        ) : (
          <button
            type="button"
            className="stop-btn"
            onClick={this.handleStopClick}
          >
            stop
          </button>
        )}
        {secondsElapsed !== 0 && incrementer ? (
          <button type="button" onClick={this.handleLapClick}>
            lap
          </button>
        ) : null}
        {secondsElapsed !== 0 && !incrementer ? (
          <button type="button" onClick={this.handleResetClick}>
            reset
          </button>
        ) : null}
        <div className="stopwatch-laps">
          {laps.map((lap, i) => (
            <Lap
              key={lap.key}
              index={i + 1}
              lapSeconds={lap.value}
              onDelete={() => this.handleDeleteClick(i)}
            />
          ))}
        </div>
      </div>
    );
  }
}
