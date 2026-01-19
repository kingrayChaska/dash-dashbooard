export function formatDate(time: string): string {
  return new Date(time).toLocaleTimeString(); // Customize as needed
}

export function cn(...classes: (string | undefined | null | false)[]) {
  return classes.filter(Boolean).join(" ");
}
