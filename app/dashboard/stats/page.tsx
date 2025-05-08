import type { Metadata } from "next"
import StatsContent from "@/components/stats-content"
import DashboardNav from "@/components/dashboard-nav"

export const metadata: Metadata = {
  title: "스탯",
  description: "사용자 능력치 및 랭크",
}

export default function StatsPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <DashboardNav />
      <main className="flex-1 p-6">
        <StatsContent />
      </main>
    </div>
  )
}
