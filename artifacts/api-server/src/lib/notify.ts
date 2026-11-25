import { logger } from "./logger";

/**
 * Optional Telegram notification for new leads.
 * Enabled when TELEGRAM_BOT_TOKEN and TELEGRAM_CHAT_ID are set; never throws.
 */
export async function notify(text: string): Promise<void> {
  const token = process.env["TELEGRAM_BOT_TOKEN"];
  const chatId = process.env["TELEGRAM_CHAT_ID"];
  if (!token || !chatId) return;
  try {
    const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ chat_id: chatId, text }),
      signal: AbortSignal.timeout(5000),
    });
    if (!res.ok) logger.warn({ status: res.status }, "Telegram notify failed");
  } catch (err) {
    logger.warn({ err }, "Telegram notify failed");
  }
}
