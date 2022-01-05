import React, { Component } from "react";

import CodeMirror from "codemirror/lib/codemirror.js";
import "codemirror/theme/cobalt.css";
import "codemirror/lib/codemirror.css";
import "codemirror/mode/xml/xml.js";
import "codemirror/addon/fold/xml-fold.js";

import { setInstance } from "./editorSingleton";

import styles from "./index.less";
import "./codeMirror.css";

export default class index extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount = async () => {
    let options = {
      lineNumbers: true,
      mode: this.props.type,
      matchBrackets: true,
      lineWrapping: true,
      value: "",
      styleActiveLine: true,
    };

    if (this.props.type == "xml") {
      options["foldGutter"] = true;
      options["gutters"] = ["CodeMirror-linenumbers", "CodeMirror-foldgutter"];
    }

    const editor = CodeMirror(document.getElementById("msseditor"), options);

    setInstance(editor);

    editor.getDoc().setValue(this.props.value);
  };

  // componentDidUpdated = () => {
  //   let editor = getInstance();
  //   editor.getDoc().setValue(this.props.value);
  //   editor.refresh();
  // };

  render() {
    return <div id="msseditor" className={styles.msseditor}></div>;
  }
}
