import { ComponentProps } from "react";
import { LucideIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

interface Props extends ComponentProps<typeof Input> {
  id: string;
  label: string;
  icon?: LucideIcon;
  containerClassName?: string;
  error?: string;
}

export default function FormField({
  id,
  label,
  icon: Icon,
  className,
  containerClassName,
  error,
  ...props
}: Props) {
  return (
    <div className={cn("space-y-2", containerClassName, error)}>
      <Label htmlFor={id} className="text-sm font-semibold text-gray-900">
        {label}
      </Label>

      <div className="relative">
        {Icon && (
          <Icon className="pointer-events-none absolute left-3 top-1/2 size-5 -translate-y-1/2 text-slate-600" />
        )}
        <Input
          id={id}
          name={id}
          className={cn(
            "h-12 rounded-full border-slate-300 bg-white px-3 text-base text-slate-600 shadow-none md:text-base",
            Icon && "pl-10",
            className,
          )}
          {...props}
        />
      </div>
      {error && <p className="text-sm text-red-600">{error}</p>}
    </div>
  );
}
