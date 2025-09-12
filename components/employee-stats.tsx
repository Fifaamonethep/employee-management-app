import { Users, UserCheck, UserX, TrendingUp } from "lucide-react"

interface Employee {
  id: number
  status: string
  department: string
  salary: number
}

interface EmployeeStatsProps {
  employees: Employee[]
}

export default function EmployeeStats({ employees }: EmployeeStatsProps) {
  const totalEmployees = employees.length
  const activeEmployees = employees.filter((emp) => emp.status === "active").length
  const inactiveEmployees = employees.filter((emp) => emp.status !== "active").length

  // Calculate average salary
  const avgSalary =
    employees.length > 0 ? employees.reduce((sum, emp) => sum + (emp.salary || 0), 0) / employees.length : 0

  // Get department distribution
  const departments = employees.reduce(
    (acc, emp) => {
      acc[emp.department] = (acc[emp.department] || 0) + 1
      return acc
    },
    {} as Record<string, number>,
  )

  const topDepartment = Object.entries(departments).sort(([, a], [, b]) => b - a)[0]

  const stats = [
    {
      name: "Total Employees",
      value: totalEmployees,
      icon: Users,
      color: "bg-primary",
      change: "+2.5%",
    },
    {
      name: "Active Employees",
      value: activeEmployees,
      icon: UserCheck,
      color: "bg-emerald-500",
      change: "+1.2%",
    },
    {
      name: "Inactive Employees",
      value: inactiveEmployees,
      icon: UserX,
      color: "bg-red-500",
      change: "-0.5%",
    },
    {
      name: "Avg. Salary (LAK)",
      value: `${(avgSalary / 1000000).toFixed(1)}M`,
      icon: TrendingUp,
      color: "bg-orange-600",
      change: "+3.1%",
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat) => {
        const Icon = stat.icon
        return (
          <div key={stat.name} className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{stat.name}</p>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              </div>
              <div className={`${stat.color} p-3 rounded-lg`}>
                <Icon className="h-6 w-6 text-white" />
              </div>
            </div>
            <div className="mt-4 flex items-center">
              <span className="text-sm font-medium text-green-600">{stat.change}</span>
              <span className="text-sm text-gray-500 ml-2">from last month</span>
            </div>
          </div>
        )
      })}
    </div>
  )
}
