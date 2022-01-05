import { getServer } from "@portal/utils/storage";

const GEO_SERVER_REST = () => {
  return getServer() + "/rest";
};

export const G_WORKSPACES = () => GEO_SERVER_REST() + "/workspaces";
export const G_LAYERS = (workspaceName, layerName = null) => {
  if (layerName != null) {
    return (
      //GEO_SERVER_REST() + `/workspaces/${workspaceName}/layers/${layerName}.json`
      getServer() + "/rest" + `/workspaces/${workspaceName}/layers/${layerName}.json`
    );
  }
  //return GEO_SERVER_REST() + `/workspaces/${workspaceName}/layers`;
  return getServer() + "/rest" + `/workspaces/${workspaceName}/layers`;
};
export const G_STYLES = (workspace, style) => {
  //return GEO_SERVER_REST() + `/workspaces/${workspace}/styles/${style}`;
  return getServer() + "/rest" + `/workspaces/${workspace}/styles/${style}`;
};
