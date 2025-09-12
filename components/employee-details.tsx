import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Edit, ArrowLeft, Mail, Phone, MapPin, Calendar, DollarSign, User, Building } from "lucide-react"

interface Employee {
  id: number
  employee_id: string
  first_name: string
  last_name: string
  email: string
  phone: string
  department: string
  position: string
  hire_date: string
  salary: number
  status: string
  manager_id?: number
  address: string
  date_of_birth: string
  emergency_contact_name: string
  emergency_contact_phone: string
  created_at: string
  updated_at: string
}

interface EmployeeDetailsProps {
  employee: Employee
}

export default function EmployeeDetails({ employee }: EmployeeDetailsProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800"
      case "inactive":
        return "bg-yellow-100 text-yellow-800"
      case "terminated":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  const formatSalary = (salary: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "LAK",
      minimumFractionDigits: 0,
    }).format(salary)
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            {employee.first_name} {employee.last_name}
          </h1>
          <p className="text-gray-600">
            {employee.position} • {employee.department}
          </p>
        </div>
        <div className="flex space-x-3">
          <Link href="/employees">
            <Button variant="outline">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Employees
            </Button>
          </Link>
          <Link href={`/employees/${employee.id}/edit`}>
            <Button>
              <Edit className="h-4 w-4 mr-2" />
              Edit Employee
            </Button>
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Card */}
        <Card className="lg:col-span-1">
          <CardHeader className="text-center">
            <div className="mx-auto w-24 h-24 bg-gray-300 rounded-full flex items-center justify-center mb-4">
              <span className="text-2xl font-bold text-gray-700">
                {employee.first_name.charAt(0)}
                {employee.last_name.charAt(0)}
              </span>
            </div>
            <CardTitle>
              {employee.first_name} {employee.last_name}
            </CardTitle>
            <Badge className={getStatusColor(employee.status)}>
              {employee.status.charAt(0).toUpperCase() + employee.status.slice(1)}
            </Badge>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center space-x-3">
              <Mail className="h-4 w-4 text-gray-400" />
              <span className="text-sm">{employee.email}</span>
            </div>
            {employee.phone && (
              <div className="flex items-center space-x-3">
                <Phone className="h-4 w-4 text-gray-400" />
                <span className="text-sm">{employee.phone}</span>
              </div>
            )}
            {employee.address && (
              <div className="flex items-center space-x-3">
                <MapPin className="h-4 w-4 text-gray-400" />
                <span className="text-sm">{employee.address}</span>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Details Cards */}
        <div className="lg:col-span-2 space-y-6">
          {/* Work Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Building className="h-5 w-5 mr-2" />
                Work Information
              </CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-500">Employee ID</label>
                <p className="text-sm font-mono">{employee.employee_id}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">Department</label>
                <p className="text-sm">{employee.department}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">Position</label>
                <p className="text-sm">{employee.position}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">Hire Date</label>
                <p className="text-sm flex items-center">
                  <Calendar className="h-4 w-4 mr-1 text-gray-400" />
                  {formatDate(employee.hire_date)}
                </p>
              </div>
              {employee.salary && (
                <div>
                  <label className="text-sm font-medium text-gray-500">Salary</label>
                  <p className="text-sm flex items-center">
                    <DollarSign className="h-4 w-4 mr-1 text-gray-400" />
                    {formatSalary(employee.salary)}
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Personal Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <User className="h-5 w-5 mr-2" />
                Personal Information
              </CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {employee.date_of_birth && (
                <div>
                  <label className="text-sm font-medium text-gray-500">Date of Birth</label>
                  <p className="text-sm">{formatDate(employee.date_of_birth)}</p>
                </div>
              )}
              {employee.emergency_contact_name && (
                <div>
                  <label className="text-sm font-medium text-gray-500">Emergency Contact</label>
                  <p className="text-sm">{employee.emergency_contact_name}</p>
                </div>
              )}
              {employee.emergency_contact_phone && (
                <div>
                  <label className="text-sm font-medium text-gray-500">Emergency Phone</label>
                  <p className="text-sm">{employee.emergency_contact_phone}</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* System Information */}
          <Card>
            <CardHeader>
              <CardTitle>System Information</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-500">Created At</label>
                <p className="text-sm">{formatDate(employee.created_at)}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">Last Updated</label>
                <p className="text-sm">{formatDate(employee.updated_at)}</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
