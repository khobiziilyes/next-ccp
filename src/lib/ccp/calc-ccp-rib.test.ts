import { calcFormattedCcpRib } from "./calc-ccp-rib";

const cases = [
  ["111111", "007 99999 0000111111 68"],
  ["222222", "007 99999 0000222222 27"],
  ["123456", "007 99999 0000123456 87"],
  ["654321", "007 99999 0000654321 38"],
] as const;

test("Test calcFormattedCcpRib function.", () => {
  for (const [ccp, expected] of cases) {
    expect(calcFormattedCcpRib(ccp)).toBe(expected);
  }
});
