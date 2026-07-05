import { EmptyState } from "@/components/dashboard/EmptyState";
import { Wrench } from "lucide-react";

export function ComingSoonPage({ title }: { title: string }) {
  return (
    <div className="flex-1 flex items-center justify-center p-4 min-h-[60vh]">
      <EmptyState
        icon={Wrench}
        title={`${title} is Coming Soon`}
        description="We are working hard to bring you this new feature. Stay tuned for updates!"
      />
    </div>
  );
}
