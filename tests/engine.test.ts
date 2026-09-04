import { describe, test, expect } from "bun:test";
import { TighRouter } from "../lib/engine/router";
import { TighCache } from "../lib/engine/cache";
import { TighRateLimiter } from "../lib/engine/rate-limiter";
import { TighCircuitBreaker } from "../lib/engine/circuit-breaker";

describe("TighRouter", () => {
  test("matches exact static route", () => {
    const router = new TighRouter();
    router.addRoute("GET", "/api/quotes", () => ({ status: 200, headers: {}, body: "quotes" }));

    const match = router.match("GET", "/api/quotes");
    expect(match).not.toBeNull();
    expect(match?.params).toEqual({});
  });

  test("matches dynamic parameter route", () => {
    const router = new TighRouter();
    router.addRoute("GET", "/api/quotes/[poet]", () => ({ status: 200, headers: {}, body: "poet-quote" }));

    const match = router.match("GET", "/api/quotes/hafez");
    expect(match).not.toBeNull();
    expect(match?.params).toEqual({ poet: "hafez" });
  });

  test("returns null for non-matching method or path", () => {
    const router = new TighRouter();
    router.addRoute("GET", "/api/health", () => ({ status: 200, headers: {}, body: "ok" }));

    expect(router.match("POST", "/api/health")).toBeNull();
    expect(router.match("GET", "/api/unknown")).toBeNull();
  });
});

describe("TighCache", () => {
  test("stores and retrieves items within TTL", () => {
    const cache = new TighCache({ maxSize: 10, defaultTTL: 1000, checkInterval: 5000 });
    cache.set("key1", { data: "test" }, 500);

    const hit = cache.get<{ data: string }>("key1");
    expect(hit).toEqual({ data: "test" });
  });

  test("evicts least recently used items when maxSize reached", () => {
    const cache = new TighCache({ maxSize: 2, defaultTTL: 5000, checkInterval: 5000 });
    cache.set("a", 1);
    cache.set("b", 2);
    // دسترسی به 'a' برای تازه‌سازی در LRU
    cache.get("a");
    cache.set("c", 3);

    expect(cache.get("a")).toBe(1);
    expect(cache.get("c")).toBe(3);
    expect(cache.get("b")).toBeNull();
  });
});

describe("TighRateLimiter", () => {
  test("allows requests within rate limits and limits excess requests", () => {
    const limiter = new TighRateLimiter({
      windowMs: 1000,
      maxRequests: 3,
      strategy: "token-bucket",
    });

    const mockReq = {
      ip: "127.0.0.1",
      headers: {},
      method: "GET" as const,
      path: "/test",
      query: {},
      params: {},
      timestamp: Date.now(),
    };

    expect(limiter.check(mockReq).allowed).toBe(true);
    expect(limiter.check(mockReq).allowed).toBe(true);
    expect(limiter.check(mockReq).allowed).toBe(true);

    const blocked = limiter.check(mockReq);
    expect(blocked.allowed).toBe(false);
    expect(blocked.remaining).toBe(0);
  });
});

describe("TighCircuitBreaker", () => {
  test("opens circuit after consecutive failures", async () => {
    const breaker = new TighCircuitBreaker({
      failureThreshold: 2,
      recoveryTimeout: 500,
      halfOpenMaxAttempts: 1,
      monitoringPeriod: 1000,
    });

    const failingAction = async () => {
      throw new Error("Service down");
    };

    await expect(breaker.execute(failingAction)).rejects.toThrow("Service down");
    await expect(breaker.execute(failingAction)).rejects.toThrow("Service down");

    // پس از ۲ شکست متوالی، مدار باز می‌شود
    expect(breaker.getState()).toBe("open");
  });
});
