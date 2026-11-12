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

export type HackathonAudience = "btc" | "participant";

export type BtcRoleCode = "CORE" | "PR" | "LOG" | "DOT" | "HR" | "ER";

export interface BtcRoleTask {
  role: BtcRoleCode;
  label: string;
  task: string;
}

export interface AgendaItem {
  id: string;
  time: string;
  phase: string;
  title: string;
  location: string;
  detail: string;
  lead: string;
  highlights: string[];
  roleTasks?: BtcRoleTask[];
}

export interface PitchingShiftSlot {
  pair: string;
  setupTime: string;
  pitchTime: string;
}

export type DivisionCode = "PM" | "PR" | "HR" | "LOG" | "DOT" | "ER";

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

export interface PrototypeWorkflowStep {
  id: string;
  tabLabel: string;
  promptExample: string;
  assistantBehavior: string;
  pedagogyFocus: string;
}

export interface PrototypeItem {
  id: string;
  number: string;
  title: string;
  shortTitle: string;
  subject: string;
  platform: string;
  platformBadge: string;
  description: string;
  url: string;
  outcomeLabel: "Kết quả đạt được" | "Giá trị thực tiễn";
  outcome: string;
  accent: "violet" | "blue" | "emerald" | "fuchsia";
  embedMode: "iframe" | "google-protected";
  highlights: string[];
  workflowSteps?: PrototypeWorkflowStep[];
}

