import React, { Component } from "react";
import { connect } from "react-redux";

import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Checkbox from "@mui/material/Checkbox";

// import { getLayersOfWorkspace } from "../ajax";
// import { saveLayers } from "@portal/store/reducers/geoserver";

class item extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { name, checked, index, handleToggle } = this.props;

    const labelId = `checkbox-list-secondary-label-${this.props.index}`;

    return (
      <ListItem
        key={index}
        secondaryAction={
          <Checkbox
            edge="end"
            onChange={() => handleToggle(name)}
            checked={checked == name}
            inputProps={{ "aria-labelledby": labelId }}
            value={name}
          />
        }
        disablePadding
      >
        <ListItemButton>
          <ListItemText id={labelId} primary={`${name}`} />
        </ListItemButton>
      </ListItem>
    );
  }
}

const mapState = () => ({});

const mapDispatch = () => ({});

export default connect(mapState, mapDispatch)(item);
