// src/components/DepartmentList.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./DepartmentList.css"; // Custom styles

const DepartmentList = () => {
  const [departments, setDepartments] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8080/departments")
      .then((response) => setDepartments(response.data))
      .catch((error) => console.error("Error fetching departments:", error));
  }, []);

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
      <h1>Department List</h1>
      <Link to="/add" className="btn btn-primary">
        Add New Department
      </Link>
      <table className="department-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
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
