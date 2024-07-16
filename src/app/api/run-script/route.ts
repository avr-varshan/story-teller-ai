require('loud-rejection/register');

import { NextResponse } from "next/server";
import { RunEventType, RunOpts } from "@gptscript-ai/gptscript";
import g from "@/lib/gptScriptInstance";

const script = "/Users/varshan/programme/projects/storyteller-ai/src/app/api/run-script/story-book.gpt";

export async function POST(request: Request) {
    const { story, pages, path } = await request.json();

    const opts: RunOpts = {
        disableCache: true,
        input: `--story ${story} --pages ${pages} --path ${path}`,
    };

    try {
        const encoder = new TextEncoder();
        const stream = new ReadableStream({
            async start(controller) {
                try {
                    const run = await g.run(script, opts);

                    run.on(RunEventType.Event, (data) => {
                        controller.enqueue(
                            encoder.encode(`event: ${JSON.stringify(data)}\n\n`)
                        );
                    });
                } catch (error) {
                    controller.error(error);
                    console.error("Error in run script:", error);
                }
            },
        });

        return new NextResponse(stream, {
            headers: {
                "Content-Type": "text/event-stream",
                "Cache-Control": "no-cache",
                "Connection": "keep-alive",
            },
        });
    } catch (error) {
        console.error("General Error:", error);
        return new NextResponse(JSON.stringify({ error: error }), {
            status: 500,
        });
    }
}
