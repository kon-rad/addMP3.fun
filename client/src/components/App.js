import React, { Component } from "react";
import InputBox from "./InputBox";
import DownloadLink from "./DownloadLink";
import axios from "axios";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isMounted: false,
      downloadLink: "",
      playbackSpeed: "1",
      error: ''
    };
  }

  componentDidMount() {
    this.setState({ isMounted: true }); // eslint-disable-line
  }

  renderError = () => {
    if (this.state.error) {
      return (<div>{this.state.error}</div>);
    }
  }

  handleSendUrl = searchQuery => {
    this.setState({ downloadLink: "loading" });

    axios
      .post("api/audio", {
        url: searchQuery
      })
      .then(res => {

        if (res.data.error) {
          this.setState({ error: res.data.error, downloadLink: '' });
          return;
        }
        this.setState({ downloadLink: res.data.downloadLink });
      });
  };

  handleReset = () => {
    this.setState({ downloadLink: "", playbackSpeed: "1" });
  };

  handleRateChange = e => {
    let audioFileId = this.state.downloadLink;
    let playbackSpeed = e.target.value;
    this.setState({
        playbackSpeed: e.target.value,
        downloadLink: "loading"
      });

    axios
      .get(`api/changeRate/${audioFileId}/${playbackSpeed}`)
      .then(res => {
        this.setState({ downloadLink: res.data.downloadLink });
      });
  };

  render() {
    return (
      <div className="appWrapper">
        <div className="main_container">
          <div className="customRow">
            <div className="col">
              <h1 className="main_title">YouTube to MP3</h1>
              <div className="main_subtitle">Convert youtube video to MP3. (Currently will only convert videos with duration under 30 minutes)</div>
              <h3>{this.state.response}</h3>
            </div>
            <div className="col">
              <InputBox sendUrl={this.handleSendUrl} />
              {this.renderError()}
              <DownloadLink
                playbackSpeed={this.state.playbackSpeed}
                handleRateChange={this.handleRateChange}
                handleReset={this.handleReset}
                downloadLink={this.state.downloadLink}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;