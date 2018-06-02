import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Col from 'awesome-possum/lib/Col'
import Row from 'awesome-possum/lib/Row'
import InputBox from './components/InputBox'
import DownloadLink from './components/DownloadLink'

// Import Style
import styles from './App.css';

// Import Components
import Helmet from 'react-helmet';
import DevTools from './components/DevTools';

// Import Actions
import { toggleAddPost } from './AppActions';

// Import Api caller
import callApi from '../../util/apiCaller';

export class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isMounted: false,
      downloadLink: ''
    };
  }

  componentDidMount() {
    this.setState({isMounted: true}); // eslint-disable-line
  }

  toggleAddPostSection = () => {
    this.props.dispatch(toggleAddPost());
  };

  handleSendUrl = (searchQuery) => {
    console.log(searchQuery);

    return callApi('postAudio', 'post', {
      post: {
        url: searchQuery,
      },
    }).then((res) => {
      this.setState({downloadLink: res.downloadLink});
      console.log('res.body', res, 'this.state.downloadLink', this.state.downloadLink );

      // let downloadFileFromBlob = (function () {
      //   let a = document.createElement("a");
      //   document.body.appendChild(a);
      //   a.style = "display: none";
      //   return function (data, fileName) {
      //     let blob = new Blob([data], {
      //         type: "octet/stream"
      //       }),
      //       url = window.URL.createObjectURL(blob);
      //     a.href = url;
      //     a.download = fileName;
      //     a.click();
      //     window.URL.revokeObjectURL(url);
      //   };
      // }());
      //
      // downloadFileFromBlob(res.body, 'newAudio.mp3');
    });

  };

  render() {
    return (
      <div>
        {this.state.isMounted && !window.devToolsExtension && process.env.NODE_ENV === 'development' && <DevTools />}
        <div>
          <Helmet
            title="youtubeAudio App"
            titleTemplate="youtubeAudio App"
            meta={[
              { charset: 'utf-8' },
              {
                'http-equiv': 'X-UA-Compatible',
                content: 'IE=edge',
              },
              {
                name: 'viewport',
                content: 'width=device-width, initial-scale=1',
              },
            ]}
          />
          <div>
            <div className="main_container">
              <Row>
                <Col large={8} largeOffset={2}>
                  <h1 className={styles.main_title}>YouTubeToAudio</h1>
                  <div className={styles.main_subtitle}>
                    Convert youtube video to mp3, options to download file and set playback speed.
                  </div>
                  <h3>{this.state.response}</h3>
                </Col>
                <Col large={8} largeOffset={2}>
                  <InputBox sendUrl={this.handleSendUrl} />
                  <DownloadLink downloadLink={this.state.downloadLink} />
                </Col>
              </Row>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

App.propTypes = {
  children: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
};

// Retrieve data from store as props
function mapStateToProps(store) {
  return {
  };
}

export default connect(mapStateToProps)(App);
