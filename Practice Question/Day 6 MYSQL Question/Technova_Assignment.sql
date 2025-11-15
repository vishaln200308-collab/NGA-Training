-- USER STORY 1: Database Setup (DDL)

-- Create and use database
DROP DATABASE IF EXISTS TechNovaDB;
CREATE DATABASE TechNovaDB;
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
    RewardID INT AUTO_INCREMENT PRIMARY KEY,
    EmpID INT,
    RewardMonth DATE NOT NULL,
    RewardAmount DECIMAL(10,2) NOT NULL,
    FOREIGN KEY (EmpID) REFERENCES Employee(EmpID)
);

-- Create indexes for optimization
CREATE INDEX idx_emp_name ON Employee(EmpName);
CREATE INDEX idx_emp_dept ON Employee(DeptID);
CREATE INDEX idx_perf_rating ON Performance(Rating);

-- USER STORY 2: Insert and Manage Data (DML)

-- Insert sample data into Department table
INSERT INTO Department (DeptID, DeptName, Location) VALUES
(101, 'IT', 'Bangalore'),
(102, 'HR', 'Delhi'),
(103, 'Finance', 'Mumbai'),
(104, 'Marketing', 'Chennai'),
(105, 'Operations', 'Hyderabad');

-- Insert sample data into Employee table
INSERT INTO Employee (EmpID, EmpName, Gender, DOB, HireDate, DeptID) VALUES
(1, 'Asha', 'F', '1990-07-12', '2018-06-10', 101),
(2, 'Raj', 'M', '1988-04-09', '2020-03-22', 102),
(3, 'Neha', 'F', '1995-01-15', '2021-08-05', 101),
(4, 'Amit', 'M', '1992-11-30', '2019-11-15', 103),
(5, 'Priya', 'F', '1993-03-25', '2022-01-10', 104),
(6, 'Sanjay', 'M', '1985-09-18', '2017-05-20', 105);

-- Insert sample data into Project table
INSERT INTO Project (ProjectID, ProjectName, DeptID, StartDate, EndDate) VALUES
(201, 'Website Redesign', 101, '2023-01-15', '2023-06-30'),
(202, 'HR Portal', 102, '2023-02-01', '2023-08-31'),
(203, 'Financial Analytics', 103, '2023-03-10', '2023-09-15'),
(204, 'Marketing Campaign', 104, '2023-04-01', '2023-10-31'),
(205, 'Process Automation', 105, '2023-05-15', '2023-11-30');

-- Insert sample data into Performance table
INSERT INTO Performance (EmpID, ProjectID, Rating, ReviewDate) VALUES
(1, 201, 4.5, '2023-07-15'),
(2, 202, 4.2, '2023-08-20'),
(3, 201, 4.8, '2023-07-20'),
(4, 203, 4.0, '2023-09-25'),
(5, 204, 4.7, '2023-11-10'),
(1, 205, 4.3, '2023-12-05'),
(3, 205, 4.6, '2023-12-10');

-- Insert sample data into Reward table
INSERT INTO Reward (EmpID, RewardMonth, RewardAmount) VALUES
(1, '2023-07-01', 2500.00),
(2, '2023-08-01', 1800.00),
(3, '2023-07-01', 3000.00),
(4, '2023-09-01', 1500.00),
(5, '2023-11-01', 2800.00),
(1, '2023-12-01', 2200.00),
(3, '2023-12-01', 3200.00),
(6, '2023-06-01', 800.00);

-- Update an employee's department
UPDATE Employee SET DeptID = 104 WHERE EmpID = 3;

-- Delete reward records where amount is less than 1000
DELETE FROM Reward WHERE RewardAmount < 1000;

-- USER STORY 3: Generate Insights (DQL, Aggregate and Date Functions)

-- 1. Retrieve all employees who joined after 2019-01-01
SELECT '1. Employees joined after 2019-01-01:' AS '';
SELECT EmpID, EmpName, HireDate
FROM Employee
WHERE HireDate > '2019-01-01';

-- 2. Find the average performance rating of employees in each department
SELECT '2. Average performance rating by department:' AS '';
SELECT d.DeptName, ROUND(AVG(p.Rating), 2) as AvgRating
FROM Department d
JOIN Employee e ON d.DeptID = e.DeptID
JOIN Performance p ON e.EmpID = p.EmpID
GROUP BY d.DeptID, d.DeptName;

