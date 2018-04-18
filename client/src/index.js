import React from 'react';
import { render } from 'react-dom';
import './test.scss';
import "../node_modules/awesome-possum/scss/app.scss";

// import './index.css';
import { AppContainer } from 'react-hot-loader';
import App from './modules/App/App';
import registerServiceWorker from './registerServiceWorker';

const mountApp = document.getElementById('root');

// require("../node_modules/awesome-possum/scss/app.scss");

render(
  <AppContainer>
    <App />
  </AppContainer>,
  mountApp
);
registerServiceWorker();

// For hot reloading of react components
if (module.hot) {
  module.hot.accept('./modules/App/App', () => {
    render(
      <AppContainer>
        <App />
      </AppContainer>,
      mountApp
    );
  });
}