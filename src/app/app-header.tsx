import Link from "next/link";
import packageInfo from "@/../package.json";

import { ThemeToggler } from "@/components/theme-toggler";
import { Button } from "@/components/ui/button";
import { Github } from "lucide-react";

const { name: AppName, repository } = packageInfo;
const RepoURL = repository.url.slice(4, -4);

export function AppHeader() {
  return (
    <header className="flex h-16 w-full shrink-0 items-center bg-primary-foreground px-4 md:px-6">
      <h1 className="mr-6 text-2xl font-bold lg:flex">{AppName}</h1>

      <div className="ml-auto flex gap-2">
        <Button variant="ghost" size="icon" asChild>
          <Link href={RepoURL} target="_blank" rel="noopener noreferrer">
            <Github className="h-[1.2rem] w-[1.2rem]" />
            <span className="sr-only">Github repo</span>
          </Link>
        </Button>

        <ThemeToggler />
      </div>
    </header>
  );
}
