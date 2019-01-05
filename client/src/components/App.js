import React, { Component, PropTypes } from "react";
import { connect } from "react-redux";
import InputBox from "./InputBox";
import DownloadLink from "./DownloadLink";
import axios from "axios";
import { toggleAddPost } from "../actions";

require("./App.css");

export class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isMounted: false,
      downloadLink: "",
      playbackSpeed: "1"
    };
  }

  componentDidMount() {
    this.setState({ isMounted: true }); // eslint-disable-line
  }

  toggleAddPostSection = () => {
    this.props.dispatch(toggleAddPost());
  };

  handleSendUrl = searchQuery => {
    this.setState({ downloadLink: "loading" });

    return axios
      .post("postAudio", {
        url: searchQuery
      })
      .then(res => {
        this.setState({ downloadLink: res.downloadLink });
      });
  };

  handleReset = () => {
    this.setState({ downloadLink: "", playbackSpeed: "1" });
  };

  handleRateChange = e => {
    let audioFileId = this.state.downloadLink;
    let playbackSpeed = e.target.value;
    this.setState({ playbackSpeed: e.target.value, downloadLink: "loading" });

    return axios.get(`changeRate/${audioFileId}/${playbackSpeed}`).then(res => {
      this.setState({ downloadLink: res.downloadLink });
    });
  };

  render() {
    return (
      <div className="appWrapper">
        <div className="main_container">
          <div className="customRow">
            <div className="col">
              <h1 className="main_title">AddMP3.fun</h1>
              <div className="main_subtitle">Convert youtube video to MP3</div>
              <h3>{this.state.response}</h3>
            </div>
            <div className="col">
              <InputBox sendUrl={this.handleSendUrl} />
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

// Retrieve data from store as props
function mapStateToProps(store) {
  return {};
}

export default connect(mapStateToProps)(App);
