"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
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
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";
import { Loader2, Send, CheckCircle } from "lucide-react";

const formSchema = z.object({
  name: z
    .string()
    .min(2, {
      message: "Name must be at least 2 characters.",
    })
    .max(50, { message: "Name must be 50 characters or less." }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  message: z
    .string()
    .min(10, {
      message: "Message must be at least 10 characters.",
    })
    .max(1000, { message: "Message must be 1000 characters or less." }),
});

type ContactFormData = z.infer<typeof formSchema>;

const ContactPage: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const form = useForm<ContactFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  async function onSubmit(values: ContactFormData) {
    setIsSubmitting(true);
    setSubmitSuccess(false);

    try {
      const response = await fetch("/api/contact-user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      const result = await response.json();

      if (response.ok) {
        toast({
          title: "Message Sent! 🎉",
          description:
            "Thank you for contacting us. We'll get back to you soon.",
        });
        form.reset();
        setSubmitSuccess(true);
      } else {
        console.error("API Error:", result);
        toast({
          title: "Error Sending Message",
          description:
            result.message ||
            "Failed to send message. Please check your input or try again later.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Fetch Error:", error);
      toast({
        title: "Error Sending Message",
        description: `An unexpected error occurred: ${
          (error as Error).message || "Please try again later."
        }`,
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="container mx-auto p-4 sm:p-6 lg:p-8">
      <Card className="max-w-2xl mx-auto shadow-xl">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold">Get In Touch</CardTitle>
          <CardDescription className="text-lg text-muted-foreground">
            We'd love to hear from you! Send us a message with your questions or
            feedback.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {submitSuccess ? (
            <div className="text-center py-10">
              <CheckCircle className="mx-auto h-16 w-16 text-green-500 mb-4" />
              <h3 className="text-2xl font-semibold mb-2">
                Message Sent Successfully!
              </h3>
              <p className="text-muted-foreground mb-6">
                We've received your message and will get back to you as soon as
                possible.
              </p>
              <Button
                onClick={() => {
                  setSubmitSuccess(false);
                  form.reset(); // Optionally reset form if they want to send another
                }}
              >
                Send Another Message
              </Button>
            </div>
          ) : (
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="e.g., Jane Doe"
                          {...field}
                          disabled={isSubmitting}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email Address</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="e.g., you@example.com"
                          type="email"
                          {...field}
                          disabled={isSubmitting}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Your Message</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Tell us what's on your mind..."
                          {...field}
                          rows={6}
                          disabled={isSubmitting}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button
                  type="submit"
                  className="w-full"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />{" "}
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="mr-2 h-4 w-4" /> Send Message
                    </>
                  )}
                </Button>
              </form>
            </Form>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ContactPage;
