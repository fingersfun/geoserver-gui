import React, { Component } from "react";
import { connect } from "react-redux";

import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Switch from "@mui/material/Switch";

import { getMap } from "@portal/app/View/Map/mapInstance";
import { wmsLayer } from "@portal/app/View/Map/layer";

import { check, uncheck } from "@portal/store/reducers/layerControl";
import { layers } from "./layers";

class item extends Component {
  constructor(props) {
    super(props);
    this.layer = null;
  }

  setLayer = () => {
    const { workspace, layer, index } = this.props;

    if (this.layer != null) return;
    if (layers[layer]) {
      this.layer = layers[layer];
      return;
    }
    this.layer = wmsLayer(workspace, layer);
    this.layer.setZIndex(index);
    this.layer.set("commonName", this.layer);
  };

  componentDidMount = () => {
    this.setLayer();
  };

  componentDidUpdate = () => {
    this.setLayer();
  };

  handleToggle = () => {
    const { checked, layer } = this.props;
    if (!checked[layer]) {
      getMap().addLayer(this.layer);
      this.props.check({ name: layer });
      layers[layer] = this.layer;
    } else {
      getMap().removeLayer(this.layer);
      this.props.uncheck({ name: layer });
    }
    this.setState({ checked });
  };

  render() {
    const { index, layer, checked } = this.props;
    let isChecked = checked[layer] === true;
    return (
      <ListItem>
        <ListItemButton role={undefined}>
          <ListItemText id={"layer-id-" + index} primary={`${layer}`} />
          <ListItemIcon>
            <Switch
              edge="end"
              onChange={this.handleToggle}
              checked={isChecked}
              inputProps={{
                "aria-labelledby": "layer-id-" + index,
              }}
            />
          </ListItemIcon>
        </ListItemButton>
      </ListItem>
    );
  }
}

const mapStateToProps = (state) => ({
  checked: state.layerControl.checked,
});

const mapDispatch = (dispatch) => ({
  check: (payload) => dispatch(check(payload)),
  uncheck: (payload) => dispatch(uncheck(payload)),
});

export default connect(mapStateToProps, mapDispatch)(item);
