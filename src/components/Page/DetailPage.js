import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./DetailPage.css"

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
    <>
    <div className="body">
    <h1>Detail Page</h1>
      <p>Game Title: {data.gametitle}</p>
      <p>Production Company: {data.entname}</p>
      <p>Given Rate: {data.givenrate}</p>
      <p>Genre: {data.genre}</p>
      <p>Platform: {data.platform}</p>
      <p>Summary: {data.summary}</p>
      <button onClick={() => navigate("/")}>Back to ListPage</button>
    </div>
    </>
  );
};

export default DetailPage;
