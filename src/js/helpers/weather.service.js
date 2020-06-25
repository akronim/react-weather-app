import fetcher from "./fetcher";

export const weatherSevice = {
  getByCity,
};

function getByCity(url, successCallback) {
  const requestOptions = {
    method: "GET",
  };

  return fetcher.fetchCall(url, requestOptions, successCallback);
}

export default weatherSevice;
