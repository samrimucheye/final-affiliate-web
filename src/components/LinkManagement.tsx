// // "use client";

// // import { useEffect } from "react";
// // import { Button } from "@/components/ui/button";
// // import {
// //   Form,
// //   FormControl,
// //   FormDescription,
// //   FormField,
// //   FormItem,
// //   FormLabel,
// //   FormMessage,
// // } from "@/components/ui/form";
// // import { Input } from "@/components/ui/input";
// // import { Textarea } from "@/components/ui/textarea";
// // import { useForm } from "react-hook-form";
// // import * as z from "zod";
// // import { zodResolver } from "@hookform/resolvers/zod";
// // import type { AffiliateLink } from "@/services/affiliate-link";
// // import {
// //   Card,
// //   CardContent,
// //   CardDescription,
// //   CardHeader,
// //   CardTitle,
// // } from "@/components/ui/card";
// // import { Loader2, Save, Ban } from "lucide-react"; // Only import used icons

// // interface LinkManagementProps {
// //   onLinkAddedOrUpdated: (
// //     data:
// //       | Omit<AffiliateLink, "id" | "createdAt" | "updatedAt" | "userId">
// //       | AffiliateLink
// //   ) => void;
// //   editingLink: AffiliateLink | null;
// //   onCancelEdit: () => void;
// //   isAdmin: boolean; // Will be false in current context
// //   isSubmitting: boolean;
// // }

// // const formSchema = z.object({
// //   productName: z
// //     .string()
// //     .min(3, {
// //       message: "Product name must be at least 3 characters.",
// //     })
// //     .max(100, { message: "Product name must be 100 characters or less." }),
// //   description: z
// //     .string()
// //     .min(10, {
// //       message: "Description must be at least 10 characters.",
// //     })
// //     .max(500, { message: "Description must be 500 characters or less." }),
// //   imageUrl: z
// //     .string()
// //     .min(1, { message: "Image URL is required." })
// //     .url({
// //       message:
// //         "Please enter a valid image URL (e.g., https://example.com/image.png).",
// //     })
// //     .refine(
// //       (value) =>
// //         value.startsWith("https://placehold.co/") ||
// //         value.startsWith("https://picsum.photos/") ||
// //         value.startsWith("https://m.media-amazon.com/") ||
// //         value.startsWith("https://www.amazon.com/"),
// //       {
// //         message:
// //           "Image URL must be from placehold.co, picsum.photos, or amazon.com/m.media-amazon.com.",
// //       }
// //     ),
// //   affiliateUrl: z
// //     .string()
// //     .min(1, { message: "Affiliate URL is required." })
// //     .url({
// //       message:
// //         "Please enter a valid affiliate URL (e.g., https://amazon.com/dp/...).",
// //     }),
// //   aiHint: z
// //     .string()
// //     .optional()
// //     .describe("Optional: Keywords for AI placeholder image search (1-2 words)"),
// // });

// // type LinkFormData = z.infer<typeof formSchema>;

// // const LinkManagement: React.FC<LinkManagementProps> = ({
// //   onLinkAddedOrUpdated,
// //   editingLink,
// //   onCancelEdit,
// //   isAdmin, // isAdmin will be false
// //   isSubmitting,
// // }) => {
// //   const isEditing = !!editingLink && isAdmin; // Editing only if admin and editingLink exists

// //   const form = useForm<LinkFormData>({
// //     resolver: zodResolver(formSchema),
// //     defaultValues: {
// //       productName: "",
// //       description: "",
// //       imageUrl: "",
// //       affiliateUrl: "",
// //       aiHint: "",
// //     },
// //   });

// //   useEffect(() => {
// //     if (isEditing && editingLink) {
// //       form.reset({
// //         productName: editingLink.productName || "",
// //         description: editingLink.description || "",
// //         imageUrl: editingLink.imageUrl || "",
// //         affiliateUrl: editingLink.affiliateUrl || "",
// //         aiHint: editingLink.aiHint || "",
// //       });
// //     } else {
// //       // Reset for adding a new link
// //       form.reset({
// //         productName: "",
// //         description: "",
// //         imageUrl: "",
// //         affiliateUrl: "",
// //         aiHint: "",
// //       });
// //     }
// //   }, [editingLink, isEditing, form]);

