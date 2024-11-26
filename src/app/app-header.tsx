import Link from "next/link";
import { Github } from "lucide-react";
import { name as AppName, homepage as RepoURL } from "@/../package.json";

export function AppHeader() {
  return (
    <header className="bg-primary p-4 text-primary-foreground">
      <div className="container mx-auto flex items-center justify-between">
        <h1 className="text-2xl font-bold">{AppName}</h1>

        <Link href={RepoURL} target="_blank" rel="noopener noreferrer">
          <Github className="mr-2" />
        </Link>
      </div>
    </header>
  );
}
