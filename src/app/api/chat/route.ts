import { NextRequest, NextResponse } from "next/server";

const API_URL = process.env.OPERIS_API_URL!;
const API_KEY = process.env.OPERIS_API_KEY!;

const SYSTEM_PROMPT = `Bạn là trợ lý AI của Operis — nền tảng công nghệ Việt Nam.

Sản phẩm Operis:
- Operis Models (API AI): models.operis.vn
- Operis News (tin tức AI): news.operis.vn
- Operis Academy (học tập): media.operis.vn
- Operis Bot (Agent tự động): bot.operis.vn
- Operis Talent: talent.operis.vn
- Trang chủ: operis.vn

Quy tắc:
- Trả lời ngắn gọn, thân thiện, bằng tiếng Việt. Tối đa 2-3 câu.
- Chỉ cung cấp URL chính xác như trên, KHÔNG tự bịa URL.
- Khi người dùng hỏi về bạn (giới thiệu bản thân, bạn là ai, tên gì...), hãy giới thiệu mình là trợ lý AI của Operis và tóm tắt các sản phẩm Operis.
- Chỉ từ chối khi câu hỏi hoàn toàn không liên quan đến Operis, công nghệ, hoặc bản thân bạn.`;

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
