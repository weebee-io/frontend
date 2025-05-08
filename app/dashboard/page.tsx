import type { Metadata } from "next"
import DashboardContent from "@/components/dashboard-content"
import DashboardNav from "@/components/dashboard-nav"

export const metadata: Metadata = {
  title: "대시보드",
  description: "메인 대시보드",
}

export default function DashboardPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <DashboardNav />
      <main className="flex-1 p-6">
        <DashboardContent />
      </main>
    </div>
  )
}
