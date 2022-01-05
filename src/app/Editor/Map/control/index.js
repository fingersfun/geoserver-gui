import React, { Component } from "react";

import BaseLayerBtn from "./BaseLayerBtn";
import LayerGroupsBtn from "./LayerGroupsBtn";
import ZoomBtn from "./ZoomBtn";

import styles from "./index.less";

export default class index extends Component {
  render() {
    return (
      <div className={styles.control}>
        <ZoomBtn />
        <BaseLayerBtn />
        <LayerGroupsBtn />
      </div>
    );
  }
}
