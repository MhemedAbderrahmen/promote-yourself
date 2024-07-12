import { api, HydrateClient } from "~/trpc/server";
import TopNav from "./_components/top-nav";
import Listings from "./_components/listings";

export default async function Home() {
  void api.listings.getAll.prefetch();

  return (
    <HydrateClient>
      <TopNav />
      <main className="max-w-screen-l flex h-full w-full items-center justify-center">
        <div className="mt-8 flex w-full flex-row flex-wrap items-center justify-center gap-4">
          <Listings />
        </div>
      </main>
    </HydrateClient>
  );
}
