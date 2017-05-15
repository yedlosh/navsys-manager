import React from 'react';

import {Switch, Route} from 'react-router-dom';

import * as constants from "./constants";
import Home from './components/content/Home';
import Locations from "./components/content/Locations";
import Navigators from "./components/content/Navigators";

const ContentRouter = () => (

  <Switch>
    <Route exact path={constants.SECTION_LINKS.home} component={Home} />
    <Route path={constants.SECTION_LINKS.locations} component={Locations} />
    <Route path={constants.SECTION_LINKS.navigators} component={Navigators} />
  </Switch>
);

export default ContentRouter;
