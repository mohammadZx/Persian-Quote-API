import { describe, test, expect } from "bun:test";
import {
  normalizeText,
  searchQuotes,
  getHafez,
  getPoets,
  getCategories,
  getStats,
} from "../lib/data/store";

describe("Persian Normalization", () => {
  test("normalizes arabic characters and digits", () => {
    expect(normalizeText("كتاب يوسف")).toBe("کتاب یوسف");
    expect(normalizeText("۱۲۳")).toBe("123");
    expect(normalizeText("شعرِ زیبا")).toBe("شعر زیبا");
  });

  test("strips zero-width non-joiners correctly", () => {
    expect(normalizeText("می‌روم")).toBe("میروم");
  });
});

describe("Data Store and Search", () => {
  test("getStats returns non-zero counts for poetry collections", () => {
    const stats = getStats();
    expect(stats.total).toBeGreaterThan(5000);
    expect(stats.hafez).toBe(497);
    expect(stats.shereno).toBeGreaterThan(1000);
  });

  test("getHafez returns ghazals with correct structure", () => {
    const res = getHafez(new URLSearchParams("limit=5"));
    expect(res.data.length).toBe(5);
    expect(res.data[0].poet).toBe("حافظ");
    expect(res.data[0].text_persian).toBeDefined();
  });

  test("searchQuotes supports multi-term search across author and text", () => {
    const params = new URLSearchParams("q=حافظ شیراز");
    const result = searchQuotes(params);
    expect(result.data.length).toBeGreaterThan(0);
    expect(result.data[0].poet).toContain("حافظ");
  });

  test("searchQuotes scores and ranks relevant terms higher", () => {
    const params = new URLSearchParams("q=سهراب سپهری قایق");
    const result = searchQuotes(params);
    expect(result.data.length).toBeGreaterThan(0);
    expect(result.data[0].poet).toBe("سهراب سپهری");
  });

  test("getPoets returns list with biographies and counts", () => {
    const poets = getPoets();
    expect(poets.count).toBeGreaterThan(10);
    const hafez = poets.data.find((p) => p.name_persian.includes("حافظ"));
    expect(hafez).toBeDefined();
    expect(hafez?.name_english).toBe("Hafez");
  });

  test("getCategories returns list of categories", () => {
    const categories = getCategories();
    expect(categories.count).toBeGreaterThan(0);
  });
});
