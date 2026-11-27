import { useFormContext } from "react-hook-form";
import FormField from "./FormField";
import SettingsSection from "./SettingsSection";
import { ProfileFormValues } from "../../schema/profileForm";

export default function ExperienceSection() {
  const {
    register,
    formState: { errors },
  } = useFormContext<ProfileFormValues>();

  return (
    <SettingsSection
      title="Experience"
      description="You can change Experience settings here."
    >
      <FormField id="job_title" label="Job Title" {...register("job_title")} />

      <FormField
        id="years_of_experience"
        label="Years of Experience"
        type="number"
        min={0}
        error={errors.years_of_experience?.message}
        {...register("years_of_experience", {
          min: { value: 0, message: "Must be 0 or more" },
        })}
      />
    </SettingsSection>
  );
}