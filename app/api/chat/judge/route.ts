import Groq from "groq-sdk";
import { NextResponse } from "next/server";

const client = new Groq({ apiKey: process.env.GROQ_API_KEY });

export async function POST(req: Request) {
  const { input, scenario, history, index } = await req.json();

  const resp = await client.chat.completions.create({
    model: "llama3-70b-8192",
    temperature: 0.2,
    messages: [
      {
        role: "system",
        content:
          "The player has been given a heist scenario and they need to come up with a creater plan to progress the scenario. You are the gamemaster who will determine whether they succeed or fail, and continue the story.",
      },
      {
        role: "system",
        content: "Here is the scenario: " + scenario,
      },
      {
        role: "system",
        content: `This is the ${index} scenario. Determine whether the player's plan is sufficient enough to pass the scenario. ${
          index === 3
            ? "This is final scenario. Wrap up the scenario here"
            : "If they failed, then the heist ends. If they pass, then create another scenario for which they need to come up with a new plan."
        } `,
      },
      {
        role: "system",
        content:
          "If the user does not provide a creative or valid plan, then criticise their plan and fail them in a gruesome way.",
      },
      {
        role: "system",
        content:
          "The scenarios should be passable with a decently thought out plan. Reward creativity, and punish lazy and straightforward plans.",
      },

      {
        role: "user",
        content: input,
      },
      {
        role: "system",
        content:
          "Your response should be in the json schema: { outcome: 'success' | 'failure', scenario: scenario_string (should be around 50-100 words) }",
      },
    ],

    response_format: { type: "json_object" },
  });

  return NextResponse.json(resp.choices[0].message.content);
}
