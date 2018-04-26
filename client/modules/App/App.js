import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Col from 'awesome-possum/lib/Col'
import Row from 'awesome-possum/lib/Row'
import InputBox from './components/InputBox'

// Import Style
import styles from './App.css';

// Import Components
import Helmet from 'react-helmet';
import DevTools from './components/DevTools';

// Import Actions
import { toggleAddPost } from './AppActions';

export class App extends Component {
  constructor(props) {
    super(props);
    this.state = { isMounted: false };
  }

  componentDidMount() {
    this.setState({isMounted: true}); // eslint-disable-line
  }

  toggleAddPostSection = () => {
    this.props.dispatch(toggleAddPost());
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
                  <InputBox />
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
