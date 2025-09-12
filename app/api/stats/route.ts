import { NextResponse } from "next/server"
import { verifySession } from "@/lib/auth"
import { sql } from "@/lib/db"

export async function GET() {
  try {
    const session = await verifySession()
    if (!session) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 })
    }

    // Get overall statistics
    const [totalStats] = await sql`
      SELECT 
        COUNT(*) as total_employees,
        COUNT(CASE WHEN status = 'active' THEN 1 END) as active_employees,
        COUNT(CASE WHEN status = 'inactive' THEN 1 END) as inactive_employees,
        COUNT(CASE WHEN status = 'terminated' THEN 1 END) as terminated_employees,
        AVG(salary) as avg_salary,
        COUNT(DISTINCT department) as total_departments
      FROM employees
    `

    // Get recent hires (last 30 days)
    const [recentHires] = await sql`
      SELECT COUNT(*) as recent_hires
      FROM employees 
      WHERE hire_date >= CURRENT_DATE - INTERVAL '30 days'
    `

    // Get department breakdown
    const departmentBreakdown = await sql`
      SELECT 
        department,
        COUNT(*) as count,
        ROUND(COUNT(*) * 100.0 / (SELECT COUNT(*) FROM employees), 2) as percentage
      FROM employees 
      GROUP BY department
      ORDER BY count DESC
    `

    return NextResponse.json({
      success: true,
      stats: {
        ...totalStats,
        recent_hires: recentHires.recent_hires,
        department_breakdown: departmentBreakdown,
      },
    })
  } catch (error) {
    console.error("GET /api/stats error:", error)
    return NextResponse.json({ success: false, error: "Failed to fetch statistics" }, { status: 500 })
  }
}
