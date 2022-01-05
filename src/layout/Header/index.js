import React from "react";
import { connect } from "react-redux";
import * as urls from "@portal/constant/menu_urls.js";
import { withRouter } from "react-router-dom";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
// import styles from "./index.less";

// save code
import SaveButton from "@portal/app/Editor/Coder/SaveButton";
import EditButton from "@portal/app/Editor/Coder/EditButton";


import { logout } from "@portal/store/reducers/login";

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      anchorEl: null,
    };
  }

  handleClick = (event) => {
    this.setState({ anchorEl: event.currentTarget });
  };
  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  handleHome = () => {
    this.setState({ anchorEl: null });
    this.props.history.push(urls.HOME)
  }

  handleLogout = () => {
    this.setState({ anchorEl: null });
    this.props.logout();
    window.location.href = urls.LOGIN;
  };

  componentDidMount = () => { };

  render() {
    const open = Boolean(this.state.anchorEl);
    const { workspace, layer, style } = this.props;

    return (
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="fixed">
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
              aria-controls="basic-menu"
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              onClick={this.handleClick}
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="basic-menu"
              anchorEl={this.state.anchorEl}
              open={open}
              onClose={this.handleClose}
              MenuListProps={{
                "aria-labelledby": "basic-button",
              }}
            >
              <MenuItem onClick={this.handleHome}>Home</MenuItem>
              <MenuItem onClick={this.handleLogout}>Logout</MenuItem>
            </Menu>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Map coloring tool
            </Typography>
            {this.props.match.path == urls.EDITOR &&
              this.props.geo.currentWorkspace &&
              this.props.geo.currentLayer &&
              this.props.geo.currentStyle && <SaveButton />}
            {this.props.match.path == urls.HOME &&
              this.props.geo.currentWorkspace &&
              this.props.geo.currentLayer &&
              this.props.geo.currentStyle && (
                <EditButton workspace={workspace} layer={layer} style={style} />
              )}
          </Toolbar>
        </AppBar>
      </Box>
    );
  }
}

const mapState = (state) => ({
  login: state.login,
  geo: state.geoserver,
  workspace: state.geoserver.currentWorkspace,
  layer: state.geoserver.currentLayer,
  style: state.geoserver.currentStyle,
});
const mapDispatch = (dispatch) => ({
  logout: () => dispatch(logout()),
});

export default withRouter(connect(mapState, mapDispatch)(Header));
