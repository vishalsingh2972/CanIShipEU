import { NextResponse } from "next/server";

export async function POST(
  request: Request,
) {
  const apiKey =
    process.env.GRADIUM_API_KEY;

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
    const formData =
      await request.formData();

    const audio =
      formData.get("audio");

    if (!(audio instanceof File)) {
      return NextResponse.json(
        {
          error:
            "Audio file is required.",
        },
        { status: 400 },
      );
    }

    const audioBuffer =
      await audio.arrayBuffer();

    const response = await fetch(
      "https://api.gradium.ai/api/post/speech/asr?json_config=%7B%22language%22%3A%22en%22%7D",
      {
        method: "POST",
        headers: {
          "x-api-key": apiKey,
          "Content-Type":
            "audio/pcm",
        },
        body: audioBuffer,
      },
    );

    if (!response.ok) {
      const errorText =
        await response.text();

      console.error(
        "Gradium STT error:",
        response.status,
        errorText,
      );

      return NextResponse.json(
        {
          error:
            `Gradium transcription failed (${response.status}).`,
        },
        { status: 502 },
      );
    }

    const responseText =
      await response.text();

    let transcript = "";

    for (const line of responseText.split(
      "\n",
    )) {
      if (!line.trim()) {
        continue;
      }

      try {
        const message =
          JSON.parse(line);

        if (
          message.type === "text"
        ) {
          transcript +=
            `${message.text || ""} `;
        }

        if (
          message.type === "error"
        ) {
          throw new Error(
            message.message ||
              "Gradium returned an STT error.",
          );
        }
      } catch (error) {
        if (
          error instanceof Error &&
          error.message.includes(
            "Gradium returned an STT error",
          )
        ) {
          throw error;
        }

        console.warn(
          "Could not parse Gradium STT line:",
          line,
        );
      }
    }

    const text =
      transcript.trim();

    if (!text) {
      return NextResponse.json(
        {
          error:
            "No speech was detected.",
        },
        { status: 422 },
      );
    }

    return NextResponse.json({
      text,
    });
  } catch (error) {
    console.error(
      "Gradium STT failed:",
      error,
    );

    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Could not transcribe audio.",
      },
      { status: 500 },
    );
  }
}