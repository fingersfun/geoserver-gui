export const BASE_PATH = PATH_PREFIX || "";

let PORTAL_PREFIX = BASE_PATH + "";

if (NODE_ENV && NODE_ENV == "production") {
  PORTAL_PREFIX = "";
}

export const HOME = PORTAL_PREFIX + "/";
export const ABOUT = PORTAL_PREFIX + "/about";
export const LOGIN = PORTAL_PREFIX + "/login";
export const EDITOR = PORTAL_PREFIX + "/editor/:workspace/:layer/:style";
export const MAPVIEW = PORTAL_PREFIX + "/mapview/:workspace";
export const EDITOR_URL = (w, l, s) => PORTAL_PREFIX + `/editor/${w}/${l}/${s}`;
export const MAPVIEW_URL = (w) => PORTAL_PREFIX + `/mapview/${w}/`;
