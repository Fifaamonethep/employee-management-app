import { verifySession } from "@/lib/auth"
import { redirect } from "next/navigation"
import { getEmployeeById } from "@/lib/db"
import DashboardLayout from "@/components/dashboard-layout"
import EmployeeDetails from "@/components/employee-details"
import { notFound } from "next/navigation"

interface PageProps {
  params: {
    id: string
  }
}

export default async function EmployeeDetailsPage({ params }: PageProps) {
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
      <EmployeeDetails employee={employee} />
    </DashboardLayout>
  )
}
