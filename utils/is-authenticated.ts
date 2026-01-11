import type { MySession } from "@/types/types";

export const isAuthenticated = (session: MySession | null) => {
	if (
		!session?.user?.expires_at ||
		Math.floor(Date.now()) >= session.user.expires_at * 1000
	) {
		return false;
	}
	return true;
};
