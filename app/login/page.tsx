import type { Metadata } from "next"
import Link from "next/link"
import LoginForm from "@/components/login-form"

export const metadata: Metadata = {
  title: "로그인",
  description: "계정에 로그인하세요",
}

export default function LoginPage() {
  return (
    <div className="container flex h-screen w-screen flex-col items-center justify-center">
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <div className="flex flex-col space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">로그인</h1>
          <p className="text-sm text-muted-foreground">이메일과 비밀번호를 입력하여 로그인하세요</p>
        </div>
        <LoginForm />
        <p className="px-8 text-center text-sm text-muted-foreground">
          <Link href="/forgot-password" className="hover:text-brand underline underline-offset-4">
            비밀번호를 잊으셨나요?
          </Link>
        </p>
        <p className="px-8 text-center text-sm text-muted-foreground">
          계정이 없으신가요?{" "}
          <Link href="/register" className="hover:text-brand underline underline-offset-4">
            회원가입
          </Link>
        </p>
      </div>
    </div>
  )
}
