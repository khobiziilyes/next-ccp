import { type NextRequest, NextResponse } from "next/server";
import { waitUntil } from "@vercel/functions";
import { type Update } from "telegraf/types";

import { createDebug } from "@/lib/createDebug";

import { bot } from "@/lib/telegraf/bot";

const debug = createDebug("bot:dev");
const webhookEndpoint = `${process.env.VERCEL_PROJECT_PRODUCTION_URL ?? ""}/api`;

export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

export async function GET() {
  try {
    debug("Bot runs in production mode");

    if (webhookEndpoint === "/api")
      throw new Error("VERCEL_PROJECT_PRODUCTION_URL is not set.");

    const getWebhookInfo = await bot.telegram.getWebhookInfo();

    if (getWebhookInfo.url !== webhookEndpoint) {
      debug(`deleting webhook ${webhookEndpoint}`);
      await bot.telegram.deleteWebhook();

      debug(`setting webhook: ${webhookEndpoint}`);
      await bot.telegram.setWebhook(`${webhookEndpoint}`);
    }

    return NextResponse.json(
      { ok: true },
      {
        status: 200,
      },
    );
  } catch (e: unknown) {
    console.error(e);

    return NextResponse.json(
      { ok: false, message: "Internal Server Error" },
      {
        status: 500,
      },
    );
  }
}

export async function POST(req: NextRequest) {
  const body = (await req.json()) as Update;

  waitUntil(bot.handleUpdate(body).catch(console.error));

  return NextResponse.json(
    { ok: true },
    {
      status: 200,
    },
  );
}
