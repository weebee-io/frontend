'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'

import { api } from '@/lib/api'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useToast } from '@/components/ui/use-toast'

/* ---------- 1. 폼 스키마 ---------- */
const schema = z.object({
  email: z.string().email({ message: '이메일 형식이어야 합니다' }),
  password: z.string().min(8, { message: '비밀번호는 8자 이상' }),
})
type FormValues = z.infer<typeof schema>

/* ---------- 2. 컴포넌트 ---------- */
export default function LoginForm() {
  const router = useRouter()
  const { toast } = useToast()
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
  })
  const [serverErr, setServerErr] = useState<string | null>(null)

  /* ---------- 3. 제출 핸들러 ---------- */
  async function onSubmit(data: FormValues) {
    setServerErr(null)
    try {
      await api.login(data)          // ✨ JWT 발급 + 쿠키 저장
      toast({ title: '로그인 성공', description: '환영합니다!' })
      router.replace('/dashboard')   // 원하는 경로로 이동
    } catch (err) {
      setServerErr((err as Error).message)
    }
  }

  /* ---------- 4. 렌더 ---------- */
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <Input placeholder="이메일" {...register('email')} />
        {errors.email && <p className="text-xs text-red-500">{errors.email.message}</p>}
      </div>

      <div>
        <Input
          type="password"
          placeholder="비밀번호"
          autoComplete="current-password"
          {...register('password')}
        />
        {errors.password && <p className="text-xs text-red-500">{errors.password.message}</p>}
      </div>

      {serverErr && <p className="text-sm text-red-600">{serverErr}</p>}

      <Button type="submit" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? '로그인 중…' : '로그인'}
      </Button>
    </form>
  )
}
