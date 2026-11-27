import { Mail, User } from "lucide-react";
import { Controller, useFormContext } from "react-hook-form";
import FormField from "./FormField";
import PhoneInput from "./PhoneInput";
import SettingsSection from "./SettingsSection";
import { ProfileFormValues } from "../../schema/profileForm";

export default function PersonalInfoSection() {
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext<ProfileFormValues>();

  return (
    <SettingsSection
      title="Personal Info"
      description="You can change your personal information settings here."
    >
      <FormField
        id="name"
        label="Full Name"
        icon={User}
        error={errors.name?.message}
        {...register("name", {
          validate: (v) => v.trim() !== "" || "Name is required",
        })}
      />

      <FormField
        id="email"
        label="Email Address"
        type="email"
        icon={Mail}
        error={errors.email?.message}
        {...register("email", {
          required: "Email is required",
          pattern: {
            value: /^\s*[^\s@]+@[^\s@]+\.[^\s@]+\s*$/,
            message: "Enter a valid email",
          },
        })}
      />

      <Controller
        name="phone"
        control={control}
        render={({ field }) => (
          <PhoneInput value={field.value} onChange={field.onChange} />
        )}
      />

      <FormField
        id="available_status"
        label="Availability Status"
        {...register("available_status")}
      />
    </SettingsSection>
  );
}