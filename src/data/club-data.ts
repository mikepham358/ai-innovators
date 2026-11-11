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

export type DivisionCode = "PM" | "DOT" | "PR" | "PH" | "ER" | "LOG" | "HR";

export type MemberTier = "executive" | "head" | "member";

export type DivisionAccent =
  | "violet"
  | "blue"
  | "fuchsia"
  | "cyan"
  | "emerald"
  | "amber"
  | "rose";

export interface DivisionItem {
  code: DivisionCode;
  name: string;
  englishTag: string;
  role: string;
  highlights: string[];
  accent: DivisionAccent;
  partnerNote?: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  roleVi: string;
  divisionCode: DivisionCode;
  tier: MemberTier;
  imageSrc: string;
  isFeaturedVisualLead?: boolean;
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
    englishTag: "Executive Board",
    role: "Quản trị dự án tổng thể & điều phối chiến lược 7 ban chuyên trách",
    highlights: ["Lập kế hoạch 5 giai đoạn", "Điều phối tiến độ GP-Pitching"],
    accent: "violet",
  },
  {
    code: "DOT",
    name: "Ban Đào Tạo",
    englishTag: "Academic & Training",
    role: "Thiết kế giáo án & đứng lớp 4 Workshop năng lực",
    highlights: ["Prompting PARTS & Socratic", "AI Safety & Red-Teaming"],
    accent: "blue",
  },
  {
    code: "PR",
    name: "Ban Truyền Thông",
    englishTag: "Public Relations & Media",
    role: "Chiến dịch truyền thông IGNITE & lan tỏa học thuật",
    highlights: ["Truyền thông Assembly", "Nội dung giáo dục AI có kiểm chứng"],
    accent: "fuchsia",
  },
  {
    code: "PH",
    name: "Ban Thiết Kế & Hình Ảnh",
    englishTag: "Visual & Brand Studio",
    role: "Bộ nhận diện AI INNOVATORS & ấn phẩm sự kiện",
    highlights: ["Logo, Poster, Frame CLB", "Cẩm nang AI Learning Toolkit"],
    accent: "cyan",
    partnerNote:
      "Khối sáng tạo hình ảnh Gen 1.0 phối hợp sản xuất ấn phẩm trực tiếp cùng Ban Truyền Thông (PR).",
  },
  {
    code: "ER",
    name: "Ban Đối Ngoại",
    englishTag: "External Relations",
    role: "Kết nối chuyên gia, diễn giả & Ban Giám khảo",
    highlights: ["Làm việc với diễn giả RMIT/EdTech", "Huy động nguồn lực đồng hành"],
    accent: "emerald",
  },
  {
    code: "LOG",
    name: "Ban Hậu Cần & Tài Chính",
    englishTag: "Logistics & Finance",
    role: "Cơ sở vật chất 10 phòng thi & quản trị ngân sách",
    highlights: ["Điều phối 150 suất ăn & thiết bị", "Minh bạch Purchasing Request"],
    accent: "amber",
  },
  {
    code: "HR",
    name: "Ban Nhân Sự",
    englishTag: "Human Resources",
    role: "Tuyển chọn, gắn kết & phát triển đội ngũ thành viên Gen 1.0",
    highlights: ["Vận hành mô hình Career Lab", "Đánh giá CSAT & gắn kết nội bộ"],
    accent: "rose",
  },
];

