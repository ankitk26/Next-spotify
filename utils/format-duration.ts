export const fmtMSS = (seconds: number) => {
	return new Date(seconds * 1000).toISOString().substring(15, 15 + 4);
};
