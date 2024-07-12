import { HydrateClient } from "~/trpc/server";
import NewListing from "../_components/new-listing";

export default async function SubmitListing() {
  return (
    <HydrateClient>
      <main className="flex w-full flex-col items-center justify-center">
        <div className="flex w-full max-w-screen-lg flex-col gap-4 p-4">
          <NewListing />
        </div>
      </main>
    </HydrateClient>
  );
}
