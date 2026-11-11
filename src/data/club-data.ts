export interface ClubPillar {
  id: string;
  badge: string;
  title: string;
  items: string[];
}

export interface BloomStage {
  step: string;
  vi: string;
  en: string;
  description: string;
}

export interface WorkshopItem {
  number: string;
  title: string;
  subtitle: string;
  topics: string[];
  tools: string[];
}

export interface ScorecardCriterion {
  label: string;
  weight: string;
  detail: string;
}

export interface AgendaItem {
  time: string;
  title: string;
  detail: string;
  lead: string;
}

export interface DivisionItem {
  code: string;
  name: string;
  role: string;
  highlights: string[];
}

export const CLUB_META = {
  name: "AI INNOVATORS",
  school: "Trường PTLC Vinschool Grand Park",
  cohort: "GEN 1.0 • VGP2026",
  flagship: "VIN BEYOND AI",
  slogan: "SAFE AI — STRONGER MINDS",
  coreQuestion:
    "AI có thể giúp chúng ta tư duy sâu sắc hơn như thế nào mà không thay thế bộ não của chính mình?",
  hackathonDate: "Thứ Bảy, 28/11/2026",
  hackathonTime: "08:00 – 15:30",
  hackathonLocation: "Vinschool Grand Park, TP. Thủ Đức",
  standards: [
    "UNESCO AI Competency",
    "OECD AI Principles",
    "Google Learning Science",
    "Zero PII Compliance",
  ],
};

export const CLUB_PILLARS: ClubPillar[] = [
  {
    id: "activities",
    badge: "01 • HOẠT ĐỘNG",
    title: "Lĩnh Vực Hoạt Động",
    items: [
      "Đào tạo và phổ cập kiến thức về AI cho học sinh",
      "Nâng cao trách nhiệm và sự an toàn trong quá trình sử dụng AI",
      "Hướng dẫn học sinh lập trình AI để hỗ trợ học tập",
    ],
  },
  {
    id: "goals",
    badge: "02 • MỤC TIÊU",
    title: "Mục Tiêu Cốt Lõi",
    items: [
      "Giúp học sinh hiểu và sử dụng AI đúng cách",
      "Trang bị cho học sinh kỹ năng thiết kế câu lệnh và sử dụng AI",
      "Xây dựng cộng đồng chia sẻ kiến thức về AI",
    ],
  },
  {
    id: "mission",
    badge: "03 • SỨ MỆNH",
    title: "Sứ Mệnh Giáo Dục",
    items: [
      "Lan tỏa kiến thức và thúc đẩy ứng dụng AI trong giáo dục",
      "Xây dựng cộng đồng học sinh chủ động, sáng tạo và có trách nhiệm với công nghệ",
    ],
  },
];

export const BLOOM_STAGES: BloomStage[] = [
  {
    step: "01",
    vi: "HIỂU BIẾT",
    en: "Understand",
    description:
      "Nắm bản chất thuật toán, nhận diện ảo giác AI (hallucinations), thiên lệch dữ liệu và cam kết Zero PII.",
  },
  {
    step: "02",
    vi: "THỬ NGHIỆM",
    en: "Apply",
    description:
      "Làm chủ kỹ thuật câu lệnh PARTS và Socratic Prompting biến AI thành gia sư gợi mở thay vì máy giải bài hộ.",
  },
  {
    step: "03",
    vi: "XÂY DỰNG",
    en: "Create",
    description:
      "Chế tác nguyên mẫu trợ lý học tập an toàn trên Walled-Garden NotebookLM, Gemini Canvas và công cụ web.",
  },
  {
    step: "04",
    vi: "CHIA SẺ",
    en: "Share",
    description:
      "Trình diễn sản phẩm tại AI Learning Hackathon 28/11/2026 và lan tỏa AI Learning Toolkit cho cộng đồng học sinh.",
  },
];

export const WORKSHOPS: WorkshopItem[] = [
  {
    number: "Workshop 01",
    title: "AI Literacy & Zero PII",
    subtitle: "Hiểu đúng bản chất AI & An toàn dữ liệu học đường",
    topics: [
      "Phân biệt AI truyền thống và AI Tạo sinh (Generative AI / LLM)",
      "Nhận diện ảo giác thông tin và thiên lệch dữ liệu (Bias)",
      "Quy tắc Zero PII: tuyệt đối không đưa thông tin cá nhân lên AI công cộng",
    ],
    tools: ["UNESCO Framework", "Zero PII Checklist"],
  },
  {
    number: "Workshop 02",
    title: "Prompt Engineering (PARTS & Socratic)",
    subtitle: "Thiết kế câu lệnh gợi mở — kiên quyết không làm thay",
    topics: [
      "Cấu trúc câu lệnh chuẩn quốc tế PARTS (Persona – Aim – Recipients – Theme – Structure)",
      "Kỹ thuật Socratic Prompting dẫn dắt học sinh tự tìm đáp án",
      "So sánh và lặp lại quy trình cải thiện chất lượng prompt",
    ],
    tools: ["PARTS Matrix", "Socratic Guardrails"],
  },
  {
    number: "Workshop 03",
    title: "AI Safety & Red-Teaming",
    subtitle: "Không gian Walled-Garden & Kiểm thử đối kháng",
    topics: [
      "Huấn luyện Google NotebookLM neo 100% vào học liệu chính thống của trường",
      "Thực hành Red-Teaming phát hiện lỗ hổng câu trả lời sai lệch",
      "Bảo vệ liêm chính học thuật trong quá trình tự ôn tập",
    ],
    tools: ["Google NotebookLM", "Red-Teaming Lab"],
  },
  {
    number: "Workshop 04",
    title: "Learning Science & Prototype Building",
    subtitle: "Ứng dụng Productive Struggle vào chế tác sản phẩm",
    topics: [
      "Áp dụng nguyên lý 'loay hoay hữu ích' (Productive Struggle)",
      "Xây dựng nguyên mẫu trợ lý học tập giải quyết bài toán học đường thực tế",
      "Hoàn thiện giao diện, thử nghiệm người dùng và chuẩn bị Demo Pitching",
    ],
    tools: ["Gemini Canvas", "Manim", "Next.js / Web"],
  },
];

