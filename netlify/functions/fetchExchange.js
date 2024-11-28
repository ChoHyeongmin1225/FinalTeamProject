const axios = require("axios");


exports.handler = async function (event) {
  console.log("Incoming request to fetchExchange API");
  try {
    const response = await axios.get(
      "https://data.fixer.io/api/latest",
      {
        params: {
          access_key: "c87f9b42d53af234c68e4c8971bae2b0",
          format: "1",
        },
      }
    );
    console.log("Response from OpenAPI:", response.data); // 성공 로그
    return {
      statusCode: 200,
      body: JSON.stringify(response.data),
    };
  } catch (error) {
    console.error("Error fetching OpenAPI data:", error.message); // 에러 로그
    return {
      statusCode: error.response?.status || 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
};