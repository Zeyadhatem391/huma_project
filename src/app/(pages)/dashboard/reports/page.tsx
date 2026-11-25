import CardReport from "@/features/reports/components/CardReport";
import { reports } from "@/features/reports/data/report";

export default function Page() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {reports.map((report) => (
          <CardReport
            key={report.id}
            title={report.title}
            value={report.value}
            change={report.change}
          />
        ))}
      </div>
    </div>
  );
}
