import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./CreatePage.css";
const CreatePage = () => {
  const [form, setForm] = useState({
    gametitle: "",
    entname: "",
    rateddate: "",
    givenrate: "",
    platform: "",
    genre: "",
    summary: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleAdd = () => {
    if(!form.gametitle || !form.entname ||!form.rateddate|| !form.givenrate || !form.genre || !form.summary || !form.platform){
      alert("Blank input!");
      return;
    }
    fetch("https://67288771270bd0b97555f84b.mockapi.io/api/v1/exchange", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    })
      .then(() => {
        alert("Data added successfully!");
        navigate("/"); 
      })
      .catch((error) => console.error("Error adding data:", error));
  };

  return (
    <div className="body">
      <h2>Create New Game</h2>
      <div className="child"><input
        type="text"
        name="gametitle"
        placeholder="Game Title"
        value={form.gametitle}
        onChange={handleChange}
      /></div>
      <div className="child"><input
        type="text"
        name="entname"
        placeholder="Production Company"
        value={form.entname}
        onChange={handleChange}
      /></div>
      <div className="child"><input
        type="text"
        name="rateddate"
        placeholder="Rated Date"
        value={form.rateddate}
        onChange={handleChange}
      /></div>
      <div className="child"><input
        type="text"
        name="givenrate"
        placeholder="Given Rate"
        value={form.givenrate}
        onChange={handleChange}
      /></div>
      <div className="child"><input
        type="text"
        name="genre"
        placeholder="Genre"
        value={form.genre}
        onChange={handleChange}
      /></div>
      
      <div className="child"><input
        type="text"
        name="platform"
        placeholder="Platform"
        value={form.platform}
        onChange={handleChange}
      /></div>
      <div className="child"><input
        type="text"
        name="summary"
        placeholder="Summary"
        value={form.summary}
        onChange={handleChange}
      /></div>
      
      <div className="button">
      <button onClick={handleAdd} className="bt1">Add</button>
      <button onClick={()=>navigate('/')} className="bt2">Close</button>
      </div>
    </div>
  );
};

export default CreatePage;
