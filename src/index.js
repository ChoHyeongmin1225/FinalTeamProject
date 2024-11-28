import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ListPage from "./components/Page/ListPage";
import CreatePage from "./components/Page/CreatePage";
import DetailPage from "./components/Page/DetailPage";
import UpdatePage from "./components/Page/UpdatePage";
import "./index.css";
import ExchangeRate from "./components/EntireList/ExchangeRate";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <Router>
    <Routes>
      <Route path="/" element={<ListPage />} />
      <Route path="/create" element={<CreatePage />} />
      <Route path="/detail/:id" element={<DetailPage />} />
      <Route path="/update/:id" element={<UpdatePage />} />
      <Route path="/openapi" element={<ExchangeRate/>}/>
    </Routes>
  </Router>
);