import { EMPTY_CCP, EMPTY_MOD, MAGIC_NUM } from "@/consts";

// This function is responsible for generating the CCP Rip, from the CCP number.
// I've found the algorithm on an online forum, the code is written in VBA.
// You can find more information about the algorithm here: https://www.mouwazaf-dz.com/t48131-topic

export function calcCcpRip(ccp: string): string {
  const ccpInt = Number.parseInt(ccp);
  const multiplied = ccpInt * 100;
  const mod = multiplied % MAGIC_NUM;

  const ripInt = 97 - ((mod + EMPTY_MOD) % MAGIC_NUM);
  const rip = String(ripInt).padStart(2, "0");

  return rip;
}

export function calcFullRip(ccp: string): string {
  const rip = calcCcpRip(ccp);
  const fullRip = EMPTY_CCP + BigInt(`${ccp}${rip}`);

  return fullRip.toString();
}

export function calcFullCcp(ccp: string): string {
  const fullRip = calcCcpRip(ccp);

  return fullRip.slice(5);
}
