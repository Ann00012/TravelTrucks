import { Metadata } from "next";
import { fetchCamperById } from "@/services/campers";
import CamperClient from "./CamperClient";

type Props = {
  params: Promise<{ camperId: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  try {
    const resolvedParams = await params; 
    const camper = await fetchCamperById(resolvedParams.camperId);

    const ogImage = camper.gallery?.[0]?.original || "/hero.jpg";
    const shortDesc = camper.description.substring(0, 150) + "...";

    return {
      title: camper.name,
      description: shortDesc,
      openGraph: {
        title: `${camper.name} | TravelTrucks`,
        description: shortDesc,
        images: [
          {
            url: ogImage,
            width: 1200,
            height: 630,
            alt: camper.name,
          },
        ],
        type: "article",
      },
      twitter: {
        card: "summary_large_image",
        title: `${camper.name} | TravelTrucks`,
        description: shortDesc,
        images: [ogImage],
      },
    };
  } catch (error) {
    return {
      title: "Camper Not Found",
      description: "This campervan is not available.",
    };
  }
}

export default function CamperPage() {
  return <CamperClient />;
}