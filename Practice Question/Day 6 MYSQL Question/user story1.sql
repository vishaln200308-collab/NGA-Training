User Story 1: Database Setup (DDL)

-- Create database
CREATE DATABASE IF NOT EXISTS TechNovaDB;
USE TechNovaDB;

-- Create Department table
CREATE TABLE Department (
    DeptID INT PRIMARY KEY,
    DeptName VARCHAR(50) NOT NULL,
    Location VARCHAR(50) NOT NULL
);

-- Create Employee table
CREATE TABLE Employee (
    EmpID INT PRIMARY KEY,
    EmpName VARCHAR(100) NOT NULL,
    Gender ENUM('M', 'F') NOT NULL,
    DOB DATE NOT NULL,
    HireDate DATE NOT NULL,
    DeptID INT,
    FOREIGN KEY (DeptID) REFERENCES Department(DeptID)
);

-- Create Project table
CREATE TABLE Project (
    ProjectID INT PRIMARY KEY,
    ProjectName VARCHAR(100) NOT NULL,
    DeptID INT,
    StartDate DATE NOT NULL,
    EndDate DATE,
    FOREIGN KEY (DeptID) REFERENCES Department(DeptID)
);

-- Create Performance table
CREATE TABLE Performance (
    EmpID INT,
    ProjectID INT,
    Rating DECIMAL(3,1) CHECK (Rating BETWEEN 1 AND 5),
    ReviewDate DATE NOT NULL,
    PRIMARY KEY (EmpID, ProjectID),
    FOREIGN KEY (EmpID) REFERENCES Employee(EmpID),
    FOREIGN KEY (ProjectID) REFERENCES Project(ProjectID)
);

-- Create Reward table
CREATE TABLE Reward (
    EmpID INT,
    RewardMonth DATE NOT NULL,
    RewardAmount DECIMAL(10,2) NOT NULL,
    PRIMARY KEY (EmpID, RewardMonth),
    FOREIGN KEY (EmpID) REFERENCES Employee(EmpID)
);

-- Create indexes for optimization
CREATE INDEX idx_emp_name ON Employee(EmpName);
CREATE INDEX idx_emp_dept ON Employee(DeptID);
CREATE INDEX idx_perf_rating ON Performance(Rating);
CREATE INDEX idx_reward_amount ON Reward(RewardAmount);


