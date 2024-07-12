"use client";
import Image from "next/image";
import { api } from "~/trpc/react";

const Listings: React.FC = () => {
  const [listings] = api.listings.getAll.useSuspenseQuery();

  return listings.map((listing, key) => (
    <a
      key={key}
      href={listing.path ?? ""}
      className="flex w-full flex-col space-y-2 sm:w-48"
    >
      <Image
        className="rounded-md"
        style={{ objectFit: "contain" }}
        height={480}
        width={480}
        src={listing.logo ?? ""}
        alt="logo"
      />
      <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
        {listing.name}
      </h4>
      <p className="leading-7 [&:not(:first-child)]:mt-6">
        {listing.description}
      </p>
      <p className="text-sm"></p>
    </a>
  ));
};

export default Listings;
