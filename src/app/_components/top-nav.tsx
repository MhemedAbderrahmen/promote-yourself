import { ModeToggle } from "~/components/mode-toggle";

export default function TopNav() {
  return (
    <div className="flex flex-row items-center justify-center border-b-2">
      <nav className="flex w-full max-w-screen-lg flex-row items-center justify-between p-4">
        <h3 className="scroll-m-20 text-2xl font-extrabold tracking-tight lg:text-3xl">
          promote<span className="text-green-500">thing</span>
        </h3>
        <div>
          <ModeToggle />
        </div>
      </nav>
    </div>
  );
}
