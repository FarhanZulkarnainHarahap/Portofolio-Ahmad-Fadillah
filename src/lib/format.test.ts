import { describe, expect, it } from "vitest";
import { displayDateRange, itemTitle } from "./format";

describe("format helpers", () => {
  it("formats current experience date ranges", () => {
    expect(displayDateRange("2024-01-01T00:00:00.000Z", null, true)).toContain("Sekarang");
  });

  it("uses the available content title", () => {
    expect(itemTitle({ name: "Recruitment SOP" })).toBe("Recruitment SOP");
  });
});
