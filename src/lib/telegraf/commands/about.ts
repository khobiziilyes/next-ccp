import { type Context } from "telegraf";
import { createDebug } from "@/lib/createDebug";

// import packageInfo from "../../../package.json" assert { type: "json" };

const { author, name, version } = {
  author: "Ilyes K.",
  name: "telegram-ccp-bot",
  version: "1.0.0",
};

const debug = createDebug("bot:about_command");

export const about = () => async (ctx: Context) => {
  const message = `*${name} ${version}*\n${author}`;
  debug(`Triggered "about" command with message \n${message}`);
  await ctx.replyWithMarkdownV2(message, { parse_mode: "Markdown" });
};
