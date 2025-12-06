Worddee.aiเว็บแอปพลิเคชันสำหรับฝึกแต่งประโยคภาษาอังกฤษ พร้อมระบบ AI Feedback ผ่าน n8n และ Dashboard ติดตามผลโครงสร้างโปรเจกต์frontend/: Next.js App Routerbackend/: FastAPI Pythonautomations/: ไฟล์ JSON Workflow สำหรับ n8n🚀 วิธีการรันโปรเจกต์ (Getting Started)1. Backend (FastAPI)ต้องมี Python 3.9+เข้าไปที่โฟลเดอร์ backendcd backend
สร้าง Virtual Environment (แนะนำ)python -m venv venv

# Windows
venv\Scripts\activate

# Mac/Linux
source venv/bin/activate
ติดตั้ง Dependenciespip install -r requirements.txt
รัน Serveruvicorn main:app --reload
Backend จะรันที่ http://localhost:80002. Frontend (Next.js)ต้องมี Node.js v18+เข้าไปที่โฟลเดอร์ frontendcd frontend
ติดตั้ง Dependenciesnpm install
รัน Development Servernpm run dev
Frontend จะรันที่ http://localhost:30003. Automation (n8n)เพื่อให้ระบบ AI ทำงานได้จริง (ถ้าไม่ทำขั้นตอนนี้ Backend จะใช้ Mock AI ตอบกลับแทน):ติดตั้งและรัน n8n (ผ่าน Docker หรือ Desktop App)สร้าง Workflow ใหม่Import ไฟล์ automations/worddee-ai-workflow.json เข้าไปใน Node "OpenAI Chat Model": ให้ใส่ Credential Key ของ OpenAI ของคุณกด Execute Workflow หรือ Activateนำ URL ของ Webhook (เช่น http://localhost:5678/webhook/validate-sentence) ไปอัปเดตในไฟล์ backend/utils/n8n_client.py หรือสร้างไฟล์ .env ใน backend:N8N_WEBHOOK_URL=http://localhost:5678/webhook/validate-sentence
📌 การใช้งานเปิด Browser ไปที่ http://localhost:3000คลิกเมนู Word of the Day เพื่อฝึกแต่งประโยคคลิกเมนู My Progress เพื่อดู Dashboard⚙️ Tech Stack DetailsFrontend: Next.js 14, TailwindCSS, Axios, RechartsBackend: FastAPI, PydanticAI Integration: n8n Webhook -> OpenAI GPT-4o-mini