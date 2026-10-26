import { siteConfig } from "@/shared/config/config";

const guestUserId = (): number => Number(siteConfig.defaultUserId);

/** Logged-out / anonymous browsing user (legacy guest account). */
export function isGuestUserId(id?: number | string | null): boolean {
  if (id == null || id === "") return true;
  return Number(id) === guestUserId();
}

export function getGuestUserId(): number {
  return guestUserId();
}
