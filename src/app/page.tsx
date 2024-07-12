import { HydrateClient } from "~/trpc/server";
import TopNav from "./_components/top-nav";

const apps = [
  {
    name: "UploadThing",
    path: "/uploadthing",
    icon: "📤",
    description:
      "Aute fugiat eu consectetur qui commodo amet voluptate consequat consectetur aute voluptate velit ullamco. Labore sunt do mollit veniam. Sit velit ex cupidatat veniam velit magna magna labore aliqua irure. Consequat et pariatur voluptate incididunt nulla ipsum dolor ea eiusmod tempor tempor fugiat mollit.",
  },
  {
    name: "T3",
    path: "/t3",
    icon: "🚀",
    description:
      "Aute fugiat eu consectetur qui commodo amet voluptate consequat consectetur aute voluptate velit ullamco. Labore sunt do mollit veniam. Sit velit ex cupidatat veniam velit magna magna labore aliqua irure. Consequat et pariatur voluptate incididunt nulla ipsum dolor ea eiusmod tempor tempor fugiat mollit.",
  },
];
export default async function Home() {
  return (
    <HydrateClient>
      <TopNav />
      <main className="flex h-full w-full max-w-screen-lg items-center">
        <div className="flex w-full flex-row flex-wrap items-center justify-center gap-4">
          {[...apps, ...apps, ...apps, ...apps].map((app) => (
            <a
              key={app.path}
              href={app.path}
              className="flex w-80 flex-col items-center justify-center rounded-sm border-2 shadow-md"
            >
              <div className="text-2xl">{app.icon}</div>
              <div className="text-lg font-bold">{app.name}</div>
              <div className="text-sm">{app.description}</div>
            </a>
          ))}
        </div>
      </main>
    </HydrateClient>
  );
}
