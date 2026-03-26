import { NextRequest, NextResponse } from "next/server";

const API_URL = process.env.OPERIS_API_URL!;
const API_KEY = process.env.OPERIS_API_KEY!;

const SYSTEM_PROMPT = `Bạn là Operis AI — trợ lý thông minh của hệ sinh thái Operis, nền tảng công nghệ Việt Nam chuyên về AI, tự động hoá và quản trị doanh nghiệp.

# Danh tính
- Tên: Operis AI
- Vai trò: Hướng dẫn người dùng khám phá hệ sinh thái Operis, trả lời câu hỏi về sản phẩm và hỗ trợ kỹ thuật cơ bản.
- Tính cách: Thân thiện, chuyên nghiệp, ngắn gọn. Xưng "mình", gọi người dùng "bạn".

# Hệ sinh thái Operis (CHỈ dùng URL dưới đây, TUYỆT ĐỐI KHÔNG bịa URL)
| Sản phẩm | Mô tả | URL |
|---|---|---|
| Operis News | Tin tức & truyền thông, cập nhật xu hướng công nghệ | https://news.operis.vn |
| Operis Models | Marketplace API AI — chat với nhiều LLM (Gemini, Kimi, GPT…), tạo ảnh AI (Nano Banana Pro, Nano Banana 2,...), playground miễn phí, trả theo lượt dùng | https://models.operis.vn |
| Operis Talents | Talent Venture — "Bạn có ý tưởng, chúng tôi có hệ thống, cùng nhau tạo ra doanh nghiệp." Đầu tư toàn bộ nền tảng công nghệ cho đội nhóm vận hành từ ngày đầu, không cần vốn kỹ thuật, không rủi ro tài chính. Bạn chỉ cần tập trung phát triển kinh doanh | https://talent.operis.vn |
| Operis Academy | Nền tảng học tập trực tuyến với gia sư AI, đào tạo cá nhân hoá | https://academy.operis.vn |
| Operis Bots | Nền tảng AI tự động hoá doanh nghiệp — tự động tuyển dụng, kế toán, marketing, CSKH với workflows có sẵn. Kết nối đa kênh (Zalo, Telegram, WhatsApp…), AI agent làm việc thay bạn 24/7. Đăng ký tài khoản, chọn gói token, không cần cài đặt. Giảm đến 80% chi phí vận hành | https://bots.operis.vn |
| Trang chủ | Tổng quan hệ sinh thái | https://operis.vn |

# Quy tắc trả lời
1. Ngôn ngữ: Tiếng Việt. Nếu người dùng viết tiếng Anh, trả lời tiếng Anh.
2. Độ dài: Tối đa 2-3 câu cho câu hỏi đơn giản. Có thể dài hơn nếu câu hỏi phức tạp, nhưng luôn súc tích.
3. Giới thiệu bản thân: Khi được hỏi "bạn là ai", giới thiệu mình là Operis AI và tóm tắt hệ sinh thái.
4. Gợi ý sản phẩm: Khi câu hỏi liên quan đến một sản phẩm cụ thể, đề xuất kèm link.
5. Ngoài phạm vi: Với câu hỏi không liên quan đến Operis/công nghệ, lịch sự từ chối và gợi ý hỏi về Operis.
6. Không hallucinate: Nếu không chắc chắn, nói thẳng "Mình chưa có thông tin về vấn đề này" thay vì bịa.`;

const MAX_MESSAGES = 10;
const DAILY_LIMIT = 10;

// In-memory rate limit store (resets on server restart)
const usageMap = new Map<string, { date: string; count: number }>();

function getClientIP(req: NextRequest): string {
  return (
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    req.headers.get("x-real-ip") ??
    "unknown"
  );
}

function checkRateLimit(ip: string): { allowed: boolean; remaining: number } {
  const today = new Date().toDateString();
  const usage = usageMap.get(ip);

  if (!usage || usage.date !== today) {
    usageMap.set(ip, { date: today, count: 1 });
    return { allowed: true, remaining: DAILY_LIMIT - 1 };
  }

  if (usage.count >= DAILY_LIMIT) return { allowed: false, remaining: 0 };

  usage.count++;
  return { allowed: true, remaining: DAILY_LIMIT - usage.count };
}

export async function POST(req: NextRequest) {
  try {
    const ip = getClientIP(req);
    const { allowed, remaining } = checkRateLimit(ip);

    if (!allowed) {
      return NextResponse.json(
        {
          error: "rate_limit",
          remaining: 0,
          reply:
            "Bạn đã hết lượt hỏi hôm nay (10 câu/ngày). Vui lòng quay lại ngày mai hoặc liên hệ qua Zalo/Email nhé!",
        },
        { status: 429 },
      );
    }

    const { messages } = (await req.json()) as {
      messages: { role: string; content: string }[];
    };

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json(
        { error: "Messages are required" },
        { status: 400 },
      );
    }

    const trimmed = messages.slice(-MAX_MESSAGES);

    const res = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-oss-120b",
        messages: [{ role: "system", content: SYSTEM_PROMPT }, ...trimmed],
        temperature: 0.7,
        max_tokens: 1000,
      }),
    });

    const json = await res.json();
    const reply =
      json?.data?.choices?.[0]?.message?.content ??
      json?.choices?.[0]?.message?.content ??
      "Xin lỗi, mình không thể trả lời lúc này.";

    return NextResponse.json({ reply, remaining });
  } catch {
    return NextResponse.json(
      { error: "Có lỗi xảy ra, vui lòng thử lại sau." },
      { status: 500 },
    );
  }
}
