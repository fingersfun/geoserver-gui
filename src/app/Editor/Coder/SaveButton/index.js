import React, { Component } from "react";
import { connect } from "react-redux";

import SaveIcon from "@mui/icons-material/Save";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

import { LoadingButton } from "@mui/lab";

import getInstance from "@portal/app/Editor/Coder/editorSingleton";
import { saveStyle } from "@portal/utils/ajax";
import { getCurrentLayer } from "@portal/app/Editor/Map/mapInstance";

import styles from "./index.less";

class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      showMessage: false,
      status: "success",
      message: "",
    };
  }
  
  handleCloseMessage = () => {
    this.setState({ showMessage: false });
  };

  handleSave = async () => {
    const { currentWorkspace, currentStyle, currentStyleFormat } =
      this.props.geo;

    this.setState({ loading: true });

    const editor = getInstance();
    let result = await saveStyle(
      currentWorkspace,
      currentStyle,
      editor.getValue(),
      currentStyleFormat
    );

    if (result && result.status) {
      this.setState({
        message: "Failed",
        showMessage: true,
        loading: false,
        status: "error",
      });
    } else {
      const source = getCurrentLayer().getSource();
      source.updateParams({ time: Date.now() });
      source.refresh();

      this.setState({
        message: "Saved!",
        showMessage: true,
        loading: false,
        status: "success",
      });
    }
  };

  render() {
    return (
      <div>
        <span className={styles.editorName}>
          {this.props.geo.currentWorkspace}
          {this.props.geo.currentLayer && ":"}
          {this.props.geo.currentLayer}
          {this.props.geo.currentStyle && "/"}
          {this.props.geo.currentStyle}
        </span>
        {this.props.geo.currentWorkspace &&
          this.props.geo.currentLayer &&
          this.props.geo.currentStyle &&
          this.props.geo.currentStyleFormat && (
            <LoadingButton
              variant="contained"
              startIcon={<SaveIcon />}
              onClick={this.handleSave}
              loading={this.state.loading}
            >
              Save
            </LoadingButton>
          )}

        <Snackbar
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          autoHideDuration={6000}
          open={this.state.showMessage}
          onClose={this.handleCloseMessage}
          key={"top_right"}
        >
          <Alert severity={this.state.status}>{this.state.message}</Alert>
        </Snackbar>
      </div>
    );
  }
}

const mapState = (state) => ({
  geo: state.geoserver,
});

export default connect(mapState)(index);