export const CLUB_META = {
  name: "AI INNOVATORS",
  school: "Trường PTLC Vinschool Grand Park",
  cohort: "GEN 1.0 • VGP2026",
  flagship: "VIN BEYOND AI",
  slogan: "SAFE AI - STRONGER MINDS",
  instagramUrl: "https://www.instagram.com/aiinnovators.vgp/",
  instagramHandle: "@aiinnovators.vgp",
  coreQuestion:
    "AI có thể giúp chúng ta tư duy sâu sắc hơn như thế nào mà không thay thế bộ não của chính mình?",
  hackathonDate: "Thứ Bảy, 23/01/2027",
  hackathonTime: "06:30 - 15:35",
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
      "Trình diễn sản phẩm tại AI Learning Hackathon 23/01/2027 và lan tỏa AI Learning Toolkit cho cộng đồng học sinh.",
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
    subtitle: "Thiết kế câu lệnh gợi mở - kiên quyết không làm thay",
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
    label: "Cơ chế Socratic - không làm thay",
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

export const HACKATHON_PITCHING_SHIFTS: PitchingShiftSlot[] = [
  { pair: "Lượt 1 & 2", setupTime: "12:30 - 12:35", pitchTime: "12:35 - 12:55" },
  { pair: "Lượt 3 & 4", setupTime: "12:55 - 13:00", pitchTime: "13:00 - 13:20" },
  { pair: "Lượt 5 & 6", setupTime: "13:20 - 13:25", pitchTime: "13:25 - 13:45" },
  { pair: "Lượt 7 & 8", setupTime: "13:45 - 13:50", pitchTime: "13:50 - 14:10" },
  { pair: "Lượt 9 & 10", setupTime: "14:10 - 14:15", pitchTime: "14:15 - 14:35" },
];

export const HACKATHON_BTC_AGENDA: AgendaItem[] = [
  {
    id: "btc-01",
    time: "06:30 - 06:45",
    phase: "Tiền sự kiện",
    title: "Điểm danh & Phổ biến Ekip",
    location: "Hội trường tập trung BTC",
    detail:
      "Tập hợp 33 thành viên Ekip (36 vị trí trực theo HR Structure), chốt timeline, trách nhiệm và quy trình báo sự cố.",
    lead: "Trưởng BTC & HR",
    highlights: [
      "Điểm danh nhân sự đầu giờ, xác nhận quân số đủ ở mọi vị trí.",
      "Trưởng BTC phổ biến timeline, mục tiêu và chốt trách nhiệm từng người.",
      "Nhắc quy tắc vận hành: đúng giờ, đúng vị trí, giữ liên lạc, báo sự cố ngay.",
    ],
    roleTasks: [
      {
        role: "HR",
        label: "HR",
        task: "Điểm danh toàn bộ nhân sự đầu giờ và rà soát quân số dự phòng.",
      },
      {
        role: "CORE",
        label: "Core Team",
        task: "Phổ biến timeline tổng, giải đáp thắc mắc và phát lệnh vào vị trí.",
      },
    ],
  },
  {
    id: "btc-02",
    time: "06:45 - 07:20",
    phase: "Tiền sự kiện",
    title: "Set-up & Kiểm tra Toàn diện",
    location: "8 Phòng thi, Hội trường & Khu vực ngoài",
    detail:
      "Kiểm tra tổng thể 10 phòng (điện, điều hòa, ánh sáng, máy chiếu, Wi-Fi), tài khoản Gemini, bàn check-in, Teabreak và đón BGK.",
    lead: "Core & 5 Phân ban",
    highlights: [
      "Mở cửa và test cơ sở vật chất, bàn ghế, máy chiếu, micro tại toàn bộ 10 phòng.",
      "Test PC, tốc độ Wi-Fi, tài khoản Gemini, đề thi/Dataset và phương án dự phòng.",
      "Bố trí bàn check-in, Teabreak, chia nước 8 phòng thi, chốt đơn ăn trưa & phòng chờ BGK.",
    ],
    roleTasks: [
      {
        role: "CORE",
        label: "Core Team",
        task: "Mở cửa, bật điều hòa, kiểm tra điện, ánh sáng, máy chiếu, micro ở 10 phòng.",
      },
      {
        role: "PR",
        label: "PR",
        task: "Check máy ảnh, pin, thẻ nhớ dự phòng; khảo sát góc chụp và phân công tác nghiệp.",
      },
      {
        role: "LOG",
        label: "LOG",
        task: "Bố trí bàn check-in, Teabreak, chia nước 8 phòng thi & xác nhận đơn ăn trưa.",
      },
      {
        role: "DOT",
        label: "DOT",
        task: "Kiểm tra Internet, đăng nhập tài khoản Gemini, đề thi, Dataset & bản dự phòng.",
      },
      {
        role: "HR",
        label: "HR",
        task: "Phân công nhân sự từng khu vực, phổ biến nhiệm vụ & giữ đội hình dự phòng.",
      },
      {
        role: "ER",
        label: "ER",
        task: "Đón tiếp 4 Giám khảo & khách mời tới phòng chờ, cấp rubric và tài liệu chấm.",
      },
    ],
  },
  {
    id: "btc-03",
    time: "07:20 - 07:55",
    phase: "Đón thí sinh",
    title: "Vào vị trí trực & Check-in Thí sinh",
    location: "Sảnh chính & Hội trường chính",
    detail:
      "07:20 - 07:25: Chốt vị trí trực toàn Ekip. 07:25 - 07:55: Đón thí sinh tại sảnh chính, phát thẻ đeo/SBD và ổn định Hội trường.",
    lead: "HR, LOG & PR",
    highlights: [
      "07:20 - 07:25 (Sẵn sàng): Hoàn tất file check-in, giấy bút, thẻ đeo; toàn Ekip đúng vị trí.",
      "07:25 - 07:55 (Check-in): Đón thí sinh, xác nhận thông tin, phát thẻ đeo/số báo danh.",
      "Điều phối thí sinh theo nhóm vào Hội trường; chuẩn bị sẵn MC, slide và kịch bản khai mạc.",
    ],
    roleTasks: [
      {
        role: "HR",
        label: "HR",
        task: "Xác nhận nhân sự vào vị trí (07:20), điều phối hàng check-in & trật tự hội trường.",
      },
      {
        role: "LOG",
        label: "LOG",
        task: "Vận hành bàn check-in, cấp phát SBD, thẻ đeo và chuẩn bị hội trường khai mạc.",
      },
      {
        role: "PR",
        label: "PR",
        task: "Chuẩn bị nội dung slide khai mạc và hỗ trợ MC khớp kịch bản mở màn.",
      },
    ],
  },
  {
    id: "btc-04",
    time: "07:55 - 08:20",
    phase: "Khai mạc",
    title: "Khai mạc & Dẫn về 8 Phòng thi",
    location: "Hội trường chính -> 8 Phòng thi đấu",
    detail:
      "Tuyên bố lý do, giới thiệu 4 Giám khảo & BTC; phổ biến chủ đề Hackathon, barem điểm, quy chế và dẫn đội về 8 phòng thi.",
    lead: "Core, PR, LOG & ER",
    highlights: [
      "07:55 - 08:05: Tuyên bố lý do, giới thiệu 4 Giám khảo, BTC & khởi động tinh thần.",
      "08:05 - 08:10: Phổ biến chi tiết đề bài/chủ đề Hackathon, barem điểm & quy chế vi phạm.",
      "08:10 - 08:20: Phát lệnh xuất phát; BTC điều phối thí sinh di chuyển về 8 phòng thi đấu.",
    ],
    roleTasks: [
      {
        role: "PR",
        label: "PR",
        task: "Điều khiển slide khai mạc/thể lệ, hỗ trợ MC và ghi hình phiên mở màn.",
      },
      {
        role: "LOG",
        label: "LOG",
        task: "Điều phối luồng thí sinh di chuyển từ Hội trường về đúng 8 phòng thi đấu.",
      },
      {
        role: "ER",
        label: "ER",
        task: "Đón tiếp, tháp tùng 4 Giám khảo & Giáo viên cố vấn trong phiên khai mạc.",
      },
    ],
  },
  {
    id: "btc-05",
    time: "08:20 - 10:55",
    phase: "Thi đấu",
    title: "Giám sát & Hỗ trợ Thi đấu",
    location: "8 Phòng thi đấu",
    detail:
      "08:20 - 08:30 công bố đề & làm quen máy tính; 08:30 - 10:55 giám sát thi đấu, trực hỗ trợ kỹ thuật, nhắc 5 phút cuối (10:50) & thu bài.",
    lead: "DOT, HR, LOG & Core",
    highlights: [
      "08:20 - 08:30: Công bố đề thi, hỗ trợ thí sinh truy cập tài liệu và làm quen máy tính.",
      "08:30 - 10:50: Giám sát phòng thi, xử lý kịp thời sự cố Wi-Fi, máy tính, tài khoản Gemini.",
      "10:50 - 10:55: Nhắc mốc 5 phút cuối đồng loạt tại 8 phòng và xác nhận nộp bài.",
    ],
    roleTasks: [
      {
        role: "CORE",
        label: "Core Team",
        task: "Giám sát timeline chung, kết nối các ban và xử lý tình huống phát sinh.",
      },
      {
        role: "DOT",
        label: "DOT",
        task: "Công bố đề, xử lý sự cố PC, Internet, tài khoản Gemini & dataset tại phòng thi.",
      },
      {
        role: "HR",
        label: "HR",
        task: "8 Giám sát phòng thi theo dõi kỷ luật, nhắc giờ (10:50) và chốt nộp bài.",
      },
      {
        role: "LOG",
        label: "LOG",
        task: "Bổ sung nước uống, văn phòng phẩm và phối hợp kỹ thuật điện/y tế cùng Nhà trường.",
      },
      {
        role: "PR",
        label: "PR",
        task: "Chụp ảnh, quay video quá trình làm việc nhóm tại 8 phòng thi đấu.",
      },
    ],
  },
  {
    id: "btc-06",
    time: "10:55 - 12:15",
    phase: "Nghỉ trưa",
    title: "Ổn định Phòng & Bữa trưa",
    location: "Phòng thi -> Khu vực phòng ăn",
    detail:
      "Ổn định phòng thi sau giờ nộp bài, hướng dẫn di chuyển tới phòng ăn, phục vụ suất ăn trưa và tập hợp lại trước 12:15.",
    lead: "LOG & HR",
    highlights: [
      "10:55 - 11:05: Ổn định lại phòng thi, bảo quản thiết bị và bài dự thi của các đội.",
      "11:05 - 11:25: Điều phối thí sinh di chuyển theo nhóm tới phòng ăn.",
      "11:25 - 12:15: Phục vụ ăn trưa, nghỉ ngơi & nhắc lịch di chuyển chuẩn bị Pitching.",
    ],
    roleTasks: [
      {
        role: "LOG",
        label: "LOG",
        task: "Sắp xếp khu vực ăn uống, phân phát suất ăn trưa và thu dọn gọn gàng.",
      },
      {
        role: "HR",
        label: "HR",
        task: "Hướng dẫn thí sinh di chuyển phòng ăn, nghỉ ngơi và gọi tập trung lúc 12:15.",
      },
    ],
  },
  {
    id: "btc-07",
    time: "12:15 - 14:55",
    phase: "Pitching",
    title: "Vòng Pitching (10 Lượt) & Chấm điểm",
    location: "Phòng Pitching & Phòng BGK",
    detail:
      "12:15 - 12:30 chuẩn bị phòng; 12:30 - 14:35 điều phối 10 lượt Pitching (5p set-up + 20p trình bày); 14:35 - 14:55 BGK chấm điểm.",
    lead: "HR, DOT, ER & LOG",
    highlights: [
      "12:15 - 12:30: Đưa các đội vào phòng chờ/phòng pitching theo đúng thứ tự lượt.",
      "12:30 - 14:35: Vận hành Lượt 1-2, 3-4, 5-6, 7-8, 9-10 (set-up slide/Wi-Fi 5p + pitch 20p).",
      "14:35 - 14:55: BGK tổng hợp file chấm điểm kín; LOG chuẩn bị hội trường cho Lễ Bế mạc.",
    ],
    roleTasks: [
      {
        role: "HR",
        label: "HR",
        task: "Gọi lượt, hướng dẫn đúng phòng & đúng thứ tự 10 lượt pitching không trễ nhịp.",
      },
      {
        role: "DOT",
        label: "DOT",
        task: "Kết nối máy tính, kiểm tra Wi-Fi, slide, demo và hỗ trợ Excel tổng hợp điểm BGK.",
      },
      {
        role: "PR",
        label: "PR",
        task: "Ghi hình bài thuyết trình và sản phẩm demo của tất cả 10 lượt.",
      },
      {
        role: "ER",
        label: "ER",
        task: "Phục vụ rubric và hỗ trợ 4 Giám khảo trong phiên đánh giá & thống nhất điểm.",
      },
      {
        role: "LOG",
        label: "LOG",
        task: "Sắp xếp Hội trường chính, ghế ngồi và bàn giải thưởng chuẩn bị Bế mạc (14:35).",
      },
    ],
  },
  {
    id: "btc-08",
    time: "15:00 - 15:35",
    phase: "Bế mạc",
    title: "Lễ Bế mạc & Trao giải",
    location: "Hội trường chính",
    detail:
      "Tập trung Hội trường, đại diện BGK nhận xét sản phẩm, trao Giải Khuyến khích, Ba, Nhì, Nhất, tri ân Ekip & chụp ảnh kỷ niệm.",
    lead: "Core, ER, HR & PR",
    highlights: [
      "15:00 - 15:15: Tập trung Thí sinh, BGK, Khách mời; đại diện BGK nhận xét chất lượng sản phẩm.",
      "15:15 - 15:25: MC công bố & trao Giải Khuyến khích, Giải Ba, Giải Nhì, Giải Nhất.",
      "15:25 - 15:35: Tri ân BGK, đối tác, 33 Ekip BTC; tuyên bố bế mạc & chụp ảnh toàn cuộc thi.",
    ],
    roleTasks: [
      {
        role: "HR",
        label: "HR",
        task: "Điều động đội thi, BGK và toàn thể 33 Ekip tập trung đúng sơ đồ hội trường.",
      },
      {
        role: "ER",
        label: "ER",
        task: "Đón tiếp khách mời, trao biểu trưng, chứng nhận, quà tặng & tri ân đối tác.",
      },
      {
        role: "PR",
        label: "PR",
        task: "Ghi hình khoảnh khắc vinh danh trao giải, phát biểu & ảnh kỷ niệm tập thể.",
      },
    ],
  },
  {
    id: "btc-09",
    time: "15:35 - 16:00+",
    phase: "Hậu sự kiện",
    title: "Thu dọn, Bàn giao & Tổng kết",
    location: "Toàn khu vực tổ chức",
    detail:
      "Checklist sau sự kiện: kiểm kê thiết bị, sao lưu dữ liệu, bàn giao phòng cho Nhà trường, quyết toán, họp rút kinh nghiệm & recap.",
    lead: "Toàn bộ 5 Phân ban & Core",
    highlights: [
      "Thu dọn khu vực, kiểm kê thu hồi thiết bị & xác nhận bàn giao phòng với Nhà trường.",
      "Sao lưu bài thi, sản phẩm, bảng điểm & điểm danh kết thúc, họp rút kinh nghiệm BTC.",
      "Đăng bài recap, cảm ơn và gửi chứng nhận tới BGK, nhà tài trợ, cố vấn & thí sinh.",
    ],
    roleTasks: [
      {
        role: "CORE",
        label: "Core Team",
        task: "Tổng kết mục tiêu, chủ trì họp rút kinh nghiệm & hoàn thiện báo cáo lưu trữ.",
      },
      {
        role: "LOG",
        label: "LOG",
        task: "Thu dọn vệ sinh, kiểm kê vật dụng, bàn giao phòng & tổng hợp quyết toán chi phí.",
      },
      {
        role: "DOT",
        label: "DOT",
        task: "Thu thập, rà soát và sao lưu toàn bộ bài thi, sản phẩm, file điểm & tài khoản.",
      },
      {
        role: "HR",
        label: "HR",
        task: "Điểm danh kết thúc ca trực, đánh giá nhân sự & tổng hợp phản hồi nội bộ.",
      },
      {
        role: "PR",
        label: "PR",
        task: "Thiết kế đăng bài recap, album ảnh/video & thống kê hiệu quả truyền thông.",
      },
      {
        role: "ER",
        label: "ER",
        task: "Gửi thư tri ân & chứng nhận tham gia cho BGK, nhà tài trợ, cố vấn và thí sinh.",
      },
    ],
  },
];

export const HACKATHON_PARTICIPANT_AGENDA: AgendaItem[] = [
  {
    id: "pt-01",
    time: "07:25 - 07:55",
    phase: "Đón thí sinh",
    title: "Check-in & Nhận Số báo danh",
    location: "Sảnh chính -> Hội trường",
    detail:
      "Thí sinh có mặt tại sảnh chính để check-in, xác nhận thông tin, nhận thẻ đeo/SBD và di chuyển vào Hội trường ổn định chỗ ngồi.",
    lead: "Tất cả Thí sinh",
    highlights: [
      "Đến bàn Check-in xác nhận thông tin đăng ký và nhận thẻ đeo/SBD.",
      "Tập trung theo nhóm đội thi và theo sự điều phối vào Hội trường chính.",
      "Ổn định chỗ ngồi trước 07:55 để sẵn sàng dự Lễ Khai mạc.",
    ],
  },
  {
    id: "pt-02",
    time: "07:55 - 08:20",
    phase: "Khai mạc",
    title: "Khai mạc & Phổ biến Thể lệ",
    location: "Hội trường -> 8 Phòng thi",
    detail:
      "Gặp gỡ 4 Giám khảo & BTC, nghe phổ biến chủ đề Hackathon, barem chấm điểm, quy chế thi và nhận lệnh về phòng thi đấu.",
    lead: "BTC & 4 Giám khảo",
    highlights: [
      "07:55 - 08:05: Dự Lễ Khai mạc, gặp gỡ Hội đồng 4 Giám khảo & BTC.",
      "08:05 - 08:10: Nắm rõ đề bài/chủ đề Hackathon, barem chấm điểm & quy chế vi phạm.",
      "08:10 - 08:20: Theo hiệu lệnh xuất phát di chuyển nhanh về đúng phòng trong 8 phòng thi.",
    ],
  },
  {
    id: "pt-03",
    time: "08:20 - 10:55",
    phase: "Thi đấu",
    title: "Thi đấu Chính thức & Nộp bài",
    location: "8 Phòng thi đấu",
    detail:
      "Nhận đề chi tiết, làm quen máy tính (10 phút đầu) và chế tác sản phẩm trợ lý học tập cùng đồng đội trước khi nộp bài lúc 10:55.",
    lead: "Các Đội thi",
    highlights: [
      "08:20 - 08:30: Nhận đề thi chi tiết, kiểm tra máy tính, Wi-Fi & tài khoản công cụ.",
      "08:30 - 10:50: Phối hợp nhóm xây dựng giải pháp và bản demo sản phẩm thực tế.",
      "10:50 - 10:55: Lưu ý thông báo còn 5 phút cuối và hoàn tất nộp bài đúng giờ.",
    ],
  },
  {
    id: "pt-04",
    time: "10:55 - 12:15",
    phase: "Nghỉ trưa",
    title: "Nghỉ trưa & Nạp năng lượng",
    location: "Phòng thi -> Phòng ăn",
    detail:
      "Thu xếp ổn định phòng thi sau khi nộp bài, di chuyển dùng bữa trưa theo hướng dẫn BTC và nghỉ ngơi chuẩn bị Pitching chiều.",
    lead: "Tất cả Thí sinh",
    highlights: [
      "10:55 - 11:05: Ổn định lại phòng thi, bảo quản tư trang cá nhân trước giờ nghỉ.",
      "11:05 - 11:25: Di chuyển cùng đội tới khu vực phòng ăn.",
      "11:25 - 12:15: Ăn trưa, nghỉ ngơi tự do và chuẩn bị tinh thần cho phiên Pitching.",
    ],
  },
  {
    id: "pt-05",
    time: "12:15 - 12:30",
    phase: "Chuẩn bị",
    title: "Tập trung Khu vực Pitching",
    location: "Phòng chờ & Phòng Pitching",
    detail:
      "Di chuyển về khu vực phòng pitching trước giờ G, kiểm tra thứ tự lượt thi và sẵn sàng slide/sản phẩm demo.",
    lead: "Các Đội thi",
    highlights: [
      "Có mặt tại khu vực phòng pitching trước 12:30 theo điều phối của HR.",
      "Kiểm tra sẵn file thuyết trình, link demo và phân công vai trò thành viên.",
    ],
  },
  {
    id: "pt-06",
    time: "12:30 - 14:35",
    phase: "Pitching",
    title: "Thuyết trình & Phản biện (10 Lượt)",
    location: "Phòng Pitching (Lượt 1 - 10)",
    detail:
      "Trình bày sản phẩm và trả lời Q&A với Ban Giám khảo theo lịch chia cặp Lượt 1-10 (mỗi lượt gồm 5p set-up + 20p pitching).",
    lead: "Các Đội & BGK",
    highlights: [
      "Mỗi lượt có 5 phút vào phòng kết nối máy, trình chiếu slide, test Wi-Fi & sản phẩm.",
      "20 phút trình bày giải pháp, demo trực tiếp và phản biện cùng BGK.",
      "Tra cứu khung giờ cụ thể của từng cặp Lượt 1 - 10 ngay ở thanh lịch trình phía trên.",
    ],
  },
  {
    id: "pt-07",
    time: "14:35 - 15:00",
    phase: "Chấm điểm",
    title: "BGK Chấm điểm & Tập trung",
    location: "Hội trường chính",
    detail:
      "Ban Giám khảo hoàn tất chấm điểm và thống nhất kết quả (14:35 - 14:55); thí sinh trở lại Hội trường chuẩn bị Bế mạc.",
    lead: "BGK & Thí sinh",
    highlights: [
      "14:35 - 14:55: Hội đồng Giám khảo tổng hợp, đối chiếu rubric và chấm điểm chung kết.",
      "14:55 - 15:00: Thí sinh tập trung đầy đủ tại Hội trường chính theo hướng dẫn MC.",
    ],
  },
  {
    id: "pt-08",
    time: "15:00 - 15:35",
    phase: "Bế mạc",
    title: "Lễ Bế mạc & Trao giải",
    location: "Sân khấu Hội trường chính",
    detail:
      "Nghe BGK đánh giá sản phẩm, nhận giải thưởng và chứng nhận (Khuyến khích, Ba, Nhì, Nhất) và chụp ảnh kỷ niệm.",
    lead: "BGK, BTC & Thí sinh",
    highlights: [
      "15:05 - 15:15: Đại diện Ban Giám khảo phát biểu nhận xét tổng quan về các đội thi.",
      "15:15 - 15:25: Vinh danh & trao Giải Khuyến khích, Ba, Nhì, Nhất kèm chứng nhận.",
      "15:25 - 15:35: Tuyên bố bế mạc và toàn bộ thí sinh lên sân khấu chụp ảnh lưu niệm.",
    ],
  },
];

export const HACKATHON_AGENDA: AgendaItem[] = HACKATHON_BTC_AGENDA;

export const EXECUTIVE_DIVISION: DivisionItem = {
  code: "PM",
  name: "Ban Chủ Nhiệm",
  englishTag: "Executive Board",
  role: "Quản trị dự án tổng thể & điều phối chiến lược 5 phân ban chuyên trách",
  highlights: [
    "Chủ nhiệm & Phó Chủ nhiệm CLB",
    "Điều phối tiến độ GP-Pitching & Hackathon",
  ],
  accent: "violet",
};

export const CLUB_DIVISIONS: DivisionItem[] = [
  {
    code: "PR",
    name: "Ban Truyền Thông",
    englishTag: "Public Relations & Design",
    role: "Chiến dịch truyền thông, ấn phẩm nhận diện & lan tỏa học thuật",
    highlights: [
      "Truyền thông Assembly & mạng xã hội",
      "Bộ nhận diện, Poster & AI Learning Toolkit",
    ],
    accent: "fuchsia",
  },
  {
    code: "HR",
    name: "Ban Nhân Sự",
    englishTag: "Human Resources",
    role: "Tuyển chọn, gắn kết & phát triển đội ngũ thành viên Gen 1.0",
    highlights: [
      "Vận hành mô hình Career Lab",
      "Đánh giá CSAT & gắn kết nội bộ",
    ],
    accent: "rose",
  },
  {
    code: "LOG",
    name: "Ban Hậu Cần & Tài Chính",
    englishTag: "Logistics & Finance",
    role: "Cơ sở vật chất 8 phòng thi đấu & quản trị ngân sách",
    highlights: [
      "Điều phối hậu cần, thiết bị & phòng thi",
      "Minh bạch Purchasing Request",
    ],
    accent: "amber",
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
    code: "ER",
    name: "Ban Đối Ngoại",
    englishTag: "External Relations",
    role: "Kết nối chuyên gia, diễn giả & Ban Giám khảo",
    highlights: [
      "Làm việc với diễn giả RMIT/EdTech",
      "Huy động nguồn lực đồng hành",
    ],
    accent: "emerald",
  },
];

export const ALL_DIVISION_META: DivisionItem[] = [
  EXECUTIVE_DIVISION,
  ...CLUB_DIVISIONS,
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
    id: "log-01-vu-nguyen-thanh-chuong",
    name: "VU NGUYEN THANH CHUONG",
    role: "HEAD OF LOG",
    roleVi: "Trưởng Ban Hậu Cần & Tài Chính",
    divisionCode: "LOG",
    tier: "head",
    imageSrc: "/images/team/log-01-vu-nguyen-thanh-chuong-30a.jpg",
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
    imageSrc: "/images/team/hr-01-tran-thi-khanh-ngoc-29a.jpg",
  },
  {
    id: "hr-02-chau-bao-thanh",
    name: "CHAU BAO THANH",
    role: "VICE HEAD OF HR",
    roleVi: "Phó Ban Nhân Sự",
    divisionCode: "HR",
    tier: "head",
    imageSrc: "/images/team/hr-02-chau-bao-thanh.jpg",
  },
  {
    id: "hr-03-nguyen-quynh-nhu",
    name: "NGUYEN QUYNH NHU",
    role: "MEMBER OF HR",
    roleVi: "Thành viên Ban Nhân Sự",
    divisionCode: "HR",
    tier: "member",
    imageSrc: "/images/team/hr-03-nguyen-quynh-nhu.jpg",
  },
  {
    id: "hr-04-bach-dang-anh",
    name: "BACH DANG ANH",
    role: "MEMBER OF HR",
    roleVi: "Thành viên Ban Nhân Sự",
    divisionCode: "HR",
    tier: "member",
    imageSrc: "/images/team/hr-04-bach-dang-anh.jpg",
  },
];

