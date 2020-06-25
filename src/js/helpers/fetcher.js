let fetcher = (function () {
  function fetchCall(url, requestOptions, callback) {
    return fetch(url, requestOptions).then(handleResponse).then(callback);
  }

  function handleResponse(response) {
    let contentType = response.headers.get("content-type");
    if (contentType.includes("application/json")) {
      return handleJSONResponse(response);
    } else if (contentType.includes("text/html")) {
      return handleTextResponse(response);
    } else {
      throw new Error(`Content-type ${contentType} not supported`);
    }
  }

  function handleJSONResponse(response) {
    return response.json().then((json) => {
      if (response.ok) {
        return json;
      }
    });
  }

  function handleTextResponse(response) {
    return response.text().then((text) => {
      if (response.ok) {
        return text;
      }
    });
  }

  return {
    fetchCall,
  };
})();

export default fetcher;
