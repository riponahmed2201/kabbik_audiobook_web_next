"use client";
import { useState } from "react";

function getWebDeviceInfo() {
  const ua = navigator.userAgent;
  const raw = `${ua}|${screen.width}x${screen.height}|${navigator.language}`;
  const id = btoa(raw).replace(/[^a-zA-Z0-9]/g, "").substring(0, 40);
  const os = /Windows/.test(ua) ? "Windows"
    : /Macintosh/.test(ua) ? "macOS"
    : /Android/.test(ua) ? "Android"
    : /iPhone|iPad/.test(ua) ? "iOS" : "Web";
  const browser = /Edg/.test(ua) ? "Edge"
    : /Chrome/.test(ua) ? "Chrome"
    : /Firefox/.test(ua) ? "Firefox"
    : /Safari/.test(ua) ? "Safari" : "Browser";
  return { id, os, name: `${browser} on ${os}`, model: browser, brand: "Web" };
}

export function useFacebookLogin() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loginWithFacebook = (): Promise<any | null> => {
    return new Promise((resolve) => {
      if (!window.FB) {
        setError("Facebook SDK not ready. Try again.");
        resolve(null);
        return;
      }

      setLoading(true);
      setError(null);

      window.FB.login(async (authRes: any) => {
        if (authRes.status !== "connected") {
          setLoading(false);
          resolve(null);
          return;
        }

        const { accessToken, userID } = authRes.authResponse;

        window.FB.api("/me", { fields: "name,email,picture,gender,id" }, async (userData: any) => {
          try {
            const deviceInfo = getWebDeviceInfo();
            const payload = {
              user_id: userID,
              access_token: accessToken,
              data: userData,
              device_info: deviceInfo,
            };

            const res = await fetch("YOUR_BACKEND_URL/auth/login-fb", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(payload),
            });

            const resData = await res.json();

            if (!res.ok || resData?.success === false) {
              setError(resData?.message || "Login failed.");
              resolve(null);
              return;
            }

            if (resData?.token) {
              resolve(resData);
            } else {
              setError("No token received.");
              resolve(null);
            }
          } catch (err: any) {
            setError(err?.message || "Something went wrong.");
            resolve(null);
          } finally {
            setLoading(false);
          }
        });

      }, { scope: "email,public_profile" });
    });
  };

  return { loginWithFacebook, loading, error };
}