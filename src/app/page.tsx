import { MegaphoneIcon } from "lucide-react";
import { ModeToggle } from "~/components/mode-toggle";
import { HydrateClient } from "~/trpc/server";

export function TopNav() {
  return (
    <nav className="flex w-full flex-row items-center justify-between border-b-2 p-4">
      <h3 className="scroll-m-20 text-2xl font-extrabold tracking-tight lg:text-3xl">
        promotething
      </h3>
      <div>
        <ModeToggle />
      </div>
    </nav>
  );
}

export default async function Home() {
  return (
    <HydrateClient>
      <main className="flex h-full w-full items-center justify-between">
        <TopNav />
      </main>
    </HydrateClient>
  );
}
