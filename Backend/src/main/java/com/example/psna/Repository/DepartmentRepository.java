package com.example.psna.Repository;

import com.example.psna.Entity.Department;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DepartmentRepository extends JpaRepository<Department, Long> {
    Department findByDepartmentCode(String departmentCode);
    List<Department> findByDepartmentNameContainingIgnoreCaseOrDepartmentId(String name, Long id);
}
