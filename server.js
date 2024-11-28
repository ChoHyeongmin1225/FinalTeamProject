const express = require('express');
const axios = require('axios');
const app = express();

app.use(cors());

app.get('/api/exchange-rate', async (req, res) => {
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
    res.json(response.data); 
  } catch (error) {
    console.error('Error fetching data from API:', error.message);
    res.status(500).json({ error: 'Failed to fetch data from OpenAPI' });
  }
});

app.listen(3001, () => {
  console.log('Server running on http://localhost:3001');
});
