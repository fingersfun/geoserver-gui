import React, { Component } from "react";
import { connect } from "react-redux";

import * as urls from "@portal/constant/menu_urls.js";

import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import AccountCircle from "@mui/icons-material/AccountCircle";
import PasswordIcon from "@mui/icons-material/Password";
import { LoadingButton } from "@mui/lab";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

import { login } from "@portal/store/reducers/login";
import { loginToGeoserver } from "./ajax";

class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      username: "",
      password: "",
      server: GEOSERVER,
      showMessage: false,
      message: "",
      status: "error",
    };
  }
  handleServerChange = (e) => {
    this.setState({
      server: e.target.value,
    });
  };

  handleUsernameChange = (e) => {
    this.setState({
      username: e.target.value,
    });
  };

  handlePasswordChange = (e) => {
    this.setState({
      password: e.target.value,
    });
  };

  handleCloseMessage = () => {
    this.setState({ showMessage: false });
  };

  login = async () => {
    this.setState({ loading: true });
    let result = await loginToGeoserver(
      this.state.server,
      this.state.username,
      this.state.password
    );

    if (result && result.status) {
      this.setState({
        message: "Login failed!",
        showMessage: true,
        loading: false,
        status: "error",
      });
    } else {
      this.props.login({
        server: this.state.server,
        username: this.state.username,
        password: this.state.password,
      });
      this.setState({
        message: "Login successful!",
        showMessage: true,
        status: "success",
      });
      setTimeout(() => {
        window.location.href = urls.HOME;
      }, 2000);
    }
  };

  render() {
    return (
      <React.Fragment>
        <Stack
          component="form"
          sx={{
            width: "300px",
            margin: "0 auto",
          }}
          spacing={2}
          noValidate
          autoComplete="off"
        >
          <h2>Geoserver login</h2>
          <Box sx={{ display: "flex", alignItems: "flex-end" }}>
            <AccountCircle sx={{ color: "action.active", mr: 1, my: 0.5 }} />
            <TextField
              id="server"
              label="Server"
              variant="standard"
              onChange={this.handleServerChange}
              value={this.state.server}
              fullWidth
            />
          </Box>
          <Box sx={{ display: "flex", alignItems: "flex-end" }}>
            <AccountCircle sx={{ color: "action.active", mr: 1, my: 0.5 }} />
            <TextField
              id="username"
              label="Username"
              variant="standard"
              onChange={this.handleUsernameChange}
              value={this.state.username}
              fullWidth
            />
          </Box>
          <Box sx={{ display: "flex", alignItems: "flex-end" }}>
            <PasswordIcon sx={{ color: "action.active", mr: 1, my: 0.5 }} />
            <TextField
              id="password"
              label="Password"
              variant="standard"
              type="password"
              onChange={this.handlePasswordChange}
              value={this.state.password}
              fullWidth
            />
          </Box>
          <LoadingButton
            variant="contained"
            onClick={this.login}
            loading={this.state.loading}
          >
            Login
          </LoadingButton>
        </Stack>
        <Snackbar
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
          autoHideDuration={6000}
          open={this.state.showMessage}
          onClose={this.handleCloseMessage}
          key={"top_right"}
        >
          <Alert severity={this.state.status}>{this.state.message}</Alert>
        </Snackbar>
      </React.Fragment>
    );
  }
}

const mapState = (state) => ({
  login: state.login,
});

const mapDispatch = (dispatch) => ({
  login: (payload) => dispatch(login(payload)),
});

export default connect(mapState, mapDispatch)(index);
