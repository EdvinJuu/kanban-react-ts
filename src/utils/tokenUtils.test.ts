
import { describe, test, expect, beforeEach } from "@jest/globals";
import { getToken, setToken, removeToken } from "./tokenUtils";

describe("tokenUtils", () => {

    // clear localStorage since tokenUtils is manipulating it
  beforeEach(() => {
    localStorage.clear();
  });

  test("getToken returns null when nothing is stored", () => {
    expect(getToken()).toBeNull();
  });

  test("setToken stores a token that getToken can read back", () => {
    setToken("abc123");
    expect(getToken()).toBe("abc123");
  });

  test("removeToken deletes the stored token", () => {
    setToken("abc123");
    removeToken();
    expect(getToken()).toBeNull();
  });
});