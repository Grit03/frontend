import { Loader } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

export const Loading = () => {
  return (
    <main className="relative flex h-full w-full touch-none items-center justify-center bg-neutral-100">
      <Loader className="h-6 w-6 animate-spin text-muted-foreground" />
    </main>
  );
};
