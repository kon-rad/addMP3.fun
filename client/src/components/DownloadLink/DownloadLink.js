import React, { Component, PropTypes } from "react";
import FaDownload from "react-icons/lib/fa/download";
import FaClose from "react-icons/lib/fa/close";

// Import Style
import styles from "./DownloadLink.css";

class DownloadLink extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let hrefUrl = `/api/download/${this.props.downloadLink}`;
    let loading = (
      <div className={styles.spinnerOuter}>
        <div className={styles.spinnerWrapper}>
          <div className="loader" />
        </div>
        <div>
          <span>Converting file ...</span>
        </div>
      </div>
    );
    let link = "";
    if (this.props.downloadLink) {
      link =
        this.props.downloadLink === "loading" ? (
          loading
        ) : (
          <div
            className={styles.buttonsWrapper}
            style={{ alignItems: "center" }}
          >
            <button onClick={() => this.props.handleReset()}>
              <FaClose />
              Reset
            </button>
            <a
              target="_blank"
              href={hrefUrl}
              onClick={() => this.props.handleReset()}
            >
              <FaDownload />
              Download{" "}
              <span className={styles.downloadSpeed}>
                {this.props.playbackSpeed}x speed
              </span>
            </a>
            <div className={styles.changesSpeedWrapper}>
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
              <span className={styles.speedButton}>Select Speed</span>
            </div>
          </div>
        );
    }
    return (
      <div>
        <div>{link}</div>
      </div>
    );
  }
}

export default DownloadLink;
