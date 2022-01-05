import React, { Component } from "react";
import { connect } from "react-redux";

import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";

import Map from "./Map";
//import Coder from "./Coder";
import styles from "./index.less";

import {
  setWorkspace,
  //setLayer
} from "@portal/store/reducers/geoserver";

class index extends Component {
  constructor(props) {
    super(props);

    this.state = {
      mode: "2d",
      pageStatus: -1,
      workspace: null,
      // layer: null,
    };
  }

  componentDidMount = () => {
    const { match } = this.props;

    if (
      !match &&
      !match.params &&
      (!match.params.workspace)
    ) {
      this.setState({ pageStatus: 404 });
      return;
    }

    const { workspace } = match.params;
    this.setState({ pageStatus: false, workspace });

    const { currentWorkspace, currentLayer } = this.props.geo;
    if (!currentWorkspace || !currentLayer) {
      this.props.setWorkspace(workspace);
      //this.props.setLayer(layer);
    }
  };

  render() {
    const { mode, pageStatus, workspace } = this.state;

    if (pageStatus) {
      let text = "loading";
      if (pageStatus == 404) {
        text = "not found";
      }
      return (
        <React.Fragment>
          <CssBaseline />
          <Container
            maxWidth="100%"
            disableGutters={true}
            sx={{ paddingTop: "0px" }}
          >
            <div>{text}</div>
          </Container>
        </React.Fragment>
      );
    }

    return (
      <React.Fragment>
        <CssBaseline />
        <Container
          maxWidth="100%"
          disableGutters={true}
          sx={{ paddingTop: "64px" }}
        >
          <Map show={mode == "2d"} workspace={workspace} />
          <Box
            sx={{
              bgcolor: "#FFF",
              height: "calc('100vh - 36px')",
              width: "100%",
              float: "left",
              color: "#FFF",
            }}
          >
            <div className={styles.map}>

            </div>
          </Box>
        </Container>
      </React.Fragment>
    );
  }
}

const mapState = (state) => ({
  login: state.login,
  geo: state.geoserver,
});

const mapDispatch = (dispatch) => ({
  setWorkspace: (payload) => dispatch(setWorkspace(payload))
});

export default connect(mapState, mapDispatch)(index);
