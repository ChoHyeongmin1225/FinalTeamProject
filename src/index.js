import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ListPage from "./components/ListPage";
import CreatePage from "./components/CreatePage";
import DetailPage from "./components/DetailPage";
import UpdatePage from "./components/UpdatePage";
import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <Router>
    <Routes>
      <Route path="/" element={<ListPage />} />
      <Route path="/create" element={<CreatePage />} />
      <Route path="/detail/:id" element={<DetailPage />} />
      <Route path="/update/:id" element={<UpdatePage />} />
    </Routes>
  </Router>
);