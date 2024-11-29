import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { XMLParser } from 'fast-xml-parser'; // fast-xml-parser import
import './Game.css';
import { Link } from 'react-router-dom';

const Game = () => {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const onChange = (e) => {
    setSearchTerm(e.target.value);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("https://www.grac.or.kr/WebService/GameSearchSvc.asmx/game",
      {
        params: {
          display: "10",
          pageno: "1",
        },
      }); // 백엔드 API 호출
        const parser = new XMLParser({
          ignoreAttributes: false,
          trimValues: true,       
        });
        const parsedData = parser.parse(response.data);
         
      
        const items = parsedData.result?.item || []; 
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
        <div className="title"><h1>Game OpenAPI List Page</h1></div>
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
            {filteredData.length > 0 ? (
              filteredData.map((item, index) => (
                <tr key={index}>
                  <td>{item.gametitle}</td>
                  <td>{item.entname}</td>
                  <td>{item.givenrate}</td>
                  <td>{item.genre}</td>
                  <td>{item.platform}</td>
                  <td>{item.summary}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6">No data available</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    );
    
};

export default Game;
