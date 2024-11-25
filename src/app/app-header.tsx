import Link from "next/link";
import { Github } from "lucide-react";

export function AppHeader() {
  return (
    <header className="bg-primary p-4 text-primary-foreground">
      <div className="container mx-auto flex items-center justify-between">
        <h1 className="text-2xl font-bold">NextCCP</h1>

        <Link
          href="https://github.com/yourusername/number-converter"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Github className="mr-2" />
        </Link>
      </div>
    </header>
  );
}
