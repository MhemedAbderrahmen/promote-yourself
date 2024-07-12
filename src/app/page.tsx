import { ModeToggle } from "~/components/mode-toggle";
import { UploadButton } from "~/lib/utils/uploadthing";
import { api, HydrateClient } from "~/trpc/server";
import Uploader from "./_components/uploader";

export default async function Home() {
  const hello = await api.post.hello({ text: "from tRPC" });

  void api.post.getLatest.prefetch();

  return (
    <HydrateClient>
      <main className="flex h-full w-full items-center justify-between p-24">
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
          Taxing Laughter: The Joke Tax Chronicles
        </h1>
        <ModeToggle />
        <Uploader />
      </main>
    </HydrateClient>
  );
}
