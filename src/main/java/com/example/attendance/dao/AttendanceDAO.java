package com.example.attendance.dao;

import com.example.attendance.model.Attendance;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class AttendanceDAO {
    private final JdbcTemplate jdbcTemplate;

    public AttendanceDAO(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    private final RowMapper<Attendance> rowMapper = (rs, rowNum) -> {
        Attendance attendance = new Attendance();
        attendance.setId(rs.getInt("id"));
        attendance.setStudentId(rs.getInt("student_id"));
        attendance.setStudentName(rs.getString("name"));
        attendance.setDate(rs.getString("date"));
        attendance.setStatus(rs.getString("status"));
        return attendance;
    };

    public int markAttendance(int studentId, String date, String status) {
        String sql = "INSERT INTO attendance (student_id, date, status) VALUES (?, ?, ?) " +
                     "ON DUPLICATE KEY UPDATE status = ?";
        return jdbcTemplate.update(sql, studentId, date, status, status);
    }

    public List<Attendance> findByStudentId(int studentId) {
        String sql = "SELECT a.*, s.name FROM attendance a JOIN students s ON a.student_id = s.id WHERE s.id = ?";
        return jdbcTemplate.query(sql, rowMapper, studentId);
    }

    public List<Attendance> findByDate(String date) {
        String sql = "SELECT a.*, s.name FROM attendance a JOIN students s ON a.student_id = s.id WHERE a.date = ?";
        return jdbcTemplate.query(sql, rowMapper, date);
    }
}
