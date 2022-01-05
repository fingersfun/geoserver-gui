import React, { Component } from "react";
import { connect } from "react-redux";

import Box from "@mui/material/Box";
import List from "@mui/material/List";
import CircularProgress from "@mui/material/CircularProgress";

import { getLayersOfWorkspace } from "@portal/utils/ajax";

import Item from "./item";

export class list extends Component {
  constructor(props) {
    super(props);
    this.state = {
      layers: [],
      loading: true,
    };
  }

  componentDidMount = async () => {
    const { workspace, layer } = this.props;
    const results = await getLayersOfWorkspace(workspace);
    const layers = results.layers.layer.filter(
      (item) => item.name != layer
    );
    this.setState({ layers, loading: false });
  };

  listContent = (layers) => {
    const { workspace } = this.props;

    return layers.map((v, i) => {
      return <Item key={i} index={i} layer={v.name} workspace={workspace} />;
    });
  };

  render() {
    const { layers, loading } = this.state;

    if (loading) {
      return (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "50vh",
          }}
        >
          <CircularProgress />
        </Box>
      );
    }

    return (
      <React.Fragment>
        {layers.length > 0 && (
          <div>
            <h4 style={{ paddingLeft: "15px" }}>Layers</h4>
            <List
              sx={{ width: "100%", maxWidth: 300, bgcolor: "background.paper" }}
              dense={true}
            >
              {this.listContent(layers)}
            </List>
          </div>
        )}
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  workspace: state.geoserver.currentWorkspace,
  layer: state.geoserver.currentLayer,
  checked: state.layerControl.checked,
});

export default connect(mapStateToProps)(list);
