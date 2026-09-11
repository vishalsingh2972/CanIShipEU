import { NextResponse } from "next/server";
import WebSocket from "ws";

export async function POST(
  request: Request,
) {
  const apiKey = process.env.GRADIUM_API_KEY;

  if (!apiKey) {
    return NextResponse.json(
      {
        error:
          "GRADIUM_API_KEY is not configured.",
      },
      { status: 500 },
    );
  }

  try {
    const body = await request.json();

    const text =
      typeof body.text === "string"
        ? body.text.trim()
        : "";

    if (!text) {
      return NextResponse.json(
        {
          error:
            "No text was provided for speech.",
        },
        { status: 400 },
      );
    }

    return await synthesizeWithGradium(
      apiKey,
      text,
    );
  } catch (error) {
    console.error(
      "Gradium TTS failed:",
      error,
    );

    return NextResponse.json(
      {
        error:
          "Could not generate voice audio.",
      },
      { status: 500 },
    );
  }
}

function synthesizeWithGradium(
  apiKey: string,
  text: string,
): Promise<Response> {
  return new Promise((resolve) => {
    const ws = new WebSocket(
      "wss://api.gradium.ai/api/speech/tts",
      {
        headers: {
          "x-api-key": apiKey,
        },
      },
    );

    const audioChunks: Buffer[] = [];

    ws.on("open", () => {
      ws.send(
        JSON.stringify({
          type: "setup",
          model_name: "default",
          voice_id: "Bla6SbVMczYnOhfK",
          output_format: "wav",
        }),
      );
    });

    ws.on("message", (data) => {
      const message = JSON.parse(
        data.toString(),
      );

      if (message.type === "ready") {
        ws.send(
          JSON.stringify({
            type: "text",
            text,
          }),
        );

        ws.send(
          JSON.stringify({
            type: "end_of_stream",
          }),
        );
      }

      if (message.type === "audio") {
        audioChunks.push(
          Buffer.from(
            message.audio,
            "base64",
          ),
        );
      }

      if (
        message.type ===
        "end_of_stream"
      ) {
        const audio = Buffer.concat(
          audioChunks,
        );

        ws.close();

        resolve(
          new Response(audio, {
            status: 200,
            headers: {
              "Content-Type":
                "audio/wav",
              "Content-Length":
                audio.length.toString(),
            },
          }),
        );
      }
    });

    ws.on("error", (error) => {
      console.error(
        "Gradium WebSocket error:",
        error,
      );

      resolve(
        NextResponse.json(
          {
            error:
              "Gradium connection failed.",
          },
          { status: 500 },
        ),
      );
    });
  });
}