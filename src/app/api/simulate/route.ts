import { NextResponse } from "next/server";
import { QuestionnaireData } from "@/types";

export const maxDuration = 60; // 60 seconds max duration for Vercel Hobby tier

export async function POST(request: Request) {
  try {
    const data: QuestionnaireData = await request.json();

    const prompt = `
Қолданушы туралы ақпаратты талдап, 2050 жылғы мамандық болашағын симуляциялаңыз.

Қолданушы деректері:
Аты: ${data.name}
Жасы: ${data.age}
Оқу деңгейі: ${data.educationLevel}
Таңдаған мамандығы: ${data.profession}
Қызығушылықтары: ${data.interests}
Сүйікті пәндері: ${data.favoriteSubjects}
Болашақтағы мақсаты: ${data.futureGoal}
Қазіргі дағдылары: ${data.currentSkills}
Жұмыс стилі: ${data.workStyle}
AI туралы білім деңгейі: ${data.aiKnowledgeLevel}
Үйренгісі келетін бағыттары: ${data.desiredDirections}

Талаптар:
1. Жауап қазақ тілінде болсын.
2. Нәтиже түсінікті болсын.
3. Қорқыту емес, бағыт беру мақсаты болсын.
4. AI қауіптілік пайызы берілсін (0-100%).
5. Нақты дағдылар ұсынылсын.
6. 1 ай, 6 ай, 1 жылдық жоспар берілсін.
7. 2050 жылғы бір күн сценарийі жазылсын.
8. Future ID Card деректері бөлек берілсін.

Тек қана дұрыс JSON форматында жауап беріңіз, ешқандай қосымша мәтін немесе markdown қоспаңыз. JSON құрылымы мынадай болуы керек:
{
  "future_profession": "string",
  "ai_risk_percentage": number,
  "risk_level": "төмен | орташа | жоғары | өте жоғары",
  "short_summary": "string",
  "profession_future": "string",
  "required_skills": {
    "technical": ["string"],
    "soft": ["string"],
    "professional": ["string"]
  },
  "future_day_story": "string",
  "development_plan": {
    "one_month": ["string"],
    "six_months": ["string"],
    "one_year": ["string"]
  },
  "future_id_card": {
    "name": "${data.name}",
    "future_profession": "string",
    "main_skill": "string",
    "status": "string",
    "id_code": "FTR-2050-XXXX"
  },
  "advice": "string"
}
`;

    const openAiKey = process.env.OPENAI_API_KEY;
    
    if (!openAiKey) {
      return NextResponse.json({ error: "API key is missing" }, { status: 500 });
    }

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${openAiKey}`
      },
      body: JSON.stringify({
        model: "gpt-4o",
        messages: [
          {
            role: "system",
            content: "Сіз болашақ мамандықтары бойынша сарапшы және кәсіби бағдар беруші AI-сыз."
          },
          {
            role: "user",
            content: prompt
          }
        ],
        temperature: 0.7,
        response_format: { type: "json_object" }
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("OpenAI error:", errorData);
      return NextResponse.json({ error: "AI уақытша жауап бере алмады." }, { status: response.status });
    }

    const result = await response.json();
    const content = JSON.parse(result.choices[0].message.content);

    return NextResponse.json(content);
  } catch (error) {
    console.error("Simulation error:", error);
    return NextResponse.json({ error: "Серверде қате шықты." }, { status: 500 });
  }
}
