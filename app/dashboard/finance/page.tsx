import type { Metadata } from "next"
import FinanceContent from "@/components/finance-content"
import DashboardNav from "@/components/dashboard-nav"

export const metadata: Metadata = {
  title: "금융 서비스",
  description: "다양한 금융 서비스 추천",
}

export default function FinancePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <DashboardNav />
      <main className="flex-1 p-6">
        <FinanceContent />
      </main>
    </div>
  )
}
