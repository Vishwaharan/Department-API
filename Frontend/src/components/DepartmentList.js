// DepartmentList.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./DepartmentList.css"; // Custom styles

const DepartmentList = () => {
  const [departments, setDepartments] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    if (searchQuery) {
      axios
        .get(`http://localhost:8080/departments/search?query=${searchQuery}`)
        .then((response) => setDepartments(response.data))
        .catch((error) => console.error("Error fetching departments:", error));
    } else {
      axios
        .get("http://localhost:8080/departments")
        .then((response) => setDepartments(response.data))
        .catch((error) => console.error("Error fetching departments:", error));
    }
  }, [searchQuery]);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const deleteDepartment = (id) => {
    axios
      .delete(`http://localhost:8080/departments/${id}`)
      .then(() => {
        setDepartments(departments.filter((dept) => dept.departmentId !== id));
      })
      .catch((error) => console.error("Error deleting department:", error));
  };

  return (
    <div className="department-list-container">
      <h1 className="department-list-title">Explore Our Departments</h1>
      <div className="search-container">
        <div className="search-input-container">
          <input
            type="text"
            placeholder="Search by ID or Name"
            value={searchQuery}
            onChange={handleSearchChange}
            className="search-input"
          />
          <i className="fas fa-search search-icon"></i>
        </div>
      </div>
      <Link to="/add" className="btn btn-primary">
        Add New Department
      </Link>
      <table className="department-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Description</th>
            <th>Address</th>
            <th>Code</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {departments.map((department) => (
            <tr key={department.departmentId}>
              <td>{department.departmentId}</td>
              <td>{department.departmentName}</td>
              <td>{department.description}</td>
              <td>{department.departmentAddress}</td>
              <td>{department.departmentCode}</td>
              <td className="actions">
                <Link
                  to={`/edit/${department.departmentId}`}
                  className="btn btn-warning"
                >
                  Edit
                </Link>
                <button
                  onClick={() => deleteDepartment(department.departmentId)}
                  className="btn btn-danger"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DepartmentList;
