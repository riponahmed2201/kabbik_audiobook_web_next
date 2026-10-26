import {
  downloadAppPath,
  getListenInAppHref,
} from "@/shared/lib/appLinks";

describe("getListenInAppHref", () => {
  it("returns download path when audiobook id is missing", () => {
    expect(getListenInAppHref()).toBe(downloadAppPath);
    expect(getListenInAppHref("")).toBe(downloadAppPath);
  });

  it("encodes book id in query", () => {
    expect(getListenInAppHref(42)).toBe(`${downloadAppPath}?bookId=42`);
    expect(getListenInAppHref("abc/def")).toBe(
      `${downloadAppPath}?bookId=abc%2Fdef`
    );
  });
});
