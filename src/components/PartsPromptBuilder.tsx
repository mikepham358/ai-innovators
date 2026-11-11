"use client";

import { useMemo, useState } from "react";
import { AlertTriangle, Check, Copy, ShieldCheck, Sparkles } from "lucide-react";

const EMAIL_PATTERN = /[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i;
const PHONE_PATTERN = /\b(?:\+84|0)(?:3|5|7|8|9)\d{8}\b/;

export function PartsPromptBuilder() {
  const [persona, setPersona] = useState(
    "Gia sư Khoa học Tự nhiên theo phương pháp Socrates"
  );
  const [aim, setAim] = useState(
    "Hướng dẫn học sinh hiểu bản chất Định luật II Newton thông qua câu hỏi gợi mở"
  );
  const [recipients, setRecipients] = useState("Học sinh lớp 10 (khối THPT)");
  const [theme, setTheme] = useState(
    "Lấy ví dụ gần gũi từ thể thao hoặc xe đạp; tuyệt đối không giải sẵn đáp án cuối"
  );
  const [structure, setStructure] = useState(
    "Mỗi lượt chỉ hỏi 1 câu ngắn, kiểm tra hiểu biết rồi mới gợi ý bước tiếp theo"
  );
  const [socraticLock, setSocraticLock] = useState(true);
  const [copied, setCopied] = useState(false);

  const generatedPrompt = useMemo(() => {
    const guardrails = socraticLock
      ? `\n[SOCRATIC & ZERO-PII GUARDRAILS]\n- Kiên quyết KHÔNG đưa đáp án hoàn chỉnh ngay lập tức.\n- Chỉ đặt tối đa 1-2 câu hỏi dẫn dắt để người học tự suy nghĩ (Productive Struggle).\n- Không yêu cầu hoặc lưu trữ họ tên đầy đủ, email, số điện thoại hay lớp học.`
      : "";

    return `[P - PERSONA]: Đóng vai ${persona.trim() || "..."}.
[A - AIM]: Mục tiêu hỗ trợ: ${aim.trim() || "..."}.
[R - RECIPIENTS]: Đối tượng người học: ${recipients.trim() || "..."}.
[T - THEME]: Bối cảnh & nguyên tắc: ${theme.trim() || "..."}.
[S - STRUCTURE]: Định dạng đầu ra: ${structure.trim() || "..."}.${guardrails}`;
  }, [persona, aim, recipients, theme, structure, socraticLock]);

  const piiWarnings = useMemo(() => {
    const warnings: string[] = [];
    if (EMAIL_PATTERN.test(generatedPrompt)) {
      warnings.push("Phát hiện địa chỉ email trong nội dung prompt.");
    }
    if (PHONE_PATTERN.test(generatedPrompt)) {
      warnings.push("Phát hiện số điện thoại Việt Nam trong nội dung prompt.");
    }
    return warnings;
  }, [generatedPrompt]);

  async function handleCopy() {
    await navigator.clipboard.writeText(generatedPrompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <section className="glass-card rounded-2xl p-6 sm:p-8">
      <div className="flex flex-wrap items-start justify-between gap-4 border-b border-white/10 pb-5">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-blue-400/30 bg-blue-500/10 px-3 py-1 text-xs font-semibold text-blue-200">
            <Sparkles className="h-3.5 w-3.5" />
            <span>AI LEARNING TOOLKIT • PARTS BUILDER</span>
          </div>
          <h2 className="mt-3 font-[family-name:var(--font-space-grotesk)] text-xl font-bold text-white sm:text-2xl">
            Trình thiết kế câu lệnh Socratic (Chuẩn PARTS)
          </h2>
          <p className="mt-1 text-sm text-slate-300">
            Thực hành viết prompt cho Chatbot học tập an toàn — tự động kiểm tra
            dữ liệu cá nhân (Zero PII) trước khi sao chép sang Gemini / NotebookLM.
          </p>
        </div>

        <label className="inline-flex cursor-pointer items-center gap-2.5 rounded-xl border border-violet-400/30 bg-violet-500/10 px-4 py-2.5 text-xs font-semibold text-violet-100">
          <input
            type="checkbox"
            checked={socraticLock}
            onChange={(e) => setSocraticLock(e.target.checked)}
            className="h-4 w-4 accent-fuchsia-500"
          />
          <span>Khóa chế độ Socratic (Không giải thay)</span>
        </label>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <div className="space-y-4">
          {[
            {
              label: "P — Persona (Vai trò AI)",
              value: persona,
              onChange: setPersona,
            },
            {
              label: "A — Aim (Mục tiêu sư phạm)",
              value: aim,
              onChange: setAim,
            },
            {
              label: "R — Recipients (Đối tượng người học)",
              value: recipients,
              onChange: setRecipients,
            },
            {
              label: "T — Theme (Bối cảnh & giới hạn)",
              value: theme,
              onChange: setTheme,
            },
            {
              label: "S — Structure (Định dạng phản hồi)",
              value: structure,
              onChange: setStructure,
            },
          ].map((field) => (
            <div key={field.label}>
              <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-blue-200">
                {field.label}
              </label>
              <input
                type="text"
                value={field.value}
                onChange={(e) => field.onChange(e.target.value)}
                className="w-full rounded-xl border border-white/15 bg-slate-950/70 px-3.5 py-2.5 text-sm text-white placeholder:text-slate-500 focus:border-blue-400 focus:outline-none"
              />
            </div>
          ))}
        </div>

        <div className="flex flex-col justify-between rounded-2xl border border-white/10 bg-slate-950/75 p-5">
          <div>
            <div className="flex items-center justify-between gap-2">
              <span className="font-mono text-xs font-semibold text-fuchsia-300">
                PROMPT PREVIEW
              </span>
              {piiWarnings.length === 0 ? (
                <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-400/30 bg-emerald-500/15 px-2.5 py-1 text-[11px] font-semibold text-emerald-200">
                  <ShieldCheck className="h-3.5 w-3.5" />
                  Zero PII Đạt Chuẩn
                </span>
              ) : (
                <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-400/40 bg-amber-500/15 px-2.5 py-1 text-[11px] font-semibold text-amber-200">
                  <AlertTriangle className="h-3.5 w-3.5" />
                  Cảnh báo PII
                </span>
              )}
            </div>

            <pre className="mt-4 whitespace-pre-wrap rounded-xl border border-white/10 bg-[#040613] p-4 font-mono text-xs leading-relaxed text-slate-200">
              {generatedPrompt}
            </pre>

            {piiWarnings.length > 0 ? (
              <div className="mt-3 rounded-xl border border-amber-400/30 bg-amber-500/10 p-3 text-xs text-amber-200">
                <p className="font-semibold">
                  Hãy gỡ thông tin định danh trước khi đưa vào AI:
                </p>
                <ul className="mt-1 list-disc pl-4">
                  {piiWarnings.map((warning) => (
                    <li key={warning}>{warning}</li>
                  ))}
                </ul>
              </div>
            ) : null}
          </div>

          <button
            type="button"
            onClick={handleCopy}
            className="mt-5 inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 via-violet-600 to-fuchsia-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-700/25 transition hover:brightness-110"
          >
            {copied ? (
              <>
                <Check className="h-4 w-4" />
                <span>Đã sao chép Prompt!</span>
              </>
            ) : (
              <>
                <Copy className="h-4 w-4" />
                <span>Sao chép Prompt Socratic</span>
              </>
            )}
          </button>
        </div>
      </div>
    </section>
  );
}
