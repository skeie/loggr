const baseURl = __DEV__
  ? "http://192.168.0.103:3000"
  : "https://loggr-api.herokuapp.com";
let authorization = "";

function _appUrl(url) {
  return baseURl + url;
}

export function setAuthorizationToken(token) {
  authorization = token;
}

function setHeaders(method, body, optHeader) {
  const headers = Object.assign(
    {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    optHeader
  );

  if (authorization) {
    headers.authorization = `Bearer ${authorization}`;
  }

  return {
    method,
    headers,
    body
  };
}

export async function get(url, obj = {}) {
  const response = await fetch(_appUrl(url), setHeaders("GET"));

  if (response.status === 201) return;

  const responseJson = await response.json();

  if (response.status >= 400) {
    const msg = responseJson.msg || responseJson.message;
    throw {
      message: msg
    };
  }

  return responseJson;
}

export async function post(url, obj) {

  const response = await fetch(
    _appUrl(url),
    setHeaders("POST", JSON.stringify(obj))
  );

  if (response.status === 201) return;

  const responseJson = await response.json();

  if (response.status >= 400) {
    const msg = responseJson.msg || responseJson.message;
    throw {
      message: msg
    };
  }

  return responseJson;
}

export async function del(url, obj) {
  const response = await fetch(
    _appUrl(url),
    setHeaders("DELETE", JSON.stringify(obj))
  );

  if (response.status === 201) return;

  const responseJson = await response.json();

  if (response.status >= 400) {
    const msg = responseJson.msg || responseJson.message;
    throw {
      message: msg
    };
  }

  return responseJson;
}

export async function put(url, obj) {

  const response = await fetch(
    _appUrl(url),
    setHeaders("PUT", JSON.stringify(obj))
  );

  if (response.status === 201) return;

  const responseJson = await response.json();

  if (response.status >= 400) {
    const msg = responseJson.msg || responseJson.message;
    throw {
      message: msg
    };
  }

  return responseJson;
}
0;
