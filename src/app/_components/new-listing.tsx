"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "~/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { Textarea } from "~/components/ui/textarea";
import { UploadDropzone } from "~/utils/uploadthing";

const formSchema = z.object({
  name: z.string().min(2).max(50),
  description: z.string().min(2).max(50),
  logo: z.string().min(2),
});

export default function NewListing() {
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      logo: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }

  return (
    <main className="flex w-full flex-col items-center justify-center">
      <div className="w-full max-w-screen-lg">
        <Button variant={"link"} onClick={() => router.back()}>
          <ArrowLeft size={14} className="mr-2 h-4 w-4" />
          Back
        </Button>
        <p className="leading-7 [&:not(:first-child)]:mt-6">
          Submit your app by filling up this form; once submitted our{" "}
          <span className="font-bold">
            Promote
            <span className="text-green-500">Thing</span>
          </span>{" "}
          team wil carefully examine it and respond with the appropriate
          response, good luck! 🔥
        </p>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Listing name" {...field} />
                  </FormControl>
                  <FormDescription>
                    This is your public display name.
                  </FormDescription>
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
                    <Textarea placeholder="Description.." {...field} />
                  </FormControl>
                  <FormDescription>
                    This is your public display name.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <UploadDropzone
              className="dark:border-muted"
              endpoint="imageUploader"
              onClientUploadComplete={(res) => {
                console.log("🚀 ~ onClientUploadComplete ~ res:", res);
                if (res[0]?.url) form.setValue("logo", res[0]?.url);
              }}
              onUploadError={(error: Error) => {
                // Do something with the error.
                alert(`ERROR! ${error.message}`);
              }}
            />
            <div className="flex w-full justify-center sm:justify-end">
              <Button type="submit" className="w-full md:w-auto">
                Submit
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </main>
  );
}
