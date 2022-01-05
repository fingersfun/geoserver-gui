import React, { Component } from "react";
import { connect } from "react-redux";

// UI
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

import { getViewOptions } from "@portal/utils/geoserver";
// Clear previous layers
import { reset } from "@portal/store/reducers/layerControl";
import { clearLayers } from "./control/LayerGroupsBtn/layers";

// Map
import "ol/ol.css";
import Map from "ol/Map";
import View from "ol/View";
import { ScaleLine } from "ol/control";
import proj4 from "proj4";
import { register } from "ol/proj/proj4";
import { get as getProjection } from "ol/proj";

// Map UI
import { wmsLayer } from "./layer";
import { getCurrentLayer, getMap } from "./mapInstance";
import Controller from "./control";

import { search } from "@portal/utils/projdef";

import styles from "../index.less";

let scaleType = "scalebar";
let scaleBarSteps = 4;
let scaleBarText = true;
let control;

function scaleControl() {
  if (scaleType === "scaleline") {
    control = new ScaleLine({
      units: "metric",
    });
    return control;
  }
  control = new ScaleLine({
    units: "metric",
    bar: true,
    steps: scaleBarSteps,
    text: scaleBarText,
    minWidth: 140,
  });
  return control;
}

class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      message: "",
    };
  }
  componentDidMount = async () => {
    clearLayers();
    this.props.resetChecked();

    const { workspace, layer } = this.props;

    let viewOptions = {};
    let boundingBox = null;

    const result = await getViewOptions(workspace, layer);

    if (result && !result.status) {
      viewOptions = result[0];
      boundingBox = result[1];
    } else {
      this.setState({ open: true, message: result.data });
    }

    if (!viewOptions["projection"]) {
      viewOptions["projection"] = "EPSG:4326";
      viewOptions["center"] = [77.591766357422, 23.854614257813];
      viewOptions["zoom"] = 4;
    }

    const layer1 = wmsLayer(
      workspace,
      layer
    );
    layer1.setZIndex(999);
    getCurrentLayer(layer1);

    // If projection not supported by openlayer
    if (
      ![
        "EPSG:4326",
        "EPSG:3857",
        "EPSG:900913",
        "EPSG:102100",
        "EPSG:102113",
      ].includes(viewOptions["projection"])
    ) {
      const c = viewOptions["projection"].split(":");
      const proj_results = await search(c[1]);

      if (proj_results["results"].length > 0) {
        const proj4_def = proj_results["results"][0]["proj4"];
        const bbox = proj_results["results"][0]["bbox"];

        proj4.defs(viewOptions["projection"], proj4_def);
        register(proj4);
        const newProj = getProjection(viewOptions["projection"]);
        let worldExtent = [bbox[1], bbox[2], bbox[3], bbox[0]];
        newProj.setWorldExtent(worldExtent);
      } else {
        this.setState({
          open: true,
          message: "Not found the projection, the map may not working",
        });
      }
    }

    const view = new View(viewOptions);

    this.map = new Map({
      layers: [layer1],
      target: "map2d",
      controls: [scaleControl()],
      view: view,
    });
    if (boundingBox) view.fit(boundingBox, this.map.getSize());
    getMap(this.map);
  };

  componentDidUpdate = () => {
    if (this.map) {
      this.map.updateSize();
    }
  };

  handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    this.setState({ open: false });
  };

  render() {
    return (
      <div>
        <div id="map2d" className={styles.map} style={{ zIndex: 999 }}></div>
        <div className={styles.mapControl}>
          <Controller />
          <Snackbar
            open={this.state.open}
            autoHideDuration={6000}
            onClose={this.handleClose}
          >
            <Alert
              onClose={this.handleClose}
              severity="warning"
              sx={{ width: "100%" }}
            >
              {this.state.message}
            </Alert>
          </Snackbar>
        </div>
      </div>
    );
  }
}

const mapState = (state) => ({
  geoserver: state.geoserver,
});
const mapDispatch = (dispatch) => ({
  resetChecked: () => dispatch(reset()),
});

export default connect(mapState, mapDispatch)(index);
