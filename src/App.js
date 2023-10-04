import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./components/homePage";
import Listbook from "./components/listBooks";
import AddBook from "./components/addBook";
import ListBooksPagination from "./components/listBooksPagination";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="Listbook" element={<Listbook />} />
        <Route path="ListBooksPagination" element={<ListBooksPagination />} />
        <Route path="AddBook/:test" element={<AddBook />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
