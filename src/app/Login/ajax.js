import request from "@portal/utils/request";

export const loginToGeoserver = async (server,username, password) => {
  return await request({
    url: server + "/rest/about/version.xml",
    method: "GET",
    auth: {
      username,
      password,
    },
  });
};
