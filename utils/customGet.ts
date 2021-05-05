import { getSession } from "next-auth/client";
import Router from "next/router";
import { MySession } from "../types/types";

export const customGet = async (url, ctx) => {
  const session: MySession = await getSession(ctx);

  if (!session?.user) {
    ctx.res?.writeHead(302, {
      Location: "/login",
    });
    ctx.res?.end();
    return;
  }

  const resp = await fetch(url, {
    headers: {
      Authorization: `Bearer ${session.user.accessToken}`,
    },
  });

  if (resp.status === 401 && !ctx.req) {
    Router.replace("/login");
    return {};
  }

  if (resp.status === 401 && ctx.req) {
    ctx.res?.writeHead(302, {
      Location: "/login",
    });
    ctx.res?.end();
    return;
  }

  const json = await resp.json();
  return json;
};
