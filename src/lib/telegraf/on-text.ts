import { type Context } from "telegraf";
import { type Message, type Update } from "telegraf/types";

import { createDebug } from "@/lib/createDebug";

import { calcCcpRib, calcFormattedCcpRib } from "@/lib/ccp/calc-ccp-rib";
import { calcCcpRip } from "@/lib/ccp/calc-ccp-rip";
import { calcCcpKey } from "@/lib/ccp/calc-ccp-key";

const debug = createDebug("bot:on_text");

const codeBlock = (text: string) => `<pre><code>${text}</code></pre>`;

export const onText =
  () => async (ctx: Context<Update.MessageUpdate<Message.TextMessage>>) => {
    debug(`Triggered "on_text".`);

    const { text } = ctx.update.message;

    const isAllNumbers = /^\d+$/.test(text);
    if (!isAllNumbers) {
      await ctx.reply("Please send a number.");
      return;
    }

    const ccpKey = calcCcpKey(text);
    const ccpRip = calcCcpRip(text);
    const ccpRib = calcCcpRib(text);
    const ccpFormattedRib = calcFormattedCcpRib(text);

    const highlighted =
      "Tap the copy button to copy any of the outputs.\n\n" +
      "CCP KEY\n" +
      codeBlock(ccpKey) +
      "\n\nCCP RIP\n" +
      codeBlock(ccpRip) +
      "\n\nCCP RIB\n" +
      codeBlock(ccpRib) +
      "\n\nCCP FORMATTED RIB\n" +
      codeBlock(ccpFormattedRib);

    await ctx.reply(highlighted, {
      parse_mode: "HTML",
    });
  };
