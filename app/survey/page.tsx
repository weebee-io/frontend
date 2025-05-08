import type { Metadata } from "next"
import SurveyForm from "@/components/survey-form"

export const metadata: Metadata = {
  title: "설문조사",
  description: "회원가입 후 설문조사",
}

export default function SurveyPage() {
  return (
    <div className="container flex h-screen w-screen flex-col items-center justify-center">
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[500px]">
        <SurveyForm />
      </div>
    </div>
  )
}
