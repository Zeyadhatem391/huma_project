
import { ProfileResponse } from "../api/getProfile";

type ProfileUser = ProfileResponse["data"]["user"];

export type ProfileFormValues = {
  name: string;
  email: string;
  phone: string;
  available_status: string;
  job_title: string;
  years_of_experience: string;
};

export function toFormValues(
  user?: Partial<ProfileUser>,
): ProfileFormValues {
  return {
    name: String(user?.name ?? ""),
    email: String(user?.email ?? ""),
    phone: String(user?.phone ?? ""),
    available_status: String(user?.available_status ?? ""),
    job_title: String(user?.job_title ?? ""),
    years_of_experience: String(user?.years_of_experience ?? ""),
  };
}
