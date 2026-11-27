import ProjectsContent from "@/features/projects/components/ProjectsContent";
import { Suspense } from "react";

export default function Page() {
  return (
    <Suspense fallback={<div className="p-5">Loading projects...</div>}>
      <ProjectsContent />
    </Suspense>
  );
}
