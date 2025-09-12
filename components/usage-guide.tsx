import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Users, UserPlus, Edit, Search, LogIn, BarChart3, FileText } from "lucide-react"

export default function UsageGuide() {
  const features = [
    {
      icon: LogIn,
      title: "เข้าสู่ระบบ (Login)",
      description: "ใช้อีเมลและรหัสผ่านเพื่อเข้าสู่ระบบ",
      steps: ["ไปที่หน้า Login", "กรอกอีเมล: admin@unitel.la", "กรอกรหัสผ่าน: admin123", "คลิก 'เข้าสู่ระบบ'"],
    },
    {
      icon: BarChart3,
      title: "แดชบอร์ด (Dashboard)",
      description: "ดูสถิติและข้อมูลภาพรวมของพนักงาน",
      steps: ["ดูจำนวนพนักงานทั้งหมด", "ตรวจสอบสถานะพนักงาน", "ดูเงินเดือนเฉลี่ย", "ดูแผนภูมิแผนก"],
    },
    {
      icon: Users,
      title: "จัดการพนักงาน (Employee Management)",
      description: "ดู แก้ไข และจัดการข้อมูลพนักงาน",
      steps: ["ไปที่เมนู 'พนักงาน'", "ดูรายชื่อพนักงานทั้งหมด", "ใช้ฟังก์ชันค้นหาและกรอง", "คลิกชื่อเพื่อดูรายละเอียด"],
    },
    {
      icon: UserPlus,
      title: "เพิ่มพนักงานใหม่ (Add Employee)",
      description: "เพิ่มข้อมูลพนักงานใหม่เข้าสู่ระบบ",
      steps: ["คลิกปุ่ม 'เพิ่มพนักงาน'", "กรอกข้อมูลส่วนตัว", "เลือกแผนกและตำแหน่ง", "บันทึกข้อมูล"],
    },
    {
      icon: Edit,
      title: "แก้ไขข้อมูล (Edit Employee)",
      description: "แก้ไขข้อมูลพนักงานที่มีอยู่",
      steps: ["เลือกพนักงานที่ต้องการแก้ไข", "คลิกปุ่ม 'แก้ไข'", "อัปเดตข้อมูลที่ต้องการ", "บันทึกการเปลี่ยนแปลง"],
    },
    {
      icon: Search,
      title: "ค้นหาและกรอง (Search & Filter)",
      description: "ค้นหาพนักงานตามเงื่อนไขต่างๆ",
      steps: ["ใช้ช่องค้นหาด้านบน", "กรองตามแผนก", "กรองตามสถานะ", "เรียงลำดับตามต้องการ"],
    },
  ]

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold text-primary">คู่มือการใช้งานระบบจัดการพนักงาน</h1>
        <p className="text-muted-foreground">Unitel Laos Employee Management System</p>
        <Badge variant="secondary" className="bg-primary/10 text-primary">
          เวอร์ชัน 1.0
        </Badge>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {features.map((feature, index) => {
          const Icon = feature.icon
          return (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">{feature.title}</CardTitle>
                    <CardDescription>{feature.description}</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <h4 className="font-medium text-sm text-muted-foreground">ขั้นตอนการใช้งาน:</h4>
                  <ol className="space-y-1">
                    {feature.steps.map((step, stepIndex) => (
                      <li key={stepIndex} className="flex items-start gap-2 text-sm">
                        <span className="flex-shrink-0 w-5 h-5 bg-primary/20 text-primary rounded-full flex items-center justify-center text-xs font-medium">
                          {stepIndex + 1}
                        </span>
                        <span>{step}</span>
                      </li>
                    ))}
                  </ol>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <Card className="bg-primary/5 border-primary/20">
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-lg">
              <FileText className="h-6 w-6 text-primary" />
            </div>
            <div>
              <CardTitle className="text-lg">ข้อมูลสำคัญ (Important Information)</CardTitle>
              <CardDescription>ข้อมูลที่ควรทราบก่อนใช้งาน</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <h4 className="font-medium text-primary">ข้อมูลเข้าสู่ระบบ:</h4>
              <ul className="text-sm space-y-1 text-muted-foreground">
                <li>• อีเมล: admin@unitel.la</li>
                <li>• รหัสผ่าน: admin123</li>
                <li>• สิทธิ์: ผู้ดูแลระบบ</li>
              </ul>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium text-primary">ฟีเจอร์หลัก:</h4>
              <ul className="text-sm space-y-1 text-muted-foreground">
                <li>• จัดการข้อมูลพนักงาน CRUD</li>
                <li>• ระบบค้นหาและกรองข้อมูล</li>
                <li>• แดshboard สถิติ</li>
                <li>• ระบบรักษาความปลอดภัย</li>
              </ul>
            </div>
          </div>
          <div className="p-4 bg-orange-50 border border-orange-200 rounded-lg">
            <p className="text-sm text-orange-800">
              <strong>หมายเหตุ:</strong> ระบบนี้พัฒนาขึ้นสำหรับ Unitel Laos โดยใช้เทคโนโลยี React, Next.js และ PostgreSQL พร้อม
              Docker สำหรับการติดตั้งและใช้งาน
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
