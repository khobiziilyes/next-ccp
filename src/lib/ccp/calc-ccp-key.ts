import { ALGO_START } from "@/consts";
// This function is responsible for generating the CCP key, from the CCP number.
// You can find more information about the algorithm here: https://www.youtube.com/watch?v=T7gkesAV90c

export function calcCcpKey(ccp: string): string {
  const chars = ccp.split("").reverse();
  const multiplied = chars.map((c, i) => Number.parseInt(c) * (i + ALGO_START));
  const totality = multiplied.reduce((a, b) => a + b, 0);

  const ccpKey = String(totality % 100).padStart(2, "0");

  return ccpKey;
}
