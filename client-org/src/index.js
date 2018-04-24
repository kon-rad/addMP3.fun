import React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import App from './modules/App/App';
import registerServiceWorker from './registerServiceWorker';
require('babel-polyfill');
const mountApp = document.getElementById('root');

require("./scss/app.scss");

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