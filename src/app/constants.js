export const APP_TITLE = 'navsys-manager';

export const API_ENDPOINT_NAVIGATORS = "/navigators";
export const API_ENDPOINT_LOCATIONS = "/locations";

export const SECTIONS = {
  home: "Home",
  navigators: "Navigators",
  locations: "Locations",
};

export const SECTION_LINKS = {
  home: "/",
  navigators: "/navigators",
  locations: "/locations"
};

export const ENTITY_LOCATION_PROPERTIES = [
  {name: "id", displayName: "ID"},
  {name: "name", displayName: "Name"},
  {name: "navigatorId", displayName: "Navigator ID"},
  {name: "isDestination", displayName: "Is Destination?", parse: true},
  {name: "neighbors", displayName: "Neighbors", parse: true}
];

export const ENTITY_NAVIGATOR_PROPERTIES = [
  {name: "id", displayName: "ID"},
  {name: "ip", displayName: "IP"},
  {name: "mac", displayName: "MAC"},
  {name: "strip", displayName: "LED strip config", parse: true}
];
