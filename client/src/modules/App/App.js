import React, { Component } from 'react';
import './App.css';
import Col from 'awesome-possum/lib/Col'
import Row from 'awesome-possum/lib/Row'
import InputBox from './components/InputBox'

class App extends Component {
  render() {
    return (
      <div className="main_container">
          <Row>
            <Col large={8} largeOffset={2}>
              <h1 className="main_title">YouTubeToAudio</h1>
              <div className="main_subtitle">
                Convert youtube video to mp3, options to download file and set playback speed.
              </div>
            </Col>
            <Col large={8} largeOffset={2}>
              <InputBox />
            </Col>
          </Row>
      </div>
    );
  }
}

export default App;
