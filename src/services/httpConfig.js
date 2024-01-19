const handleApiCall = async (url, method, body) => {
  const TOKEN = localStorage.getItem("authToken");
  const options = {
    method: method,
    headers: {
      "content-type": "application/json",
      Authorization: `Token ${TOKEN}`,
    },
    data: body,
    url: `${process.env.REACT_APP_BASE_URL}${url}`,
  };
  const response = await axios(options);
  return response;
};
