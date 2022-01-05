import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { connect } from "react-redux";
import * as urls from "@portal/constant/menu_urls.js";

import Header from "./layout/Header";
import TopButton from "./layout/TopButton";

import Home from "./app/Home";
import About from "./app/About";
import Editor from "./app/Editor";
import MapView from "./app/View";
import Login from "./app/Login";

import { getAuth } from "@portal/utils/storage";
import { login, logout } from "@portal/store/reducers/login";

import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

const createApp = (Component, props) => {
  return (
    <React.Fragment>
      <Header />
      <Component {...props} />
    </React.Fragment>
  );
};

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
    };
  }

  componentDidMount = () => {
    const auth = getAuth();
    if (!auth) {
      this.props.logout();
      if (window.location.href.indexOf("/login") < 0) {
        setTimeout(() => {
          window.location.href = urls.LOGIN;
        }, 1000);
      }
    } else {
      this.props.login({
        username: auth.username,
        password: auth.password,
        server: auth.server,
      });
    }

    this.setState({ loading: false });
  }

  render() {
    if (this.state.loading) {
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
      <BrowserRouter>
        <Switch>
          <Route
            exact
            path={urls.EDITOR}
            render={(p) => createApp(Editor, p)}
          />
          <Route
            exact
            path={urls.MAPVIEW}
            render={(p) => createApp(MapView, p)}
          />
          <Route exact path={urls.ABOUT} render={(p) => createApp(About, p)} />
          <Route exact path={urls.HOME} render={(p) => createApp(Home, p)} />
          <Route exact path={urls.LOGIN} render={(p) => <Login {...p} />} />
        </Switch>

        { window.location.href != urls.MAPVIEW ? "" : <TopButton />}

      </BrowserRouter>
    );
  }
}

const mapStateToProps = (state) => ({
  loggedIn: state.login.loggedIn,
});

const mapDispatch = (dispatch) => ({
  login: (payload) => dispatch(login(payload)),
  logout: () => dispatch(logout()),
});

export default connect(mapStateToProps, mapDispatch)(App);
