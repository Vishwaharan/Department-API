package com.example.psna.Service;

import com.example.psna.Entity.Department;

import java.util.List;

public interface DepartmentService {

    Department saveDepartment(Department department);

    List<Department> fetchAllData();

    void deleteDepartmentById(long id);

    Department updateDepartment(Department department, Long departmentID);

    Department getDepartmentByCode(String code);

    List<Department> searchDepartments(String query); // New method
}
