import Link from "next/link";
import { ModeToggle } from "~/components/mode-toggle";
import { Button } from "~/components/ui/button";

export default function TopNav() {
  return (
    <div className="flex flex-row items-center justify-center">
      <nav className="flex w-full max-w-screen-lg flex-row items-center justify-between p-4">
        <div className="flex flex-row items-center justify-center space-x-4">
          <Link href={"/"}>
            <h3 className="scroll-m-20 text-2xl font-extrabold tracking-tight lg:text-3xl">
              promote<span className="text-green-500">thing</span>
            </h3>
          </Link>
        </div>
        <div className="flex space-x-2">
          <Button variant="ghost">About</Button>
          <Button variant="ghost">FAQ</Button>
          <ModeToggle />
        </div>
      </nav>
    </div>
  );
}