// //   function onSubmit(values: LinkFormData) {
// //     // In Firebase-removed version, this will update client-side state via onLinkAddedOrUpdated
// //     const linkPayload = {
// //       ...values,
// //       // aiHint is already part of values if provided
// //     };
// //     if (isEditing && editingLink) {
// //       // This branch won't be hit since isAdmin is false
// //       onLinkAddedOrUpdated({ ...editingLink, ...linkPayload });
// //     } else {
// //       onLinkAddedOrUpdated(linkPayload);
// //     }
// //     form.reset(); // Reset form after submission
// //   }

// //   // Since Firebase is removed, admin-only editing is not applicable here.
// //   // The form will always be for adding new links to client-side state.

// //   return (
// //     <Card id="link-management-card" className="shadow-lg border-primary/50">
// //       <CardHeader>
// //         <CardTitle className="text-2xl font-semibold">
// //           {isEditing ? "Edit Affiliate Link" : "Add New Affiliate Link"}
// //         </CardTitle>
// //         <CardDescription>
// //           {isEditing
// //             ? "Update the details of your affiliate link."
// //             : "Enter the details for your new affiliate link. This link will be added locally and won't persist after refresh."}
// //         </CardDescription>
// //       </CardHeader>
// //       <CardContent>
// //         <Form {...form}>
// //           <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
// //             <FormField
// //               control={form.control}
// //               name="productName"
// //               render={({ field }) => (
// //                 <FormItem>
// //                   <FormLabel>Product Name</FormLabel>
// //                   <FormControl>
// //                     <Input
// //                       placeholder="e.g., Wireless Bluetooth Headphones"
// //                       {...field}
// //                       disabled={isSubmitting}
// //                     />
// //                   </FormControl>
// //                   <FormMessage />
// //                 </FormItem>
// //               )}
// //             />
// //             <FormField
// //               control={form.control}
// //               name="description"
// //               render={({ field }) => (
// //                 <FormItem>
// //                   <FormLabel>Description</FormLabel>
// //                   <FormControl>
// //                     <Textarea
// //                       placeholder="A short, compelling description of the product."
// //                       {...field}
// //                       rows={3}
// //                       disabled={isSubmitting}
// //                     />
// //                   </FormControl>
// //                   <FormMessage />
// //                 </FormItem>
// //               )}
// //             />
// //             <FormField
// //               control={form.control}
// //               name="imageUrl"
// //               render={({ field }) => (
// //                 <FormItem>
// //                   <FormLabel>Image URL</FormLabel>
// //                   <FormControl>
// //                     <Input
// //                       placeholder="https://placehold.co/300x200.png"
// //                       {...field}
// //                       disabled={isSubmitting}
// //                     />
// //                   </FormControl>
// //                   <FormDescription>
// //                     URL for the product image. Use placehold.co, picsum.photos
// //                     or an Amazon image URL.
// //                   </FormDescription>
// //                   <FormMessage />
// //                 </FormItem>
// //               )}
// //             />
// //             <FormField
// //               control={form.control}
// //               name="aiHint"
// //               render={({ field }) => (
// //                 <FormItem>
// //                   <FormLabel>AI Hint (Optional)</FormLabel>
// //                   <FormControl>
// //                     <Input
// //                       placeholder="e.g., headphones audio (1-2 words)"
// //                       {...field}
// //                       disabled={isSubmitting}
// //                     />
// //                   </FormControl>
// //                   <FormDescription>
// //                     If using a generic placeholder, provide 1-2 keywords for a
// //                     future AI image search.
// //                   </FormDescription>
// //                   <FormMessage />
// //                 </FormItem>
// //               )}
// //             />
// //             <FormField
// //               control={form.control}
// //               name="affiliateUrl"
// //               render={({ field }) => (
// //                 <FormItem>
// //                   <FormLabel>Affiliate URL</FormLabel>
// //                   <FormControl>
// //                     <Input
// //                       placeholder="https://www.amazon.com/dp/..."
// //                       {...field}
// //                       disabled={isSubmitting}
// //                     />
// //                   </FormControl>
// //                   <FormDescription>
// //                     The full affiliate link to the product.
// //                   </FormDescription>
// //                   <FormMessage />
// //                 </FormItem>
// //               )}
// //             />
// //             <div className="flex flex-col sm:flex-row gap-2 pt-2">
// //               <Button
// //                 type="submit"
// //                 className="w-full sm:w-auto"
// //                 disabled={isSubmitting}
// //               >
// //                 {isSubmitting ? (
// //                   <>
// //                     <Loader2 className="mr-2 h-4 w-4 animate-spin" />{" "}
// //                     Processing...
// //                   </>
// //                 ) : (
//                   // <>
// //                     <Save className="mr-2 h-4 w-4" />{" "}
// //                     {isEditing ? "Save Changes" : "Add Link"}
// //                   </>
// //                 )}
// //               </Button>
// //               {(isEditing || (!isEditing && form.formState.isDirty)) && ( // Show cancel if editing or if adding and form is dirty
// //                 <Button
// //                   type="button"
// //                   variant="outline"
// //                   className="w-full sm:w-auto"
// //                   onClick={() => {
// //                     onCancelEdit();
// //                     form.reset();
// //                   }}
// //                   disabled={isSubmitting}
// //                 >
// //                   <Ban className="mr-2 h-4 w-4" /> Cancel
// //                 </Button>
// //               )}
// //             </div>
// //           </form>
// //         </Form>
// //       </CardContent>
// //     </Card>
// //   );
// // };

