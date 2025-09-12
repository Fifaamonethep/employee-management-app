import { verifySession } from "@/lib/auth"
import { redirect } from "next/navigation"
import { getEmployees } from "@/lib/db"
import DashboardLayout from "@/components/dashboard-layout"
import EmployeeTable from "@/components/employee-table"
import { Button } from "@/components/ui/button"
import { UserPlus } from "lucide-react"
import Link from "next/link"

export default async function EmployeesPage() {
  const session = await verifySession()

  if (!session) {
    redirect("/login")
  }

  const employees = await getEmployees()

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Employees</h1>
            <p className="text-gray-600">Manage your organization's employees</p>
          </div>
          <Link href="/employees/new">
            <Button>
              <UserPlus className="h-4 w-4 mr-2" />
              Add Employee
            </Button>
          </Link>
        </div>

        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">All Employees ({employees.length})</h2>
          </div>
          <EmployeeTable employees={employees} />
        </div>
      </div>
    </DashboardLayout>
  )
}
