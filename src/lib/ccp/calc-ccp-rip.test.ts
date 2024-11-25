import { calcCcpRip } from "./calc-ccp-rip";

const cases = [
  ["111111", "68"],
  ["222222", "27"],
  ["123456", "87"],
  ["654321", "38"],
] as const;

test("Test calcCcpRip function.", () => {
  for (const [ccp, expected] of cases) {
    expect(calcCcpRip(ccp)).toBe(expected);
  }
});
