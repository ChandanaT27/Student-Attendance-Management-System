package com.example.attendance.controller;

import com.example.attendance.dao.AttendanceDAO;
import com.example.attendance.model.Attendance;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/attendance")
@CrossOrigin(origins = "http://localhost:3000")
public class AttendanceController {
    private final AttendanceDAO attendanceDAO;

    public AttendanceController(AttendanceDAO attendanceDAO) {
        this.attendanceDAO = attendanceDAO;
    }

    @PostMapping
    public void markAttendance(@RequestBody Attendance attendance) {
        attendanceDAO.markAttendance(attendance.getStudentId(), attendance.getDate(), attendance.getStatus());
    }

    @GetMapping("/student/{id}")
    public List<Attendance> getByStudent(@PathVariable int id) {
        return attendanceDAO.findByStudentId(id);
    }

    @GetMapping("/date/{date}")
    public List<Attendance> getByDate(@PathVariable String date) {
        return attendanceDAO.findByDate(date);
    }
}
