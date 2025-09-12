import { NextResponse } from "next/server"
import { verifySession } from "@/lib/auth"
import { sql } from "@/lib/db"

export async function GET() {
  try {
    const session = await verifySession()
    if (!session) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 })
    }

    // Get department statistics
    const departments = await sql`
      SELECT 
        department,
        COUNT(*) as employee_count,
        COUNT(CASE WHEN status = 'active' THEN 1 END) as active_count,
        AVG(salary) as avg_salary
      FROM employees 
      GROUP BY department
      ORDER BY employee_count DESC
    `

    return NextResponse.json({ success: true, departments })
  } catch (error) {
    console.error("GET /api/departments error:", error)
    return NextResponse.json({ success: false, error: "Failed to fetch department statistics" }, { status: 500 })
  }
}
