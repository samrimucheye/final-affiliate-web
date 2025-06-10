"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { generateProductDescription } from "@/ai/flows/generate-product-description";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";
import { Wand2, AlertTriangle, Loader2 } from "lucide-react"; // Added Loader2

const formSchema = z.object({
  productName: z
    .string()
    .min(2, {
      message: "Product name must be at least 2 characters.",
    })
    .max(100, { message: "Product name must be 100 characters or less." }),
  keywords: z
    .string()
    .min(3, {
      message: "Keywords must be at least 3 characters.",
    })
    .max(150, { message: "Keywords must be 150 characters or less." }),
});

type AiFormValues = z.infer<typeof formSchema>;

const AiDescription: React.FC = () => {
  const [generatedDescription, setGeneratedDescription] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const form = useForm<AiFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      productName: "",
      keywords: "",
    },
  });

  async function onSubmit(values: AiFormValues) {
    setIsLoading(true);
    setGeneratedDescription("");
    try {
      const aiResult = await generateProductDescription({
        productName: values.productName,
        keywords: values.keywords,
      });
      setGeneratedDescription(aiResult.description);
      toast({
        title: "Description Generated!",
        description: "AI has crafted a description for your product.",
      });
    } catch (error: any) {
      console.error("AI Description Generation Error:", error);
      let errorMessage = "Failed to generate description. Please try again.";
      // More specific error checking based on messages from Genkit flow
      if (
        error.message?.includes("API key not valid") ||
        error.message?.includes("GOOGLE_GENAI_API_KEY is not defined") ||
        error.message?.includes("AI service API key is not configured") ||
        error.message?.includes("AI API Key is invalid")
      ) {
        errorMessage =
          "Failed to generate description: AI service is not configured correctly (API Key issue). Please contact support or check server logs.";
      } else if (
        error.message?.includes("overloaded") ||
        error.message?.includes("Service Unavailable")
      ) {
        errorMessage =
          "The AI service is currently overloaded or unavailable. Please try again later.";
      } else if (error.message) {
        errorMessage = `Failed to generate description: ${error.message}`;
      }
      toast({
        title: "Error Generating Description",
        description: errorMessage,
        variant: "destructive",
      });
      setGeneratedDescription("");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Card className="mt-8 shadow-lg border-primary/30">
      <CardHeader>
        <CardTitle className="text-2xl font-semibold flex items-center">
          <Wand2 className="mr-2 h-6 w-6 text-primary" /> AI-Powered Description
          Generator
        </CardTitle>
        <CardDescription>
          Let AI help you craft compelling product descriptions. Provide a
          product name and some keywords.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="productName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Product Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="e.g., Ergonomic Mechanical Keyboard"
                      {...field}
                      disabled={isLoading}
                    />
                  </FormControl>
                  <FormDescription>
                    The name of the product you want a description for.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="keywords"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Keywords</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="e.g., gaming, RGB, quiet, tactile"
                      {...field}
                      disabled={isLoading}
                    />
                  </FormControl>
                  <FormDescription>
                    Comma-separated keywords that best describe the product or
                    its features.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              disabled={isLoading}
              className="min-w-[180px]"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />{" "}
                  Generating...
                </>
              ) : (
                <>
                  <Wand2 className="mr-2 h-4 w-4" /> Generate Description
                </>
              )}
            </Button>
          </form>
        </Form>
        {generatedDescription && (
          <div className="mt-6 pt-6 border-t">
            <h3 className="text-lg font-semibold mb-2 text-primary">
              Generated Description:
            </h3>
            <Textarea
              value={generatedDescription}
              readOnly
              rows={5}
              className="bg-muted/50 focus:ring-primary"
            />
            <Button
              variant="outline"
              size="sm"
              className="mt-2"
              onClick={() => {
                navigator.clipboard.writeText(generatedDescription);
                toast({
                  title: "Copied!",
                  description: "Description copied to clipboard.",
                });
              }}
            >
              Copy Description
            </Button>
          </div>
        )}
        {/* 
          The problematic warning block has been removed from here.
          Server-side checks in src/ai/ai-instance.ts and error handling in the AI flow
          are more appropriate for API key issues.
        */}
      </CardContent>
    </Card>
  );
};

export default AiDescription;
