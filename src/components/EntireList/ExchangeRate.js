import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './ExchangeRate.css'
import { Link } from 'react-router-dom';

const ExchangeRate = () => {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
 
  const onChange = (e) => {
    setSearchTerm(e.target.value);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          '/api/site/program/financial/exchangeJSON',
          {
            params: {
              authkey: 'nxDAZEku4syG7lztPuMf14ZFiZMOClIL',
              searchdate: '20241125',
              data: 'AP01',
            },
          }
        );
        setData(response.data);
       
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
   
  }, []);

  const filteredData = searchTerm
  ? data.filter((terminfo) =>
    terminfo.cur_unit.toLowerCase().includes(searchTerm.toLowerCase()) || 
  terminfo.cur_nm.includes(searchTerm)
    )
  : data;

  return (
    <div>
       <div className='title'><h1>Handong Exchange Association OpenAPI List Page</h1></div>
      <div className='head'>
      <input
          className="search"
          placeholder="Search"
          onChange={onChange}
          value={searchTerm}
        />
        <div><Link to={'/'} className={'link'}> Go to Home Page </Link></div>
      </div>

      <table>
        <thead>
        <tr>
            <th>통화코드</th><th>국가/통화명</th><th>송금받을 때 금액</th><th>송금보낼 때 금액</th><th>매매기준율</th><th>장부 가격</th>
        </tr>
        </thead>
        <tbody>
        {filteredData.map((item) => (
          <tr key={item.cur_unit}>
            <td>{item.cur_unit}</td>
            <td>{item.cur_nm}</td>
            <td>{item.ttb}</td>
            <td>{item.tts}</td>
            <td>{item.deal_bas_r}</td>
            <td>{item.bkpr}</td>
          
          </tr>
        ))}
        </tbody>
      </table>
       

    </div>
  );
};

export default ExchangeRate;
