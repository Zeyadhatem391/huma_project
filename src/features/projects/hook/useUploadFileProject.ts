
import { useMutation, useQueryClient } from "@tanstack/react-query";
import uploadFileProject, {
    UploadFileParams,
} from "../api/uploadFileProject";

export default function useUploadFileProject(projectId: number) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: Omit<UploadFileParams, "project_id">) =>
            uploadFileProject({
                ...data,
                project_id: projectId,
            }),

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["projects-files", projectId],
            });
        },
    });
}
