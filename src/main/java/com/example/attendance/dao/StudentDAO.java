package com.example.attendance.dao;

import com.example.attendance.model.Student;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class StudentDAO {
    private static final Logger logger = LoggerFactory.getLogger(StudentDAO.class);
    private final JdbcTemplate jdbcTemplate;

    public StudentDAO(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    private final RowMapper<Student> rowMapper = (rs, rowNum) -> {
        Student student = new Student();
        student.setId(rs.getInt("id"));
        student.setUserId(rs.getInt("user_id"));
        student.setName(rs.getString("name"));
        student.setRollNo(rs.getString("roll_no"));
        student.setClassName(rs.getString("class_name"));
        return student;
    };

    public List<Student> findAll() {
        return jdbcTemplate.query("SELECT * FROM students ORDER BY id DESC", rowMapper);
    }

    public int insert(Student student) {
        String sql = "INSERT INTO students (user_id, name, roll_no, class_name) VALUES (?, ?, ?, ?)";
        try {
            return jdbcTemplate.update(sql, student.getUserId(), student.getName(), student.getRollNo(), student.getClassName());
        } catch (Exception e) {
            logger.error("JDBC Insert Error: {}", e.getMessage());
            throw e;
        }
    }

    public int delete(int id) {
        return jdbcTemplate.update("DELETE FROM students WHERE id = ?", id);
    }

    public int insertUser(String username, String password, String role) {
        String sql = "INSERT INTO users (username, password, role) VALUES (?, ?, ?)";
        return jdbcTemplate.update(sql, username, password, role);
    }

    public Integer findUserIdByUsername(String username) {
        String sql = "SELECT id FROM users WHERE username = ?";
        try {
            return jdbcTemplate.queryForObject(sql, Integer.class, username);
        } catch (Exception e) {
            return null;
        }
    }
}
