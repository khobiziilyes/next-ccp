import {
  name as AppName,
  version as AppVersion,
  author as AppAuthor,
} from "@/../package.json";

export function AppFooter() {
  return (
    <footer className="mt-8 bg-primary-foreground p-4 text-secondary-foreground">
      <div className="container mx-auto text-center">
        <p>
          &copy; {new Date().getUTCFullYear()} {AppName}@{AppVersion} by{" "}
          {AppAuthor.name} ({AppAuthor.email}). All rights reserved.
        </p>
      </div>
    </footer>
  );
}
