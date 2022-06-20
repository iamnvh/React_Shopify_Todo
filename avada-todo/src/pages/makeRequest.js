import requestOptions from "./requestOptions";

export default async function makeRequest({ url, method, body = null }) {
    const response = await fetch(
      "http://localhost:5000" + url,
      requestOptions(method, body)
    );
    const { data } = await response.json();

    return data;
  }

