import { useEffect } from "react";

export const VOICE_CONSENT_KEY = "fg_voice_consent";

export function hasVoiceConsent() {
  if (typeof window === "undefined") return false;
  return sessionStorage.getItem(VOICE_CONSENT_KEY) === "granted";
}

export function grantVoiceConsent() {
  sessionStorage.setItem(VOICE_CONSENT_KEY, "granted");
  sessionStorage.setItem("fg_voice_consent_ts", new Date().toISOString());
}

interface VoiceConsentModalProps {
  open: boolean;
  onAccept: () => void;
  onDecline: () => void;
}

export const VoiceConsentModal = ({ open, onAccept, onDecline }: VoiceConsentModalProps) => {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onDecline();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onDecline]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/55 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={(e) => {
        if (e.target === e.currentTarget) onDecline();
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="fgConsentTitle"
        onClick={(e) => e.stopPropagation()}
        className="w-[calc(100%-32px)] max-w-[480px] rounded-xl bg-white px-7 pb-6 pt-8 font-sans leading-relaxed text-[#1a1a1a] shadow-[0_12px_40px_rgba(0,0,0,0.25)] animate-in slide-in-from-bottom-3 duration-200"
      >
        <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-[10px] bg-[#f0f4ff]">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="h-6 w-6 text-[#1a73e8]"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 18.75a6 6 0 0 0 6-6v-1.5m-6 7.5a6 6 0 0 1-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 0 1-3-3V4.5a3 3 0 1 1 6 0v8.25a3 3 0 0 1-3 3Z"
            />
          </svg>
        </div>

        <h2 id="fgConsentTitle" className="mb-3 text-lg font-bold">
          Before you start
        </h2>

        <p className="mb-3 text-sm text-[#333]">
          This voice agent uses AI to have a spoken conversation with you. Here's what you need to know:
        </p>

        <ul className="mb-4 ml-5 list-disc text-sm text-[#333]">
          <li className="mb-1.5">
            <strong className="font-semibold">Your voice</strong> is captured by your microphone and streamed in real
            time to <strong className="font-semibold">ElevenLabs, Inc.</strong> (United States) for processing.
          </li>
          <li className="mb-1.5">
            <strong className="font-semibold">We don't store</strong> your voice recordings on our servers.
          </li>
          <li className="mb-1.5">
            <strong className="font-semibold">You can stop</strong> at any time by closing the conversation.
          </li>
        </ul>

        <div className="my-4 rounded-r-md border-l-[3px] border-[#f9a825] bg-[#fff8e1] px-3.5 py-2.5 text-[13px] text-[#5d4037]">
          Voice data processed through AI speech technology may be classified as{" "}
          <strong className="font-semibold">biometric data</strong> under EU law. By clicking "Start conversation," you
          give explicit consent to this processing.
        </div>

        <span className="mb-5 block text-[13px]">
          Read our full{" "}
          <a href="/privacy" target="_blank" rel="noopener" className="text-[#1a73e8] hover:underline">
            Privacy Notice
          </a>{" "}
          for details on data transfers, retention, and your rights.
        </span>

        <div className="mt-6 flex gap-3">
          <button
            onClick={onDecline}
            className="flex-1 rounded-lg bg-[#f1f3f5] px-5 py-3 text-[15px] font-semibold text-[#555] transition-colors hover:bg-[#e4e6e8] active:scale-[0.98]"
          >
            No thanks
          </button>
          <button
            onClick={onAccept}
            className="flex-1 rounded-lg bg-[#1a73e8] px-5 py-3 text-[15px] font-semibold text-white transition-colors hover:bg-[#1557b0] active:scale-[0.98]"
          >
            Start conversation
          </button>
        </div>
      </div>
    </div>
  );
};
