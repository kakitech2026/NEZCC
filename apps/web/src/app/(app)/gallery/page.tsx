import { Metadata } from "next";
import { getPayloadClient } from "@/lib/payload";
import GalleryClient from "./GalleryClient";

export const metadata: Metadata = {
  title: "Gallery | North East Zone Cultural Centre",
  description: "Explore the Archive and Witness our Living Heritage through our Photo and Video Gallery.",
};

export default async function GalleryPage() {
  const payload = await getPayloadClient();
  const galleryResult = await payload.find({
    collection: "gallery",
    sort: "-date",
    limit: 100,
  });

  return <GalleryClient items={galleryResult.docs as any} />;
}
