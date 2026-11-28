import ProjectsContent from "@/features/projects/components/ProjectsContent";
import { Suspense } from "react";
import ProjectTableSkeleton from "../../../../shared/skeleton/ProjectTableSkeleton";

export default function Page() {
  return (
    <Suspense fallback={<ProjectTableSkeleton />}>
      <ProjectsContent />
    </Suspense>
  );
}
