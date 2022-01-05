import React, { Component } from "react";
import { connect } from "react-redux";

import List from "@mui/material/List";
import Item from "./item";

import { getWorkspaces } from "@portal/utils/ajax";
import { saveWorkspaces, setWorkspace } from "@portal/store/reducers/geoserver";

class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      workspaces: [],
      error: false,
      current: -1,
    };
  }

  componentDidMount = async () => {
    this.setState({ loading: true });
    if (this.props.workspaces.length) {
      this.setState({
        loading: false,
        workspaces: this.props.workspaces,
      });
      return;
    }

    const result = await getWorkspaces();
    if (result && result.status) {
      this.setState({
        loading: false,
        error: "Can't load workspaces from GeoServer.",
      });
    } else {
      this.setState({
        loading: false,
        workspaces: result.workspaces.workspace,
      });
      this.props.save(result.workspaces.workspace);
    }
  };

  saveCurrentWorkspace = (name, index) => {
    this.props.setWorkspace(name);
    this.setState({current: index})
  };

  render() {
    const { workspaces } = this.state;
    return (
      <div>
        <List
          sx={{ width: "100%", bgcolor: "background.paper" }}
          aria-label="workspaces"
        >
          {workspaces.map((workspace, index) => {
            return (
              <Item
                current={index == this.state.current}
                index={index}
                key={workspace.name}
                name={workspace.name}
                href={workspace.href}
                setWorkspace={(name, index) => this.saveCurrentWorkspace(name, index)}
              />
            );
          })}
        </List>
      </div>
    );
  }
}

const mapState = (state) => ({
  workspaces: state.geoserver.workspaces,
});

const mapDispatch = (dispatch) => ({
  save: (payload) => dispatch(saveWorkspaces(payload)),
  setWorkspace: (payload) => dispatch(setWorkspace(payload)),
});

export default connect(mapState, mapDispatch)(index);
