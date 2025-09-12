# ระบบจัดการพนักงาน Unitel Laos

ระบบจัดการพนักงานที่ครอบคลุมและทันสมัย สร้างด้วย Next.js, PostgreSQL และ Docker สำหรับบริษัท Unitel Laos

## คุณสมบัติหลัก

- **ระบบยืนยันตัวตน**: เข้าสู่ระบบที่ปลอดภัยด้วย JWT tokens
- **การจัดการพนักงาน**: ระบบ CRUD ที่สมบูรณ์สำหรับข้อมูลพนักงาน
- **แดชบอร์ด**: สถิติภาพรวมและข้อมูลพนักงานล่าสุด
- **การออกแบบที่ตอบสนอง**: ใช้งานได้ทั้งบนเดสก์ท็อปและมือถือ
- **รองรับ Docker**: การติดตั้งที่ง่ายด้วย Docker containers
- **การเชื่อมต่อฐานข้อมูล**: PostgreSQL พร้อมรองรับ Neon cloud database

## 📖 คู่มือการติดตั้งโดยละเอียด

สำหรับคำแนะนำการติดตั้งแบบละเอียดทุกขั้นตอน กรุณาอ่าน **[คู่มือการติดตั้ง (INSTALLATION.md)](./INSTALLATION.md)**

คู่มือนี้ครอบคลุม:
- การติดตั้งซอฟต์แวร์พื้นฐาน (Node.js, Docker, Git)
- ขั้นตอนการดาวน์โหลดและตั้งค่าโปรเจค
- วิธีการเริ่มต้นระบบด้วย Docker
- การแก้ไขปัญหาที่พบบ่อย
- การตรวจสอบการติดตั้ง

## เทคโนโลยีที่ใช้

- **Frontend**: Next.js 14, React, TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes, Node.js
- **ฐานข้อมูล**: PostgreSQL (Neon cloud หรือ local)
- **การยืนยันตัวตน**: JWT tokens พร้อม bcrypt password hashing
- **Containerization**: Docker & Docker Compose
- **UI Components**: shadcn/ui component library

## เริ่มต้นใช้งาน

### ข้อกำหนดเบื้องต้น

- ติดตั้ง Docker และ Docker Compose แล้ว
- Node.js 18+ (สำหรับการพัฒนาแบบ local)
- Git

### การใช้งานด้วย Docker (แนะนำ)

