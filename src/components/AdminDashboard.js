import React, { useState, useEffect } from 'react';
import api from '../services/api';

const AdminDashboard = () => {
    const [students, setStudents] = useState([]);
    const [newStudent, setNewStudent] = useState({ name: '', rollNo: '', className: '' });
    const [msg, setMsg] = useState({ text: '', type: '' });

    useEffect(() => {
        fetchStudents();
    }, []);

    const fetchStudents = async () => {
        try {
            const res = await api.get('/students');
            setStudents(res.data);
        } catch (err) {
            console.error("Fetch Error:", err);
            showMsg("Failed to load students.", "danger");
        }
    };

    const showMsg = (text, type) => {
        setMsg({ text, type });
        setTimeout(() => setMsg({ text: '', type: '' }), 5000);
    };

    const handleAdd = async (e) => {
        e.preventDefault();
        try {
            const res = await api.post('/students', newStudent);
            showMsg(res.data, "success");
            setNewStudent({ name: '', rollNo: '', className: '' });
            fetchStudents(); // Immediate refresh
        } catch (err) {
            const errorMsg = err.response?.data || "Connection Error";
            showMsg(errorMsg.toString(), "danger");
            console.error("Add Student Error:", err);
        }
    };

    const handleDelete = async (id) => {
        try {
            await api.delete(`/students/${id}`);
            showMsg("Student removed", "warning");
            fetchStudents();
        } catch (err) {
            showMsg("Delete failed", "danger");
        }
    };

    const logout = () => {
        localStorage.clear();
        window.location.href = '/login';
    };

    return (
        <div className="container mt-4">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2>Admin: Student Management</h2>
                <button className="btn btn-outline-danger" onClick={logout}>Logout</button>
            </div>

            {msg.text && (
                <div className={`alert alert-${msg.type} alert-dismissible fade show`} role="alert">
                    {msg.text}
                </div>
            )}
            
            <div className="card mb-4 shadow-sm border-0 bg-light">
                <div className="card-body">
                    <h5 className="card-title mb-3">Add New Student</h5>
                    <form onSubmit={handleAdd} className="row g-3">
                        <div className="col-md-4">
                            <input type="text" className="form-control" placeholder="Full Name" value={newStudent.name} 
                                   onChange={(e) => setNewStudent({...newStudent, name: e.target.value})} required />
                        </div>
                        <div className="col-md-3">
                            <input type="text" className="form-control" placeholder="Roll Number" value={newStudent.rollNo} 
                                   onChange={(e) => setNewStudent({...newStudent, rollNo: e.target.value})} required />
                        </div>
                        <div className="col-md-3">
                            <input type="text" className="form-control" placeholder="Class/Section" value={newStudent.className} 
                                   onChange={(e) => setNewStudent({...newStudent, className: e.target.value})} required />
                        </div>
                        <div className="col-md-2">
                            <button type="submit" className="btn btn-primary w-100">Add Student</button>
                        </div>
                    </form>
                </div>
            </div>

            <div className="table-responsive">
                <table className="table table-hover align-middle shadow-sm bg-white rounded">
                    <thead className="table-dark">
                        <tr>
                            <th>Roll No</th>
                            <th>Name</th>
                            <th>Class</th>
                            <th className="text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {students.map(s => (
                            <tr key={s.id}>
                                <td><strong>{s.rollNo}</strong></td>
                                <td>{s.name}</td>
                                <td><span className="badge bg-secondary">{s.className}</span></td>
                                <td className="text-center">
                                    <button className="btn btn-sm btn-outline-danger" onClick={() => handleDelete(s.id)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                        {students.length === 0 && <tr><td colSpan="4" className="text-center py-4 text-muted">No records found. Start by adding a student.</td></tr>}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AdminDashboard;
