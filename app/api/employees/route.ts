import { type NextRequest, NextResponse } from "next/server"
import { verifySession } from "@/lib/auth"
import { getEmployees, createEmployee } from "@/lib/db"

export async function GET() {
  try {
    const session = await verifySession()
    if (!session) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 })
    }

    const employees = await getEmployees()
    return NextResponse.json({ success: true, employees })
  } catch (error) {
    console.error("GET /api/employees error:", error)
    return NextResponse.json({ success: false, error: "Failed to fetch employees" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await verifySession()
    if (!session) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 })
    }

    const employeeData = await request.json()

    // Validate required fields
    const requiredFields = ["employee_id", "first_name", "last_name", "email", "department", "position", "hire_date"]
    for (const field of requiredFields) {
      if (!employeeData[field]) {
        return NextResponse.json({ success: false, error: `${field} is required` }, { status: 400 })
      }
    }

    // Convert salary to number if provided
    if (employeeData.salary) {
      employeeData.salary = Number.parseFloat(employeeData.salary)
    }

    // Convert manager_id to number if provided
    if (employeeData.manager_id) {
      employeeData.manager_id = Number.parseInt(employeeData.manager_id)
    }

    const result = await createEmployee(employeeData)
    return NextResponse.json({ success: true, employee: result })
  } catch (error) {
    console.error("POST /api/employees error:", error)

    // Handle unique constraint violations
    if (error instanceof Error && error.message.includes("duplicate key")) {
      if (error.message.includes("employee_id")) {
        return NextResponse.json({ success: false, error: "Employee ID already exists" }, { status: 400 })
      }
      if (error.message.includes("email")) {
        return NextResponse.json({ success: false, error: "Email already exists" }, { status: 400 })
      }
    }

    return NextResponse.json({ success: false, error: "Failed to create employee" }, { status: 500 })
  }
}
