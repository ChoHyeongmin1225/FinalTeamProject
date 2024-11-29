import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./UpdatePage.css";

const UpdatePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    gametitle: "",
    entname: "",
    rateddate: "",
    givenrate: "",
    platform: "",
    genre: "",
    summary: "",
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
    if(!form.gametitle || !form.entname ||!form.rateddate || !form.givenrate || !form.genre || !form.summary || !form.platform){
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
        navigate("/"); 
      })
      .catch((error) => console.error("Error updating data:", error));
  };

  return (
    <>
    
     <div className="body">
   
      <div className="editform">
      <h2>Update Exchange Data</h2>
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
      <button onClick={handleEdit} className="bt1">Edit</button>
      <button onClick={()=>navigate('/')} className="bt2">Close</button>
      </div>
      </div>
      
    </div>
    </>
    
  );
};

export default UpdatePage;
