import React, { Component } from 'react';
import './App.css';
import Col from 'awesome-possum/lib/Col'
import Row from 'awesome-possum/lib/Row'
import InputBox from './components/InputBox'

class App extends Component {
  state = {
    response: ''
  };

  componentDidMount() {
    this.callApi()
      .then(res => this.setState({ response: res.express }))
      .catch(err => console.log(err));
  }

  callApi = async () => {
    const response = await fetch('/api/hello');
    const body = await response.json();

    if (response.status !== 200) throw Error(body.message);

    return body;
  };


  render() {
    return (
      <div className="main_container">
          <Row>
            <Col large={8} largeOffset={2}>
              <h1 className="main_title">YouTubeToAudio</h1>
              <div className="main_subtitle">
                Convert youtube video to mp3, options to download file and set playback speed.
              </div>
              <h3>{this.state.response}</h3>
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
