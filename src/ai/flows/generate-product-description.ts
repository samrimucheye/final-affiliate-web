
'use server';
/**
 * @fileOverview Generates a product description based on the product name and keywords.
 *
 * - generateProductDescription - A function that generates the product description.
 * - GenerateProductDescriptionInput - The input type for the generateProductDescription function.
 * - GenerateProductDescriptionOutput - The return type for the generateProductDescription function.
 */

import {ai} from '@/ai/ai-instance'; // Ensure this path is correct for your ai instance
import {z} from 'genkit';

// Define schema internally, do not export
const GenerateProductDescriptionInputSchema = z.object({
  productName: z.string().describe('The name of the product.'),
  keywords: z.string().describe('Keywords related to the product (e.g., comma-separated).'),
});
// Export the TypeScript type
export type GenerateProductDescriptionInput = z.infer<
  typeof GenerateProductDescriptionInputSchema
>;

// Define schema internally, do not export
const GenerateProductDescriptionOutputSchema = z.object({
  description: z.string().describe('A short, engaging, and SEO-friendly product description (around 2-3 sentences).'),
});
// Export the TypeScript type
export type GenerateProductDescriptionOutput = z.infer<
  typeof GenerateProductDescriptionOutputSchema
>;

// Define the prompt for Genkit
const productDescriptionPrompt = ai.definePrompt({
  name: 'productDescriptionPrompt',
  input: { schema: GenerateProductDescriptionInputSchema },
  output: { schema: GenerateProductDescriptionOutputSchema },
  prompt: `You are an expert copywriter specializing in writing compelling and concise product descriptions for affiliate marketing websites. Your goal is to help drive clicks and conversions.

  Based on the product name and keywords provided, generate a short (2-3 sentences), engaging, and SEO-friendly product description. Highlight key benefits or unique selling points if inferable from the keywords. Maintain a positive and persuasive tone.

  Product Name: {{{productName}}}
  Keywords: {{{keywords}}}

  Generate the description:
  `,
  // Optional: Configure model parameters if needed
  // config: {
  //   temperature: 0.7,
  // },
});


// Define the flow that uses the prompt
const generateProductDescriptionFlow = ai.defineFlow(
  {
    name: 'generateProductDescriptionFlow',
    inputSchema: GenerateProductDescriptionInputSchema,
    outputSchema: GenerateProductDescriptionOutputSchema,
  },
  async (input) => {
    // Ensure API key is present before making a call
    if (!process.env.GOOGLE_GENAI_API_KEY) {
        console.error("GOOGLE_GENAI_API_KEY is not set. AI description generation will fail.");
        throw new Error("AI service API key is not configured.");
    }

    try {
        const { output } = await productDescriptionPrompt(input);
        if (!output || !output.description) {
            throw new Error("AI did not return a description.");
        }
        return output;
    } catch (error) {
        console.error("Error in generateProductDescriptionFlow:", error);
        if (error instanceof Error && error.message.includes("API key not valid")) {
            throw new Error("AI API Key is invalid or not authorized. Please check your GOOGLE_GENAI_API_KEY.");
        }
        if (error instanceof Error && error.message.includes("503 Service Unavailable") || error instanceof Error && error.message.includes("The model is overloaded")) {
            throw new Error("The AI service is currently overloaded or unavailable. Please try again later.");
        }
        // Re-throw other errors or handle them as needed
        throw error;
    }
  }
);

// Exported function that clients will call - this is an async function and is allowed
export async function generateProductDescription(
  input: GenerateProductDescriptionInput
): Promise<GenerateProductDescriptionOutput> {
  return generateProductDescriptionFlow(input);
}
