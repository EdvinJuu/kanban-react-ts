import type { ThemeType } from "../types/types";


// alternative colouring method, too many drawbacks though to be used on cards though. (can't do depth % 2)
export function levelAccent(depth: number, variableName: string, hueShift: number = 8, depthShift: number = 2) {
  // from var(--accent) splits that variable colour into the hsl channels
  return `hsl(from var(${variableName}) 
  calc(
  h + 0 + ${depth * hueShift}) 
  s 
  calc(l + ${depth * depthShift}))`;
}

export function cardLevelColor(theme: ThemeType, depth: number) {
  const hue = () => {
    if (theme === "cyanic") return 180;
    if (theme === "scarlet") return 0;
    if (theme === "lavender") return 260;
    if (theme === "jungle") return 90;
    if (theme === "light") return 20;
    if (theme === "dark") return 0;
    return 0;
  };
  const base = theme === "dark" ? 30 : theme === "light" ? 50 : 50 - depth * 2; // darker per level
  const altBase = depth % 2 === 0 ? 0 : theme === "light" ? -20 : -10; // every other level slightly different
  const altHue = theme === "light" ? 0 : depth * 8; // gradient hue shift based on depth
  return `hsl(${hue() + altHue}
    ${theme === "light" ? "20%" : theme === "dark" ? "0%" : "30%"}
    ${base + altBase}%)`;
}

// Deprecated since swapping to [data-theme="x"]
/* export function themedTailwindClass(
  theme: ThemeType,
) {
  if (theme === "cyanic") return clsx(`cyanic`);
  if (theme === "scarlet") return clsx(`scarlet`);
  if (theme === "lavender") return clsx(`lavender`);
  if (theme === "jungle") return clsx(`jungle`);
  if (theme === "light") return clsx(``);
  if (theme === "dark") return clsx(`dark`);
}; */

// Deprecated since swapping to [data-theme="x"]
/* export function iconColor(theme: ThemeType) {
  if (theme === "cyanic") return "#DBE227";
  if (theme === "scarlet") return "#59A8E8";
  if (theme === "lavender") return "#3DD770";
  if (theme === "jungle") return "#A84BD3";
  if (theme === "light") return "#28B256";
  if (theme === "dark") return "#A84BD3";
  return "#ffffff";
} */