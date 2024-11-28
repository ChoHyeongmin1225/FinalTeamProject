import fetch from 'node-fetch';

exports.handler = async function (event) {
  console.log("Incoming request to fetchExchange API");
  try {
    const response = await fetch(
      "https://www.koreaexim.go.kr/site/program/financial/exchangeJSON?authkey=nxDAZEku4syG7lztPuMf14ZFiZMOClIL&searchdate=20241125&data=AP01"
    );
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    console.log("Response from OpenAPI:", data); // 성공 로그
    return {
      statusCode: 200,
      body: JSON.stringify(data),
    };
  } catch (error) {
    console.error("Error fetching OpenAPI data:", error.message); // 에러 로그
    return {
      statusCode: error.response?.status || 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
};
