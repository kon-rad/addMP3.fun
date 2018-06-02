import React, { Component, PropTypes } from 'react';

class DownloadLink extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let hrefUrl = `/api/download/${this.props.downloadLink}`;
    let link = this.props.downloadLink === '' ? '' : (<a target="_blank" href={hrefUrl}>Download</a>);
    return (
      <div>
        {link}
      </div>
    );
  }
}

export default DownloadLink;
