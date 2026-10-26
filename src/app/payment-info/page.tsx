"use client";

import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

const SUCCESS_IMAGE =
  "https://kabbik-space.sgp1.cdn.digitaloceanspaces.com/kabbik-images/sucess.gif";
const FAILED_IMAGE =
  "https://kabbik-space.sgp1.cdn.digitaloceanspaces.com/kabbik-images/failed_logo.gif";

function PaymentInfoContent() {
  const searchParams = useSearchParams();
  const isSuccess = searchParams.get("status") === "success";
  const referenceId = searchParams.get("referenceId");
  const message = searchParams.get("message");

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#050f1e] px-4 py-16">
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-10%,rgba(188,9,116,0.22),transparent)]" />
        <div
          className={`absolute left-1/2 top-1/3 h-[28rem] w-[28rem] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[120px] ${
            isSuccess ? "bg-[#BC0974]/25" : "bg-red-900/30"
          }`}
        />
        <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/40 to-transparent" />
      </div>

      <section className="payment-info-enter relative w-full max-w-[420px]">
        <div
          className={`mx-auto mb-6 h-px w-2/3 bg-gradient-to-r from-transparent to-transparent ${
            isSuccess ? "via-[#FF6A9F]/60" : "via-red-400/50"
          }`}
        />

        <div className="relative overflow-hidden rounded-[1.5rem] border border-white/[0.08] bg-[#0b1526]/90 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.7)] backdrop-blur-xl">
          <div
            className={`h-1 w-full bg-gradient-to-r ${
              isSuccess
                ? "from-[#D94C75] via-[#BC0974] to-[#7F1867]"
                : "from-red-700 via-red-500 to-rose-800"
            }`}
          />

          <div className="px-6 pb-8 pt-10 text-center sm:px-8">
            <div className="relative mx-auto mb-7 h-36 w-36 sm:h-40 sm:w-40">
              <div
                className={`absolute inset-0 rounded-full blur-2xl ${
                  isSuccess ? "bg-[#BC0974]/30" : "bg-red-600/25"
                }`}
              />
              <div className="relative flex h-full w-full items-center justify-center rounded-full border border-white/10 bg-[#050f1e]/50 p-3 shadow-inner">
                <Image
                  src={isSuccess ? SUCCESS_IMAGE : FAILED_IMAGE}
                  height={160}
                  width={160}
                  sizes="160px"
                  alt={isSuccess ? "Payment successful" : "Payment failed"}
                  loading="lazy"
                  unoptimized
                  className="h-full w-full object-contain"
                />
              </div>
            </div>

            <p
              className={`mb-2 text-[11px] font-semibold uppercase tracking-[0.25em] ${
                isSuccess ? "text-[#FF6A9F]" : "text-red-400"
              }`}
            >
              {isSuccess ? "Payment complete" : "Payment unsuccessful"}
            </p>

            <h1 className="text-[1.65rem] font-bold leading-tight tracking-tight text-white sm:text-3xl">
              {isSuccess ? "Success" : "Failed"}{" "}
              <span className="font-semibold text-white/80">Transaction</span>
            </h1>

            <p className="mx-auto mt-3 max-w-xs text-sm leading-relaxed text-white/45">
              {isSuccess
                ? "Your payment went through. You’re all set to keep exploring."
                : "Something went wrong with this payment. You can try again anytime."}
            </p>

            <div className="mt-8 overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.03] text-left">
              {referenceId && (
                <div className="flex items-start justify-between gap-4 border-b border-white/[0.06] px-4 py-3.5">
                  <span className="text-xs font-medium uppercase tracking-wider text-white/35">
                    Reference
                  </span>
                  <span className="max-w-[60%] break-all text-right text-sm font-medium text-white/90">
                    {referenceId}
                  </span>
                </div>
              )}

              <div className="flex items-center justify-between gap-4 px-4 py-3.5">
                <span className="text-xs font-medium uppercase tracking-wider text-white/35">
                  Status
                </span>
                <span
                  className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold tracking-wide ${
                    isSuccess
                      ? "bg-emerald-500/15 text-emerald-300 ring-1 ring-emerald-400/20"
                      : "bg-red-500/15 text-red-300 ring-1 ring-red-400/20"
                  }`}
                >
                  <span
                    className={`h-1.5 w-1.5 rounded-full ${
                      isSuccess ? "bg-emerald-400" : "bg-red-400"
                    }`}
                  />
                  {isSuccess ? "SUCCESS" : "FAILED"}
                </span>
              </div>

              {message && (
                <div className="border-t border-white/[0.06] px-4 py-3.5">
                  <p className="mb-1.5 text-xs font-medium uppercase tracking-wider text-white/35">
                    Message
                  </p>
                  <p className="text-sm leading-relaxed text-white/80">
                    {message}
                  </p>
                </div>
              )}
            </div>

            <Link
              href="/"
              className="mt-8 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-br from-[#FF6A9F] via-[#FD0053] to-[#C80045] px-6 py-3.5 text-sm font-semibold text-white shadow-[0_12px_30px_-8px_rgba(253,0,83,0.55)] transition duration-200 hover:scale-[1.02] hover:brightness-110 active:scale-[0.98]"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="h-4 w-4"
                aria-hidden
              >
                <path
                  fillRule="evenodd"
                  d="M9.293 2.293a1 1 0 0 1 1.414 0l7 7A1 1 0 0 1 17 11h-1v6a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1v-3a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v3a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-6H3a1 1 0 0 1-.707-1.707l7-7Z"
                  clipRule="evenodd"
                />
              </svg>
              Back to Home
            </Link>
          </div>
        </div>

        <p className="mt-8 text-center text-[11px] tracking-wide text-white/25">
          © {new Date().getFullYear()} kabbik.com
        </p>
      </section>

      <style jsx>{`
        .payment-info-enter {
          animation: fadeUp 0.6s ease-out both;
        }
        @keyframes fadeUp {
          from {
            opacity: 0;
            transform: translateY(18px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </main>
  );
}

function PaymentInfoFallback() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#050f1e]">
      <div className="h-8 w-8 animate-spin rounded-full border-2 border-white/20 border-t-[#FD0053]" />
    </main>
  );
}

export default function PaymentInfoPage() {
  return (
    <Suspense fallback={<PaymentInfoFallback />}>
      <PaymentInfoContent />
    </Suspense>
  );
}
