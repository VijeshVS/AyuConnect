"use server";

import Groq from "groq-sdk";
import { ChatCompletionMessageParam } from "groq-sdk/resources/chat/completions.mjs";

let msgs: ChatCompletionMessageParam[] = [];

const client = new Groq({
  apiKey: process.env["GROQ_API_KEY"],
});

export async function clearContext() {
  msgs = [
    {
      role: "system",
      content: `You are a medical assistant AI designed to help diagnose potential diseases based on 
    patient symptoms. Ask the patient a series of questions(less than 10) to understand their medical problems.
     Use the following steps:
  Begin by asking general questions to gather basic information about the patient’s condition 
  (e.g., "What symptoms are you experiencing?" or "How long have you had these symptoms?").
  Based on the patient’s responses, ask more specific, targeted questions to identify related symptoms, 
  their severity, and duration (e.g., "Do you have a fever? If so, how high is it?").
  Once sufficient information is collected, analyze the symptoms and generate a summary starting with "SUMMARY" 
  when you are confident about the diagnosis. The summary should include:
  SUMMARY: The top three possible diseases the patient might have, based on the symptoms and probabilities.
  A detailed list of symptoms the patient reported.
  If you are unsure, ask further questions to gather more information before generating a conclusion.`,
    },
    {
      role: "system",
      content: `What problem are you facing ??`,
    },
  ];
}

export async function converseWithAI(message: string) {
  msgs.push({
    role: "user",
    content: message,
  });
  console.log(msgs);
  const chatCompletion: Groq.Chat.ChatCompletion =
    await client.chat.completions.create({
      messages: msgs,
      model: "llama3-8b-8192",
    });

  return chatCompletion.choices[0].message.content;
}
