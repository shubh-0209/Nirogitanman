import { ComingSoonPage } from "@/components/dashboard/ComingSoonPage";

export default function PatientCatchAllRoute({ params }: { params: { slug: string[] } }) {
  const title = params.slug.join(" ").replace(/-/g, " ");
  // Capitalize title
  const formattedTitle = title.split(" ").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");
  
  return <ComingSoonPage title={formattedTitle} />;
}
