import Link from "next/link";

import { LatestPost } from "~/app/_components/post";
import { ModeToggle } from "~/components/mode-toggle";
import { api, HydrateClient } from "~/trpc/server";

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
      </main>
    </HydrateClient>
  );
}
