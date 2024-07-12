"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";

export const AddListing: React.FC = () => {
  const router = useRouter();
  return (
    <div className="flex min-h-80 w-full flex-col space-y-2 rounded-sm border p-2 sm:w-56">
      <Image
        className="rounded-md"
        style={{ objectFit: "contain" }}
        height={480}
        width={480}
        src={
          "https://utfs.io/f/15f130fd-4449-4e99-94ac-e4bd26ba0530-hfic2e.jpg"
        }
        alt="logo"
      />
      <h3 className="scroll-m-20 text-xl font-extrabold tracking-tight">
        promote<span className="text-green-500">thing</span>
      </h3>
      <p className="leading-7 [&:not(:first-child)]:mt-6">
        Click to add your new listing and boost your reach
      </p>
      <Button size={"sm"} onClick={() => router.push("/submit-listing")}>
        Add
      </Button>
    </div>
  );
};
