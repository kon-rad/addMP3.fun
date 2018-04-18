import React from 'react';
import { render } from 'react-dom';
import './index.css';
import { AppContainer } from 'react-hot-loader';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
const mountApp = document.getElementById('root');

render(
  <AppContainer>
    <App />
  </AppContainer>,
  mountApp
);
registerServiceWorker();

// For hot reloading of react components
if (module.hot) {
  module.hot.accept('./App', () => {
    render(
      <AppContainer>
        <App />
      </AppContainer>,
      mountApp
    );
  });
}