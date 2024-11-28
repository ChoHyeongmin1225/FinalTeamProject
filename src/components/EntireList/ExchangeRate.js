import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { parseStringPromise } from 'xml2js'; // XML 파싱 라이브러리
import './ExchangeRate.css';
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
        const response = await axios.get('/api/fetchExchange'); // 백엔드 API 호출
        // XML을 JSON으로 변환
        const parsedData = await parseStringPromise(response.data, {
          explicitArray: false, // 단일 항목은 배열로 처리하지 않음
          trim: true,           // 공백 제거
        });
        // JSON에서 필요한 데이터 추출
        const items = parsedData.result.item || []; // 'item' 필드가 배열로 저장됨
        setData(items);
      } catch (error) {
        console.error('Error fetching or parsing data:', error);
      }
    };

    fetchData();
  }, []);

  const filteredData = searchTerm
    ? data.filter((item) =>
        item.gametitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.entname.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : data;

  return (
    <div>
      <div className="title"><h1>Handong Exchange Association OpenAPI List Page</h1></div>
      <div className="head">
        <input
          className="search"
          placeholder="Search"
          onChange={onChange}
          value={searchTerm}
        />
        <div><Link to="/" className="link">Go to Home Page</Link></div>
      </div>

      <table>
        <thead>
          <tr>
            <th>게임 제목</th><th>제작사</th><th>등급</th><th>장르</th><th>플랫폼</th><th>요약</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((item, index) => (
            <tr key={index}>
              <td>{item.gametitle}</td>
              <td>{item.entname}</td>
              <td>{item.givenrate}</td>
              <td>{item.genre}</td>
              <td>{item.platform}</td>
              <td>{item.summary}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ExchangeRate;
