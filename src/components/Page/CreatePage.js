import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const CreatePage = () => {
  const [form, setForm] = useState({
    cur_unit: "",
    ttb: "",
    tts: "",
    deal_bas_r: "",
    bkpr: "",
    cur_nm: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleAdd = () => {
    fetch("https://67288771270bd0b97555f84b.mockapi.io/api/v1/exchange", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    })
      .then(() => {
        alert("Data added successfully!");
        navigate("/"); // ListPage로 이동
      })
      .catch((error) => console.error("Error adding data:", error));
  };

  return (
    <div>
      <h1>Create New Exchange</h1>
      <input
        type="text"
        name="cur_unit"
        placeholder="Currency Unit"
        value={form.cur_unit}
        onChange={handleChange}
      />
      <input
        type="text"
        name="ttb"
        placeholder="송금받을 때 금액"
        value={form.ttb}
        onChange={handleChange}
      />
      <input
        type="text"
        name="tts"
        placeholder="송금보낼 때 금액"
        value={form.tts}
        onChange={handleChange}
      />
      <input
        type="text"
        name="deal_bas_r"
        placeholder="매매기준율"
        value={form.deal_bas_r}
        onChange={handleChange}
      />
      <input
        type="text"
        name="bkpr"
        placeholder="장부 가격"
        value={form.bkpr}
        onChange={handleChange}
      />
      <input
        type="text"
        name="cur_nm"
        placeholder="국가명"
        value={form.cur_nm}
        onChange={handleChange}
      />
      <button onClick={handleAdd}>Add</button>
    </div>
  );
};

export default CreatePage;
