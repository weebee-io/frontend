import type { Metadata } from "next"
import QuizContent from "@/components/quiz-content"
import DashboardNav from "@/components/dashboard-nav"

export const metadata: Metadata = {
  title: "금융 퀴즈",
  description: "금융 지식 퀴즈에 도전하세요",
}

export default function QuizPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <DashboardNav />
      <main className="flex-1 p-6">
        <QuizContent />
      </main>
    </div>
  )
}
