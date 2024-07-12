import { LatestPost } from "~/app/_components/post";
import { api, HydrateClient } from "~/trpc/server";
import TopNav from "./_components/top-nav";

export default async function Home() {
  const hello = await api.post.hello({ text: "from tRPC" });

  void api.listings.getAll.prefetch();

  return (
    <HydrateClient>
      <TopNav />
      <main className="flex w-full flex-row items-center justify-center">
        <div className="flex w-full max-w-screen-lg flex-row flex-wrap gap-2 p-4">
          <LatestPost />
        </div>
      </main>
    </HydrateClient>
  );
}
