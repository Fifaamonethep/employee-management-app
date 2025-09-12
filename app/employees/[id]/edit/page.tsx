import { verifySession } from "@/lib/auth"
import { redirect } from "next/navigation"
import { getEmployeeById } from "@/lib/db"
import DashboardLayout from "@/components/dashboard-layout"
import EmployeeForm from "@/components/employee-form"
import { notFound } from "next/navigation"

interface PageProps {
  params: {
    id: string
  }
}

export default async function EditEmployeePage({ params }: PageProps) {
  const session = await verifySession()

  if (!session) {
    redirect("/login")
  }

  const employeeId = Number.parseInt(params.id)
  if (isNaN(employeeId)) {
    notFound()
  }

  const employee = await getEmployeeById(employeeId)

  if (!employee) {
    notFound()
  }

  return (
    <DashboardLayout>
      <EmployeeForm employee={employee} isEditing={true} />
    </DashboardLayout>
  )
}
