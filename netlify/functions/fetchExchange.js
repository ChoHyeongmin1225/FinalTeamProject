const axios = require("axios");

exports.handler = async function (event) {
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
    return {
      statusCode: error.response?.status || 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
};