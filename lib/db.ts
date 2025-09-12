import { neon } from "@neondatabase/serverless"

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL environment variable is not set")
}

export const sql = neon(process.env.DATABASE_URL)

// Database utility functions
export async function getEmployees() {
  try {
    const employees = await sql`
      SELECT 
        id, employee_id, first_name, last_name, email, phone, 
        department, position, hire_date, salary, status, 
        address, date_of_birth, emergency_contact_name, 
        emergency_contact_phone, created_at, updated_at,
        (SELECT CONCAT(first_name, ' ', last_name) FROM employees e2 WHERE e2.id = employees.manager_id) as manager_name
      FROM employees 
      ORDER BY created_at DESC
    `
    return employees
  } catch (error) {
    console.error("Error fetching employees:", error)
    throw new Error("Failed to fetch employees")
  }
}

export async function getEmployeeById(id: number) {
  try {
    const employee = await sql`
      SELECT 
        id, employee_id, first_name, last_name, email, phone, 
        department, position, hire_date, salary, status, manager_id,
        address, date_of_birth, emergency_contact_name, 
        emergency_contact_phone, created_at, updated_at
      FROM employees 
      WHERE id = ${id}
    `
    return employee[0] || null
  } catch (error) {
    console.error("Error fetching employee:", error)
    throw new Error("Failed to fetch employee")
  }
}

export async function createEmployee(employeeData: any) {
  try {
    const result = await sql`
      INSERT INTO employees (
        employee_id, first_name, last_name, email, phone, 
        department, position, hire_date, salary, status, manager_id,
        address, date_of_birth, emergency_contact_name, emergency_contact_phone
      ) VALUES (
        ${employeeData.employee_id}, ${employeeData.first_name}, ${employeeData.last_name}, 
        ${employeeData.email}, ${employeeData.phone}, ${employeeData.department}, 
        ${employeeData.position}, ${employeeData.hire_date}, ${employeeData.salary}, 
        ${employeeData.status}, ${employeeData.manager_id}, ${employeeData.address}, 
        ${employeeData.date_of_birth}, ${employeeData.emergency_contact_name}, 
        ${employeeData.emergency_contact_phone}
      )
      RETURNING id
    `
    return result[0]
  } catch (error) {
    console.error("Error creating employee:", error)
    throw new Error("Failed to create employee")
  }
}

export async function updateEmployee(id: number, employeeData: any) {
  try {
    const result = await sql`
      UPDATE employees SET
        first_name = ${employeeData.first_name},
        last_name = ${employeeData.last_name},
        email = ${employeeData.email},
        phone = ${employeeData.phone},
        department = ${employeeData.department},
        position = ${employeeData.position},
        hire_date = ${employeeData.hire_date},
        salary = ${employeeData.salary},
        status = ${employeeData.status},
        manager_id = ${employeeData.manager_id},
        address = ${employeeData.address},
        date_of_birth = ${employeeData.date_of_birth},
        emergency_contact_name = ${employeeData.emergency_contact_name},
        emergency_contact_phone = ${employeeData.emergency_contact_phone}
      WHERE id = ${id}
      RETURNING id
    `
    return result[0]
  } catch (error) {
    console.error("Error updating employee:", error)
    throw new Error("Failed to update employee")
  }
}

export async function deleteEmployee(id: number) {
  try {
    await sql`DELETE FROM employees WHERE id = ${id}`
    return { success: true }
  } catch (error) {
    console.error("Error deleting employee:", error)
    throw new Error("Failed to delete employee")
  }
}

// Authentication functions
export async function getAdminUser(username: string) {
  try {
    const user = await sql`
      SELECT id, username, email, password_hash, full_name, role, is_active, last_login
      FROM admin_users 
      WHERE username = ${username} AND is_active = true
    `
    return user[0] || null
  } catch (error) {
    console.error("Error fetching admin user:", error)
    throw new Error("Failed to fetch admin user")
  }
}

export async function updateLastLogin(userId: number) {
  try {
    await sql`
      UPDATE admin_users 
      SET last_login = CURRENT_TIMESTAMP 
      WHERE id = ${userId}
    `
  } catch (error) {
    console.error("Error updating last login:", error)
  }
}
