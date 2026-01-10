import type { MySession } from "../types/types";

export const customGet = async (url: string, session: MySession | null) => {
  if (!session) {
    return null
  }
  if (!session.user?.accessToken) {
    return null
  }
  
  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${session.user.accessToken}`,
    },
  }).then((res) => res.json());

  return res;
};
