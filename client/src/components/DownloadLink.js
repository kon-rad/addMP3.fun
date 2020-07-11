import React, { Component, PropTypes } from "react";
import Loading from './Loading';

class DownloadLink extends Component {
  constructor(props) {
    super(props);
  }

  changePlaybackSpeed = () => {
    const hrefUrl = `/api/download/${this.props.downloadLink}`;
    return (
      <div className="buttonsWrapper" style={{ alignItems: "center" }}>
        <button className="resetButton" onClick={() => this.props.handleReset()}>
          <i className="fa fa-times-circle"></i> Reset
        </button>
        <a
          className="downloadButton"
          target="_blank"
          href={hrefUrl}
          onClick={() => this.props.handleReset()}
        >
          <i className="fa fa-download"></i> Download
          <span className="downloadSpeed">
            {this.props.playbackSpeed}x speed
          </span>
        </a>
        <div className="changesSpeedWrapper">
          <select
            className="playbackButton"
            name="playbackRate"
            defaultValue={this.props.playbackSpeed}
            onChange={e => this.props.handleRateChange(e)}
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
    if (!this.props.downloadLink) {
      return;
    }
    if (this.props.downloadLink === "loading") {
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
