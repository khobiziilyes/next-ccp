import { Telegraf } from "telegraf";
import { createDebug } from "@/lib/createDebug";

import { about } from "./commands";
import { onText } from "./on-text";

const BOT_TOKEN = process.env.BOT_TOKEN ?? "";
export const bot = new Telegraf(BOT_TOKEN);

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const debug = createDebug("bot:bot");

bot.command("about", about());
bot.on("text", onText());

void bot.telegram.setMyCommands([
  {
    command: "about",
    description: "About command",
  },
]);
