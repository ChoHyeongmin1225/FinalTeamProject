import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const DetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch(`https://67288771270bd0b97555f84b.mockapi.io/api/v1/exchange/${id}`)
      .then((response) => response.json())
      .then((data) => setData(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, [id]);

  if (!data) return <p>Loading...</p>;

  return (
    <div>
      <h1>Detail Page</h1>
      <p>Currency Unit: {data.cur_unit}</p>
      <p>송금받을 때 금액: {data.ttb}</p>
      <p>송금보낼 때 금액: {data.tts}</p>
      <p>매매기준율: {data.deal_bas_r}</p>
      <p>장부 가격: {data.bkpr}</p>
      <p>국가명: {data.cur_nm}</p>
      <button onClick={() => navigate("/")}>Back to ListPage</button>
    </div>
  );
};

export default DetailPage;