export const HACKATHON_SCORECARD: ScorecardCriterion[] = [
  {
    label: "Giải quyết đúng bài toán thật",
    weight: "25%",
    detail: "Đánh trúng điểm nghẽn học tập thực tế của học sinh khối 9–12.",
  },
  {
    label: "Cơ chế Socratic — không làm thay",
    weight: "25%",
    detail: "Trợ lý đặt câu hỏi gợi mở, kích thích tư duy phản biện thay vì đưa đáp án sẵn.",
  },
  {
    label: "An toàn dữ liệu & Zero PII",
    weight: "20%",
    detail: "Tuân thủ bảo mật thông tin người học vị thành niên theo Nghị định 13/2023.",
  },
  {
    label: "Độ chính xác nguồn (Groundedness)",
    weight: "20%",
    detail: "Kiểm chứng thông tin tin cậy, giảm thiểu ảo giác từ mô hình ngôn ngữ.",
  },
  {
    label: "Trải nghiệm & Tính nhân văn",
    weight: "10%",
    detail: "Thân thiện, dễ sử dụng, tôn trọng nhịp độ học tập của từng học sinh.",
  },
];

export const HACKATHON_AGENDA: AgendaItem[] = [
  {
    time: "08:00 – 08:20",
    title: "Lễ Khai Mạc & Phổ Biến Quy Chế",
    detail: "Thông qua cam kết liêm chính học thuật, công bố đề bài và giới thiệu Ban Giám khảo.",
    lead: "Ban Điều hành & MC",
  },
  {
    time: "08:30 – 11:30",
    title: "Hackathon Chế Tác Nguyên Mẫu (3 giờ)",
    detail: "20 đội thi tại 8 phòng thiết kế prompt Socratic, Walled-Garden NotebookLM và bản demo.",
    lead: "20 Đội Thi & 16 Staff",
  },
  {
    time: "11:30 – 12:30",
    title: "Nghỉ Trưa & Teabreak Kết Nối",
    detail: "Phục vụ 150 suất ăn trưa và không gian giao lưu giữa thí sinh, mentor và ban tổ chức.",
    lead: "Ban Hậu cần (LOG)",
  },
  {
    time: "12:40 – 14:40",
    title: "Vòng Thuyết Trình & Phản Biện (Q&A)",
    detail: "Mỗi đội thuyết trình demo nguyên mẫu (10 phút) và phản biện trực tiếp cùng BGK (8 phút).",
    lead: "Hội đồng Giám khảo & ER",
  },
  {
    time: "14:40 – 15:30",
    title: "Tổng Kết Scorecard & Lễ Trao Giải",
    detail: "Minigames trí tuệ, vinh danh Quán quân – Á quân – Quý quân và trao chứng nhận.",
    lead: "Ban Điều hành & Cố vấn",
  },
];

export const CLUB_DIVISIONS: DivisionItem[] = [
  {
    code: "PM",
    name: "Ban Điều Hành",
    role: "Quản trị dự án tổng thể & điều phối liên ban",
    highlights: ["Lập kế hoạch 5 giai đoạn", "Điều phối tiến độ GP-Pitching"],
  },
  {
    code: "DOT",
    name: "Ban Đào Tạo",
    role: "Thiết kế giáo án & đứng lớp 4 Workshop năng lực",
    highlights: ["Prompting PARTS & Socratic", "AI Safety & Red-Teaming"],
  },
  {
    code: "PR",
    name: "Ban Truyền Thông",
    role: "Chiến dịch truyền thông IGNITE & lan tỏa học thuật",
    highlights: ["Truyền thông Assembly", "Nội dung giáo dục AI có kiểm chứng"],
  },
  {
    code: "PH",
    name: "Ban Thiết Kế & Hình Ảnh",
    role: "Bộ nhận diện AI INNOVATORS & ấn phẩm sự kiện",
    highlights: ["Logo, Poster, Frame CLB", "Cẩm nang AI Learning Toolkit"],
  },
  {
    code: "ER",
    name: "Ban Đối Ngoại",
    role: "Kết nối chuyên gia, diễn giả & Ban Giám khảo",
    highlights: ["Làm việc với diễn giả RMIT/EdTech", "Huy động nguồn lực đồng hành"],
  },
  {
    code: "LOG",
    name: "Ban Hậu Cần & Tài Chính",
    role: "Cơ sở vật chất 10 phòng thi & quản trị ngân sách",
    highlights: ["Điều phối 150 suất ăn & thiết bị", "Minh bạch Purchasing Request"],
  },
  {
    code: "HR",
    name: "Ban Nhân Sự",
    role: "Tuyển chọn, gắn kết & phát triển 28 thành viên Gen 1.0",
    highlights: ["Vận hành mô hình Career Lab", "Đánh giá CSAT & gắn kết nội bộ"],
  },
];
