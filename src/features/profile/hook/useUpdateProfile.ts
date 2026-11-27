import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import updateProfile from "../api/updateProfile"; 

export default function useUpdateProfile() {
  return useMutation({
    mutationFn: updateProfile,
    onSuccess: () => toast.success("Profile updated successfully"),
    onError: (error: Error) => toast.error(error.message),
  });
}