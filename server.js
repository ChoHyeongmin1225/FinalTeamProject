const express = require('express');
const axios = require('axios');
const app = express();

let cachedData = null; 
let lastFetchTime = null;

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



app.listen(3001, () => {
  console.log('Server running on http://localhost:3001');
});
