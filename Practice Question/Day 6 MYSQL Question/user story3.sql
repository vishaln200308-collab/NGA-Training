-- 1. Retrieve all employees who joined after 2019-01-01
SELECT EmpID, EmpName, HireDate
FROM Employee
WHERE HireDate > '2019-01-01';

-- 2. Find the average performance rating of employees in each department
SELECT d.DeptName, AVG(p.Rating) as AvgRating
FROM Department d
JOIN Employee e ON d.DeptID = e.DeptID
JOIN Performance p ON e.EmpID = p.EmpID
GROUP BY d.DeptID, d.DeptName;

-- 3. List employees with their age
SELECT 
    EmpName, 
    DOB,
    TIMESTAMPDIFF(YEAR, DOB, CURDATE()) as Age
FROM Employee;

-- 4. Find the total rewards given in the current year
SELECT 
    YEAR(RewardMonth) as Year,
    SUM(RewardAmount) as TotalRewards
FROM Reward
WHERE YEAR(RewardMonth) = YEAR(CURDATE())
GROUP BY YEAR(RewardMonth);

-- 5. Retrieve employees who have received rewards greater than 2000
SELECT DISTINCT e.EmpID, e.EmpName, r.RewardAmount
FROM Employee e
JOIN Reward r ON e.EmpID = r.EmpID
WHERE r.RewardAmount > 2000;