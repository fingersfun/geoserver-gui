export const getAuth = () => {
  if (
    !localStorage.getItem("username") ||
    !localStorage.getItem("token") ||
    !localStorage.getItem("server")
  ) {
    return false;
  }

  return {
    username: localStorage.getItem("username"),
    password: localStorage.getItem("token"),
    server: localStorage.getItem("server"),
  };
};

export const getServer = () => {
  return localStorage.getItem("server");
};
