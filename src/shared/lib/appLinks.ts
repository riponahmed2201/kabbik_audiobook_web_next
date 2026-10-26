export const APP_STORE_URL =
  "https://apps.apple.com/us/app/kabbik-audiobooks-podcast/id6459885875";
export const PLAY_STORE_URL =
  "https://play.google.com/store/apps/details?id=com.kabbik.app";

export const downloadAppPath = "/download-app";

/** Book deep link query — confirm format with mobile before relying on it. */
export function getListenInAppHref(audiobookId?: string | number): string {
  if (audiobookId == null || audiobookId === "") {
    return downloadAppPath;
  }
  return `${downloadAppPath}?bookId=${encodeURIComponent(String(audiobookId))}`;
}