export const SAMPLE_PROTOTYPES: PrototypeItem[] = [
  {
    id: "model-1",
    number: "01",
    title: "Trợ lý Học tập & Phân tích Tài liệu môn Ngữ văn trên NotebookLM",
    shortTitle: "NotebookLM Ngữ văn",
    subject: "Ngữ văn",
    platform: "Google NotebookLM",
    platformBadge: "Walled-Garden Sources",
    description:
      "Sử dụng NotebookLM để tổng hợp tài liệu, trích dẫn nguồn chính xác, hỗ trợ tóm tắt kiến thức và tạo câu hỏi phản biện tự động mà không làm suy giảm khả năng tự tư duy.",
    url: "https://notebook.google.com/notebook/98fb439e-528f-4ec4-ac05-d01731f71c9d",
    outcomeLabel: "Kết quả đạt được",
    outcome:
      "Tăng khả năng tự học cá nhân hóa, giúp học sinh chủ động kiểm chứng thông tin thay vì tiếp nhận thụ động.",
    accent: "violet",
    embedMode: "google-protected",
    highlights: [
      "Tổng hợp tài liệu theo kho nguồn khép kín",
      "Trích dẫn nguồn chính xác từng đoạn văn bản",
      "Tạo câu hỏi phản biện Socratic tự động",
    ],
    workflowSteps: [
      {
        id: "sources",
        tabLabel: "1. Khóa nguồn học liệu",
        promptExample:
          "Tổng hợp hệ thống luận điểm chính từ bộ ngữ liệu Ngữ văn đã nạp và gắn số trích dẫn cho từng ý.",
        assistantBehavior:
          "Hệ thống chỉ truy xuất từ nguồn tài liệu do học sinh tải lên (Walled-Garden), trả lời kèm số trích dẫn để đối chiếu trực tiếp đoạn gốc.",
        pedagogyFocus: "Chủ động kiểm chứng nguồn (Groundedness)",
      },
      {
        id: "summary",
        tabLabel: "2. Tóm tắt có cấu trúc",
        promptExample:
          "Hệ thống hóa bố cục, nghệ thuật tu từ và mạch cảm xúc cốt lõi của văn bản thành dàn ý ghi nhớ.",
        assistantBehavior:
          "Chuyển hóa tài liệu dài thành bản đồ kiến thức súc tích theo từng tầng phân tích, tránh viết hộ bài văn hoàn chỉnh.",
        pedagogyFocus: "Nâng cao khả năng tổng hợp kiến thức",
      },
      {
        id: "socratic",
        tabLabel: "3. Câu hỏi phản biện",
        promptExample:
          "Đặt 3 câu hỏi mở yêu cầu học sinh tự bảo vệ quan điểm cá nhân trước khi chốt nhận định văn học.",
        assistantBehavior:
          "Tự động sinh bộ câu hỏi gợi mở và phản biện đa chiều, giúp học sinh tự rèn lập luận thay vì phụ thuộc đáp án mẫu.",
        pedagogyFocus: "Bảo vệ tư duy độc lập - Safe AI",
      },
    ],
  },
  {
    id: "model-2",
    number: "02",
    title: "Trợ lý Ôn luyện SAT & Tiếng Anh trên Gemini Canvas",
    shortTitle: "Gemini Canvas SAT",
    subject: "SAT",
    platform: "Google Gemini Canvas",
    platformBadge: "Prompt Engineering Canvas",
    description:
      "Thiết kế các quy trình prompt (Prompt Engineering) hỗ trợ phân tích cấu trúc bài tập SAT, giải thích ngữ cảnh từ vựng và chấm chữa bài viết theo tiêu chí rõ ràng.",
    url: "https://gemini.google.com/share/d/1rpz01le249eJlWnDOM_Upcjlnpvarn_U?usp=sharing",
    outcomeLabel: "Kết quả đạt được",
    outcome:
      "Giúp học sinh làm chủ kỹ năng ra lệnh cho AI và tự định hình tiến trình học tập.",
    accent: "blue",
    embedMode: "google-protected",
    highlights: [
      "Quy trình Prompt Engineering cấu trúc rõ ràng",
      "Phân tích cấu trúc bài tập & bẫy câu hỏi SAT",
      "Chấm chữa bài viết & giải thích ngữ cảnh từ vựng",
    ],
    workflowSteps: [
      {
        id: "structure",
        tabLabel: "1. Phân tích cấu trúc SAT",
        promptExample:
          "Xác định dạng câu hỏi SAT Reading & Writing, bóc tách thành phần ngữ pháp và cấu trúc logic của câu.",
        assistantBehavior:
          "Canvas chia khung soạn thảo thành vùng đề bài và vùng phân tích từng mệnh đề, chỉ rõ vai trò liên kết trước khi gợi ý hướng chọn.",
        pedagogyFocus: "Làm chủ kỹ thuật thiết kế câu lệnh",
      },
      {
        id: "vocab",
        tabLabel: "2. Ngữ cảnh từ vựng",
        promptExample:
          "Giải thích sắc thái nghĩa của từ học thuật ngay trong ngữ cảnh đoạn văn và phân biệt các phương án gây nhiễu.",
        assistantBehavior:
          "Đối chiếu sắc thái từ vựng theo văn cảnh thực tế thay vì dịch máy từng từ đơn lẻ, giúp nhớ sâu và vận dụng chính xác.",
        pedagogyFocus: "Hiểu bản chất ngôn ngữ học thuật",
      },
      {
        id: "rubric",
        tabLabel: "3. Chấm chữa theo tiêu chí",
        promptExample:
          "Đánh giá đoạn viết tiếng Anh theo rubric 4 tiêu chí (lập luận, liên kết, từ vựng, ngữ pháp) và gợi ý chỉnh sửa.",
        assistantBehavior:
          "Hiển thị nhận xét cụ thể bên cạnh bản nháp trong Gemini Canvas để học sinh tự biên tập và nâng cấp bài viết của chính mình.",
        pedagogyFocus: "Tự định hình tiến trình ôn luyện",
      },
    ],
  },
  {
    id: "model-3",
    number: "03",
    title: "Hệ thống Luyện tập & Ngân hàng Bài tập SAT Tương tác (SAT Practice Platform)",
    shortTitle: "SAT Practice Web App",
    subject: "Ôn luyện SAT / Tiếng Anh",
    platform: "Web Application",
    platformBadge: "Live Interactive Embed",
    description:
      "Mô hình hỗ trợ học sinh tự ôn luyện SAT cá nhân hóa, cho phép người học lựa chọn môn học, chủ đề trọng tâm (focus skills), thiết lập độ khó (difficulty) và số lượng câu hỏi luyện tập theo mục tiêu riêng.",
    url: "https://sat-pratice.vercel.app/practice.html",
    outcomeLabel: "Giá trị thực tiễn",
    outcome:
      "Giúp học sinh chủ động kiểm soát lộ trình ôn thi, tự đo lường mức độ tiến bộ mà không rơi vào trạng thái thụ động hay phụ thuộc vào đáp án có sẵn.",
    accent: "emerald",
    embedMode: "iframe",
    highlights: [
      "Tùy chỉnh môn học & chủ đề trọng tâm (Focus Skills)",
      "Thiết lập mức độ khó (Difficulty) & số lượng câu hỏi",
      "Chạy tương tác trực tiếp ngay trong trình duyệt web",
    ],
  },
  {
    id: "model-4",
    number: "04",
    title: "Trợ lý Sáng tạo & Hướng dẫn Giải đề SAT Thông minh trên Gemini (Gemini AI Learning Partner)",
    shortTitle: "Gemini Learning Partner",
    subject: "SAT / Ngôn ngữ",
    platform: "Google Gemini AI",
    platformBadge: "Socratic Learning Partner",
    description:
      "Mô hình trợ lý tích hợp trên nền tảng Google Gemini, áp dụng kỹ thuật Prompting (Prompt Engineering) để hỗ trợ học sinh phân tích ngữ cảnh bài đọc SAT, giải thích logic đáp án và định hướng tư duy phân tích ngôn ngữ.",
    url: "https://gemini.google.com/u/5/share/d/1I-kTWNS0iCyn1NAMjgg2aHLUBpU72jfa",
    outcomeLabel: "Giá trị thực tiễn",
    outcome:
      "Minh chứng khả năng làm chủ công cụ AI thế hệ mới, biến AI từ công cụ cho đáp án thụ động thành một “đối tác tư duy” (learning partner) giúp học sinh phản biện và đào sâu kiến thức.",
    accent: "fuchsia",
    embedMode: "google-protected",
    highlights: [
      "Phân tích ngữ cảnh bài đọc SAT chuyên sâu",
      "Giải thích logic loại trừ & lập luận đáp án",
      "Đóng vai đối tác tư duy (Learning Partner) Socratic",
    ],
    workflowSteps: [
      {
        id: "context",
        tabLabel: "1. Đọc ngữ cảnh & Luận điểm",
        promptExample:
          "Đóng vai Learning Partner, hướng dẫn mình xác định câu chủ đề và ý đồ tác giả trước khi nhìn vào 4 lựa chọn.",
        assistantBehavior:
          "Gemini dẫn dắt học sinh tự tóm tắt câu hỏi trọng tâm của đoạn đọc và khoanh vùng từ khóa chứng cứ trong văn bản.",
        pedagogyFocus: "Chống lệ thuộc đáp án thụ động",
      },
      {
        id: "logic",
        tabLabel: "2. Phân tích logic đáp án",
        promptExample:
          "Đưa gợi ý lập luận giúp mình tự chỉ ra điểm sai logic của các phương án gây nhiễu thay vì nói ngay đáp án đúng.",
        assistantBehavior:
          "Giải thích cơ chế bẫy thường gặp (suy diễn quá đà, sai phạm vi, đảo ngược nhân quả) để học sinh tự loại trừ phương án nhiễu.",
        pedagogyFocus: "Tư duy phản biện & loại trừ chính xác",
      },
      {
        id: "reflect",
        tabLabel: "3. Đào sâu ngôn ngữ",
        promptExample:
          "Gợi mở 1 câu hỏi kiểm tra lại cách hiểu của mình để đảm bảo mình giải thích được vì sao chọn phương án này.",
        assistantBehavior:
          "Khép lại phiên ôn bằng bước tự kiểm nghiệm (metacognition), củng cố khả năng tự giải thích trước dạng bài tương tự.",
        pedagogyFocus: "Biến AI thành đối tác tư duy",
      },
    ],
  },
];

