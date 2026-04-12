import UprManager from "@/app/components/UprManager";
import UprArchive from "@/app/components/UprArchive";
import UprDetailedReport from "@/app/components/UprDetailedReport";

export default function UprPage() {
  return (
    <div className="p-6 space-y-8" dir="rtl">
      <UprManager />
      <UprArchive />
      <UprDetailedReport />
    </div>
  );
}
