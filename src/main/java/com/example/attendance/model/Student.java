package com.example.attendance.model;

import com.fasterxml.jackson.annotation.JsonProperty;

public class Student {
    private int id;
    
    @JsonProperty("userId")
    private int userId;
    
    private String name;
    
    @JsonProperty("rollNo")
    private String rollNo;
    
    @JsonProperty("className")
    private String className;

    public Student() {}

    // Getters and Setters
    public int getId() { return id; }
    public void setId(int id) { this.id = id; }
    public int getUserId() { return userId; }
    public void setUserId(int userId) { this.userId = userId; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public String getRollNo() { return rollNo; }
    public void setRollNo(String rollNo) { this.rollNo = rollNo; }
    public String getClassName() { return className; }
    public void setClassName(String className) { this.className = className; }

    @Override
    public String toString() {
        return "Student{" + "id=" + id + ", name='" + name + '\'' + ", rollNo='" + rollNo + '\'' + '}';
    }
}
