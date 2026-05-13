import { ReadableStream } from "node:stream/web";

export async function POST(req) {
  try {
    const body = await req.json();

    const backendUrl = process.env.BACKEND_URL;
    const internalToken = process.env.INTERNAL_API_TOKEN;

    const upstream = await fetch(`${backendUrl.replace(/\/$/, "")}/api/v1/chat`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${internalToken}`,
      },
      body: JSON.stringify({
        session_id: body.session_id,
        message: body.message,
      }),
      cache: "no-store",
    });

    if (!upstream.ok) {
      const errorText = await upstream.text().catch(() => "");
      return Response.json(
        {
          error: "Upstream chatbot error",
          details: errorText || upstream.statusText,
        },
        { status: upstream.status || 502 }
      );
    }

    const data = await upstream.json();
    const reply = data.reply || "";

    const stream = new ReadableStream({
      start(controller) {
        const encoder = new TextEncoder();

        controller.enqueue(
          encoder.encode(`data: ${JSON.stringify({
            type: "meta",
            conversation_id: data.conversation_id,
          })}\n\n`)
        );

        for (const chunk of reply.split(/(\s+)/)) {
          if (!chunk) continue;
          controller.enqueue(
            encoder.encode(`data: ${JSON.stringify({
              type: "token",
              token: chunk,
            })}\n\n`)
          );
        }

        controller.enqueue(encoder.encode(`data: [DONE]\n\n`));
        controller.close();
      },
    });

    return new Response(stream, {
      headers: {
        "Content-Type": "text/event-stream; charset=utf-8",
        "Cache-Control": "no-cache, no-transform",
        "Connection": "keep-alive",
        "X-Accel-Buffering": "no",
      },
    });
  } catch {
    return Response.json(
      { error: "Failed to proxy chat request" },
      { status: 500 }
    );
  }
}