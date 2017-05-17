import React, {Component} from 'react';
import EntityManager from "./EntityManager";
import * as constants from "../../constants";

const Locations = () => (
  <div>
    <h1>Locations</h1>
    <EntityManager
      endpointPath={constants.API_ENDPOINT_LOCATIONS}
      entityProperties={constants.ENTITY_LOCATION_PROPERTIES} />
  </div>
);

export default Locations;
