import { NextResponse } from "next/server";
import { model } from "../../../lib/gemini";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { businessType, city, goal, website, type } = body;

    const prompt = `
You are a Google Ads expert.

Business: ${businessType}
City: ${city}
Goal: ${goal}
Website: ${website}

Task: ${type}

Return ONLY valid JSON. No explanation.:

${
  type === "headlines"
    ? {"headlines": ["max 12 high converting headlines under 30 characters"]}
    : type === "descriptions"
    ? {"descriptions": ["max 4 descriptions under 90 characters"]}
    : type === "keywords"
    ? {"keywords": ["15 high intent buyer keywords"]}
    : `{
        "campaignName": "string",
        "headlines": ["12 headlines"],
        "descriptions": ["4 descriptions"],
        "keywords": ["15 keywords"],
        "budgetSuggestion": "₹500-1500/day",
        "scheduleSuggestion": {
          "days": ["Mon","Tue","Wed","Thu","Fri"],
          "time": "9AM-9PM"
        }
      }`
}
`;

    const result = await model.generateContent(prompt);
    const text = result.response.text();
    console.log("RAW AI:", text);


    // ⚠️ Clean JSON (Gemini sometimes extra text deta hai)
const cleaned = text.replace(/json|/g, "").trim();
console.log("CLEANED:", cleaned);

let data: any;

try {
  // 🔥 extract JSON only
  const match = text.match(/\{[\s\S]*\}/);

  if (!match) {
    throw new Error("No JSON found");
  }

  const jsonString = match[0];

  console.log("EXTRACTED JSON:", jsonString);

  data = JSON.parse(jsonString);

} catch (err) {
  console.error("❌ JSON ERROR:", text);

  return NextResponse.json(
    { error: "AI response invalid", raw: text },
    { status: 500 }
  );
}


// ✅ SAFE RETURN (structured)
return NextResponse.json({
  campaignName: data.campaignName || "",
  headlines: data.headlines || [],
  descriptions: data.descriptions || [],
  keywords: data.keywords || [],
  negativeKeywords: data.negativeKeywords || []
});
} catch (err) {
  console.error("AI ERROR:", err);

  return NextResponse.json(
    { error: "AI failed" },
    { status: 500 }
  );
}
}
