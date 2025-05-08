"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Loader2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"

// 설문 문항 정의
const questions = [
  {
    id: 1,
    question: "온라인 게임을 얼마나 자주 플레이하시나요?",
    options: [
      { value: "daily", label: "매일" },
      { value: "weekly", label: "일주일에 몇 번" },
      { value: "monthly", label: "한 달에 몇 번" },
      { value: "rarely", label: "거의 하지 않음" },
    ],
  },
  {
    id: 2,
    question: "주로 어떤 장르의 게임을 선호하시나요?",
    options: [
      { value: "fps", label: "FPS (슈팅 게임)" },
      { value: "moba", label: "MOBA (리그 오브 레전드 등)" },
      { value: "rpg", label: "RPG (롤플레잉 게임)" },
      { value: "casual", label: "캐주얼 게임" },
    ],
  },
  {
    id: 3,
    question: "게임 내 경쟁적인 플레이를 즐기시나요?",
    options: [
      { value: "yes", label: "예" },
      { value: "no", label: "아니요" },
    ],
  },
  {
    id: 4,
    question: "경쟁적인 게임에서 자신의 실력은 어느 정도라고 생각하시나요?",
    options: [
      { value: "beginner", label: "초보자" },
      { value: "intermediate", label: "중급자" },
      { value: "advanced", label: "상급자" },
    ],
  },
  {
    id: 5,
    question: "게임을 플레이할 때 가장 중요하게 생각하는 것은 무엇인가요?",
    options: [
      { value: "fun", label: "재미와 즐거움" },
      { value: "winning", label: "승리와 성취감" },
      { value: "social", label: "친구들과의 소통" },
      { value: "story", label: "스토리와 세계관" },
    ],
  },
]

// 랭크 결정 함수 (예시)
const determineRank = (answers: Record<number, string>): string => {
  // 실제로는 더 복잡한 로직이 필요하지만, 예시로 간단하게 구현
  const rankPoints = Object.values(answers).reduce((total, answer) => {
    if (answer === "daily" || answer === "advanced" || answer === "winning") {
      return total + 3
    } else if (answer === "weekly" || answer === "intermediate" || answer === "fps" || answer === "moba") {
      return total + 2
    }
    return total + 1
  }, 0)

  if (rankPoints >= 10) return "골드"
  if (rankPoints >= 6) return "실버"
  return "브론즈"
}

export default function SurveyForm() {
  const router = useRouter()
  const [currentQuestion, setCurrentQuestion] = useState(1)
  const [answers, setAnswers] = useState<Record<number, string>>({})
  const [selectedOption, setSelectedOption] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [rank, setRank] = useState<string | null>(null)
  const [progress, setProgress] = useState(0)

  // 진행 상황 업데이트
  useEffect(() => {
    const totalQuestions = questions.length
    const answeredQuestions = Object.keys(answers).length
    setProgress((answeredQuestions / totalQuestions) * 100)
  }, [answers])

  const handleOptionSelect = (value: string) => {
    setSelectedOption(value)
  }

  const handleNext = () => {
    if (!selectedOption) return

    // 현재 답변 저장
    setAnswers((prev) => ({ ...prev, [currentQuestion]: selectedOption }))

    // 3번 문항에서 "아니요"를 선택한 경우 5번 문항으로 건너뛰기
    if (currentQuestion === 3 && selectedOption === "no") {
      setCurrentQuestion(5)
    } else if (currentQuestion < questions.length) {
      // 다음 문항으로 이동
      setCurrentQuestion(currentQuestion + 1)
    } else {
      // 모든 문항 완료, 랭크 측정 시작
      startRankMeasurement()
    }

    // 선택 초기화
    setSelectedOption(null)
  }

  const startRankMeasurement = () => {
    setIsLoading(true)
    // 랭크 측정 시뮬레이션 (실제로는 서버에서 계산)
    setTimeout(() => {
      const userRank = determineRank(answers)
      setRank(userRank)
      setIsLoading(false)
    }, 2000)
  }

  const handleComplete = () => {
    // 메인 페이지로 이동
    router.push("/dashboard")
  }

  // 현재 문항 가져오기
  const currentQuestionData = questions.find((q) => q.id === currentQuestion)

  // 랭크 결과 화면
  if (rank) {
    return (
      <Card className="w-full">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">랭크 측정 완료!</CardTitle>
          <CardDescription>회원님의 랭크가 측정되었습니다</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center space-y-6 py-8">
          <div className="text-center">
            <p className="text-lg font-medium">회원님의 랭크는</p>
            <h2 className="mt-2 text-4xl font-bold">
              {rank === "골드" && "🥇 "}
              {rank === "실버" && "🥈 "}
              {rank === "브론즈" && "🥉 "}
              {rank}
            </h2>
            <p className="mt-4 text-muted-foreground">
              {rank === "골드" && "상위 10%의 실력자입니다!"}
              {rank === "실버" && "평균 이상의 실력을 가지고 있습니다."}
              {rank === "브론즈" && "게임을 즐기는 마음이 중요합니다."}
            </p>
          </div>
        </CardContent>
        <CardFooter>
          <Button onClick={handleComplete} className="w-full">
            가입 완료!
          </Button>
        </CardFooter>
      </Card>
    )
  }

  // 로딩 화면
  if (isLoading) {
    return (
      <Card className="w-full">
        <CardHeader className="text-center">
          <CardTitle>랭크 측정 중...</CardTitle>
          <CardDescription>회원님의 응답을 분석하고 있습니다</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center space-y-6 py-12">
          <Loader2 className="h-16 w-16 animate-spin text-primary" />
          <p className="text-center text-muted-foreground">잠시만 기다려주세요...</p>
        </CardContent>
      </Card>
    )
  }

  // 설문 문항 화면
  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>설문조사</CardTitle>
          <span className="text-sm text-muted-foreground">
            {currentQuestion}/{questions.length}
          </span>
        </div>
        <Progress value={progress} className="h-2 w-full" />
      </CardHeader>
      <CardContent>
        {currentQuestionData && (
          <div className="space-y-6">
            <h2 className="text-xl font-medium">{currentQuestionData.question}</h2>
            <RadioGroup value={selectedOption || ""} onValueChange={handleOptionSelect}>
              <div className="space-y-3">
                {currentQuestionData.options.map((option) => (
                  <div key={option.value} className="flex items-center space-x-2 rounded-md border p-3">
                    <RadioGroupItem value={option.value} id={option.value} />
                    <Label htmlFor={option.value} className="flex-grow cursor-pointer">
                      {option.label}
                    </Label>
                  </div>
                ))}
              </div>
            </RadioGroup>
          </div>
        )}
      </CardContent>
      <CardFooter>
        <Button onClick={handleNext} disabled={!selectedOption} className="w-full">
          {currentQuestion === questions.length ? "설문 완료" : "다음"}
        </Button>
      </CardFooter>
    </Card>
  )
}
