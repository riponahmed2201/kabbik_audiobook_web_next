"use client";

import { useEffect, useState } from "react";

export default function DuplicateTabPage() {
  const [countdown, setCountdown] = useState(10);

  useEffect(() => {
    if (countdown <= 0) {
    //   window.close();
      return;
    }
    const timer = setTimeout(() => setCountdown((c) => c - 1), 1000);
    return () => clearTimeout(timer);
  }, [countdown]);

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <div style={styles.icon}>⚠️</div>
        <h1 style={styles.title}>একাধিক ট্যাব ব্যবহার অনুমোদিত নয়</h1>
        <p style={styles.message}>অনুগ্রহ করে এই ট্যাবটি বন্ধ করুন</p>
        <p style={styles.countdown}>
          {/* {t("countdown", { seconds: countdown })} */}
          
        </p>
        {/* <button style={styles.button} onClick={() => window.close()}>
          
        </button> */}
      </div>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  container: {
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "#f5f5f5",
    fontFamily: "sans-serif",
  },
  card: {
    background: "#fff",
    borderRadius: "12px",
    padding: "48px 40px",
    maxWidth: "420px",
    width: "100%",
    textAlign: "center",
    boxShadow: "0 4px 24px rgba(0,0,0,0.10)",
  },
  icon: { fontSize: "48px", marginBottom: "16px" },
  title: { fontSize: "22px", fontWeight: 700, margin: "0 0 12px", color: "#1a1a1a" },
  message: { fontSize: "15px", color: "#555", lineHeight: 1.6, margin: "0 0 20px" },
  countdown: { fontSize: "14px", color: "#888", margin: "0 0 24px" },
  button: {
    background: "#e53e3e",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    padding: "12px 28px",
    fontSize: "15px",
    fontWeight: 600,
    cursor: "pointer",
  },
};