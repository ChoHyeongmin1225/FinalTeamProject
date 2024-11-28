const axios = require("axios");

exports.handler = async function () {
  try {
    const response = await axios.get(
      "https://www.koreaexim.go.kr/site/program/financial/exchangeJSON",
      {
        params: {
          authkey: "nxDAZEku4syG7lztPuMf14ZFiZMOClIL",
          searchdate: "20241125",
          data: "AP01",
        },
      }
    );

    return {
      statusCode: 200,
      body: JSON.stringify(response.data),
    };
  } catch (error) {
    console.error("Error fetching OpenAPI data:", error.message);
    return {
      statusCode: error.response?.status || 500,
      body: JSON.stringify({ error: "Failed to fetch OpenAPI data" }),
    };
  }
};
