import React, { Component } from "react";

import IconButton from "@mui/material/IconButton";
import PublicIcon from "@mui/icons-material/Public";

import OSM from "ol/source/OSM";
import TileLayer from "ol/layer/Tile";

import { getMap } from "../mapInstance";

export default class BaseLayerBtn extends Component {
  constructor(props) {
    super(props);
    this.baseLayer = null;
  }
  
  toggleBaseLayer = () => {
    const map = getMap();

    if (!this.baseLayer) {
      this.baseLayer = new TileLayer({
        source: new OSM(),
      });
      this.baseLayer.setZIndex(-999);
      map.addLayer(this.baseLayer);
    }else{
      map.removeLayer(this.baseLayer);
      this.baseLayer = null;
    }
  };

  render() {
    return (
      <div>
        <IconButton
          color="primary"
          aria-label="Base layer"
          component="span"
          onClick={this.toggleBaseLayer}
        >
          <PublicIcon />
        </IconButton>
      </div>
    );
  }
}
