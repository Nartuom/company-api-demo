// tests/utils/validation.test.ts
import { companiesQuerySchema } from "../src/utils/validation";

describe("companiesQuerySchema", () => {
  it("parses valid query params and applies defaults", () => {
    const result = companiesQuerySchema.parse({
      limit: "5",
      offset: "10",
      name: " Acme ",
      active: "true",
      employeeName: " Tom "
    });

    expect(result.limit).toBe(5);
    expect(result.offset).toBe(10);
    expect(result.name).toBe("Acme");
    expect(result.active).toBe(true);
    expect(result.employeeName).toBe("Tom");
  });

  it("uses default limit and offset when not provided", () => {
    const result = companiesQuerySchema.parse({});

    expect(result.limit).toBe(10);
    expect(result.offset).toBe(0);
  });

  it("fails on invalid limit", () => {
    const bad = () => companiesQuerySchema.parse({ limit: "rockets" });
    expect(bad).toThrow();
  });
});
