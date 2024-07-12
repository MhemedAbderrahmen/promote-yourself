import { api, HydrateClient } from "~/trpc/server";
import TopNav from "./_components/top-nav";
import Listings from "./_components/listings";

export default async function Home() {
  void api.listings.getAll.prefetch();

  return (
    <HydrateClient>
      <TopNav />
      <main className="flex w-full flex-row items-center justify-center">
        <div className="flex w-full max-w-screen-lg flex-row flex-wrap gap-2 p-4">
          <Listings />
        </div>
      </main>
    </HydrateClient>
  );
}
