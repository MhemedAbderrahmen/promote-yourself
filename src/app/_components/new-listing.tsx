"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft, Loader2 } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
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
import { api } from "~/trpc/react";
import { UploadButton } from "~/utils/uploadthing";

const formSchema = z.object({
  name: z.string().min(2).max(50),
  description: z.string().min(2).max(50),
  logo: z.string().min(2),
});

export default function NewListing() {
  const router = useRouter();
  const utils = api.useUtils();
  const [logoExist, setLogoExist] = useState<boolean>(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      logo: "",
    },
  });

  const createListing = api.listings.create.useMutation({
    onSuccess: async () => {
      await utils.listings.invalidate();
      router.push("/");
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    createListing.mutate(values);
  }

  return (
    <main className="flex h-screen w-full flex-col items-center justify-center">
      <div className="w-full max-w-screen-lg flex-col space-y-4">
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
            <div
              className={
                "flex w-full flex-col items-center justify-center space-y-4"
              }
            >
              {logoExist && (
                <Image
                  className="rounded-md"
                  src={form.getValues("logo")}
                  width={380}
                  height={380}
                  alt="icon"
                />
              )}
              <UploadButton
                className="dark:border-muted"
                endpoint="imageUploader"
                onUploadBegin={() =>
                  toast("Uploading..", {
                    id: "upload-begin",
                  })
                }
                onClientUploadComplete={(res) => {
                  if (res[0]?.url) form.setValue("logo", res[0]?.url);
                  toast.dismiss("upload-begin");
                  toast("Upload successfully.", {
                    duration: 1000,
                  });
                  setLogoExist(true);
                }}
                onUploadError={(error: Error) => {
                  alert(`ERROR! ${error.message}`);
                }}
              />
            </div>
            <div className="flex w-full justify-center sm:justify-end">
              <Button
                type="submit"
                className="w-full md:w-auto"
                disabled={createListing.isPending}
              >
                {createListing.isPending && (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                )}
                Submit
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </main>
  );
}
