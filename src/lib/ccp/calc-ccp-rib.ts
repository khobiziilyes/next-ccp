import { calcFullRip } from "./calc-ccp-rip";
import { ALG_POSTE } from "@/consts";

export function calcCcpRib(ccp: string): string {
  const fullRip = calcFullRip(ccp);
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
