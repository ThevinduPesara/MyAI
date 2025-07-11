import {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} from "@google/generative-ai";

const MODEL_NAME = "gemini-2.5-pro";
const API_KEY = "AIzaSyBF12htp_wdXkg8hqjw6UfxMHaru2v-VsU";

const genAI = new GoogleGenerativeAI(API_KEY);

async function runChat(prompt) {
  const model = genAI.getGenerativeModel({ model: MODEL_NAME });

  const generationConfig = {
    temperature: 0.9,
    topK: 1,
    topP: 1,
    maxOutputTokens: 2048, // ✅ typo fixed from maxOutputtokens → maxOutputTokens
  };

  const safetySettings = [
    {
      category: HarmCategory.HARM_CATEGORY_HARASSMENT,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
  ];

  // ✅ Create a chat session
  const chat = await model.startChat({
    generationConfig,
    safetySettings,
    history: [], // optional: chat history for context
  });

  // ✅ Send the prompt
  const result = await chat.sendMessage(prompt);
  const response = result.response;
  return response.text();
}

export default runChat;