export interface AdvisorProfileData {
  id: string;
  vietnameseName: string;
  vietnameseTitle: string;
  roleBadge: string;
  googleBadgeTitle: string;
  name: string;
  location: string;
  profileUrl: string;
  publicApiUrl: string;
  bannerImage: string;
  portraitImage: string;
  badgeImage: string;
  overviewParagraphs: string[];
  frameworkLink: {
    label: string;
    url: string;
  };
  featuredResource: {
    title: string;
    url: string;
    description: string;
  };
  quickLinks: {
    label: string;
    href: string;
  }[];
  highlights: string[];
}

export const ADVISOR_PROFILE: AdvisorProfileData = {
  id: "5087615831769088",
  vietnameseName: "Thầy Mike Phạm",
  vietnameseTitle: "Chuyên gia toàn cầu của Google cho giáo dục",
  roleBadge: "Chuyên gia Cố vấn CLB • Google for Education 🌐",
  googleBadgeTitle: "Google for Education Certified Innovator (#MEL26)",
  name: "Mike Pham Bá Hong Son",
  location: "Ho Chi Minh, Vietnam",
  profileUrl: "https://edudirectory.withgoogle.com/profiles/5087615831769088",
  publicApiUrl:
    "https://directory-service-dot-gweb-edu-activity-app.appspot.com/directory/users/5087615831769088",
  bannerImage: "/images/advisor/edu-banner.jpg",
  portraitImage: "/images/advisor/edu-portrait.jpg",
  badgeImage: "/images/advisor/google-innovator-badge.png",
  overviewParagraphs: [
    "Hello 🌐 Xin chào 🇻🇳 Moi 🇫🇮",
    "I'm Mike (Pham Bá Hong Son), a Google for Education Certified Innovator (#MEL26) and a Finnish-Vietnamese researcher, M.Ed, based in Ho Chi Minh City, Vietnam.",
    "Inspired by learning & cognitive science, I believe real learning happens when students make mistakes, try again, and timely adjust. Therefore, integrating AI is an essential way to deliver timely, adaptive feedback that guides learners through productive struggle rather than thinking for them, backed by my Scopus Q1 research at IEEE iSTEM-Ed 2026.",
    "My mission is to empower students to shift from passive AI consumers to ethical creators of their learning tools. To support this, I open-sourced the Student-Led AI Safety Competency Framework on GitHub under MIT License. Aligned with UNESCO and Vietnam MoET guidelines, this blueprint provides schools with plug-and-play guides and protocols, enabling students to lead workshops and safely build their own AI tutors.",
    "Beyond open resources, I partner with schools to design responsible AI curricula, train educators on Google Workspace for Education, and mentor institutions toward Google Reference School status.",
    "I am always excited to connect and collaborate on innovative education projects!",
  ],
  frameworkLink: {
    label: "Student-Led AI Safety Competency Framework",
    url: "https://github.com/mikepham358/student-led-ai-safety-framework",
  },
  featuredResource: {
    title: "Student-Led AI Safety Competency Framework",
    url: "https://github.com/mikepham358/bao-an-ai",
    description:
      "Student-Led AI Safety Framework (MIT License): an open-source, evidence-based blueprint on GitHub that empowers K-12 students to champion responsible AI culture. Aligned with UNESCO competencies and Vietnam MoET guidelines, it provides schools with ready-to-use handbooks, student pitching templates, and Socratic prompting protocols to help young learners build safe, reflective learning assistants.",
  },
  quickLinks: [
    { label: "baoan.ai.vn", href: "https://baoan.ai.vn/" },
    { label: "vinschool.edu.vn", href: "https://vinschool.edu.vn/" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/mikepham358" },
    { label: "Zalo Connect", href: "https://zalo.me/0903589120" },
  ],
  highlights: [
    "Google Certified Innovator (#MEL26)",
    "Nghiên cứu Scopus • IEEE iSTEM-Ed 2026",
    "Sáng lập Mô hình Bảo An AI (MIT License)",
  ],
};
