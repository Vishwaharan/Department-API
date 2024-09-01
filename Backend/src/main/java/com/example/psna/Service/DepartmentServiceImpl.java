package com.example.psna.Service;

import com.example.psna.Entity.Department;
import com.example.psna.Repository.DepartmentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;

@Service
public class DepartmentServiceImpl implements DepartmentService {

    @Autowired
    private DepartmentRepository departmentRepository;

    @Override
    public Department saveDepartment(Department department) {
        return departmentRepository.save(department);
    }

    @Override
    public List<Department> fetchAllData() {
        return departmentRepository.findAll();
    }

    @Override
    public void deleteDepartmentById(long id) {
        departmentRepository.deleteById(id);
    }

    @Override
    public Department updateDepartment(Department department, Long departmentId) {
        Department depDB = departmentRepository.findById(departmentId).orElse(null);

        if (depDB != null) {
            if (Objects.nonNull(department.getDepartmentName()) && !"".equalsIgnoreCase(department.getDepartmentName())) {
                depDB.setDepartmentName(department.getDepartmentName());
            }

            if (Objects.nonNull(department.getDescription()) && !"".equalsIgnoreCase(department.getDescription())) {
                depDB.setDescription(department.getDescription());
            }

            if (Objects.nonNull(department.getDepartmentAddress()) && !"".equalsIgnoreCase(department.getDepartmentAddress())) {
                depDB.setDepartmentAddress(department.getDepartmentAddress());
            }

            if (Objects.nonNull(department.getDepartmentCode()) && !"".equalsIgnoreCase(department.getDepartmentCode())) {
                depDB.setDepartmentCode(department.getDepartmentCode());
            }

            return departmentRepository.save(depDB);
        }
        return null; // or throw an exception
    }


    @Override
    public List<Department> searchDepartments(String query) {
        try {
            Long id = Long.parseLong(query);
            return departmentRepository.findByDepartmentNameContainingIgnoreCaseOrDepartmentId(null, id);
        } catch (NumberFormatException e) {
            return departmentRepository.findByDepartmentNameContainingIgnoreCaseOrDepartmentId(query, null);
        }
    }
}
