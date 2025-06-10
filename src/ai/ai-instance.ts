import { genkit, type GenkitError } from "genkit";
import { googleAI } from "@genkit-ai/googleai";

// Use 'unknown' initially, then narrow to the correct type after initialization
let aiInstance:
  | ReturnType<typeof genkit>
  | {
      defineFlow: () => () => never;
      definePrompt: () => () => never;
      generate: () => Promise<never>;
    }
  | null = null;
let initializationError: Error | null = null;

try {
  if (!process.env.GOOGLE_GENAI_API_KEY) {
    const errorMessage =
      "CRITICAL AI CONFIG ERROR (SERVER-SIDE): GOOGLE_GENAI_API_KEY is not defined in the environment. AI features will not work and this WILL cause server errors if AI functionality is invoked. Please set this variable in your .env file (for local development) and in your deployment platform's environment variable settings.";
    console.error(
      `\n\n${"*".repeat(100)}\n${errorMessage}\n${"*".repeat(100)}\n\n`
    );
    // We'll let Genkit potentially throw its own error if the key is truly missing when a plugin needs it,
    // but this console error makes the cause very clear during startup or first use.
    // We don't throw here to allow the app to start if AI isn't immediately used.
  }

  aiInstance = genkit({
    promptDir: "./prompts", // This path might need adjustment if your prompts are elsewhere
    plugins: [
      googleAI({
        apiKey: process.env.GOOGLE_GENAI_API_KEY, // Pass the key; plugin should handle if it's undefined/invalid
      }),
    ],
    model: "googleai/gemini-2.0-flash", // Default model, ensure it's appropriate for your key
  });

  console.log("Genkit AI instance configured.");
} catch (err) {
  initializationError = err as Error;
  console.error(
    `\n\n${"*".repeat(
      100
    )}\nCRITICAL ERROR DURING GENKIT INITIALIZATION (src/ai/ai-instance.ts):\n${
      initializationError.message
    }\n${
      initializationError.stack || ""
    }\nThis likely means AI features will be completely broken and could lead to Internal Server Errors.\nPossible causes:\n1. Invalid GOOGLE_GENAI_API_KEY (e.g., malformed, incorrect project, API not enabled).\n2. Issues with Genkit or GoogleAI plugin versions or compatibility.\n3. Underlying network or configuration problems preventing plugin initialization.\n${"*".repeat(
      100
    )}\n\n`
  );
  // We create a placeholder 'ai' object so the rest of the app doesn't crash on import,
  // but AI calls will fail.
  aiInstance = {
    defineFlow: () => () => {
      throw new Error(
        `Genkit failed to initialize: ${initializationError?.message}`
      );
    },
    definePrompt: () => () => {
      throw new Error(
        `Genkit failed to initialize: ${initializationError?.message}`
      );
    },
    generate: async () => {
      throw new Error(
        `Genkit failed to initialize: ${initializationError?.message}`
      );
    },
    // Add other methods you might call on 'ai' if necessary, all throwing this error.
  };
}

export const ai = aiInstance;

export function getGenkitInitializationError(): Error | null {
  return initializationError;
}
