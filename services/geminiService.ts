import { GoogleGenAI, Type, Schema } from "@google/genai";
import { DivinationResult } from "../types";

// Fallback generator in case API is missing or fails
const generateFallbackFortune = (name: string, date: string): DivinationResult => {
  const seed = name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) + new Date(date).getTime();
  
  const linggens = ["变异雷灵根", "九天玄冰体", "荒古圣体", "五行杂灵根", "混沌道胎", "极品火灵根"];
  const realms = ["大乘期圆满", "陆地神仙", "化神初期", "金丹大圆满", "渡劫期半仙"];
  const elements = ["雷霆万钧", "水泽国度", "焚天烈火", "厚土载物", "庚金杀伐"];
  const artifacts = ["青竹蜂云剑", "玄天斩灵剑", "造化玉碟残片", "掌天瓶", "山河社稷图"];
  
  const pick = (arr: string[]) => arr[seed % arr.length];

  return {
    linggen: pick(linggens),
    realm: pick(realms),
    element: pick(elements),
    poem: "大鹏一日同风起，扶摇直上九万里。\n假令风歇时下来，犹能簸却沧溟水。",
    analysis: `道友名为${name}，生于${date}。观你骨骼清奇，虽生于末法时代，却不仅有${pick(linggens)}护体，更有${pick(realms)}之潜力。大道三千，你独占其一，只要坚守道心，必能证道长生。切记，${new Date(date).getFullYear() + 20}年或有情劫，需以此${pick(artifacts)}化解。`,
    luckyArtifact: pick(artifacts)
  };
};

export const getDivination = async (name: string, birthDate: string): Promise<DivinationResult> => {
  // 1. 尝试从环境变量获取 (AI Studio 环境标准做法)
  const envKey = process.env.API_KEY;

  // 2. 如果你想硬编码 Key，请填入下方引号内 (注意：必须保留引号 "")
  // 例如: const hardcodedKey = "AIzaSy...";
  const hardcodedKey = "AIzaSyA9TxxpjBnKX9HnRVFlov8C5wPSDfklcPM"; 

  // 优先使用环境变量，如果没有则使用硬编码 Key
  const apiKey = envKey || hardcodedKey;

  if (!apiKey || apiKey.includes("在这里填入")) {
    console.warn("API Key is missing or invalid. Using fallback mode.");
    // 模拟网络延迟，然后返回本地算法结果
    return new Promise(resolve => setTimeout(() => resolve(generateFallbackFortune(name, birthDate)), 2000));
  }

  try {
    const ai = new GoogleGenAI({ apiKey });
    
    // More grandiose prompt
    const prompt = `
      You are the "Heavenly Secret Elder" (天机老人) of a supreme cultivation sect.
      Perform a serious and mystical divination for a mortal named "${name}" born on "${birthDate}".
      
      Output JSON strictly.
      
      Fields:
      - linggen: 4-6 chars. Creative Spirit Root. Examples: "荒古圣体", "太阴幽荧体", "九劫雷灵根".
      - realm: The absolute peak cultivation realm they are destined for. Examples: "大罗金仙", "仙帝", "渡劫期".
      - element: 4 chars describing their element. e.g. "离火焚天", "弱水三千".
      - poem: A creative 4-line 7-character Chinese poem (七言绝句 style) describing their epic destiny.
      - analysis: A profound, slightly archaic paragraph (approx 100 words) analyzing their fate, warning of a specific "Tribulation" (劫难), and praising their potential. Use terms like "道友", "机缘", "心魔".
      - luckyArtifact: A legendary artifact name. e.g. "东皇钟", "诛仙剑".

      Tone: Ancient, Profound, Mystical.
      Language: Simplified Chinese.
    `;

    const schema: Schema = {
      type: Type.OBJECT,
      properties: {
        linggen: { type: Type.STRING },
        realm: { type: Type.STRING },
        element: { type: Type.STRING },
        poem: { type: Type.STRING },
        analysis: { type: Type.STRING },
        luckyArtifact: { type: Type.STRING },
      },
      required: ["linggen", "realm", "element", "poem", "analysis", "luckyArtifact"],
    };

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: schema,
        temperature: 1, 
      },
    });

    const text = response.text;
    if (!text) throw new Error("No response");

    return JSON.parse(text) as DivinationResult;

  } catch (error) {
    console.error("Divination failed:", error);
    // Fallback to local generation if API fails (e.g. quota exceeded or invalid key)
    return generateFallbackFortune(name, birthDate);
  }
};