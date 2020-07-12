import React, { Component, PropTypes } from "react";
import Loading from './Loading';

class DownloadLink extends Component {
  constructor(props) {
    super(props);
  }

  changePlaybackSpeed = () => {
    const { downloadLink, handleReset, playbackSpeed, handleRateChange } = this.props;
    const hrefUrl = `/api/download/${downloadLink}`;
    return (
      <div className="buttonsWrapper" style={{ alignItems: "center" }}>
        <button className="resetButton" onClick={() => handleReset()}>
          <i className="fa fa-times-circle"></i> Reset
        </button>
        <a
          className="downloadButton"
          target="_blank"
          href={hrefUrl}
          onClick={() => handleReset()}
        >
          <i className="fa fa-download"></i> Download
          <span className="downloadSpeed">
            {playbackSpeed}x speed
          </span>
        </a>
        <div className="changesSpeedWrapper">
          <select
            className="playbackButton"
            name="playbackRate"
            defaultValue={playbackSpeed}
            onChange={e => handleRateChange(e)}
          >
            <option value="0.5">0.5x</option>
            <option value="0.75">0.75x</option>
            <option value="1">1.0x</option>
            <option value="1.25">1.25x</option>
            <option value="1.5">1.5x</option>
            <option value="1.75">1.75x</option>
            <option value="2">2.0x</option>
          </select>
          <span className="speedButton">Select Playback Speed</span>
        </div>
      </div>
    );
  } 

  renderLink = () => {
    const { downloadLink } = this.props;
    if (!downloadLink) {
      return;
    }
    if (downloadLink === "loading") {
      return <Loading/>;
    }

    return this.changePlaybackSpeed();
  }

  render() {
    return (
      <div>
        {this.renderLink()}
      </div>
    );
  }
}

export default DownloadLink;
