import React from 'react';
import {render} from 'react-dom';
import {BrowserRouter as Router} from 'react-router-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';

import Main from "./components/Main";

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

// Render the main app react component into the app div
render((
    <Router>
      <Main />
    </Router>
), document.getElementById('app'));
