import React, { Component, PropTypes } from "react";

class DownloadLink extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const hrefUrl = `/api/download/${this.props.downloadLink}`;

    const loading = (
      <div className="spinnerOuter">
        <div className="spinnerWrapper">
          <div className="loader" />
        </div>
        <div>
          <span>Converting file ...</span>
        </div>
      </div>
    );

    const changePlaybackSpeed = (
      <div className="buttonsWrapper" style={{ alignItems: "center" }}>
        <button onClick={() => this.props.handleReset()}>
          &#128473; Reset
        </button>
        <a
          target="_blank"
          href={hrefUrl}
          onClick={() => this.props.handleReset()}
        >
          \u21E9 Download{" "}
          <span className="downloadSpeed">
            {this.props.playbackSpeed}x speed
          </span>
        </a>
        <div className="changesSpeedWrapper">
          <select
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
          <span className="speedButton">Select Speed</span>
        </div>
      </div>
    );

    let link = "";
    if (this.props.downloadLink) {
      link =
        this.props.downloadLink === "loading" ? loading : changePlaybackSpeed;
    }
    
    return (
      <div>
        <div>{link}</div>
      </div>
    );
  }
}

export default DownloadLink;
