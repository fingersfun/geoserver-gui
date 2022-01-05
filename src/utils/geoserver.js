import { getLayer, fetch } from "./ajax";

import { boundingExtent } from "ol/extent";


export const getViewOptions = async (workspace, layer) => {
  let options = {};
  let boundingBox = null;

  const result = await getLayer(workspace, layer);
  if (
    !result.layer ||
    !result.layer.resource ||
    !result.layer.resource["@class"] ||
    !result.layer.resource["href"]
  ) {
    return { status: "error" };
  }
  const { resource } = result.layer;
  const _class = resource["@class"];

  const fetched = await fetch(resource.href);
  if (fetched && fetched.status){
    return fetched
  }

  switch (_class) {
    case "featureType":
      options["projection"] = fetched.featureType.srs;
      options["center"] = [0, 0];
      options["zoom"] = 0;
      if (fetched.featureType.nativeBoundingBox) {
        const { minx, maxx, miny, maxy } = fetched.featureType.nativeBoundingBox;
        boundingBox = boundingExtent([
          [maxx, maxy],
          [minx, miny],
        ]);
      }
      break;

    case "coverage":
      options["projection"] = fetched.coverage.srs;
      options["center"] = [0, 0];
      options["zoom"] = 0;
      if (fetched.coverage.nativeBoundingBox) {
        const { minx, maxx, miny, maxy } = fetched.coverage.nativeBoundingBox;
        boundingBox = boundingExtent([
          [maxx, maxy],
          [minx, miny],
        ]);
      }
      break;
    default:
      return { status: "error" };
  }

  return [options, boundingBox];
};
