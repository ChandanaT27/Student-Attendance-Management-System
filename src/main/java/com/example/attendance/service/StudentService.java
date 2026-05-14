package com.example.attendance.service;

import com.example.attendance.dao.StudentDAO;
import com.example.attendance.model.Student;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class StudentService {
    private static final Logger logger = LoggerFactory.getLogger(StudentService.class);
    private final StudentDAO studentDAO;

    public StudentService(StudentDAO studentDAO) {
        this.studentDAO = studentDAO;
    }

    public List<Student> getAllStudents() {
        return studentDAO.findAll();
    }

    @Transactional
    public void addStudent(Student student) {
        logger.debug("Service: Adding student {}", student.getRollNo());
        
        Integer userId = studentDAO.findUserIdByUsername(student.getRollNo());
        if (userId == null) {
            studentDAO.insertUser(student.getRollNo(), "password123", "STUDENT");
            userId = studentDAO.findUserIdByUsername(student.getRollNo());
        }
        
        student.setUserId(userId);
        studentDAO.insert(student);
    }

    public void deleteStudent(int id) {
        studentDAO.delete(id);
    }
}
