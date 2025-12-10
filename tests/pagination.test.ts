// tests/utils/pagination.test.ts
import { paginate } from "../src/utils/pagination";

describe("paginate", () => {
  const items = [1, 2, 3, 4, 5];

  it("returns all items when limit >= length and offset = 0", () => {
    const { items: page, total } = paginate(items, 10, 0);

    expect(total).toBe(5);
    expect(page).toEqual([1, 2, 3, 4, 5]);
  });

  it("respects limit and offset", () => {
    const { items: page, total } = paginate(items, 2, 1);

    expect(total).toBe(5);
    expect(page).toEqual([2, 3]); // start at index 1, take 2 items
  });

  it("clamps offset beyond end of list", () => {
    const { items: page, total } = paginate(items, 2, 10);

    expect(total).toBe(5);
    expect(page).toEqual([]); // offset past end → empty page
  });
});
