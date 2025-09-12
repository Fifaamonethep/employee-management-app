-- Insert sample employee data for Unitel Laos
INSERT INTO employees (
    employee_id, first_name, last_name, email, phone, department, position, 
    hire_date, salary, status, address, date_of_birth, 
    emergency_contact_name, emergency_contact_phone
) VALUES 
    ('UNI001', 'Somsak', 'Vongphachanh', 'somsak.v@unitel.la', '+856-20-5551001', 'Engineering', 'Senior Software Engineer', '2020-01-15', 25000000, 'active', 'Vientiane Capital, Laos', '1985-03-20', 'Bounmy Vongphachanh', '+856-20-5551002'),
    ('UNI002', 'Noy', 'Phommachanh', 'noy.p@unitel.la', '+856-20-5551003', 'Human Resources', 'HR Manager', '2019-06-01', 22000000, 'active', 'Vientiane Capital, Laos', '1982-07-15', 'Kham Phommachanh', '+856-20-5551004'),
    ('UNI003', 'Bounthong', 'Sisavath', 'bounthong.s@unitel.la', '+856-20-5551005', 'Marketing', 'Marketing Specialist', '2021-03-10', 18000000, 'active', 'Vientiane Capital, Laos', '1990-11-08', 'Seng Sisavath', '+856-20-5551006'),
    ('UNI004', 'Phonepadith', 'Keovilay', 'phonepadith.k@unitel.la', '+856-20-5551007', 'Finance', 'Financial Analyst', '2020-09-20', 20000000, 'active', 'Vientiane Capital, Laos', '1987-05-12', 'Vilay Keovilay', '+856-20-5551008'),
    ('UNI005', 'Malee', 'Chanthavong', 'malee.c@unitel.la', '+856-20-5551009', 'Operations', 'Operations Manager', '2018-11-30', 24000000, 'active', 'Vientiane Capital, Laos', '1983-09-25', 'Thong Chanthavong', '+856-20-5551010'),
    ('UNI006', 'Khamla', 'Phongsa', 'khamla.p@unitel.la', '+856-20-5551011', 'Engineering', 'Frontend Developer', '2022-02-14', 16000000, 'active', 'Vientiane Capital, Laos', '1992-12-03', 'Somphone Phongsa', '+856-20-5551012'),
    ('UNI007', 'Vilayphone', 'Sayavong', 'vilayphone.s@unitel.la', '+856-20-5551013', 'Customer Service', 'Customer Support Lead', '2021-08-05', 17000000, 'active', 'Vientiane Capital, Laos', '1988-04-18', 'Keo Sayavong', '+856-20-5551014'),
    ('UNI008', 'Thiphaphone', 'Vongsay', 'thiphaphone.v@unitel.la', '+856-20-5551015', 'Sales', 'Sales Representative', '2023-01-12', 15000000, 'active', 'Vientiane Capital, Laos', '1991-08-30', 'Bouasy Vongsay', '+856-20-5551016');

-- Set manager relationships (assuming UNI002 is HR Manager overseeing some employees)
UPDATE employees SET manager_id = (SELECT id FROM employees WHERE employee_id = 'UNI002') 
WHERE employee_id IN ('UNI003', 'UNI007');

-- Set UNI001 as manager for engineering team
UPDATE employees SET manager_id = (SELECT id FROM employees WHERE employee_id = 'UNI001') 
WHERE employee_id = 'UNI006';

-- Set UNI005 as manager for operations-related roles
UPDATE employees SET manager_id = (SELECT id FROM employees WHERE employee_id = 'UNI005') 
WHERE employee_id = 'UNI004';
