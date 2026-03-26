"use client";

import { useState, useRef, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import { MSIcon } from "./MSIcon";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const CHAT_STORAGE_KEY = "operis_chat_history";
const CHAT_TTL_DAYS = 30;
const INITIAL_MSG: Message = { role: "assistant", content: "Xin chào! Mình là trợ lý Operis. Bạn cần hỗ trợ gì?" };

function loadChatHistory(): Message[] {
  if (typeof window === "undefined") return [INITIAL_MSG];
  const raw = localStorage.getItem(CHAT_STORAGE_KEY);
  if (!raw) return [INITIAL_MSG];
  try {
    const { messages, savedAt } = JSON.parse(raw);
    const age = Date.now() - savedAt;
    if (age > CHAT_TTL_DAYS * 24 * 60 * 60 * 1000) {
      localStorage.removeItem(CHAT_STORAGE_KEY);
      return [INITIAL_MSG];
    }
    return messages?.length ? messages : [INITIAL_MSG];
  } catch {
    return [INITIAL_MSG];
  }
}

function saveChatHistory(messages: Message[]) {
  localStorage.setItem(
    CHAT_STORAGE_KEY,
    JSON.stringify({ messages, savedAt: Date.now() }),
  );
}

export function ChatBot() {
  const [messages, setMessages] = useState<Message[]>([INITIAL_MSG]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [remaining, setRemaining] = useState<number | null>(null);
  const bodyRef = useRef<HTMLDivElement>(null);

  // Load chat history from localStorage after hydration
  useEffect(() => {
    const saved = loadChatHistory();
    if (saved.length > 1) setMessages(saved);
  }, []);

  useEffect(() => {
    requestAnimationFrame(() => {
      if (bodyRef.current) {
        bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
      }
    });
  }, [messages, loading]);

  // Persist chat to localStorage
  useEffect(() => {
    if (messages.length > 1) saveChatHistory(messages);
  }, [messages]);

  const send = async () => {
    const text = input.trim();
    if (!text || loading) return;

    const userMsg: Message = { role: "user", content: text };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [...messages, userMsg].map((m) => ({
            role: m.role,
            content: m.content,
          })),
        }),
      });

      const data = await res.json();
      if (data.remaining !== undefined) setRemaining(data.remaining);
      const reply = data.reply ?? "Xin lỗi, mình không thể trả lời lúc này.";

      // Typing animation — reveal text word by word
      setMessages((prev) => [...prev, { role: "assistant", content: "" }]);
      setLoading(false);

      const words = reply.split(/(\s+)/);
      let shown = "";
      for (const word of words) {
        shown += word;
        const snap = shown;
        setMessages((prev) => {
          const updated = [...prev];
          updated[updated.length - 1] = { ...updated[updated.length - 1], content: snap };
          return updated;
        });
        await new Promise((r) => setTimeout(r, 30));
      }
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Có lỗi xảy ra, vui lòng thử lại sau." },
      ]);
      setLoading(false);
    }
  };

  return (
    <div className="rounded-xl op-glass-card border border-[#a1ffc2]/10 overflow-hidden flex flex-col" style={{ height: 600 }}>
      {/* Header */}
      <div className="flex items-center gap-3 px-5 py-3 border-b border-white/5">
        <div className="w-8 h-8 rounded-full bg-[#a1ffc2]/10 border border-[#a1ffc2]/20 flex items-center justify-center">
          <MSIcon name="smart_toy" style={{ fontSize: "16px", color: "#a1ffc2" }} />
        </div>
        <div className="flex-1">
          <p className="font-headline text-sm font-bold text-white">Operis Bot</p>
          <p className="text-[10px] text-[#a1ffc2]">Online</p>
        </div>
        {remaining !== null && (
          <span className={`text-[10px] font-medium ${remaining <= 3 ? "text-amber-400" : "text-slate-500"}`}>
            {remaining > 0 ? `${remaining} lượt còn lại` : "Hết lượt hôm nay"}
          </span>
        )}
      </div>

      {/* Messages */}
      <div
        ref={bodyRef}
        className="px-5 py-4 space-y-3 overflow-y-auto flex-1"
      >
        {messages.map((m, i) => (
          <div
            key={i}
            className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-[80%] rounded-xl px-4 py-2.5 text-sm leading-relaxed ${
                m.role === "user"
                  ? "bg-[#a1ffc2]/15 text-[#a1ffc2] border border-[#a1ffc2]/20"
                  : "bg-white/5 text-[#adaaaa] border border-white/5"
              }`}
            >
              {m.role === "user" ? (
                m.content
              ) : (
                <ReactMarkdown
                  components={{
                    p: ({ children }) => <p className="mb-2 last:mb-0">{children}</p>,
                    ul: ({ children }) => <ul className="list-disc pl-4 mb-2 last:mb-0 space-y-1">{children}</ul>,
                    ol: ({ children }) => <ol className="list-decimal pl-4 mb-2 last:mb-0 space-y-1">{children}</ol>,
                    strong: ({ children }) => <strong className="font-bold text-white">{children}</strong>,
                    code: ({ children }) => (
                      <code className="bg-white/10 px-1.5 py-0.5 rounded text-xs text-[#a1ffc2]">{children}</code>
                    ),
                  }}
                >
                  {m.content}
                </ReactMarkdown>
              )}
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start">
            <div className="bg-white/5 border border-white/5 rounded-xl px-4 py-2.5 text-sm text-[#adaaaa]">
              <span className="animate-pulse">Đang nhập...</span>
            </div>
          </div>
        )}
      </div>

      {/* Input */}
      <div className="px-4 py-3 border-t border-white/5 flex gap-2 items-end">
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              send();
            }
          }}
          placeholder="Nhập tin nhắn..."
          rows={1}
          className="flex-1 resize-none bg-white/5 border border-white/8 rounded-lg px-4 py-2.5 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-[#a1ffc2]/30 transition-colors"
          style={{ maxHeight: 200, overflowY: "hidden" }}
          onInput={(e) => {
            const el = e.currentTarget;
            el.style.height = "auto";
            el.style.overflowY = "hidden";
            const sh = el.scrollHeight;
            const capped = Math.min(sh, 200);
            el.style.height = capped + "px";
            if (sh > capped) {
              el.style.overflowY = "auto";
              el.scrollTop = sh;
            }
          }}
        />
        <button
          type="button"
          onClick={send}
          disabled={!input.trim() || loading}
          aria-label="Gửi tin nhắn"
          className="shrink-0 w-10 h-10 rounded-lg bg-[#a1ffc2]/10 border border-[#a1ffc2]/20 flex items-center justify-center text-[#a1ffc2] hover:bg-[#a1ffc2]/20 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
        >
          <MSIcon name="send" style={{ fontSize: "18px" }} />
        </button>
      </div>
    </div>
  );
}
