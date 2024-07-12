import { api, HydrateClient } from "~/trpc/server";
import TopNav from "./_components/top-nav";
import Listings from "./_components/listings";
import { Input } from "~/components/ui/input";
export default async function Home() {
  const hello = await api.post.hello({ text: "from tRPC" });

  void api.listings.getAll.prefetch();

  return (
    <HydrateClient>
      <TopNav />
      <main className="flex w-full flex-col items-center justify-center">
        <div className="flex w-full max-w-screen-lg flex-col gap-4 p-4">
          <Input placeholder="Search.." />
          <div className="flex w-full flex-row flex-wrap gap-8">
            <Listings />
          </div>
        </div>
      </main>
    </HydrateClient>
  );
}
