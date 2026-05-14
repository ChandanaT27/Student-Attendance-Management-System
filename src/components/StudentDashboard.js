import React, { useState, useEffect } from 'react';
import api from '../services/api';

const StudentDashboard = () => {
    const [attendance, setAttendance] = useState([]);
    const user = JSON.parse(localStorage.getItem('user'));

    useEffect(() => {
        fetchAttendance();
    }, []);

    const fetchAttendance = async () => {
        // In a real app, we'd get the studentId linked to the user.
        // For this demo, we'll assume studentId = 1 for the demo student.
        const response = await api.get('/attendance/student/1');
        setAttendance(response.data);
    };

    const logout = () => {
        localStorage.clear();
        window.location.href = '/login';
    };

    return (
        <div className="container mt-4">
            <div className="d-flex justify-content-between mb-4">
                <h2>Student Dashboard - My Attendance</h2>
                <button className="btn btn-danger" onClick={logout}>Logout</button>
            </div>

            <div className="alert alert-info">
                Welcome, <strong>{user.username}</strong>! Here is your attendance record.
            </div>

            <table className="table table-hover shadow-sm">
                <thead className="table-info">
                    <tr>
                        <th>Date</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {attendance.map(a => (
                        <tr key={a.id}>
                            <td>{a.date}</td>
                            <td>
                                <span className={`badge ${a.status === 'PRESENT' ? 'bg-success' : 'bg-danger'}`}>
                                    {a.status}
                                </span>
                            </td>
                        </tr>
                    ))}
                    {attendance.length === 0 && <tr><td colSpan="2" className="text-center">No records found</td></tr>}
                </tbody>
            </table>
        </div>
    );
};

export default StudentDashboard;
