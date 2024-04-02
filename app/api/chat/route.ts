import {
  GoogleGenerativeAI,
  type GenerateContentRequest,
} from "@google/generative-ai"
import { GoogleGenerativeAIStream, Message, StreamingTextResponse } from "ai"

const ai = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY!)

export const runtime = "edge"

export async function POST(req: Request) {
  const data = await req.json()
  const messages = data.messages as Message[]

  const geminiStream = await ai
    .getGenerativeModel({ model: "gemini-pro" })
    .generateContentStream(buildPrompt(messages))

  const stream = GoogleGenerativeAIStream(geminiStream)

  return new StreamingTextResponse(stream)
}

function buildPrompt(messages: Message[]): GenerateContentRequest {
  return {
    contents: messages
      .filter(
        (message) => message.role === "user" || message.role === "assistant"
      )
      .map((message) => ({
        role: message.role === "user" ? "user" : "model",
        parts: [{ text: message.content }],
      })),
  }
}
