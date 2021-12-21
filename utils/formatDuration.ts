export const fmtMSS = (seconds: number) =>
  new Date(1000 * seconds).toISOString().substring(15, 15 + 4);
