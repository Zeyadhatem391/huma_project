"use client";

import { useEffect, useMemo, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { Check, Loader2 } from "lucide-react";
import { FormProvider, useForm } from "react-hook-form";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

import useGetProfile from "@/features/profile/hook/useGetProfile";
import {
  ProfileFormValues,
  toFormValues,
} from "@/features/profile/schema/profileForm";
import PersonalInfoSection from "@/features/profile/components/edit/PersonalInfoSection";
import ExperienceSection from "@/features/profile/components/edit/ExperienceSection";
import ProfileHeader from "@/features/profile/components/edit/ProfileHeader";
import updateProfile from "@/features/profile/api/updateProfile";

export default function ProfilePage() {
  const { data } = useGetProfile();
  const profile = data?.data;
  const queryClient = useQueryClient();

  const [avatar, setAvatar] = useState<File>();
  const preview = useMemo(
    () => (avatar ? URL.createObjectURL(avatar) : undefined),
    [avatar],
  );

  useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview);
    };
  }, [preview]);

  const form = useForm<ProfileFormValues>({
    defaultValues: toFormValues(),
    values: profile ? toFormValues(profile.user) : undefined,
    resetOptions: { keepDirtyValues: true },
  });

  const { dirtyFields, isSubmitting } = form.formState;
  const hasChanges = Object.keys(dirtyFields).length > 0 || !!avatar;

  async function onSubmit(values: ProfileFormValues) {
    const formData = new FormData();

    (Object.keys(dirtyFields) as (keyof ProfileFormValues)[]).forEach((key) => {
      if (key === "years_of_experience") {
        if (values[key] !== "") {
          formData.append(key, values[key]);
        }
      } else {
        formData.append(key, values[key].trim());
      }
    });

    if (avatar) formData.append("avatar", avatar);

    if ([...formData.keys()].length === 0) {
      toast.info("No changes to save");
      return;
    }

    try {
      await updateProfile(formData);

      toast.success("Profile updated successfully");

      form.reset(values);

      await queryClient.invalidateQueries({
        queryKey: ["profile"],
      });

      setAvatar(undefined);
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Failed to update profile",
      );
    }
  }
  return (
    <main className="">
      <ProfileHeader
        name={profile?.user.name}
        avatarUrl={preview || profile?.user.avatar_url || ""}
        onAvatarChange={(file) => {
          if (!isSubmitting) setAvatar(file);
        }}
      />

      <FormProvider {...form}>
        <form
          noValidate
          onSubmit={form.handleSubmit(onSubmit)}
          className="mt-10 lg:mt-[68px]"
        >
          <fieldset disabled={!profile || isSubmitting} className="space-y-6">
            <PersonalInfoSection />
            <ExperienceSection />

            <Separator className="bg-slate-300" />

            <Button
              type="submit"
              disabled={!hasChanges || isSubmitting}
              className="h-10 w-full rounded-full bg-[#0057FF] font-semibold text-white hover:bg-[#004BDB]"
            >
              {isSubmitting ? "Saving..." : "Save"}
              {isSubmitting ? (
                <Loader2 className="ml-1 size-5 animate-spin" />
              ) : (
                <Check className="ml-1 size-5" />
              )}
            </Button>
          </fieldset>
        </form>
      </FormProvider>
    </main>
  );
}
