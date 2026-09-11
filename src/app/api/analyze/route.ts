import { NextResponse } from "next/server";

import { extractStartupProfile } from "../../../founder/profileExtractor";

import {
  verifyResearch,
} from "../../../regulatory/verifiedResearch";

import {
  buildEvidencePack,
} from "../../../regulatory/evidencePack";

import {
  buildAssessment,
} from "../../../regulatory/assessment";

import {
  buildFounderRegulatoryBrief,
} from "../../../regulatory/brief";

export async function POST(
  request: Request,
) {
  try {
    const body = await request.json();

    const description =
      typeof body.description === "string"
        ? body.description.trim()
        : "";

    if (!description) {
      return NextResponse.json(
        {
          error:
            "Please describe what you're building.",
        },
        { status: 400 },
      );
    }

    const profile =
      extractStartupProfile(
        description,
      );

    const research =
      verifyResearch(profile);

    const evidencePack =
      buildEvidencePack(research);

    const assessment =
      buildAssessment(
        profile,
        evidencePack,
      );

    const brief =
      buildFounderRegulatoryBrief(
        profile,
        assessment,
        evidencePack,
      );

    return NextResponse.json({
      brief,
    });
  } catch (error) {
    console.error(
      "CanIShipEU analysis failed:",
      error,
    );

    return NextResponse.json(
      {
        error:
          "Something went wrong while analyzing the startup.",
      },
      { status: 500 },
    );
  }
}