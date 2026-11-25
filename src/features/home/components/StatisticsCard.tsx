import { LucideIcon, MoveUpRight } from "lucide-react";

interface CardProps {
  title: string;
  value: number;
  total: number;
  icon: LucideIcon;
  iconColor: string;
  barColor: string;
  percentage: number;
  description: string;
}
export default function StatisticsCard({
  title,
  value,
  icon: Icon,
  iconColor,
  barColor,
  percentage,
  description,
  total,
}: CardProps) {
  const progress = Math.min(100, Math.max(0, percentage));

  return (
    <div className="rounded-2xl bg-white px-4 py-4 shadow space-y-1">
      <div className="flex items-center justify-between">
        <p className="text-xl font-semibold">{title}</p>

        <div className={`rounded-full p-2.5 ${iconColor}`}>
          <Icon size={23} />
        </div>
      </div>

      <div className="flex gap-6 items-center">
        <span className="text-3xl font-bold text-gray-900">{value}</span>
        <div className="text-sm text-gray-500 flex items-center gap-2">
          <MoveUpRight size={12} className="text-green-600" />
          {description}
        </div>
      </div>

      <div className="space-y-2">
        <span className="block text-right text-sm font-medium text-gray-600">
          {value}/{total}
        </span>

        <div className="h-2 w-full overflow-hidden rounded-full bg-gray-100">
          <div
            className={`h-full rounded-full transition-all duration-500 ${barColor}`}
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
}
