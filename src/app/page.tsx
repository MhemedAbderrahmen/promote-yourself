import { api, HydrateClient } from "~/trpc/server";
import TopNav from "./_components/top-nav";
import Listings from "./_components/listings";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
export default async function Home() {
  const hello = await api.post.hello({ text: "from tRPC" });

  void api.listings.getAll.prefetch();

  return (
    <HydrateClient>
      <TopNav />
      <main className="flex w-full flex-col items-center justify-center">
        <div className="flex w-full max-w-screen-lg flex-col gap-4 p-4">
          <div className="items flex flex-col justify-center gap-4 bg-center">
            <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
              Boost Your App's Reach! - Submit Now and Get Noticed 🚀
            </h1>
          </div>
          <div className="flex w-full flex-row flex-wrap gap-8">
            <Listings />
          </div>
        </div>
      </main>
    </HydrateClient>
  );
}
