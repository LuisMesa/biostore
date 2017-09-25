import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router} from 'react-router-dom'
import App from './components/App';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';
import './index.css'
// import registerServiceWorker from './registerServiceWorker';

injectTapEventPlugin();

ReactDOM.render(
    <MuiThemeProvider>
      <Router>
      <App />
      </Router>
    </MuiThemeProvider>
    , document.getElementById('root'));
// registerServiceWorker();
