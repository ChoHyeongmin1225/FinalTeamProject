import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./ListPage.css";

const ListPage = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("https://67288771270bd0b97555f84b.mockapi.io/api/v1/exchange")
      .then((response) => response.json())
      .then((data) => setData(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const handleDelete = (id) => {

    const confirmDelete = window.confirm("Do you want to delete this item?");
  
    if (!confirmDelete) {
      return;
    }

    fetch(`https://67288771270bd0b97555f84b.mockapi.io/api/v1/exchange/${id}`, {
      method: "DELETE",
    })
      .then(() => {
        setData((prevData) => prevData.filter((item) => item.id !== id));
        alert("Item deleted successfully!");
      })
      .catch((error) => console.error("Error deleting data:", error));
  };

  return (
    <div>
      <div className="title">
      <h1>Handong Exchange Association</h1>
      </div>
      <div className="head">
      <Link to="/create" className={'link'}>Add New Exchange</Link>
        <Link to={'/openapi'} className={'link'}> Go to Entire List Page </Link>
      </div>
      <table>
        <tr>
            <th>통화코드</th><th>국가/통화명</th><th>Show Detail</th><th>Edit/Delete</th>
        </tr>
        {data.map((item) => (
          <tr key={item.id}>
            <td>{item.cur_unit}</td>
            <td>{item.cur_nm}</td>
            <td><Link to={`/detail/${item.id}`}> Details </Link></td>
            <td>
                <Link to={`/update/${item.id}`}> Edit </Link>
                <button onClick={() => handleDelete(item.id)}>Delete</button>
            </td>
          </tr>
        ))}
      </table>
    </div>
  );
};

export default ListPage;
