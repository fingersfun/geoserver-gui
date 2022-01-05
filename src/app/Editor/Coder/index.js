import React, { Component } from "react";

import { connect } from "react-redux";
import styles from "./index.less";
import CodeMirror from "./codeMirror";

import { getStyle, checkStyle } from "@portal/utils/ajax";

import { setCurrentStyleFormat } from "@portal/store/reducers/geoserver";

const types = {
  "sld": "xml",
}

class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: null,
      format: null,
    };
  }

  componentDidMount = async () => {
    const { workspace, style } = this.props;
    const result = await checkStyle(workspace, style);
    this.props.setFormat(result.style.format);
    const code = await getStyle(workspace, style, result.style.format);
    this.setState({ value: code, format: result.style.format});
  };

  componentDidUpdated = async () => {
    this.setState({ value: null });
    const { workspace, style } = this.props;
    const result = await checkStyle(workspace, style);
    this.props.setFormat(result.style.format);
    const code = await getStyle(workspace, style);
    this.setState({ value: code, format: result.style.format});
  };

  render() {
    const { value, format } = this.state;

    if (!value) {
      return <div className={styles.editorPanel}>Loading</div>;
    }

    return (
      <div className={styles.editorPanel}>
        <CodeMirror value={value} type={types[format] ? types[format] : null} />
      </div>
    );
  }
}

const mapState = (state) => ({
  currentStyleFormat: state.geoserver.currentStyleFormat,
});

const mapDispatch = (dispatch) => ({
  setFormat: (payload) => dispatch(setCurrentStyleFormat(payload)),
});

export default connect(mapState, mapDispatch)(index);
