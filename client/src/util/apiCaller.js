import axios from "axios";

export default function callApi(endpoint, method = "get", body) {
  return axios
    .get(endpoint, {
      body: JSON.stringify(body)
    })
    .then(response => {
      return response.json();
    });
}
