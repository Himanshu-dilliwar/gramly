// src/app/api/webhook/instagram/route.ts
import { NextRequest, NextResponse } from "next/server";
import { matchKeyword, getKeywordAutomation } from "@/actions/webhook/queries";
import { sendDm } from "@/lib/fetch";

export async function GET(req: NextRequest) {
  const challenge = req.nextUrl.searchParams.get("hub.challenge");
  return new NextResponse(challenge);
}

export async function POST(req: NextRequest) {
  const payload = await req.json();

  let text: string | null = null;
  let isDM = false;

  // DM
  if (payload.entry?.[0]?.messaging) {
    text = payload.entry[0].messaging[0]?.message?.text;
    isDM = true;
  }

  // Comment
  if (payload.entry?.[0]?.changes) {
    text = payload.entry[0].changes[0]?.value?.text;
    isDM = false;
  }

  if (!text) {
    return NextResponse.json({ ok: true });
  }

  const keyword = await matchKeyword(text);

  if (!keyword?.automationId) {
    return NextResponse.json({ ok: true });
  }

  const automation = await getKeywordAutomation(
    keyword.automationId,
    isDM
  );

  if (!automation || !automation.listener) {
    return NextResponse.json({ ok: true });
  }
  if (automation && automation.trigger) {
    if (
      automation.listener &&
      automation.listener.listener === "MESSAGE"
    ) {
      const token = automation.user?.integrations[0]?.token;
      if (automation.listener.prompt && token) {
        const direct_message = await sendDm(
          payload.entry[0].id,
          payload.entry[0].messaging[0].sender.id,
          automation.listener.prompt,
          token
        );
    
        if (direct_message?.status === 200) {
          console.log("Message sent successfully");
        } else {
          console.error("Failed to send message", direct_message);
        }
      }
    }
  }
  // 👉 Execute action here
  // sendMessage() OR smartAIReply()

  return NextResponse.json({ success: true });
}
