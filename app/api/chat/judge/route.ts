import Groq from "groq-sdk";
import { NextResponse } from "next/server";

const client = new Groq({ apiKey: process.env.GROQ_API_KEY });

export async function POST(req: Request) {
  const { input, messages } = await req.json();

  const userResponse = {
    role: "user",
    content: input,
  };

  const newSystemMessage = {
    role: "system",
    content:
      "Now you will judge the player's response and decide if the plan is good enough to proceed. If not successful, continue the scenario that results in the player's failure. If successful, then proceed the scenario.",
  };

  const schemaMessage = {
    role: "system",
    content:
      "Your response should be in the json schema: { outcome: 'success' | 'failure', scenario: 'scenario' }",
  };

  const resp = await client.chat.completions.create({
    model: "llama3-70b-8192",
    messages: [...messages, userResponse, newSystemMessage, schemaMessage],
    response_format: { type: "json_object" },
  });

  return NextResponse.json(resp.choices[0].message.content);
}
