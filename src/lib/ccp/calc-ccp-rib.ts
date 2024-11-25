import { calcCcpRip } from "./calc-ccp-rip";
import { EMPTY_CCP, ALG_POSTE } from "@/consts";

export function calcCcpRib(ccp: string): string {
  const rip = calcCcpRip(ccp);
  const fullRip = EMPTY_CCP + BigInt(`${ccp}${rip}`);
  const rib = `${ALG_POSTE}${fullRip}`.padStart(20, "0");

  return rib;
}

export function formatCcpRib(rib: string): string {
  const breakpoints = [3, 8, 18];

  return [...rib]
    .map((_, i) => (breakpoints.includes(i) ? " " : "") + _)
    .join("");
}

export function calcFormattedCcpRib(ccp: string): string {
  return formatCcpRib(calcCcpRib(ccp));
}
