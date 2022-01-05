import TileLayer from "ol/layer/Tile";
import WMTS from "ol/source/WMTS";
import { TileWMS } from "ol/source";
import WMTSTileGrid from "ol/tilegrid/WMTS";
import { get as getProjection } from "ol/proj";
import { getTopLeft, getWidth } from "ol/extent";

import { getServer } from "@portal/utils/storage";

const formatPNG = "image/png";

const projection = getProjection("EPSG:3857");
const projectionExtent = projection.getExtent();
const size = getWidth(projectionExtent) / 256;
const resolutions = new Array(14);
const matrixIds = new Array(14);

for (let z = 0; z < 14; ++z) {
  // generate resolutions and matrixIds arrays for this WMTS
  resolutions[z] = size / Math.pow(2, z);
  matrixIds[z] = z;
}

export const wmtsLayer = (workspace, layer) => {
  return new TileLayer({
    source: new WMTS({
      url: getServer() + "/" + workspace + "/wmts/" + layer,
      layer: "0",
      matrixSet: "EPSG:3857",
      format: "image/png",
      projection: projection,
      tileGrid: new WMTSTileGrid({
        origin: getTopLeft(projectionExtent),
        resolutions: resolutions,
        matrixIds: matrixIds,
      }),
      style: "default",
      wrapX: true,
    }),
  });
};

export const wmsLayer = (workspace, layer, origin = null) => {
  let options = {
    url: getServer() + "/" + workspace + "/wms",
    //url: "http://localhsot:8080/geoserver" + "/" + workspace + "/wms",
    params: {
      FORMAT: formatPNG,
      VERSION: "1.1.1",
      tiled: true,
      STYLES: "",
      LAYERS: workspace + ":" + layer,
      time: Date.now(),
    },
  };

  if (origin) {
    options["tilesOrigin"] = origin;
  }
  return new TileLayer({
    visible: true,
    source: new TileWMS(options),
  });
};