export const TEAM_MEMBERS: TeamMember[] = [
  {
    id: "pm-01-nguyen-tuong-vy",
    name: "NGUYEN TUONG VY",
    role: "PRESIDENT",
    roleVi: "Chủ nhiệm CLB",
    divisionCode: "PM",
    tier: "executive",
    imageSrc: "/images/team/pm-01-nguyen-tuong-vy.jpg",
  },
  {
    id: "pm-02-bui-ngo-bao-chau",
    name: "BUI NGO BAO CHAU",
    role: "VICE - PRESIDENT",
    roleVi: "Phó Chủ nhiệm CLB",
    divisionCode: "PM",
    tier: "executive",
    imageSrc: "/images/team/pm-02-bui-ngo-bao-chau.jpg",
  },
  {
    id: "dot-01-tran-minh-triet",
    name: "TRAN MINH TRIET",
    role: "HEAD OF DOT",
    roleVi: "Trưởng Ban Đào Tạo",
    divisionCode: "DOT",
    tier: "head",
    imageSrc: "/images/team/dot-01-tran-minh-triet.jpg",
  },
  {
    id: "dot-02-nguyen-luong-ba-tri",
    name: "NGUYEN LUONG BA TRI",
    role: "MEMBER OF DOT",
    roleVi: "Thành viên Ban Đào Tạo",
    divisionCode: "DOT",
    tier: "member",
    imageSrc: "/images/team/dot-02-nguyen-luong-ba-tri.jpg",
  },
  {
    id: "dot-03-pham-nguyen-cat-linh",
    name: "PHAM NGUYEN CAT LINH",
    role: "MEMBER OF DOT",
    roleVi: "Thành viên Ban Đào Tạo",
    divisionCode: "DOT",
    tier: "member",
    imageSrc: "/images/team/dot-03-pham-nguyen-cat-linh.jpg",
  },
  {
    id: "dot-04-nguyen-hoang-nam",
    name: "NGUYEN HOANG NAM",
    role: "MEMBER OF DOT",
    roleVi: "Thành viên Ban Đào Tạo",
    divisionCode: "DOT",
    tier: "member",
    imageSrc: "/images/team/dot-04-nguyen-hoang-nam.jpg",
  },
  {
    id: "dot-05-tran-thanh-thuy-duong",
    name: "TRAN THANH THUY DUONG",
    role: "MEMBER OF DOT",
    roleVi: "Thành viên Ban Đào Tạo",
    divisionCode: "DOT",
    tier: "member",
    imageSrc: "/images/team/dot-05-tran-thanh-thuy-duong.jpg",
  },
  {
    id: "dot-06-do-trung-kien",
    name: "DO TRUNG KIEN",
    role: "MEMBER OF DOT",
    roleVi: "Thành viên Ban Đào Tạo",
    divisionCode: "DOT",
    tier: "member",
    imageSrc: "/images/team/dot-06-do-trung-kien.jpg",
  },
  {
    id: "dot-07-nguyen-tuong-lam",
    name: "NGUYEN TUONG LAM",
    role: "MEMBER OF DOT",
    roleVi: "Thành viên Ban Đào Tạo",
    divisionCode: "DOT",
    tier: "member",
    imageSrc: "/images/team/dot-07-nguyen-tuong-lam.jpg",
  },
  {
    id: "pr-01-vu-khoi-nguyen",
    name: "VU KHOI NGUYEN",
    role: "HEAD OF PR",
    roleVi: "Trưởng Ban Truyền Thông",
    divisionCode: "PR",
    tier: "head",
    imageSrc: "/images/team/pr-01-vu-khoi-nguyen.jpg",
    isFeaturedVisualLead: true,
  },
  {
    id: "pr-02-nguyen-le-gia-lac",
    name: "NGUYEN LE GIA LAC",
    role: "VICE HEAD OF PR",
    roleVi: "Phó Ban Truyền Thông",
    divisionCode: "PR",
    tier: "head",
    imageSrc: "/images/team/pr-02-nguyen-le-gia-lac.jpg",
    isFeaturedVisualLead: true,
  },
  {
    id: "pr-03-vu-chau-anh",
    name: "VU CHAU ANH",
    role: "MEMBER OF PR",
    roleVi: "Thành viên Ban Truyền Thông",
    divisionCode: "PR",
    tier: "member",
    imageSrc: "/images/team/pr-03-vu-chau-anh.jpg",
  },
  {
    id: "pr-04-tran-hoang-linh-chau",
    name: "TRAN HOANG LINH CHAU",
    role: "MEMBER OF PR",
    roleVi: "Thành viên Ban Truyền Thông",
    divisionCode: "PR",
    tier: "member",
    imageSrc: "/images/team/pr-04-tran-hoang-linh-chau.jpg",
  },
  {
    id: "pr-05-nguyen-ha-minh-chau",
    name: "NGUYEN HA MINH CHAU",
    role: "MEMBER OF PR",
    roleVi: "Thành viên Ban Truyền Thông",
    divisionCode: "PR",
    tier: "member",
    imageSrc: "/images/team/pr-05-nguyen-ha-minh-chau.jpg",
  },
  {
    id: "pr-06-pham-nhat-minh",
    name: "PHAM NHAT MINH",
    role: "MEMBER OF PR",
    roleVi: "Thành viên Ban Truyền Thông",
    divisionCode: "PR",
    tier: "member",
    imageSrc: "/images/team/pr-06-pham-nhat-minh.jpg",
  },
  {
    id: "pr-07-thai-phuc-thao",
    name: "THAI PHUC THAO",
    role: "MEMBER OF PR",
    roleVi: "Thành viên Ban Truyền Thông",
    divisionCode: "PR",
    tier: "member",
    imageSrc: "/images/team/pr-07-thai-phuc-thao.jpg",
  },
  {
    id: "pr-08-lam-xuan-nghi",
    name: "LAM XUAN NGHI",
    role: "MEMBER OF PR",
    roleVi: "Thành viên Ban Truyền Thông",
    divisionCode: "PR",
    tier: "member",
    imageSrc: "/images/team/pr-08-lam-xuan-nghi.jpg",
  },
  {
    id: "er-01-tran-tue-anh",
    name: "TRAN TUE ANH",
    role: "HEAD OF ER",
    roleVi: "Trưởng Ban Đối Ngoại",
    divisionCode: "ER",
    tier: "head",
    imageSrc: "/images/team/er-01-tran-tue-anh.jpg",
  },
  {
    id: "er-02-ta-quoc-duy-binh",
    name: "TA QUOC DUY BINH",
    role: "MEMBER OF ER",
    roleVi: "Thành viên Ban Đối Ngoại",
    divisionCode: "ER",
    tier: "member",
    imageSrc: "/images/team/er-02-ta-quoc-duy-binh.jpg",
  },
  {
    id: "log-01-vu-thanh-chuong",
    name: "VU THANH CHUONG",
    role: "HEAD OF LOG",
    roleVi: "Trưởng Ban Hậu Cần & Tài Chính",
    divisionCode: "LOG",
    tier: "head",
    imageSrc: "/images/team/log-01-vu-thanh-chuong.jpg",
  },
  {
    id: "log-02-le-hoang-minh-quan",
    name: "LE HOANG MINH QUAN",
    role: "CO-HEAD OF LOG",
    roleVi: "Đồng Trưởng Ban Hậu Cần & Tài Chính",
    divisionCode: "LOG",
    tier: "head",
    imageSrc: "/images/team/log-02-le-hoang-minh-quan.jpg",
  },
  {
    id: "log-03-le-khang-huy",
    name: "LE KHANG HUY",
    role: "MEMBER OF LOG",
    roleVi: "Thành viên Ban Hậu Cần",
    divisionCode: "LOG",
    tier: "member",
    imageSrc: "/images/team/log-03-le-khang-huy.jpg",
  },
  {
    id: "log-04-vo-minh-khoa",
    name: "VO MINH KHOA",
    role: "MEMBER OF LOG",
    roleVi: "Thành viên Ban Hậu Cần",
    divisionCode: "LOG",
    tier: "member",
    imageSrc: "/images/team/log-04-vo-minh-khoa.jpg",
  },
  {
    id: "log-05-luong-thanh-khiet-dang",
    name: "LUONG THANH KHIET DANG",
    role: "MEMBER OF LOG",
    roleVi: "Thành viên Ban Hậu Cần",
    divisionCode: "LOG",
    tier: "member",
    imageSrc: "/images/team/log-05-luong-thanh-khiet-dang.jpg",
  },
  {
    id: "log-06-le-nam-phong",
    name: "LE NAM PHONG",
    role: "MEMBER OF LOG",
    roleVi: "Thành viên Ban Hậu Cần",
    divisionCode: "LOG",
    tier: "member",
    imageSrc: "/images/team/log-06-le-nam-phong.jpg",
  },
  {
    id: "hr-01-tran-thi-khanh-ngoc",
    name: "TRAN THI KHANH NGOC",
    role: "HEAD OF HR",
    roleVi: "Trưởng Ban Nhân Sự",
    divisionCode: "HR",
    tier: "head",
    imageSrc: "/images/team/hr-01-tran-thi-khanh-ngoc.jpg",
  },
];
