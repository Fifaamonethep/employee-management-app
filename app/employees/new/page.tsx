import { verifySession } from "@/lib/auth"
import { redirect } from "next/navigation"
import DashboardLayout from "@/components/dashboard-layout"
import EmployeeForm from "@/components/employee-form"

export default async function NewEmployeePage() {
  const session = await verifySession()

  if (!session) {
    redirect("/login")
  }

  return (
    <DashboardLayout>
      <EmployeeForm />
    </DashboardLayout>
  )
}
