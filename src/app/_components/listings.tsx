"use client";
import Image from "next/image";
import { api } from "~/trpc/react";

const Listings: React.FC = () => {
  const [listings] = api.listings.getAll.useSuspenseQuery();

  return (
    <div>
      <h1>Listings</h1>
      <ul>
        {listings.map((listing, key) => (
          <a
            key={key}
            href={listing.path ?? ""}
            className="flex w-80 flex-col items-center justify-center rounded-sm border-2 p-4 shadow-md"
          >
            <img src={listing.logo ?? ""} alt="logo" />
            <div className="text-lg font-bold">{listing.name}</div>
            <div className="text-sm">{listing.description}</div>
          </a>
        ))}
      </ul>
    </div>
  );
};

export default Listings;
