import { Router, type IRouter } from "express";
import { SubscribeBody, CreatePreorderBody } from "@workspace/api-zod";
import { db, subscribersTable, preordersTable } from "@workspace/db";
import { rateLimit } from "../middlewares/rate-limit";
import { notify } from "../lib/notify";

const router: IRouter = Router();

const limiter = rateLimit({ windowMs: 10 * 60 * 1000, max: 10 });

router.post("/subscribe", limiter, async (req, res) => {
  const parsed = SubscribeBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: "Please enter a valid email address" });
    return;
  }
  const email = parsed.data.email.trim().toLowerCase();
  await db.insert(subscribersTable).values({ email }).onConflictDoNothing();
  req.log.info("New subscriber");
  res.status(201).json({ ok: true });
});

router.post("/preorders", limiter, async (req, res) => {
  const parsed = CreatePreorderBody.safeParse(req.body);
  if (!parsed.success || !Number.isInteger(parsed.data.quantity)) {
    res.status(400).json({ error: "Please check the form fields" });
    return;
  }
  const d = parsed.data;
  const [row] = await db
    .insert(preordersTable)
    .values({
      name: d.name.trim(),
      email: d.email.trim().toLowerCase(),
      phone: d.phone?.trim() || null,
      country: d.country?.trim() || null,
      quantity: d.quantity,
      comment: d.comment?.trim() || null,
    })
    .returning({ id: preordersTable.id });

  req.log.info({ id: row!.id }, "New pre-order");
  void notify(
    `🤖 New AstroBot pre-order #${row!.id}\n${d.name} <${d.email}>\nQty: ${d.quantity}${d.country ? `\nCountry: ${d.country}` : ""}${d.phone ? `\nPhone: ${d.phone}` : ""}${d.comment ? `\n${d.comment}` : ""}`,
  );
  res.status(201).json({ id: row!.id, ok: true });
});

export default router;
