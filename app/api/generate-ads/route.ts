import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { businessType, city, goal, website } = body;

    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
    });

    const prompt = `
You are a Google Ads expert.

Return ONLY valid JSON.
NO explanation. NO text. NO markdown.

FORMAT:
{
  "campaignName": "string",
  "headlines": ["max 12"],
  "descriptions": ["max 4"],
  "keywords": ["15 high intent keywords"],
  "negativeKeywords": ["10 irrelevant keywords"]
}

Business Type: ${businessType}
City: ${city}
Goal: ${goal}
Website: ${website}
`;

    const result = await model.generateContent(prompt);
    const text = result.response.text();

    console.log("RAW AI:", text);

    let data;

    try {
      // 🔥 JSON extract fix
      const match = text.match(/\{[\s\S]*\}/);
      if (!match) throw new Error("No JSON");

      data = JSON.parse(match[0]);
    } catch (e) {
      console.error("❌ JSON ERROR:", text);

      // fallback (important)
      data = {
        campaignName: "Sample Campaign",
        headlines: ["Best Service Near You"],
        descriptions: ["Call now for instant service"],
        keywords: ["service near me", "best service"],
        negativeKeywords: ["free", "jobs"],
      };
    }

    // 🔥 safety
    data.headlines = data.headlines || [];
    data.descriptions = data.descriptions || [];
    data.keywords = data.keywords || [];
    data.negativeKeywords = data.negativeKeywords || [];

    return NextResponse.json(data);

  } catch (err) {
    console.error("API ERROR:", err);

    return NextResponse.json(
      { error: "AI failed" },
      { status: 500 }
    );
  }
}