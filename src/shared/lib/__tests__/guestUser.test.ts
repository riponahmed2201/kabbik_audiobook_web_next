import { isGuestUserId } from "@/shared/lib/guestUser";

describe("isGuestUserId", () => {
  it("treats nullish as guest", () => {
    expect(isGuestUserId(null)).toBe(true);
    expect(isGuestUserId(undefined)).toBe(true);
    expect(isGuestUserId("")).toBe(true);
  });

  it("matches configured guest user id", () => {
    expect(isGuestUserId(2820)).toBe(true);
    expect(isGuestUserId("2820")).toBe(true);
    expect(isGuestUserId(123)).toBe(false);
  });
});
