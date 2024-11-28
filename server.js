const express = require('express');
const axios = require('axios');
const app = express();

let cachedData = null; // 캐시된 데이터를 저장
let lastFetchTime = null; // 마지막으로 데이터를 가져온 시간 저장

const fetchExchangeRate = async () => {
  try {
    const response = await axios.get(
      'https://www.koreaexim.go.kr/site/program/financial/exchangeJSON', {
        params: {
          authkey: 'nxDAZEku4syG7lztPuMf14ZFiZMOClIL',
          searchdate: '20241125',
          data: 'AP01',
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching data from OpenAPI:', error.message);
    throw new Error('Failed to fetch data from OpenAPI');
  }
};

app.get('/api/exchange-rate', async (req, res) => {
  const now = new Date();
  
  // 캐시된 데이터가 없거나 5분 이상 경과한 경우 다시 가져오기
  if (!cachedData || (now - lastFetchTime) > 5 * 60 * 1000) {
    try {
      cachedData = await fetchExchangeRate();
      lastFetchTime = now;
    } catch (error) {
      return res.status(500).json({ error: 'Failed to fetch data from OpenAPI' });
    }
  }
  
  res.json(cachedData); // 캐시된 데이터를 반환
});

app.listen(3001, () => {
  console.log('Server running on http://localhost:3001');
});
