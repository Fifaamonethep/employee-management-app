import { type NextRequest, NextResponse } from "next/server"
import { verifySession } from "@/lib/auth"
import { getEmployeeById, updateEmployee, deleteEmployee } from "@/lib/db"

interface RouteParams {
  params: {
    id: string
  }
}

export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const session = await verifySession()
    if (!session) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 })
    }

    const employeeId = Number.parseInt(params.id)
    if (isNaN(employeeId)) {
      return NextResponse.json({ success: false, error: "Invalid employee ID" }, { status: 400 })
    }

    const employee = await getEmployeeById(employeeId)
    if (!employee) {
      return NextResponse.json({ success: false, error: "Employee not found" }, { status: 404 })
    }

    return NextResponse.json({ success: true, employee })
  } catch (error) {
    console.error("GET /api/employees/[id] error:", error)
    return NextResponse.json({ success: false, error: "Failed to fetch employee" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest, { params }: RouteParams) {
  try {
    const session = await verifySession()
    if (!session) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 })
    }

    const employeeId = Number.parseInt(params.id)
    if (isNaN(employeeId)) {
      return NextResponse.json({ success: false, error: "Invalid employee ID" }, { status: 400 })
    }

    const employeeData = await request.json()

    // Validate required fields
    const requiredFields = ["first_name", "last_name", "email", "department", "position", "hire_date"]
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

    const result = await updateEmployee(employeeId, employeeData)
    if (!result) {
      return NextResponse.json({ success: false, error: "Employee not found" }, { status: 404 })
    }

    return NextResponse.json({ success: true, employee: result })
  } catch (error) {
    console.error("PUT /api/employees/[id] error:", error)

    // Handle unique constraint violations
    if (error instanceof Error && error.message.includes("duplicate key")) {
      if (error.message.includes("email")) {
        return NextResponse.json({ success: false, error: "Email already exists" }, { status: 400 })
      }
    }

    return NextResponse.json({ success: false, error: "Failed to update employee" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: RouteParams) {
  try {
    const session = await verifySession()
    if (!session) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 })
    }

    const employeeId = Number.parseInt(params.id)
    if (isNaN(employeeId)) {
      return NextResponse.json({ success: false, error: "Invalid employee ID" }, { status: 400 })
    }

    await deleteEmployee(employeeId)
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("DELETE /api/employees/[id] error:", error)
    return NextResponse.json({ success: false, error: "Failed to delete employee" }, { status: 500 })
  }
}
