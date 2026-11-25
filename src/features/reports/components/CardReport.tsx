
interface Props {
  title: string;
  value: string;
  change: number;
  description?: string;
}

export default function CardReport({
  title,
  value,
  change,
  description = "From last month",
}: Props) {
  const isPositive = change >= 0;

  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm transition-shadow hover:shadow-md sm:p-6">
      <h2 className="text-lg font-semibold text-gray-800">
        {title}
      </h2>

      <div className="mt-4">
        <p className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          {value} %
        </p>
      </div>

      <div className="mt-3 flex flex-wrap items-center gap-2 text-sm">
        <span
          className={`font-semibold ${
            isPositive ? "text-green-600" : "text-red-600"
          }`}
        >
          {isPositive ? "+" : ""}
          {change}%
        </span>

        <p className="text-gray-500">{description}</p>
      </div>
    </div>
  );
}
