import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const ListPage = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("https://67288771270bd0b97555f84b.mockapi.io/api/v1/exchange")
      .then((response) => response.json())
      .then((data) => setData(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const handleDelete = (id) => {
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
      <h1>Handong Exchange Association</h1>
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
      <Link to="/create">Add New Exchange</Link>
    </div>
  );
};

export default ListPage;
