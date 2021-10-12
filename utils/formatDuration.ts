export const fmtMSS = (seconds: number) =>
  new Date(1000 * seconds).toISOString().substr(15, 4);
