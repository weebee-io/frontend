"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Eye, EyeOff, Loader2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function RegisterForm() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    id: "",
    password: "",
    username: "",
    nickname: "",
    gender: "",
    age: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleRadioChange = (value: string) => {
    setFormData((prev) => ({ ...prev, gender: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // 여기에 회원가입 로직을 구현하세요
      console.log("회원가입 시도:", formData)

      // 회원가입 성공 시 설문조사 페이지로 리다이렉트
      setTimeout(() => {
        router.push("/survey")
      }, 1500)
    } catch (error) {
      console.error("회원가입 오류:", error)
    } finally {
      // 실제 구현에서는 이 부분을 제거하세요
      setTimeout(() => {
        setIsLoading(false)
      }, 1500)
    }
  }

  return (
    <div className="grid gap-6">
      <form onSubmit={handleSubmit}>
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="id">아이디</Label>
            <Input
              id="id"
              name="id"
              placeholder="아이디를 입력하세요"
              autoCapitalize="none"
              autoCorrect="off"
              disabled={isLoading}
              value={formData.id}
              onChange={handleChange}
              required
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="password">비밀번호</Label>
            <div className="relative">
              <Input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                autoComplete="new-password"
                disabled={isLoading}
                value={formData.password}
                onChange={handleChange}
                required
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="absolute right-0 top-0 h-full px-3 py-2 text-muted-foreground"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                <span className="sr-only">{showPassword ? "비밀번호 숨기기" : "비밀번호 보기"}</span>
              </Button>
            </div>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="username">사용자 이름</Label>
            <Input
              id="username"
              name="username"
              placeholder="실명을 입력하세요"
              disabled={isLoading}
              value={formData.username}
              onChange={handleChange}
              required
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="nickname">닉네임</Label>
            <Input
              id="nickname"
              name="nickname"
              placeholder="사용할 닉네임을 입력하세요"
              disabled={isLoading}
              value={formData.nickname}
              onChange={handleChange}
              required
            />
          </div>

          <div className="grid gap-2">
            <Label>성별</Label>
            <RadioGroup value={formData.gender} onValueChange={handleRadioChange} className="flex space-x-4">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="male" id="male" />
                <Label htmlFor="male" className="cursor-pointer">
                  남성
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="female" id="female" />
                <Label htmlFor="female" className="cursor-pointer">
                  여성
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="other" id="other" />
                <Label htmlFor="other" className="cursor-pointer">
                  기타
                </Label>
              </div>
            </RadioGroup>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="age">연령</Label>
            <Select value={formData.age} onValueChange={(value) => handleSelectChange("age", value)}>
              <SelectTrigger id="age">
                <SelectValue placeholder="연령대를 선택하세요" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="10s">10대</SelectItem>
                <SelectItem value="20s">20대</SelectItem>
                <SelectItem value="30s">30대</SelectItem>
                <SelectItem value="40s">40대</SelectItem>
                <SelectItem value="50s">50대</SelectItem>
                <SelectItem value="60s">60대 이상</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button type="submit" className="mt-2" disabled={isLoading}>
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            회원가입
          </Button>
        </div>
      </form>
    </div>
  )
}
