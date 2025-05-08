import type { Metadata } from "next"
import Link from "next/link"
import RegisterForm from "@/components/register-form"

export const metadata: Metadata = {
  title: "회원가입",
  description: "새 계정을 만드세요",
}

export default function RegisterPage() {
  return (
    <div className="container flex h-screen w-screen flex-col items-center justify-center">
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[450px]">
        <div className="flex flex-col space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">회원가입</h1>
          <p className="text-sm text-muted-foreground">아래 정보를 입력하여 새 계정을 만드세요</p>
        </div>
        <RegisterForm />
        <p className="px-8 text-center text-sm text-muted-foreground">
          이미 계정이 있으신가요?{" "}
          <Link href="/login" className="hover:text-brand underline underline-offset-4">
            로그인
          </Link>
        </p>
      </div>
    </div>
  )
}
