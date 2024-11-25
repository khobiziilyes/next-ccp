import { calcCcpKey } from "./calc-ccp-key";

const cases = [
  ["111111", "39"],
  ["222222", "78"],
  ["123456", "19"],
  ["654321", "54"],
] as const;

test("Test calcCcpKey function.", () => {
  for (const [ccp, expected] of cases) {
    expect(calcCcpKey(ccp)).toBe(expected);
  }
});
