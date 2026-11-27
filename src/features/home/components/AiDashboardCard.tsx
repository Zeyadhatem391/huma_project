"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { RobotIcon } from "@/assets/icons/IconRobot";
import { SendHorizontal } from "lucide-react";
import { askGeneralAi } from "@/features/Ai/api/askGeneralAi";

type FormValues = { query: string };

export default function AiDashboardCard() {
  const [answer, setAnswer] = useState("");
  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({ defaultValues: { query: "" } });

  const onSubmit = async ({ query }: FormValues) => {
    setAnswer("");

    try {
      const res = await askGeneralAi({ query: query.trim() });
      setAnswer(res.data.answer);
      reset();
    } catch (error) {
      console.error(error);
      setError("root", {
        message:
          error instanceof Error ? error.message : "Something went wrong.",
      });
    }
  };

  return (
    <div className="relative flex h-[414px] w-[310px] flex-col overflow-hidden rounded-2xl border border-gray-200 bg-gradient-to-b from-[#EEF3FD] via-white to-white p-5 shadow-sm">
      <h2 className="text-[22px] font-medium text-[#14151A]">Ask AI</h2>

      {isSubmitting ? (
        <div className="flex flex-1 flex-col items-center justify-center gap-5 pb-4">
          <div className="animate-pulse">
            <RobotIcon />
          </div>
          <div className="flex gap-1.5">
            <span className="size-2.5 animate-bounce rounded-full bg-blue-500 [animation-delay:-0.3s]" />
            <span className="size-2.5 animate-bounce rounded-full bg-blue-500 [animation-delay:-0.15s]" />
            <span className="size-2.5 animate-bounce rounded-full bg-blue-500" />
          </div>
        </div>
      ) : answer ? (
        <div className="my-3 min-h-0 flex-1 overflow-y-auto">
          <p
            dir="auto"
            className="whitespace-pre-wrap text-[14px] leading-6 text-[#14151A]"
          >
            {answer}
          </p>
        </div>
      ) : (
        <div className="flex flex-1 flex-col items-center justify-center gap-5 pb-4">
          <RobotIcon />
          {errors.root ? (
            <p role="alert" className="text-center text-[14px] text-red-500">
              {errors.root.message}
            </p>
          ) : (
            <p className="text-[17px] text-[#14151A]">ask me anything about…</p>
          )}
        </div>
      )}

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="relative flex h-[135px] shrink-0 flex-col rounded-2xl bg-[#F6F7F9] p-4"
      >
        <textarea
          {...register("query", {
            validate: (value) =>
              value.trim() !== "" || "Please write your question first.",
          })}
          dir="auto"
          readOnly={isSubmitting}
          aria-invalid={!!errors.query}
          onKeyDown={(e) => {
            if (
              e.key === "Enter" &&
              !e.shiftKey &&
              !e.nativeEvent.isComposing
            ) {
              e.preventDefault();
              if (!isSubmitting) e.currentTarget.form?.requestSubmit();
            }
          }}
          placeholder="ask me anything about…"
          className="w-full flex-1 resize-none bg-transparent pr-8 text-[14px] text-[#14151A] placeholder:text-[#14151A] focus:outline-none"
        />
        {errors.query && (
          <p role="alert" className="pr-8 text-[12px] text-red-500">
            {errors.query.message}
          </p>
        )}
        <button
          type="submit"
          aria-label="Send"
          disabled={isSubmitting}
          className="absolute bottom-4 right-4 cursor-pointer transition-opacity hover:opacity-70 disabled:cursor-not-allowed disabled:opacity-40"
        >
          <SendHorizontal size={20} />
        </button>
      </form>
    </div>
  );
}
