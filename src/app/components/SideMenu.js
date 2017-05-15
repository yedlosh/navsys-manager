import React from 'react';
import {Link} from "react-router-dom";

import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import AppBar from "material-ui/AppBar";

import * as constants from "../constants";

const SideMenu = () => {
  const items = Object.keys(constants.SECTIONS).map((key, index) => { return <Link key={index} style={{ textDecoration: 'none' }} to={constants.SECTION_LINKS[key]}><MenuItem>{constants.SECTIONS[key]}</MenuItem></Link>});
  return (
    <Drawer
      docked={true}>
      <AppBar
        title={constants.APP_TITLE}
        showMenuIconButton={false}
      />
      {items}
    </Drawer>
  );
};

export default SideMenu;
