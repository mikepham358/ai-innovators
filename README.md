# AI INNOVATORS — VIN BEYOND AI (Safe AI, Stronger Minds)

Website chính thức của **CLB Học sinh AI INNOVATORS** (Trường PTLC Vinschool Grand Park • Gen 1.0 • VGP2026), xây dựng bằng **Next.js 16 (App Router)**, **Tailwind CSS**, và **Supabase Auth (Đăng nhập Google / Gmail)**.

---

## Tính năng chính

- **Trang giới thiệu CLB & Dự án VIN BEYOND AI (`/`):**
  - Bộ nhận diện chính thức **SAFE AI — STRONGER MINDS**.
  - Lĩnh vực hoạt động, Mục tiêu, Sứ mệnh & Tiến trình năng lực 4 nấc (Bloom's Taxonomy).
  - Chi tiết **4 Workshop Pre-Hackathon** & **AI Learning Hackathon 28/11/2026** (Scorecard + Day Agenda).
  - Cơ cấu **7 Ban chuyên trách** tuân thủ tuyệt đối **Zero PII**.
- **Đăng nhập bằng Gmail (`/login` & `/auth/callback`):**
  - Tích hợp **Supabase Auth (`@supabase/ssr`)** với Google OAuth PKCE.
- **Cổng Thành Viên (`/portal`):**
  - Hiển thị hồ sơ Google đã xác thực của học sinh/thành viên.
  - Công cụ tương tác **PARTS Socratic Prompt Builder** kèm bộ lọc cảnh báo **Zero PII** trước khi sao chép sang Gemini / NotebookLM.

---

## 1. Hướng dẫn Deploy lên Vercel (`https://ai-innovators.vercel.app`)

1. Truy cập https://vercel.com → **Sign Up / Log In** bằng tài khoản GitHub **`mikepham358`**.
2. Chọn **Add New...** → **Project** → tìm repository **`mikepham358/ai-innovators`** → bấm **Import**.
3. Ở mục **Project Name**, giữ tên `ai-innovators` (để nhận domain `https://ai-innovators.vercel.app` nếu còn trống).
4. **Framework Preset:** Vercel tự nhận diện **Next.js**.
5. Bấm **Deploy**. Sau khi build xong (~1 phút), trang web sẽ hoạt động ngay!

---

## 2. Hướng dẫn bật Đăng nhập Gmail (Supabase Auth + Google Cloud OAuth)

Trang chủ `/` hoạt động ngay lập tức không cần biến môi trường. Khi bạn muốn kích hoạt nút **Đăng nhập bằng Gmail** cho học sinh & thành viên:

### Bước A: Tạo dự án Supabase (Miễn phí)
1. Vào https://supabase.com → tạo dự án mới (ví dụ `ai-innovators`).
2. Vào **Project Settings** → **API**, sao chép:
   - `Project URL` → dùng cho `NEXT_PUBLIC_SUPABASE_URL`
   - `anon public` key → dùng cho `NEXT_PUBLIC_SUPABASE_ANON_KEY`
3. Vào **Authentication** → **URL Configuration**:
   - **Site URL:** `https://ai-innovators.vercel.app` *(đổi đúng theo domain Vercel của bạn)*
   - **Redirect URLs:** Thêm:
     - `https://ai-innovators.vercel.app/auth/callback`
     - `http://localhost:3000/auth/callback` *(nếu muốn test trên máy cá nhân)*

### Bước B: Tạo Google OAuth Client ID trên Google Cloud Console
1. Vào https://console.cloud.google.com → chọn **APIs & Services** → **OAuth consent screen**:
   - Chọn **External** (nếu cho mọi Gmail cá nhân đăng nhập) hoặc **Internal** (nếu giới hạn nội bộ Google Workspace cùng tổ chức).
   - Điền tên ứng dụng (`AI INNOVATORS`), email hỗ trợ, các scope cơ bản (`email`, `profile`, `openid`).
2. Vào **Credentials** → **Create Credentials** → **OAuth client ID** → chọn **Web application**:
   - **Authorized JavaScript origins:**
     - `https://ai-innovators.vercel.app`
     - `http://localhost:3000`
   - **Authorized redirect URIs:**
     - Dán **Callback URL** lấy từ Supabase (**Authentication** → **Providers** → **Google**), có dạng:
       `https://<project-ref>.supabase.co/auth/v1/callback`
3. Sao chép **Client ID** và **Client Secret** từ Google Cloud, dán vào mục **Authentication** → **Providers** → **Google** trên Supabase rồi bật **Enable Sign in with Google** → **Save**.

### Bước C: Gắn biến môi trường lên Vercel
1. Vào Project `ai-innovators` trên Vercel → **Settings** → **Environment Variables**.
2. Thêm 2 biến sau (áp dụng cho Production, Preview, Development):
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
3. Vào tab **Deployments** → bấm **Redeploy** bản mới nhất để áp dụng biến môi trường.

---

## Chạy thử trên máy cá nhân (Local Development)

```bash
cp .env.example .env.local
# Điền 2 giá trị Supabase vào .env.local (nếu muốn test đăng nhập Gmail ở local)
npm install
npm run dev
```
Mở trình duyệt tại http://localhost:3000.
