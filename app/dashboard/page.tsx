import { verifySession } from "@/lib/auth"
import { redirect } from "next/navigation"
import { getEmployees } from "@/lib/db"
import DashboardLayout from "@/components/dashboard-layout"
import EmployeeStats from "@/components/employee-stats"
import EmployeeTable from "@/components/employee-table"

export default async function DashboardPage() {
  const session = await verifySession()

  if (!session) {
    redirect("/login")
  }

  const employees = await getEmployees()

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600">Welcome back, {session.fullName}</p>
        </div>

        <EmployeeStats employees={employees} />

        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">Recent Employees</h2>
          </div>
          <EmployeeTable employees={employees.slice(0, 5)} />
        </div>
      </div>
    </DashboardLayout>
  )
}
