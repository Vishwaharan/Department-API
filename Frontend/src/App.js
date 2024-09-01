import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import DepartmentList from "./components/DepartmentList";
import DepartmentForm from "./components/DepartmentForm";
import "@fortawesome/fontawesome-free/css/all.min.css";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<DepartmentList />} />
          <Route path="/add" element={<DepartmentForm />} />
          <Route path="/edit/:id" element={<DepartmentForm />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
