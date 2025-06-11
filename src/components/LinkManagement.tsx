"use client";

import { useEffect } from "react";
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
import type { AffiliateLink } from "@/services/affiliate-link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Loader2, Save, Ban } from "lucide-react";
import { useSession } from "next-auth/react";

interface LinkManagementProps {
  onLinkAddedOrUpdated: (
    data: Omit<AffiliateLink, "id" | "createdAt" | "updatedAt"> | AffiliateLink
  ) => void;
  editingLink: AffiliateLink | null;
  onCancelEdit: () => void;
  isSubmitting: boolean;
}

const formSchema = z.object({
  productName: z
    .string()
    .min(3, { message: "Product name must be at least 3 characters." })
    .max(100, { message: "Product name must be 100 characters or less." }),
  description: z
    .string()
    .min(10, { message: "Description must be at least 10 characters." })
    .max(500, { message: "Description must be 500 characters or less." }),
  imageUrl: z
    .string()
    .min(1, { message: "Image URL is required." })
    .url({
      message:
        "Please enter a valid image URL (e.g., https://example.com/image.png).",
    })
    .refine(
      (url) =>
        url.startsWith("https://placehold.co/") ||
        url.startsWith("https://picsum.photos/") ||
        url.startsWith("https://m.media-amazon.com/") ||
        url.startsWith("https://www.amazon.com/images/") ||
        url.startsWith("https://images.unsplash.com/"),
      {
        message:
          "Image URL must be from placehold.co, picsum.photos, amazon.com, or unsplash.com.",
      }
    ),
  affiliateUrl: z
    .string()
    .min(1, { message: "Affiliate URL is required." })
    .url({
      message:
        "Please enter a valid affiliate URL (e.g., https://amazon.com/dp/...).",
    }),
  aiHint: z.string().optional(),
});

type LinkFormData = z.infer<typeof formSchema>;

const LinkManagement: React.FC<LinkManagementProps> = ({
  onLinkAddedOrUpdated,
  editingLink,
  onCancelEdit,
  isSubmitting,
}) => {
  const { data: session } = useSession();
  const isEditing = Boolean(editingLink);

  const form = useForm<LinkFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      productName: "",
      description: "",
      imageUrl: "",
      affiliateUrl: "",
      aiHint: "",
    },
  });

  useEffect(() => {
    if (editingLink) {
      form.reset({
        productName: editingLink.productName ?? "",
        description: editingLink.description ?? "",
        imageUrl: editingLink.imageUrl ?? "",
        affiliateUrl: editingLink.affiliateUrl ?? "",
        aiHint: editingLink.aiHint ?? "",
      });
    } else {
      form.reset({
        productName: "",
        description: "",
        imageUrl: "",
        affiliateUrl: "",
        aiHint: "",
      });
    }
  }, [editingLink, form]);

  function onSubmit(values: LinkFormData) {
    if (!session?.user?.email) {
      console.error("User not authenticated, cannot submit link.");
      return;
    }

    const payload = {
      ...values,
      aiHint: values.aiHint || "",
    };

    if (isEditing && editingLink) {
      onLinkAddedOrUpdated({
        ...editingLink,
        ...payload,
      });
    } else {
      onLinkAddedOrUpdated({
        ...payload,
        userId: session.user.email, // Using email as userId here; replace if your user ID is different
      } as Omit<AffiliateLink, "id" | "createdAt" | "updatedAt">);
    }
  }

  if (!session?.user) return null;

  return (
    <Card id="link-management-card" className="shadow-lg border-primary/50">
      <CardHeader>
        <CardTitle className="text-2xl font-semibold">
          {isEditing ? "Edit Affiliate Link" : "Add New Affiliate Link"}
        </CardTitle>
        <CardDescription>
          {isEditing
            ? "Update the details of your affiliate link."
            : "Enter the details for your new affiliate link."}
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
                      placeholder="e.g., Wireless Bluetooth Headphones"
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
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="A short, compelling description of the product."
                      {...field}
                      rows={3}
                      disabled={isSubmitting}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="imageUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Image URL</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="https://placehold.co/300x200.png"
                      {...field}
                      disabled={isSubmitting}
                    />
                  </FormControl>
                  <FormDescription>
                    URL for the product image. Use placehold.co, picsum.photos,
                    amazon.com, or unsplash.com.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="aiHint"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>AI Hint (Optional)</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="e.g., headphones audio (1-2 words)"
                      {...field}
                      disabled={isSubmitting}
                    />
                  </FormControl>
                  <FormDescription>
                    If using a generic placeholder, provide 1-2 keywords for a
                    future AI image search.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="affiliateUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Affiliate URL</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="https://www.amazon.com/dp/..."
                      {...field}
                      disabled={isSubmitting}
                    />
                  </FormControl>
                  <FormDescription>
                    The full affiliate link to the product.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex flex-col sm:flex-row gap-2 pt-2">
              <Button
                type="submit"
                className="w-full sm:w-auto"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />{" "}
                    Processing...
                  </>
                ) : (
                  <>
                    <Save className="mr-2 h-4 w-4" />{" "}
                    {isEditing ? "Save Changes" : "Add Link"}
                  </>
                )}
              </Button>
              {(isEditing || (!isEditing && form.formState.isDirty)) && (
                <Button
                  type="button"
                  variant="outline"
                  className="w-full sm:w-auto"
                  onClick={() => {
                    onCancelEdit();
                    form.reset();
                  }}
                  disabled={isSubmitting}
                >
                  <Ban className="mr-2 h-4 w-4" /> Cancel
                </Button>
              )}
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default LinkManagement;
