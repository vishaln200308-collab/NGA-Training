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