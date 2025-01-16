import axios from "axios";
const urlBase = "https://www.example.com";

export const getToken = () => {
  const token = "";
  const username = "apitest";
  const password = "test123";
  const api = urlBase + "/token?username=" + username + "&password=" + password;
  const authOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Basic Auth",
    },
    body: {},
    json: true,
  };

  fetch(api, authOptions)
    .then((response) => {
      return response.text();
    })
    .then((data) => {
      const json = JSON.parse(data);
      token = json["response"]["token"];
    });

  return token;
};

export const useToken = (token) => {
  const [responseData] = useState(false);
  const authOptions = {
    url: urlBase + "/GetData",
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: "bearer " + token,
    },
    body: {
      fieldData: {},
      script: "getData",
    },
    json: true,
  };

  axios(authOptions)
    .then((response) => {
      return response.text();
    })
    .then((data) => {
      responseData(data.response.scriptResult);
    });

  return responseData;
};
