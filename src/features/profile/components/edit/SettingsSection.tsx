import { ReactNode } from "react";
import { Card, CardContent } from "@/components/ui/card";

interface Props {
  title: string;
  description: string;
  children: ReactNode;
}

export default function SettingsSection({ title, description, children }: Props) {
  return (
    <section className="grid gap-4 lg:grid-cols-[312px_minmax(0,1fr)] lg:gap-6">
      <div className="pt-0.5">
        <h2 className="text-base font-bold text-slate-800">{title}</h2>
        <p className="mt-2 max-w-[250px] text-sm leading-[22px] text-slate-600">
          {description}
        </p>
      </div>

      <Card className="gap-0 rounded-[32px] border border-slate-200 bg-white py-0 shadow-none ring-0">
        <CardContent className="grid gap-6 p-6 md:grid-cols-2">
          {children}
        </CardContent>
      </Card>
    </section>
  );
}