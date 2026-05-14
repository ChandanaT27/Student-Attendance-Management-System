import React, { useState, useEffect } from 'react';
import api from '../services/api';

const FacultyDashboard = () => {
    const [students, setStudents] = useState([]);
    const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
    const [attendanceMap, setAttendanceMap] = useState({});

    useEffect(() => {
        fetchStudents();
    }, []);

    const fetchStudents = async () => {
        const response = await api.get('/students');
        setStudents(response.data);
    };

    const handleStatusChange = (studentId, status) => {
        setAttendanceMap({ ...attendanceMap, [studentId]: status });
    };

    const submitAttendance = async () => {
        const promises = Object.entries(attendanceMap).map(([studentId, status]) => 
            api.post('/attendance', { studentId, date, status })
        );
        await Promise.all(promises);
        alert('Attendance marked successfully');
    };

    const logout = () => {
        localStorage.clear();
        window.location.href = '/login';
    };

    return (
        <div className="container mt-4">
            <div className="d-flex justify-content-between mb-4">
                <h2>Faculty Dashboard - Mark Attendance</h2>
                <button className="btn btn-danger" onClick={logout}>Logout</button>
            </div>

            <div className="mb-3 w-25">
                <label className="form-label">Date:</label>
                <input type="date" className="form-control" value={date} onChange={(e) => setDate(e.target.value)} />
            </div>

            <table className="table table-bordered shadow-sm">
                <thead className="table-primary">
                    <tr>
                        <th>Roll No</th>
                        <th>Name</th>
                        <th>Class</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {students.map(s => (
                        <tr key={s.id}>
                            <td>{s.rollNo}</td>
                            <td>{s.name}</td>
                            <td>{s.className}</td>
                            <td>
                                <select 
                                    className="form-select form-select-sm" 
                                    onChange={(e) => handleStatusChange(s.id, e.target.value)}
                                    defaultValue=""
                                >
                                    <option value="" disabled>Select</option>
                                    <option value="PRESENT">Present</option>
                                    <option value="ABSENT">Absent</option>
                                </select>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <button className="btn btn-primary float-end" onClick={submitAttendance}>Submit All</button>
        </div>
    );
};

export default FacultyDashboard;