-- 3. List employees with their age
SELECT '3. Employees with age calculation:' AS '';
SELECT 
    EmpName, 
    DOB,
    TIMESTAMPDIFF(YEAR, DOB, CURDATE()) as Age
FROM Employee;

-- 4. Find the total rewards given in the current year
SELECT '4. Total rewards in current year:' AS '';
SELECT 
    YEAR(RewardMonth) as Year,
    SUM(RewardAmount) as TotalRewards
FROM Reward
WHERE YEAR(RewardMonth) = YEAR(CURDATE())
GROUP BY YEAR(RewardMonth);

-- 5. Retrieve employees who have received rewards greater than 2000
SELECT '5. Employees with rewards > 2000:' AS '';
SELECT DISTINCT e.EmpID, e.EmpName, r.RewardAmount
FROM Employee e
JOIN Reward r ON e.EmpID = r.EmpID
WHERE r.RewardAmount > 2000;

-- USER STORY 4: Advanced Queries (Joins and Subqueries)

-- 1. Display Employee Name, Department Name, Project Name, and Rating using appropriate joins
SELECT '1. Employee Performance Details:' AS '';
SELECT 
    e.EmpName,
    d.DeptName,
    p.ProjectName,
    perf.Rating,
    perf.ReviewDate
FROM Employee e
JOIN Department d ON e.DeptID = d.DeptID
JOIN Performance perf ON e.EmpID = perf.EmpID
JOIN Project p ON perf.ProjectID = p.ProjectID;

-- 2. Find the highest-rated employee in each department using a subquery
SELECT '2. Highest-rated employees by department:' AS '';
SELECT 
    d.DeptName,
    e.EmpName,
    p.Rating as HighestRating
FROM Department d
JOIN Employee e ON d.DeptID = e.DeptID
JOIN Performance p ON e.EmpID = p.EmpID
WHERE p.Rating = (
    SELECT MAX(p2.Rating)
    FROM Employee e2
    JOIN Performance p2 ON e2.EmpID = p2.EmpID
    WHERE e2.DeptID = d.DeptID
);

-- 3. List all employees who have not received any rewards using a subquery
SELECT '3. Employees without rewards:' AS '';
SELECT 
    EmpID,
    EmpName
FROM Employee
WHERE EmpID NOT IN (
    SELECT DISTINCT EmpID 
    FROM Reward
);

-- USER STORY 5: Transaction Control and Optimization

-- 1. Transaction demonstration
SELECT '1. Transaction demonstration:' AS '';
START TRANSACTION;

-- Insert a new employee
INSERT INTO Employee (EmpID, EmpName, Gender, DOB, HireDate, DeptID) 
VALUES (7, 'Rohan', 'M', '1991-08-20', '2023-12-01', 101);

-- Assign to a project
INSERT INTO Performance (EmpID, ProjectID, Rating, ReviewDate)
VALUES (7, 201, 4.2, '2023-12-15');

-- Add a reward
INSERT INTO Reward (EmpID, RewardMonth, RewardAmount)
VALUES (7, '2023-12-01', 1900.00);

-- Commit the transaction
COMMIT;

SELECT 'Transaction completed successfully!' AS '';

-- 2. Query optimization with EXPLAIN
SELECT '2. Query optimization analysis:' AS '';

-- Remove indexes to see "before" state
DROP INDEX idx_perf_rating ON Performance;
DROP INDEX idx_emp_dept ON Employee;

SELECT 'EXPLAIN before indexes:' AS '';
EXPLAIN 
SELECT e.EmpName, d.DeptName, p.ProjectName, perf.Rating
FROM Employee e
JOIN Department d ON e.DeptID = d.DeptID
JOIN Performance perf ON e.EmpID = perf.EmpID
JOIN Project p ON perf.ProjectID = p.ProjectID
WHERE perf.Rating > 4.0;

-- Recreate indexes
CREATE INDEX idx_perf_rating ON Performance(Rating);
CREATE INDEX idx_emp_dept ON Employee(DeptID);

SELECT 'EXPLAIN after indexes:' AS '';
EXPLAIN 
SELECT e.EmpName, d.DeptName, p.ProjectName, perf.Rating
FROM Employee e
JOIN Department d ON e.DeptID = d.DeptID
JOIN Performance perf ON e.EmpID = perf.EmpID
JOIN Project p ON perf.ProjectID = p.ProjectID
WHERE perf.Rating > 4.0;





