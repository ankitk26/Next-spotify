import type { MySession } from "../types/types";

export const isAuthenticated = (session: MySession | null) => {
	if (
		!session ||
		// biome-ignore lint/suspicious/noExplicitAny: <will fix later>
		Math.floor(Date.now()) >= (session.user as any).expires_at * 1000
	) {
		return false;
	}
	return true;
};
