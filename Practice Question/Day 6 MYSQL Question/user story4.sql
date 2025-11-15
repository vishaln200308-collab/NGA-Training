-- 1. Display Employee Name, Department Name, Project Name, and Rating using appropriate joins
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
SELECT 
    d.DeptName,
    e.EmpName,
    MAX_RATINGS.MaxRating
FROM Department d
JOIN Employee e ON d.DeptID = e.DeptID
JOIN Performance p ON e.EmpID = p.EmpID
JOIN (
    SELECT 
        e2.DeptID,
        MAX(p2.Rating) as MaxRating
    FROM Employee e2
    JOIN Performance p2 ON e2.EmpID = p2.EmpID
    GROUP BY e2.DeptID
) MAX_RATINGS ON d.DeptID = MAX_RATINGS.DeptID AND p.Rating = MAX_RATINGS.MaxRating;

-- 3. List all employees who have not received any rewards using a subquery
SELECT 
    EmpID,
    EmpName
FROM Employee
WHERE EmpID NOT IN (
    SELECT DISTINCT EmpID 
    FROM Reward
);
