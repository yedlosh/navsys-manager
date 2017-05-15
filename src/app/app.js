import React from 'react';
import {render} from 'react-dom';
import {BrowserRouter as Router} from 'react-router-dom';
import reduxThunk from 'redux-thunk';
import {Provider} from "react-redux";
import injectTapEventPlugin from 'react-tap-event-plugin';
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';

import Main from "./components/Main";
import reducers from './state/reducers';

const createStoreWithMiddleware = composeWithDevTools(applyMiddleware(reduxThunk))(createStore);
export const store = createStoreWithMiddleware(reducers);

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

// Render the main app react component into the app div
render((
  <Provider store={store}>
    <Router>
      <Main />
    </Router>
  </Provider>
), document.getElementById('app'));
