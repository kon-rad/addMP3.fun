import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Col from 'awesome-possum/lib/Col'
import Row from 'awesome-possum/lib/Row'
import InputBox from './components/InputBox/InputBox'
import DownloadLink from './components/DownloadLink/DownloadLink'

// Import Style
import styles from './App.css';

// Import Components
import Helmet from 'react-helmet';

// Import Actions
import { toggleAddPost } from './AppActions';

// Import Api caller
import callApi from '../../util/apiCaller';

export class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isMounted: false,
      downloadLink: '',
      playbackSpeed: '1',
    };
  }

  componentDidMount() {
    this.setState({isMounted: true}); // eslint-disable-line
  }

  toggleAddPostSection = () => {
    this.props.dispatch(toggleAddPost());
  };

  handleSendUrl = (searchQuery) => {
    this.setState({ downloadLink: 'loading' });

    return callApi('postAudio', 'post', {
      post: {
        url: searchQuery,
      },
    }).then((res) => {
      this.setState({ downloadLink: res.downloadLink });
    });

  };

  handleReset = () => {
    this.setState({ downloadLink: '' });
  };

  handleRateChange = (e) => {
    let audioFileId = this.state.downloadLink;
    let playbackSpeed = e.target.value;
    this.setState({ playbackSpeed: e.target.value, downloadLink: 'loading' });

    return callApi(`changeRate/${audioFileId}/${playbackSpeed}`, 'get'
    ).then((res) => {
      this.setState({ downloadLink: res.downloadLink });
    });
  }

  render() {
    return (
      <div>
        <div className={ styles.appWrapper }>
          <Helmet
            title="addMP3.fun download mp3 audio from youtube"
            titleTemplate="addMP3.fun download mp3 audio from youtube"
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
              <Row className={styles.customRow}>
                <Col large={8} largeOffset={2}>
                  <h1 className={styles.main_title}>AddMP3.fun</h1>
                  <div className={styles.main_subtitle}>
                    Convert any youtube video to an MP3 file.
                  </div>
                  <h3>{this.state.response}</h3>
                </Col>
                <Col large={8} largeOffset={2}>
                  <InputBox sendUrl={this.handleSendUrl} />
                  <DownloadLink playbackSpeed={this.state.playbackSpeed}
                                handleRateChange={this.handleRateChange}
                                handleReset={this.handleReset}
                                downloadLink={this.state.downloadLink} />
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
