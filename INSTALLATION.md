# คู่มือการติดตั้งระบบจัดการพนักงาน Unitel Laos

คู่มือนี้จะแนะนำวิธีการติดตั้งระบบจัดการพนักงานลงในเครื่องคอมพิวเตอร์ของคุณอย่างละเอียดทุกขั้นตอน

## 📋 ข้อกำหนดเบื้องต้น

### สิ่งที่ต้องติดตั้งก่อน
1. **Node.js** (เวอร์ชัน 18 หรือใหม่กว่า)
2. **Docker Desktop**
3. **Git**
4. **Visual Studio Code** (แนะนำ)

---

## 🔧 ขั้นตอนที่ 1: ติดตั้งซอฟต์แวร์พื้นฐาน

### 1.1 ติดตั้ง Node.js
1. ไปที่เว็บไซต์ https://nodejs.org
2. ดาวน์โหลด LTS version (แนะนำ)
3. รันไฟล์ติดตั้งและทำตามขั้นตอน
4. เปิด Command Prompt หรือ Terminal แล้วพิมพ์:
   \`\`\`bash
   node --version
   npm --version
   \`\`\`
   หากแสดงเลขเวอร์ชันแสดงว่าติดตั้งสำเร็จ

### 1.2 ติดตั้ง Docker Desktop
1. ไปที่เว็บไซต์ https://www.docker.com/products/docker-desktop
2. ดาวน์โหลดตามระบบปฏิบัติการของคุณ (Windows/Mac/Linux)
3. ติดตั้งและเปิดโปรแกรม Docker Desktop
4. รอให้ Docker เริ่มทำงาน (จะมีไอคอนสีเขียวใน system tray)
5. เปิด Terminal แล้วพิมพ์:
   \`\`\`bash
   docker --version
   docker-compose --version
   \`\`\`

### 1.3 ติดตั้ง Git
1. ไปที่เว็บไซต์ https://git-scm.com
2. ดาวน์โหลดและติดตั้ง
3. เปิด Terminal แล้วพิมพ์:
   \`\`\`bash
   git --version
   \`\`\`

---

## 📁 ขั้นตอนที่ 2: ดาวน์โหลดโปรเจค

### 2.1 สร้างโฟลเดอร์สำหรับโปรเจค
\`\`\`bash
# สร้างโฟลเดอร์ใหม่
mkdir employee-management
cd employee-management
\`\`\`

### 2.2 ดาวน์โหลดไฟล์โปรเจค
หากคุณมี Git repository:
\`\`\`bash
git clone <URL-ของ-repository>
cd employee-management-system
\`\`\`

หรือหากคุณมีไฟล์ ZIP:
1. แตกไฟล์ ZIP ลงในโฟลเดอร์ที่สร้างไว้
2. เปิด Terminal ในโฟลเดอร์นั้น

---

## ⚙️ ขั้นตอนที่ 3: ตั้งค่าโปรเจค

### 3.1 ติดตั้ง Dependencies
\`\`\`bash
# ติดตั้งแพ็คเกจที่จำเป็น
npm install
\`\`\`

### 3.2 สร้างไฟล์ Environment Variables
\`\`\`bash
# คัดลอกไฟล์ตัวอย่าง
cp .env.example .env.local
\`\`\`

### 3.3 แก้ไขไฟล์ .env.local
เปิดไฟล์ `.env.local` ด้วย Text Editor และแก้ไขดังนี้:

\`\`\`env
# ฐานข้อมูล
DATABASE_URL="postgresql://postgres:password@localhost:5432/employee_db"

# JWT Secret (เปลี่ยนเป็นรหัสลับของคุณ)
JWT_SECRET="your-super-secret-jwt-key-change-this"

# URL ของแอปพลิเคชัน
NEXT_PUBLIC_APP_URL="http://localhost:3000"

# สภาพแวดล้อม
NODE_ENV="development"
\`\`\`

---

## 🐳 ขั้นตอนที่ 4: เริ่มต้นด้วย Docker (วิธีที่แนะนำ)

### 4.1 เริ่มต้นบริการทั้งหมด
\`\`\`bash
# เริ่มต้นฐานข้อมูลและแอปพลิเคชัน
docker-compose up -d
\`\`\`

### 4.2 รอให้บริการเริ่มทำงาน
\`\`\`bash
# ตรวจสอบสถานะ
docker-compose ps
\`\`\`

### 4.3 เริ่มต้นฐานข้อมูล
\`\`\`bash
# สร้างตารางและข้อมูลตัวอย่าง
make db-init
\`\`\`

หรือหากไม่มี make:
\`\`\`bash
docker-compose exec app npm run db:migrate
docker-compose exec app npm run db:seed
\`\`\`

---

## 💻 ขั้นตอนที่ 5: เริ่มต้นแบบ Development (ทางเลือก)

หากต้องการพัฒนาโค้ด สามารถรันแบบ development mode:

### 5.1 เริ่ม PostgreSQL ด้วย Docker
\`\`\`bash
docker-compose up -d postgres
\`\`\`

### 5.2 เริ่ม Development Server
\`\`\`bash
npm run dev
\`\`\`

---

## 🌐 ขั้นตอนที่ 6: เข้าใช้งานระบบ

### 6.1 เปิดเว็บไซต์
เปิดเบราว์เซอร์และไปที่: http://localhost:3000

### 6.2 เข้าสู่ระบบ
- **ชื่อผู้ใช้**: `admin`
- **รหัสผ่าน**: `admin123`

### 6.3 ทดสอบการใช้งาน
1. คลิกเมนู "แดชบอร์ด" เพื่อดูสถิติ
2. คลิกเมนู "พนักงาน" เพื่อดูรายชื่อ
3. ทดลองเพิ่ม/แก้ไข/ลบพนักงาน

---

## 🔧 การแก้ไขปัญหาที่พบบ่อย

### ปัญหา: Docker ไม่สามารถเริ่มได้
**วิธีแก้:**
\`\`\`bash
# ตรวจสอบว่า Docker Desktop เปิดอยู่
docker info

# หยุดและเริ่มใหม่
docker-compose down
docker-compose up -d
\`\`\`

### ปัญหา: Port 3000 ถูกใช้งานแล้ว
**วิธีแก้:**
\`\`\`bash
# หาโปรเซสที่ใช้ port 3000
lsof -i :3000  # Mac/Linux
netstat -ano | findstr :3000  # Windows

# หยุดโปรเซสหรือเปลี่ยน port ในไฟล์ docker-compose.yml
\`\`\`

### ปัญหา: ฐานข้อมูลเชื่อมต่อไม่ได้
**วิธีแก้:**
\`\`\`bash
# ตรวจสอบสถานะฐานข้อมูล
docker-compose logs postgres

# รีสตาร์ทฐานข้อมูล
docker-compose restart postgres
\`\`\`

### ปัญหา: npm install ล้มเหลว
**วิธีแก้:**
\`\`\`bash
# ลบ node_modules และติดตั้งใหม่
rm -rf node_modules package-lock.json
npm install

# หรือใช้ yarn แทน
npm install -g yarn
yarn install
\`\`\`

---

## 📊 การตรวจสอบการติดตั้ง

### ตรวจสอบบริการทั้งหมด
\`\`\`bash
# ดูสถานะ containers
docker-compose ps

# ดู logs
docker-compose logs app
docker-compose logs postgres
\`\`\`

### ตรวจสอบฐานข้อมูล
\`\`\`bash
# เข้าใช้ pgAdmin
# ไปที่ http://localhost:5050
# Email: admin@admin.com
# Password: admin
\`\`\`

### ตรวจสอบ API
\`\`\`bash
# ทดสอบ API endpoint
curl http://localhost:3000/api/employees
\`\`\`

---

## 🚀 การใช้งานขั้นสูง

### การสำรองข้อมูล
\`\`\`bash
# สำรองฐานข้อมูล
make db-backup

# หรือ
docker-compose exec postgres pg_dump -U postgres employee_db > backup.sql
\`\`\`

### การอัปเดตโค้ด
\`\`\`bash
# ดึงโค้ดใหม่
git pull origin main

# รีบิลด์ Docker images
docker-compose build --no-cache
docker-compose up -d
\`\`\`

### การดู Logs แบบ Real-time
\`\`\`bash
# ดู logs ทั้งหมด
docker-compose logs -f

# ดู logs เฉพาะแอป
docker-compose logs -f app
\`\`\`

---

## 📞 การขอความช่วยเหลือ

หากพบปัญหาในการติดตั้ง:

1. **ตรวจสอบ logs**: `docker-compose logs`
2. **ตรวจสอบ ports**: ให้แน่ใจว่า ports 3000, 5432, 5050 ว่าง
3. **ตรวจสอบ Docker**: ให้แน่ใจว่า Docker Desktop ทำงานปกติ
4. **ตรวจสอบ environment variables**: ให้แน่ใจว่าไฟล์ .env.local ถูกต้อง

### ข้อมูลที่ควรเตรียมเมื่อขอความช่วยเหลือ:
- ระบบปฏิบัติการ (Windows/Mac/Linux)
- เวอร์ชัน Node.js, Docker
- ข้อความ error ที่แสดง
- ขั้นตอนที่ทำก่อนเกิดปัญหา

---

## ✅ สรุป

หลังจากติดตั้งเสร็จสิ้น คุณจะได้:

1. ✅ ระบบจัดการพนักงานที่ทำงานบน http://localhost:3000
2. ✅ ฐานข้อมูล PostgreSQL พร้อมข้อมูลตัวอย่าง
3. ✅ pgAdmin สำหรับจัดการฐานข้อมูลบน http://localhost:5050
4. ✅ ระบบยืนยันตัวตนที่ปลอดภัย
5. ✅ API endpoints สำหรับการจัดการข้อมูล

**ขั้นตอนถัดไป:**
- อ่านคู่มือการใช้งานในไฟล์ README.md
- ทดลองใช้งานฟีเจอร์ต่างๆ
- ปรับแต่งข้อมูลให้เหมาะกับองค์กรของคุณ

🎉 **ยินดีด้วย! คุณติดตั้งระบบจัดการพนักงานเรียบร้อยแล้ว**
