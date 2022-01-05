import request from "@portal/utils/request";
import { getAuth } from "@portal/utils/storage";
import { G_WORKSPACES, G_LAYERS, G_STYLES } from "@portal/constant/apis";

const getHeaders = {
  css: {
    Accept: "application/vnd.geoserver.geocss+css",
  },
  sld: {
    Accept: "application/vnd.ogc.sld+xml",
  },
  json: {
    Accept: "application/json",
  },
};

const postHeader = {
  css: {
    "Content-Type": "application/vnd.geoserver.geocss+css",
  },
  sld: {
    "Content-Type": "application/vnd.ogc.sld+xml",
  },
};

export const getWorkspaces = async () => {
  return await request({
    url: G_WORKSPACES(),
    method: "GET",
    auth: getAuth(),
    headers: getHeaders["json"],
  });
};

export const getLayersOfWorkspace = async (workspace) => {
  return await request({
    url: G_LAYERS(workspace),
    method: "GET",
    auth: getAuth(),
    headers: getHeaders["json"],
  });
};

export const getLayer = async (workspace, layer) => {
  return await request({
    url: G_LAYERS(workspace, layer),
    method: "GET",
    auth: getAuth(),
    headers: getHeaders["json"],
  });
};

export const fetch = async (href) => {
  href = href.replace("http", "http");
  //href = href.replace("http", "https");

  return await request({
    url: href,
    method: "GET",
    auth: getAuth(),
    headers: getHeaders["json"],
  });
};

export const checkStyle = async (workspace, style) => {
  return await request({
    url: G_STYLES(workspace, style),
    method: "GET",
    auth: getAuth(),
    headers: getHeaders["json"],
    isJSON: false,
  });
};

export const getStyle = async (workspace, style, format = "css") => {
  return await request({
    url: G_STYLES(workspace, style),
    method: "GET",
    auth: getAuth(),
    headers: getHeaders[format],
    isJSON: false,
  });
};

export const saveStyle = async (workspace, style, body, format = "css") => {
  const auth = getAuth();
  return await request({
    url: G_STYLES(workspace, style),
    method: "PUT",
    data: body,
    auth,
    headers: postHeader[format],
    isJSON: false,
  });
};
