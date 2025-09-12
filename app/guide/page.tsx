import UsageGuide from "@/components/usage-guide"
import DashboardLayout from "@/components/dashboard-layout"

export default function GuidePage() {
  return (
    <DashboardLayout>
      <div className="p-6">
        <UsageGuide />
      </div>
    </DashboardLayout>
  )
}
