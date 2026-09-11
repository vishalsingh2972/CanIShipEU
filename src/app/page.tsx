"use client";

import {
  useRef,
  useState,
} from "react";

type Brief = {
  title: string;
  product: string;
  geography: string[];
  plannedLaunch?: string;
  status: string;
  confidence: string;
  asOfDate: string;
  summary: string;
  why: string[];
  relevantRegulations: string[];
  requirements: string[];
  importantDates: {
    date: string;
    description: string;
    evidenceIds: string[];
  }[];
  uncertainties: string[];
  whatWouldChange: string[];
  euVsUs: {
    eu: string;
    us: string;
  };
  evidence: {
    id: string;
    title: string;
    url: string;
    score: number;
  }[];
  disclaimer: string;
};

export default function Home() {
  const [description, setDescription] =
    useState("");

  const [brief, setBrief] =
    useState<Brief | null>(null);

  const [loading, setLoading] =
    useState(false);

  const [researchStage, setResearchStage] =
    useState(0);

  const [error, setError] =
    useState("");

  const [voiceLoading, setVoiceLoading] =
    useState(false);

  const [voiceRecording, setVoiceRecording] =
    useState(false);

  const audioContextRef =
    useRef<AudioContext | null>(null);

  const mediaStreamRef =
    useRef<MediaStream | null>(null);

  const sourceNodeRef =
    useRef<MediaStreamAudioSourceNode | null>(
      null,
    );

  const processorRef =
    useRef<ScriptProcessorNode | null>(
      null,
    );

  const audioChunksRef =
    useRef<Float32Array[]>([]);

  const researchStages = [
    "Understanding your startup",
    "Identifying regulatory areas",
    "Searching authoritative sources",
    "Verifying evidence",
    "Assessing the regulatory position",
  ];

  async function handleAnalyze(
    inputDescription = description,
  ) {
    if (
      !inputDescription.trim() ||
      loading
    ) {
      return;
    }

    setLoading(true);
    setError("");
    setBrief(null);
    setResearchStage(0);

    const stageTimer = setInterval(() => {
      setResearchStage((current) =>
        Math.min(
          current + 1,
          researchStages.length - 1,
        ),
      );
    }, 500);

    try {
      const response = await fetch(
        "/api/analyze",
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            description:
              inputDescription.trim(),
          }),
        },
      );

      const data =
        await response.json();

      if (!response.ok) {
        throw new Error(
          data.error ||
            "Analysis failed.",
        );
      }

      setBrief(data.brief);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong.",
      );
    } finally {
      clearInterval(stageTimer);

      setResearchStage(
        researchStages.length - 1,
      );

      setLoading(false);
    }
  }

  async function handleReadAssessment() {
    if (!brief || voiceLoading) {
      return;
    }

    setVoiceLoading(true);
    setError("");

    try {
      const voiceText = [
        brief.summary,
        brief.why[0],
        brief.requirements[0],
        brief.importantDates[0]
          ? `One important date is ${brief.importantDates[0].date}.`
          : "",
      ]
        .filter(Boolean)
        .join(" ");

      const response = await fetch(
        "/api/voice/test",
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            text: voiceText,
          }),
        },
      );

      if (!response.ok) {
        const data =
          await response.json().catch(
            () => null,
          );

        throw new Error(
          data?.error ||
            "Could not generate voice audio.",
        );
      }

      const audioBlob =
        await response.blob();

      const audioUrl =
        URL.createObjectURL(
          audioBlob,
        );

      const audio =
        new Audio(audioUrl);

      audio.onended = () => {
        URL.revokeObjectURL(
          audioUrl,
        );

        setVoiceLoading(false);
      };

      audio.onerror = () => {
        URL.revokeObjectURL(
          audioUrl,
        );

        setVoiceLoading(false);

        setError(
          "Voice playback failed.",
        );
      };

      await audio.play();
    } catch (err) {
      setVoiceLoading(false);

      setError(
        err instanceof Error
          ? err.message
          : "Voice playback failed.",
      );
    }
  }

  function mergeAudioChunks(
    chunks: Float32Array[],
  ) {
    const length = chunks.reduce(
      (total, chunk) =>
        total + chunk.length,
      0,
    );

    const result =
      new Float32Array(length);

    let offset = 0;

    for (const chunk of chunks) {
      result.set(chunk, offset);
      offset += chunk.length;
    }

    return result;
  }

  function downsampleTo16k(
    buffer: Float32Array,
    sampleRate: number,
  ) {
    if (sampleRate === 16000) {
      return buffer;
    }

    const ratio =
      sampleRate / 16000;

    const newLength = Math.round(
      buffer.length / ratio,
    );

    const result =
      new Float32Array(newLength);

    let offset = 0;

    for (
      let i = 0;
      i < newLength;
      i++
    ) {
      const nextOffset =
        Math.round(
          (i + 1) * ratio,
        );

      let sum = 0;
      let count = 0;

      for (
        let j = offset;
        j < nextOffset &&
        j < buffer.length;
        j++
      ) {
        sum += buffer[j];
        count++;
      }

      result[i] =
        count > 0
          ? sum / count
          : 0;

      offset = nextOffset;
    }

    return result;
  }

  function floatTo16BitPCM(
    input: Float32Array,
  ) {
    const buffer =
      new ArrayBuffer(
        input.length * 2,
      );

    const view =
      new DataView(buffer);

    for (
      let i = 0;
      i < input.length;
      i++
    ) {
      const sample =
        Math.max(
          -1,
          Math.min(1, input[i]),
        );

      view.setInt16(
        i * 2,
        sample < 0
          ? sample * 0x8000
          : sample * 0x7fff,
        true,
      );
    }

    return buffer;
  }

  async function handleVoiceInput() {
    if (voiceRecording) {
      stopVoiceRecording();
      return;
    }

    if (loading || voiceLoading) {
      return;
    }

    try {
      setError("");

      const stream =
        await navigator.mediaDevices.getUserMedia(
          {
            audio: true,
          },
        );

      const audioContext =
        new AudioContext();

      const source =
        audioContext.createMediaStreamSource(
          stream,
        );

      const processor =
        audioContext.createScriptProcessor(
          4096,
          1,
          1,
        );

      audioContextRef.current =
        audioContext;

      mediaStreamRef.current =
        stream;

      sourceNodeRef.current =
        source;

      processorRef.current =
        processor;

      audioChunksRef.current = [];

      processor.onaudioprocess = (
        event,
      ) => {
        const input =
          event.inputBuffer.getChannelData(
            0,
          );

        audioChunksRef.current.push(
          new Float32Array(input),
        );
      };

      source.connect(processor);

      processor.connect(
        audioContext.destination,
      );

      setVoiceRecording(true);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Could not access your microphone.",
      );
    }
  }

  function stopVoiceRecording() {
    const audioContext =
      audioContextRef.current;

    const stream =
      mediaStreamRef.current;

    const source =
      sourceNodeRef.current;

    const processor =
      processorRef.current;

    if (!audioContext || !stream) {
      return;
    }

    processor?.disconnect();
    source?.disconnect();

    stream
      .getTracks()
      .forEach((track) =>
        track.stop(),
      );

    const chunks =
      audioChunksRef.current;

    const combined =
      mergeAudioChunks(chunks);

    const pcm16 =
      downsampleTo16k(
        combined,
        audioContext.sampleRate,
      );

    const pcmBuffer =
      floatTo16BitPCM(pcm16);

    audioChunksRef.current = [];

    audioContext.close();

    audioContextRef.current = null;
    mediaStreamRef.current = null;
    sourceNodeRef.current = null;
    processorRef.current = null;

    setVoiceRecording(false);

    transcribeVoice(pcmBuffer);
  }

  async function transcribeVoice(
    pcmBuffer: ArrayBuffer,
  ) {
    setVoiceLoading(true);
    setError("");

    try {
      const formData =
        new FormData();

      formData.append(
        "audio",
        new Blob([pcmBuffer], {
          type: "audio/pcm",
        }),
        "recording.pcm",
      );

      const response =
        await fetch(
          "/api/voice/transcribe",
          {
            method: "POST",
            body: formData,
          },
        );

      const data =
        await response.json();

      if (!response.ok) {
        throw new Error(
          data.error ||
            "Could not transcribe your voice.",
        );
      }

      if (
        typeof data.text === "string" &&
        data.text.trim()
      ) {
        const transcript =
          data.text.trim();

        setDescription(
          transcript,
        );

        await handleAnalyze(
          transcript,
        );
      } else {
        throw new Error(
          "No speech was detected.",
        );
      }
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Voice transcription failed.",
      );
    } finally {
      setVoiceLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-white text-slate-950">
      <div className="mx-auto flex min-h-screen max-w-5xl flex-col px-6 py-10">
        <header className="flex items-center justify-between">
          <div className="text-lg font-semibold tracking-tight">
            🇪🇺 CanIShipEU
          </div>

          <div className="text-sm text-slate-500">
            Regulatory launch research
          </div>
        </header>

        <section className="flex flex-1 flex-col py-20">
          <div className="max-w-3xl">
            <p className="mb-5 text-sm font-medium uppercase tracking-[0.2em] text-slate-500">
              For European startup founders
            </p>

            <h1 className="text-5xl font-semibold leading-tight tracking-tight sm:text-6xl">
              Can you ship this in Europe?
              <span className="block text-slate-400">
                Just ask.
              </span>
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">
              Describe what you're building in
              plain English. CanIShipEU figures out
              which facts matter, researches the
              relevant EU rules, verifies the evidence,
              and gives you a dated regulatory launch
              brief.
            </p>

            <div className="mt-10 rounded-3xl border border-slate-200 bg-slate-50 p-4 shadow-sm">
              <textarea
                value={description}
                onChange={(event) =>
                  setDescription(
                    event.target.value,
                  )
                }
                placeholder="Tell me what you're building..."
                className="min-h-36 w-full resize-none bg-transparent p-4 text-base outline-none placeholder:text-slate-400"
              />

              <div className="flex items-center justify-between border-t border-slate-200 pt-4">
                <button
                  type="button"
                  onClick={
                    handleVoiceInput
                  }
                  disabled={
                    loading ||
                    voiceLoading
                  }
                  className={`rounded-full border px-4 py-2 text-sm font-medium transition ${
                    voiceRecording
                      ? "border-red-300 bg-red-50 text-red-700"
                      : "border-slate-300 text-slate-700 hover:bg-white"
                  } disabled:cursor-not-allowed disabled:opacity-50`}
                >
                  {voiceRecording
                    ? "⏹ Stop recording"
                    : voiceLoading
                      ? "🎙 Transcribing..."
                      : "🎙 Use voice"}
                </button>

                <button
                  type="button"
                  onClick={
                    () =>
                      handleAnalyze()
                  }
                  disabled={
                    !description.trim() ||
                    loading
                  }
                  className="rounded-full bg-slate-950 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  {loading
                    ? "Analyzing..."
                    : "Analyze →"}
                </button>
              </div>
            </div>

            {loading && (
              <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-sm font-semibold">
                      CanIShipEU is investigating
                    </div>

                    <div className="mt-1 text-sm text-slate-500">
                      {
                        researchStages[
                          researchStage
                        ]
                      }
                    </div>
                  </div>

                  <div className="h-2 w-2 animate-pulse rounded-full bg-slate-950" />
                </div>

                <div className="mt-5 space-y-2">
                  {researchStages.map(
                    (stage, index) => (
                      <div
                        key={stage}
                        className="flex items-center gap-3 text-sm"
                      >
                        <div
                          className={`flex h-5 w-5 items-center justify-center rounded-full text-xs ${
                            index <=
                            researchStage
                              ? "bg-slate-950 text-white"
                              : "border border-slate-200 text-slate-300"
                          }`}
                        >
                          {index <=
                          researchStage
                            ? "✓"
                            : ""}
                        </div>

                        <span
                          className={
                            index <=
                            researchStage
                              ? "text-slate-700"
                              : "text-slate-300"
                          }
                        >
                          {stage}
                        </span>
                      </div>
                    ),
                  )}
                </div>
              </div>
            )}

            {error && (
              <div className="mt-4 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
                {error}
              </div>
            )}

            <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm text-slate-400">
              <span>
                ✓ Current regulatory sources
              </span>

              <span>
                ✓ Evidence-backed
              </span>

              <span>
                ✓ Shows what could change the answer
              </span>
            </div>
          </div>

          {brief && (
            <section className="mt-16 max-w-4xl border-t border-slate-200 pt-12">
              <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
                <div className="flex flex-col gap-4 border-b border-slate-100 pb-6 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <p className="text-sm font-medium uppercase tracking-[0.18em] text-slate-400">
                      Regulatory Launch Brief
                    </p>

                    <h2 className="mt-2 text-2xl font-semibold tracking-tight">
                      {brief.geography.join(
                        " + ",
                      ) ||
                        "EU launch"}
                    </h2>
                  </div>

                  <div className="rounded-2xl bg-slate-950 px-4 py-3 text-left text-white">
                    <div className="text-xs uppercase tracking-wider text-slate-400">
                      Assessment
                    </div>

                    <div className="mt-1 font-semibold">
                      {brief.status.replace(
                        /_/g,
                        " ",
                      )}
                    </div>

                    <div className="mt-1 text-xs text-slate-400">
                      Confidence:{" "}
                      {brief.confidence}
                    </div>
                  </div>
                </div>

                <div className="grid gap-6 py-6 sm:grid-cols-3">
                  <div>
                    <div className="text-xs font-medium uppercase tracking-wider text-slate-400">
                      Product
                    </div>

                    <div className="mt-2 text-sm leading-6 text-slate-700">
                      {brief.product}
                    </div>
                  </div>

                  <div>
                    <div className="text-xs font-medium uppercase tracking-wider text-slate-400">
                      Geography
                    </div>

                    <div className="mt-2 text-sm text-slate-700">
                      {brief.geography.join(
                        ", ",
                      ) ||
                        "Not confirmed"}
                    </div>
                  </div>

                  <div>
                    <div className="text-xs font-medium uppercase tracking-wider text-slate-400">
                      Research current as of
                    </div>

                    <div className="mt-2 text-sm text-slate-700">
                      {brief.asOfDate}
                    </div>
                  </div>
                </div>

                <div className="border-t border-slate-100 pt-6">
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-400">
                        Summary
                      </h3>

                      <p className="mt-3 leading-7 text-slate-700">
                        {brief.summary}
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={
                        handleReadAssessment
                      }
                      disabled={
                        voiceLoading
                      }
                      className="shrink-0 rounded-full border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      {voiceLoading
                        ? "🔊 Speaking..."
                        : "🔊 Read assessment"}
                    </button>
                  </div>
                </div>

                <div className="mt-8 grid gap-8 sm:grid-cols-2">
                  <div>
                    <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-400">
                      Why
                    </h3>

                    <ul className="mt-3 space-y-3">
                      {brief.why.map(
                        (item) => (
                          <li
                            key={item}
                            className="text-sm leading-6 text-slate-700"
                          >
                            • {item}
                          </li>
                        ),
                      )}
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-400">
                      Relevant regulations
                    </h3>

                    <ul className="mt-3 space-y-3">
                      {brief.relevantRegulations.map(
                        (item) => (
                          <li
                            key={item}
                            className="text-sm leading-6 text-slate-700"
                          >
                            • {item}
                          </li>
                        ),
                      )}
                    </ul>
                  </div>
                </div>

                <div className="mt-8 border-t border-slate-100 pt-6">
                  <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-400">
                    Key requirements
                  </h3>

                  <ul className="mt-3 space-y-3">
                    {brief.requirements.map(
                      (item) => (
                        <li
                          key={item}
                          className="text-sm leading-6 text-slate-700"
                        >
                          □ {item}
                        </li>
                      ),
                    )}
                  </ul>
                </div>

                <div className="mt-8 grid gap-8 sm:grid-cols-2">
                  <div>
                    <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-400">
                      Important dates
                    </h3>

                    <div className="mt-3 space-y-4">
                      {brief.importantDates.map(
                        (item) => (
                          <div
                            key={item.date}
                            className="rounded-2xl bg-slate-50 p-4"
                          >
                            <div className="font-semibold">
                              {item.date}
                            </div>

                            <div className="mt-1 text-sm leading-6 text-slate-600">
                              {
                                item.description
                              }
                            </div>
                          </div>
                        ),
                      )}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-400">
                      What would change?
                    </h3>

                    <ul className="mt-3 space-y-3">
                      {brief.whatWouldChange.map(
                        (item) => (
                          <li
                            key={item}
                            className="text-sm leading-6 text-slate-700"
                          >
                            • {item}
                          </li>
                        ),
                      )}
                    </ul>
                  </div>
                </div>

                {brief.uncertainties.length >
                  0 && (
                  <div className="mt-8 rounded-2xl border border-amber-200 bg-amber-50 p-5">
                    <h3 className="text-sm font-semibold uppercase tracking-wider text-amber-700">
                      Uncertainties
                    </h3>

                    <ul className="mt-3 space-y-2">
                      {brief.uncertainties.map(
                        (item) => (
                          <li
                            key={item}
                            className="text-sm leading-6 text-amber-900"
                          >
                            • {item}
                          </li>
                        ),
                      )}
                    </ul>
                  </div>
                )}

                <div className="mt-8 border-t border-slate-100 pt-6">
                  <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-400">
                    EU vs US
                  </h3>

                  <div className="mt-4 grid gap-4 sm:grid-cols-2">
                    <div className="rounded-2xl bg-slate-50 p-4">
                      <div className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                        EU
                      </div>

                      <p className="mt-2 text-sm leading-6 text-slate-700">
                        {brief.euVsUs.eu}
                      </p>
                    </div>

                    <div className="rounded-2xl bg-slate-50 p-4">
                      <div className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                        US
                      </div>

                      <p className="mt-2 text-sm leading-6 text-slate-700">
                        {brief.euVsUs.us}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-8 border-t border-slate-100 pt-6">
                  <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-400">
                    Evidence
                  </h3>

                  <div className="mt-4 space-y-3">
                    {brief.evidence.map(
                      (item) => (
                        <a
                          key={item.id}
                          href={item.url}
                          target="_blank"
                          rel="noreferrer"
                          className="block rounded-2xl border border-slate-200 p-4 transition hover:bg-slate-50"
                        >
                          <div className="flex items-start justify-between gap-4">
                            <div>
                              <div className="text-sm font-medium text-slate-800">
                                {item.title}
                              </div>

                              <div className="mt-1 text-xs text-slate-400">
                                Evidence ID:{" "}
                                {item.id}
                              </div>
                            </div>

                            <div className="shrink-0 text-xs font-medium text-slate-500">
                              Score{" "}
                              {item.score}
                            </div>
                          </div>
                        </a>
                      ),
                    )}
                  </div>
                </div>

                <div className="mt-8 border-t border-slate-100 pt-6 text-xs leading-5 text-slate-400">
                  {brief.disclaimer}
                </div>
              </div>
            </section>
          )}
        </section>

        <footer className="border-t border-slate-100 pt-5 text-xs text-slate-400">
          Informational regulatory research only. Not legal advice.
        </footer>
      </div>
    </main>
  );
}