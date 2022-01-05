export const search = async (code) => {
  return new Promise((resolve) => {
    fetch("https://epsg.io/?format=json&q=" + code)
      .then(function (response) {
        return response.json();
      })
      .then(function (json) {
        resolve(json);
      });
  });
};
