import React, {Component} from 'react';
import EntityManager from "./EntityManager";
import * as constants from "../../constants";

const Navigators = () => (
  <div>
    <h1>Navigators</h1>
    <EntityManager
      endpointPath={constants.API_ENDPOINT_NAVIGATORS}
      entityProperties={constants.ENTITY_NAVIGATOR_PROPERTIES} />
  </div>
);

export default Navigators;
