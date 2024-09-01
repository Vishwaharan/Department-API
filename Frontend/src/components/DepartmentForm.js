// src/components/DepartmentForm.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import "./DepartmentForm.css"; // Custom styles

const DepartmentForm = () => {
  const [department, setDepartment] = useState({
    departmentName: "",
    departmentAddress: "",
    departmentCode: "",
  });

  const { id } = useParams(); // Get the ID from the URL parameters
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      // Fetch existing department data when ID is present
      axios
        .get(`http://localhost:8080/departments/${id}`)
        .then((response) => {
          setDepartment(response.data);
        })
        .catch((error) => console.error("Error fetching department:", error));
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDepartment({ ...department, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (id) {
      // Update existing department
      axios
        .put(`http://localhost:8080/departments/${id}`, department)
        .then(() => navigate("/"))
        .catch((error) => console.error("Error updating department:", error));
    } else {
      // Add new department
      axios
        .post("http://localhost:8080/departments", department)
        .then(() => navigate("/"))
        .catch((error) => console.error("Error creating department:", error));
    }
  };

  return (
    <div className="department-form-container">
      <h1>{id ? "Edit Department" : "Add Department"}</h1>
      <form onSubmit={handleSubmit} className="department-form">
        <div className="form-group">
          <label htmlFor="departmentName">Department Name:</label>
          <input
            type="text"
            id="departmentName"
            name="departmentName"
            value={department.departmentName || ""}
            onChange={handleChange}
            placeholder="Enter Department Name"
            className="form-control"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="departmentAddress">Department Address:</label>
          <input
            type="text"
            id="departmentAddress"
            name="departmentAddress"
            value={department.departmentAddress || ""}
            onChange={handleChange}
            placeholder="Enter Department Address"
            className="form-control"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="departmentCode">Department Code:</label>
          <input
            type="text"
            id="departmentCode"
            name="departmentCode"
            value={department.departmentCode || ""}
            onChange={handleChange}
            placeholder="Enter Department Code"
            className="form-control"
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          {id ? "Update" : "Add"}
        </button>
      </form>
    </div>
  );
};

export default DepartmentForm;
