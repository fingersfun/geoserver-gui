import React, { Component } from "react";
import { connect } from "react-redux";

import List from "@mui/material/List";
import Item from "./item";

import { setLayer, setStyle } from "@portal/store/reducers/geoserver";
import { fetch } from "@portal/utils/ajax";

class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checked: "",
    };
  }

  handleToggle = async (value, href) => {
    this.setState({ checked: value });
    this.props.setLayer(value);
    const result = await fetch(href);
    if (result && result.status) {
      console.log("error");
    } else {
      const style = result.layer.defaultStyle;
      const styleName = style.name.split(":")[1];
      this.props.setStyle(styleName);
    }
  };

  render() {
    return (
      <List
        dense
        sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
      >
        {this.props.layers.map((layer, index) => {
          return (
            <Item
              key={layer.name}
              index={index}
              name={layer.name}
              handleToggle={() => this.handleToggle(layer.name, layer.href)}
              checked={this.state.checked}
            />
          );
        })}
      </List>
    );
  }
}

const mapState = (state) => ({
  layers: state.geoserver.layers,
});

const mapDispatch = (dispatch) => ({
  setLayer: (payload) => dispatch(setLayer(payload)),
  setStyle: (payload) => dispatch(setStyle(payload)),
});

export default connect(mapState, mapDispatch)(index);