1. **โคลนโปรเจค**
   \`\`\`bash
   git clone <repository-url>
   cd employee-management-system
   \`\`\`

2. **เริ่มต้นแอปพลิเคชัน**
   \`\`\`bash
   make up
   # หรือ
   docker-compose up -d
   \`\`\`

3. **เข้าใช้งานแอปพลิเคชัน**
   - แอปพลิเคชัน: http://localhost:3000
   - pgAdmin: http://localhost:5050
   - ข้อมูลเข้าสู่ระบบเริ่มต้น: `admin` / `admin123`

### การพัฒนาแบบ Local

1. **ติดตั้ง dependencies**
   \`\`\`bash
   npm install
   \`\`\`

2. **ตั้งค่า environment variables**
   \`\`\`bash
   cp .env.example .env.local
   # แก้ไข .env.local ด้วยข้อมูลฐานข้อมูลของคุณ
   \`\`\`

3. **เริ่มต้น development server**
   \`\`\`bash
   npm run dev
   \`\`\`

## คำสั่ง Docker

โปรเจคมี Makefile สำหรับจัดการ Docker ได้ง่าย:

\`\`\`bash
make help          # แสดงคำสั่งที่ใช้ได้
make build         # สร้าง Docker images
make up            # เริ่มต้นบริการแบบ production
make down          # หยุดบริการ
make dev-up        # เริ่มต้น development environment
make logs          # ดูล็อกของแอปพลิเคชัน
make clean         # ทำความสะอาด Docker resources
make db-init       # เริ่มต้นฐานข้อมูลพร้อมข้อมูลตัวอย่าง
\`\`\`

## Environment Variables

### ตัวแปรที่จำเป็น

- `DATABASE_URL`: สตริงการเชื่อมต่อ PostgreSQL
- `JWT_SECRET`: คีย์ลับสำหรับการเซ็น JWT token

### ตัวแปรเสริม

- `NEXT_PUBLIC_APP_URL`: URL ของแอปพลิเคชัน (ค่าเริ่มต้น: http://localhost:3000)
- `NODE_ENV`: สภาพแวดล้อม (development/production)

## โครงสร้างฐานข้อมูล

ระบบประกอบด้วยตารางหลักดังนี้:

- **employees**: ข้อมูลและรายละเอียดพนักงาน
- **admin_users**: ผู้ดูแลระบบและผู้ใช้งาน HR

### ข้อมูลตัวอย่าง

ระบบมาพร้อมกับข้อมูลตัวอย่างสำหรับ Unitel Laos รวมถึง:
- พนักงานตัวอย่าง 8 คนจากแผนกต่างๆ
- บัญชีผู้ดูแลระบบ (admin/admin123)
- ความสัมพันธ์และลำดับชั้นที่เหมาะสม

## API Endpoints

### การยืนยันตัวตน
- `POST /api/auth/login` - เข้าสู่ระบบ
- `POST /api/auth/logout` - ออกจากระบบ
- `GET /api/auth/me` - ดูข้อมูลผู้ใช้ปัจจุบัน

### พนักงาน
- `GET /api/employees` - แสดงรายชื่อพนักงานทั้งหมด
- `POST /api/employees` - สร้างพนักงานใหม่
- `GET /api/employees/[id]` - ดูรายละเอียดพนักงาน
- `PUT /api/employees/[id]` - อัปเดตข้อมูลพนักงาน
- `DELETE /api/employees/[id]` - ลบพนักงาน

### สถิติ
- `GET /api/stats` - ดูสถิติระบบ
- `GET /api/departments` - ดูสถิติแผนก

## คุณสมบัติด้านความปลอดภัย

- การยืนยันตัวตนด้วย JWT
- การเข้ารหัสรหัสผ่านด้วย bcrypt
- การป้องกัน API routes
- การตรวจสอบและทำความสะอาดข้อมูลนำเข้า
- การป้องกัน SQL injection
- การป้องกัน CORS

## การติดตั้งใช้งาน

### การติดตั้งแบบ Production

1. **ตั้งค่า environment variables**
   \`\`\`bash
   # ตั้งค่า production database URL
   DATABASE_URL=postgresql://user:password@host:port/database
   JWT_SECRET=your-super-secret-key
   \`\`\`

2. **ติดตั้งด้วย Docker**
   \`\`\`bash
   make prod-up
   \`\`\`

### การติดตั้งบน Cloud (Vercel)

แอปพลิเคชันได้รับการปรับแต่งสำหรับการติดตั้งบน Vercel:

1. เชื่อมต่อ repository ของคุณกับ Vercel
2. ตั้งค่า environment variables ใน Vercel dashboard
3. ติดตั้งอัตโนมัติเมื่อ push ไปยัง main branch

## การมีส่วนร่วม

1. Fork repository
2. สร้าง feature branch
3. ทำการเปลี่ยนแปลง
4. ทดสอบอย่างละเอียด
5. ส่ง pull request

## ลิขสิทธิ์

โปรเจคนี้เป็นซอฟต์แวร์ที่เป็นกรรมสิทธิ์ของ Unitel Laos

## การสนับสนุน

สำหรับการสนับสนุนทางเทคนิคหรือคำถาม กรุณาติดต่อทีมพัฒนา

## วิธีการใช้งานระบบ

### การเข้าสู่ระบบ
1. เปิดเว็บไซต์ที่ http://localhost:3000
2. ใช้ข้อมูลเข้าสู่ระบบ: `admin` / `admin123`
3. คลิกปุ่ม "เข้าสู่ระบบ"

### การจัดการพนักงาน
1. **ดูรายชื่อพนักงาน**: คลิกเมนู "พนักงาน" เพื่อดูรายชื่อทั้งหมด
2. **เพิ่มพนักงานใหม่**: คลิกปุ่ม "เพิ่มพนักงาน" และกรอกข้อมูล
3. **แก้ไขข้อมูล**: คลิกปุ่ม "แก้ไข" ในแถวของพนักงานที่ต้องการ
4. **ดูรายละเอียด**: คลิกชื่อพนักงานเพื่อดูข้อมูลทั้งหมด
5. **ลบพนักงาน**: คลิกปุ่ม "ลบ" และยืนยันการลบ

### การใช้งานแดชบอร์ด
- **สถิติภาพรวม**: ดูจำนวนพนักงานทั้งหมด, แผนก, และข้อมูลสำคัญ
- **กราฟและชาร์ต**: วิเคราะห์ข้อมูลพนักงานตามแผนกและตำแหน่ง
- **ข้อมูลล่าสุด**: ดูพนักงานที่เพิ่งเข้าร่วมและกิจกรรมล่าสุด
