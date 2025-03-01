import { bot } from "./bot";
import { createDebug } from "@/lib/createDebug";

const IS_DEV = process.env.NODE_ENV === "development";
const debug = createDebug("bot:dev");

if (IS_DEV) {
  debug("Bot runs in development mode");

  const botInfo = (await bot.telegram.getMe()).username;

  debug(`${botInfo} deleting webhook`);
  await bot.telegram.deleteWebhook();

  debug(`${botInfo} starting polling`);
  await bot.launch();

  process.once("SIGINT", () => bot.stop("SIGINT"));
  process.once("SIGTERM", () => bot.stop("SIGTERM"));
}
