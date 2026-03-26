/* ── Shared constants for V2 page ── */

export interface PlanetCfg {
  icon: string;
  color: string;
  glow: string;
  px: number;
  radius: number;
  angle: number;
  dur: number;
  rev?: boolean;
}

/* ── Planet config — each planet on its own orbit ring/angle ──
 *  radius: orbit ring (matches the 3 visible rings: 210, 320, 440)
 *  angle:  starting position in degrees (0=top, 90=right, 180=bottom, 270=left)
 *  dur:    full revolution seconds
 *  rev:    true = clockwise, false = counter-clockwise
 */
export const planetConfig: Record<string, PlanetCfg> = {
  news: {
    icon: "newspaper",
    color: "#00e3fd",
    glow: "rgba(0,227,253,0.4)",
    px: 60,
    radius: 210,
    angle: 225,
    dur: 40,
  },
  talents: {
    icon: "groups",
    color: "#00d4ec",
    glow: "rgba(0,104,117,0.4)",
    px: 56,
    radius: 210,
    angle: 45,
    dur: 40,
  },
  academy: {
    icon: "school",
    color: "#ac89ff",
    glow: "rgba(172,137,255,0.4)",
    px: 60,
    radius: 320,
    angle: 200,
    dur: 55,
    rev: true,
  },
  bots: {
    icon: "smart_toy",
    color: "#00ec90",
    glow: "rgba(0,236,144,0.4)",
    px: 64,
    radius: 320,
    angle: 340,
    dur: 55,
    rev: true,
  },
  models: {
    icon: "layers",
    color: "#a1ffc2",
    glow: "rgba(161,255,194,0.4)",
    px: 96,
    radius: 440,
    angle: 70,
    dur: 70,
  },
};

export const planetBg: Record<string, string> = {
  news: "bg-[#00e3fd]",
  models: "bg-[#a1ffc2]",
  academy: "bg-[#ac89ff]",
  talents: "bg-[#006875]",
  bots: "bg-[#00ec90]",
};

/* ── Image URLs from reference ── */
export const IMG = {
  hero: "https://images.unsplash.com/photo-1464802686167-b939a6910659?q=80&w=2070&auto=format&fit=crop",
  neural:
    "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?q=80&w=2070&auto=format&fit=crop",
  abstract:
    "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2064&auto=format&fit=crop",
  purple:
    "https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?q=80&w=2074&auto=format&fit=crop",
  earth:
    "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop",
};

/* ── Nav sections config ── */
export const navSections = [
  { id: "hero", label: "Trang chủ" },
  { id: "products", label: "Hệ sinh thái" },
  { id: "about", label: "Giới thiệu" },
] as const;

/* ── TOC sections config ── */
export const tocSections = [
  { id: "section-1", label: "01 Giới thiệu", icon: "info" },
  { id: "section-tech", label: "02 Công nghệ", icon: "code" },
  { id: "section-team", label: "03 Đội ngũ", icon: "group" },
  { id: "section-faq", label: "04 FAQ", icon: "help" },
  { id: "section-contact", label: "05 Liên hệ", icon: "mail" },
] as const;

/* ── Sub-icon mapping (lucide → material) ── */
export const subIconMap: Record<string, string> = {
  FileText: "description",
  TrendingUp: "trending_up",
  BookOpen: "menu_book",
  MessageSquare: "chat",
  Sparkles: "auto_awesome",
  Gem: "diamond",
  Search: "search",
  UserCircle: "account_circle",
  UserPlus: "person_add",
  Star: "star",
  GraduationCap: "school",
  ClipboardCheck: "assignment_turned_in",
  Award: "workspace_premium",
  MessageCircle: "forum",
  Cog: "settings",
  Activity: "monitoring",
};
