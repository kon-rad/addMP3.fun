import React, { Component, PropTypes } from 'react';
import Row from 'awesome-possum/lib/Row';
import Col from 'awesome-possum/lib/Col';
import Loader from 'awesome-possum/lib/Loader';
import Button from 'awesome-possum/lib/Button';
import Select from 'awesome-possum/lib/Select';
import FaDownload from 'react-icons/lib/fa/download';
import FaClose from 'react-icons/lib/fa/close';

// Import Style
import styles from './DownloadLink.css';

class DownloadLink extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let hrefUrl = `/api/download/${this.props.downloadLink}`;
    let loading = (
      <div>
        <Row flex spaced style={{alignItems: "center"}}>
          <Loader medium duration="900ms" />
        </Row>
        <Row flex spaced style={{alignItems: "center"}}>
          <span>Converting file ...</span>
        </Row>
      </div>
    );
    let link = '';
    if (this.props.downloadLink) {
      link = this.props.downloadLink === 'loading' ? loading : (
        <div>
          <Row flex spaced style={{alignItems: "center"}}>
            <Button alert onClick={() => this.props.handleReset()}>
              <FaClose />
              Reset
            </Button>
            <Button target="_blank" href={hrefUrl}>
              <FaDownload />
              Download
            </Button>
            <div className={ styles.changesSpeedWrapper }>
              <Select name="playbackRate" defaultValue={this.props.playbackSpeed} onChange={(e) => this.props.handleRateChange(e)}>
                <option value="1">1.0x</option>
                <option value="2">2.0x</option>
                <option value="3">3.0x</option>
                <option value="4">4.0x</option>
              </Select>
              <span>
                Select Speed
              </span>

            </div>
          </Row>
        </div>
      );
    }
    return (
      <div>
        <Row >
          {link}
        </Row>
      </div>
    );
  }
}

export default DownloadLink;
