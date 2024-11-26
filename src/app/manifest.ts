import type { MetadataRoute } from "next";
import packageInfo from "@/../package.json";

const { name: AppName } = packageInfo;

export default function manifest(): MetadataRoute.Manifest {
  return {
    theme_color: "#040814",
    background_color: "#030815",
    icons: [
      {
        purpose: "maskable",
        sizes: "512x512",
        src: "/images/icon512_maskable.png",
        type: "image/png",
      },
      {
        purpose: "any",
        sizes: "512x512",
        src: "/images/icon512_rounded.png",
        type: "image/png",
      },
    ],
    orientation: "any",
    display: "standalone",
    dir: "ltr",
    lang: "en-US",
    name: AppName,
    short_name: AppName,
    start_url: "/",
    scope: "/",
    description: AppName,
    id: "next-ccp-ilyesk",
  };
}
