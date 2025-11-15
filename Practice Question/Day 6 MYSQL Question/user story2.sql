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
UPDATE Employee 
SET DeptID = 104 
WHERE EmpID = 3;

-- Delete reward records where amount is less than 1000
DELETE FROM Reward 
WHERE RewardAmount < 1000;