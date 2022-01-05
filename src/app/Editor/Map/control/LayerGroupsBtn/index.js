import React, { Component } from "react";

import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import LayersIcon from "@mui/icons-material/Layers";
import { Drawer } from "@mui/material";

import List from "./list";

import OSM from "ol/source/OSM";
import TileLayer from "ol/layer/Tile";

import { getMap } from "../../mapInstance";

export default class BaseLayerBtn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
    };
  }

  toggleOpen = (val = null) => {
    if (val) {
      this.setState({ open: val });
      return;
    }
    this.setState({ open: !this.state.open });
  };

  toggleBaseLayer = () => {
    const map = getMap();

    if (!this.baseLayer) {
      this.baseLayer = new TileLayer({
        source: new OSM(),
      });
      this.baseLayer.setZIndex(-999);
      map.addLayer(this.baseLayer);
    } else {
      map.removeLayer(this.baseLayer);
      this.baseLayer = null;
    }
  };

  render() {
    const { open } = this.state;

    return (
      <div>
        <Tooltip title="Call layers" placement="right">
          <IconButton
            color="primary"
            aria-label="Base layer"
            component="span"
            onClick={() => this.toggleOpen(true)}
          >
            <LayersIcon />
          </IconButton>
        </Tooltip>
        <Drawer
          open={open}
          onClose={() => this.toggleOpen(false)}
          variant="temporary"
        >
          <div style={{ width: "300px" }}>
            <List />
          </div>
        </Drawer>
      </div>
    );
  }
}
