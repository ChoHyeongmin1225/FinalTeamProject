import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./UpdatePage.css";

const UpdatePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    cur_unit: "",
    ttb: "",
    tts: "",
    deal_bas_r: "",
    bkpr: "",
    cur_nm: "",
  });

  useEffect(() => {
    fetch(`https://67288771270bd0b97555f84b.mockapi.io/api/v1/exchange/${id}`)
      .then((response) => response.json())
      .then((data) => setForm(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleEdit = () => {
    if(!form.cur_nm || !form.cur_unit || !form.bkpr || !form.deal_bas_r || !form.ttb || !form.tts){
      alert("Blank input!");
      return;
    }
    fetch(`https://67288771270bd0b97555f84b.mockapi.io/api/v1/exchange/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    })
      .then(() => {
        alert("Data updated successfully!");
        navigate("/"); // ListPage로 이동
      })
      .catch((error) => console.error("Error updating data:", error));
  };

  return (
    <div className="body">
      <h2>Update Exchange Data</h2>
      <div><input
        type="text"
        name="cur_unit"
        placeholder="Currency Unit"
        value={form.cur_unit}
        onChange={handleChange}
      /></div>
      <div><input
        type="text"
        name="ttb"
        placeholder="송금받을 때 금액"
        value={form.ttb}
        onChange={handleChange}
      /></div>
      <div><input
        type="text"
        name="tts"
        placeholder="송금보낼 때 금액"
        value={form.tts}
        onChange={handleChange}
      /></div>
      <div><input
        type="text"
        name="deal_bas_r"
        placeholder="매매기준율"
        value={form.deal_bas_r}
        onChange={handleChange}
      /></div>
      
      <div><input
        type="text"
        name="bkpr"
        placeholder="장부 가격"
        value={form.bkpr}
        onChange={handleChange}
      /></div>
      <div><input
        type="text"
        name="cur_nm"
        placeholder="국가명"
        value={form.cur_nm}
        onChange={handleChange}
      /></div>
      <div className="button">
      <button onClick={handleEdit} className="bt1">Edit</button>
      <button onClick={()=>navigate('/')} className="bt2">Close</button>
      </div>
    </div>
  );
};

export default UpdatePage;
