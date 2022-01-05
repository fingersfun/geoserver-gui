import React, { Component } from "react";

import PreviewOutlinedIcon from "@mui/icons-material/PreviewOutlined";


import * as urls from "@portal/constant/menu_urls.js";
import { withRouter } from "react-router-dom";

class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      message: "",
      open: false,
    };
  }

  handleViewMap = async () => {
    const { workspace } = this.props;
    this.setState({ loading: true });

    this.props.history.push(urls.MAPVIEW_URL(workspace));
    return;

  };

  handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    this.setState({ open: false });
  };

  render() {

    return (
      <React.Fragment>
        <PreviewOutlinedIcon onClick={this.handleViewMap} />
      </React.Fragment>
    );
  }
}

export default withRouter(index);
