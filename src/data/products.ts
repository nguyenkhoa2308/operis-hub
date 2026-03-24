/**
 * Danh sách sản phẩm Operis.
 * Thêm sản phẩm mới: chỉ cần thêm 1 object vào array.
 *
 * icon: tên icon từ lucide-react (xem https://lucide.dev/icons)
 * gradient: tailwind gradient classes cho icon badge
 * comingSoon: true = đang phát triển, click hiện toast
 */
export interface SubItem {
  label: string;
  icon: string;
}

export interface Product {
  key: string;
  label: string;
  icon: string;
  desc: string;
  url: string;
  gradient: string;
  preview?: string;
  comingSoon?: boolean;
  children?: SubItem[];
}

export const products: Product[] = [
  {
    key: "news",
    label: "News",
    icon: "Newspaper",
    desc: "Nền tảng tin tức và truyền thông nội bộ, cập nhật thông tin nhanh chóng.",
    url: "https://news.operis.vn",
    gradient: "from-emerald-400 to-teal-500",
    preview: "/previews/news.png",
    children: [
      { label: "Articles", icon: "FileText" },
      { label: "Trending", icon: "TrendingUp" },
      { label: "Digest", icon: "BookOpen" },
    ],
  },
  {
    key: "models",
    label: "Models",
    icon: "Box",
    desc: "Mô hình dữ liệu và AI, xử lý thông minh phục vụ vận hành tự động.",
    url: "https://models.operis.vn",
    gradient: "from-teal-400 to-emerald-500",
    preview: "/previews/models.png",
    children: [
      { label: "ChatGPT", icon: "MessageSquare" },
      { label: "Claude", icon: "Sparkles" },
      { label: "Gemini", icon: "Gem" },
      { label: "DeepSeek", icon: "Search" },
    ],
  },
  {
    key: "talents",
    label: "Talents",
    icon: "Users",
    desc: "Nền tảng quản lý nhân sự và tuyển dụng, kết nối đúng người đúng việc.",
    url: "https://talents.operis.vn",
    gradient: "from-emerald-500 to-green-600",
    preview: "/previews/talents.png",
    children: [
      { label: "Profiles", icon: "UserCircle" },
      { label: "Recruit", icon: "UserPlus" },
      { label: "Review", icon: "Star" },
    ],
  },
  {
    key: "academy",
    label: "Academy",
    icon: "BookOpen",
    desc: "Nền tảng học tập và đào tạo trực tuyến, nâng cao kỹ năng đội ngũ.",
    url: "https://academy.operis.vn",
    gradient: "from-green-500 to-emerald-600",
    preview: "/previews/academy.png",
    comingSoon: true,
    children: [
      { label: "Courses", icon: "GraduationCap" },
      { label: "Quiz", icon: "ClipboardCheck" },
      { label: "Certs", icon: "Award" },
    ],
  },
  {
    key: "bots",
    label: "Bots",
    icon: "Bot",
    desc: "Bot tự động thông minh, vận hành liên tục 24/7 không ngừng nghỉ.",
    url: "https://bots.operis.vn",
    gradient: "from-teal-500 to-emerald-500",
    preview: "/previews/bots.png",
    comingSoon: true,
    children: [
      { label: "Chat Bot", icon: "MessageCircle" },
      { label: "Auto Bot", icon: "Cog" },
      { label: "Monitor", icon: "Activity" },
    ],
  },
];
