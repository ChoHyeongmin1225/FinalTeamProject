const axios = require("axios");
const { parseStringPromise } = require("xml2js");

exports.handler = async function (event) {
  console.log("Incoming request to fetchExchange API");

  try {
    const response = await axios.get(
      "https://www.grac.or.kr/WebService/GameSearchSvc.asmx/game",
      {
        params: {
          display: "10",
          pageno: "1",
        },
      }
    );

    // XML 데이터를 JSON으로 변환
    const jsonData = await parseStringPromise(response.data, {
      explicitArray: false, // 단일 항목을 배열로 처리하지 않음
      trim: true,           // 공백 제거
    });

    console.log("Parsed JSON data:", jsonData); // 성공 로그

    return {
      statusCode: 200,
      body: JSON.stringify(jsonData), // JSON으로 반환
    };
  } catch (error) {
    console.error("Error fetching or parsing OpenAPI data:", error.message); // 에러 로그
    return {
      statusCode: error.response?.status || 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
};
