import Link from "next/link";
import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "~/components/ui/card";
import { api, HydrateClient } from "~/trpc/server";
import Listings from "./_components/listings";
export default async function Home() {
  const hello = await api.post.hello({ text: "from tRPC" });
  void api.listings.getAll.prefetch();

  return (
    <HydrateClient>
      <main className="flex w-full flex-col items-center justify-center">
        <div className="flex w-full max-w-screen-lg flex-col gap-4 p-4">
          <div className="items flex flex-col justify-center gap-4 bg-center">
            <Card>
              <CardHeader>
                <h3 className="scroll-m-20 text-2xl font-extrabold tracking-tight lg:text-3xl">
                  Welcome to promote
                  <span className="text-green-500">thing</span> 👋
                </h3>
              </CardHeader>
              <CardContent>
                <p className="leading-7 [&:not(:first-child)]:mt-6">
                  We&apos;re thrilled to have you here. PromoteThing is your
                  go-to platform for showcasing your amazing apps and reaching a
                  broader audience.
                </p>
                <p className="leading-7 [&:not(:first-child)]:mt-6">
                  Whether you&apos;re an indie developer or a seasoned creator,
                  our community is here to help you shine.
                </p>
              </CardContent>
              <CardFooter className="flex flex-row justify-end gap-2">
                <Link href={"/submit-listing"}>
                  <Button>Submit Your App</Button>
                </Link>
              </CardFooter>
            </Card>

            <h2 className="mt-10 scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
              🚀 Featured Today
            </h2>
          </div>
          <div className="flex w-full flex-row flex-wrap gap-8">
            <Listings />
          </div>
        </div>
      </main>
    </HydrateClient>
  );
}
