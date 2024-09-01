package com.example.psna.Controller;

import com.example.psna.Entity.Department;
import com.example.psna.Service.DepartmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class DepartmentController {

    @Autowired
    private DepartmentService departmentService;

    @PostMapping("/departments")
    public Department saveDepartment(@RequestBody Department department) {
        return departmentService.saveDepartment(department);
    }

    @GetMapping("/departments")
    public List<Department> fetchAllData() {
        return departmentService.fetchAllData();
    }


    @GetMapping("/departments/search")
    public List<Department> searchDepartments(@RequestParam("query") String query) {
        return departmentService.searchDepartments(query);
    }

    @DeleteMapping("/departments/{id}")
    public String deleteDepartmentById(@PathVariable("id") long id) {
        departmentService.deleteDepartmentById(id);
        return "Deleted Successfully";
    }

    @PutMapping("/departments/{id}")
    public Department updateDepartment(@RequestBody Department department, @PathVariable("id") Long departmentId) {
        return departmentService.updateDepartment(department, departmentId);
    }
}