// // export default LinkManagement;
// "use client";

// import { useForm } from "react-hook-form";
// import * as z from "zod";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { useState } from "react";

// // Zod schema
// const linkSchema = z.object({
//   productName: z.string().min(3, "Product name must be at least 3 characters"),
//   description: z.string().min(10, "Description must be at least 10 characters"),
//   imageUrl: z.string().url("Must be a valid URL"),
//   affiliateUrl: z.string().url("Must be a valid affiliate URL"),
//   aiHint: z.string().optional(),
// });

// type LinkFormData = z.infer<typeof linkSchema>;

// export default function CreateLinkForm() {
//   const {
//     register,
//     handleSubmit,
//     formState: { errors, isSubmitting },
//     reset,
//   } = useForm<LinkFormData>({
//     resolver: zodResolver(linkSchema),
//   });

//   const [successMessage, setSuccessMessage] = useState<string | null>(null);
//   const [errorMessage, setErrorMessage] = useState<string | null>(null);

//   async function onSubmit(data: LinkFormData) {
//     setErrorMessage(null);
//     setSuccessMessage(null);
//     try {
//       const res = await fetch("/api/affiliate-links", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(data),
//       });

//       if (!res.ok) {
//         const err = await res.json();
//         throw new Error(err.error || "Failed to create link");
//       }

//       const newLink = await res.json();
//       setSuccessMessage("Affiliate link created successfully!");
//       reset();
//     } catch (error: any) {
//       setErrorMessage(error.message || "Something went wrong.");
//     }
//   }

//   return (
//     <div className="max-w-md mx-auto p-4 bg-white rounded shadow">
//       <h2 className="text-xl font-semibold mb-4">Create New Affiliate Link</h2>
//       <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
//         <div>
//           <label className="block font-medium">Product Name</label>
//           <input
//             {...register("productName")}
//             className="w-full p-2 border rounded"
//             disabled={isSubmitting}
//           />
//           {errors.productName && (
//             <p className="text-red-600 text-sm">{errors.productName.message}</p>
//           )}
//         </div>

//         <div>
//           <label className="block font-medium">Description</label>
//           <textarea
//             {...register("description")}
//             className="w-full p-2 border rounded"
//             rows={3}
//             disabled={isSubmitting}
//           />
//           {errors.description && (
//             <p className="text-red-600 text-sm">{errors.description.message}</p>
//           )}
//         </div>

//         <div>
//           <label className="block font-medium">Image URL</label>
//           <input
//             {...register("imageUrl")}
//             className="w-full p-2 border rounded"
//             disabled={isSubmitting}
//           />
//           {errors.imageUrl && (
//             <p className="text-red-600 text-sm">{errors.imageUrl.message}</p>
//           )}
//         </div>

//         <div>
//           <label className="block font-medium">Affiliate URL</label>
//           <input
//             {...register("affiliateUrl")}
//             className="w-full p-2 border rounded"
//             disabled={isSubmitting}
//           />
//           {errors.affiliateUrl && (
//             <p className="text-red-600 text-sm">
//               {errors.affiliateUrl.message}
//             </p>
//           )}
//         </div>

//         <div>
//           <label className="block font-medium">AI Hint (optional)</label>
//           <input
//             {...register("aiHint")}
//             className="w-full p-2 border rounded"
//             disabled={isSubmitting}
//           />
//         </div>

//         <button
//           type="submit"
//           disabled={isSubmitting}
//           className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
//         >
//           {isSubmitting ? "Submitting..." : "Create Link"}
//         </button>

//         {successMessage && (
//           <p className="text-green-600 text-sm mt-2">{successMessage}</p>
//         )}
//         {errorMessage && (
//           <p className="text-red-600 text-sm mt-2">{errorMessage}</p>
//         )}
//       </form>
//     </div>
//   );
// }
