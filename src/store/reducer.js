import { combineReducers } from "redux";
import LoginReducer from "@portal/store/reducers/login";
import geoserverReducer from "@portal/store/reducers/geoserver";
import layerControl from "@portal/store/reducers/layerControl";

export default combineReducers({
  login: LoginReducer,
  geoserver: geoserverReducer,
  layerControl: layerControl,
  // ui: uiReducer,
});
