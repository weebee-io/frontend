"use client"

import { useState, useEffect } from "react"
import { Check, X, ChevronRight, Trophy } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Progress } from "@/components/ui/progress"

// 퀴즈 데이터 타입 정의
interface QuizQuestion {
  id: string
  question: string
  options: { value: string; label: string }[]
  correctAnswer: string
  explanation: string
  hint: string
  difficulty: "브론즈" | "실버" | "골드"
}

// 퀴즈 데이터 (예시)
const quizData: QuizQuestion[] = [
  // 브론즈 난이도 문제
  {
    id: "b1",
    question: "복리란 무엇인가요?",
    options: [
      { value: "a", label: "원금에만 이자가 붙는 방식" },
      { value: "b", label: "원금과 이자에 이자가 붙는 방식" },
      { value: "c", label: "원금에서 이자를 뺀 방식" },
      { value: "d", label: "이자에서 세금을 뺀 방식" },
    ],
    correctAnswer: "b",
    explanation:
      "복리는 원금뿐만 아니라 발생한 이자에도 이자가 붙는 방식입니다. 이로 인해 시간이 지날수록 자산이 기하급수적으로 증가할 수 있습니다.",
    hint: "이자에도 이자가 붙는 방식을 생각해보세요.",
    difficulty: "브론즈",
  },
  {
    id: "b2",
    question: "예산을 세울 때 일반적으로 권장되는 50/30/20 규칙에서 50%는 무엇을 의미하나요?",
    options: [
      { value: "a", label: "저축" },
      { value: "b", label: "투자" },
      { value: "c", label: "필수 지출" },
      { value: "d", label: "여가 활동" },
    ],
    correctAnswer: "c",
    explanation:
      "50/30/20 규칙에서 50%는 주거비, 식비, 교통비 등의 필수 지출을 의미합니다. 30%는 여가와 같은 개인 지출, 20%는 저축 및 투자에 사용됩니다.",
    hint: "생활에 꼭 필요한 지출이 무엇인지 생각해보세요.",
    difficulty: "브론즈",
  },
  {
    id: "b3",
    question: "긴급 자금은 일반적으로 몇 개월치의 생활비를 준비하는 것이 좋을까요?",
    options: [
      { value: "a", label: "1개월" },
      { value: "b", label: "3-6개월" },
      { value: "c", label: "12개월" },
      { value: "d", label: "24개월" },
    ],
    correctAnswer: "b",
    explanation:
      "재정 전문가들은 일반적으로 3-6개월치의 생활비를 긴급 자금으로 준비할 것을 권장합니다. 이는 실직이나 질병과 같은 예상치 못한 상황에 대비하기 위함입니다.",
    hint: "너무 적지도, 너무 많지도 않은 기간을 생각해보세요.",
    difficulty: "브론즈",
  },

  // 실버 난이도 문제
  {
    id: "s1",
    question: "다음 중 분산투자의 주요 목적은 무엇인가요?",
    options: [
      { value: "a", label: "수익률 극대화" },
      { value: "b", label: "세금 절감" },
      { value: "c", label: "위험 감소" },
      { value: "d", label: "거래 비용 절감" },
    ],
    correctAnswer: "c",
    explanation:
      "분산투자의 주요 목적은 '모든 달걀을 한 바구니에 담지 않음으로써' 투자 위험을 감소시키는 것입니다. 다양한 자산에 투자하면 한 자산의 손실이 다른 자산의 이익으로 상쇄될 수 있습니다.",
    hint: "투자에서 가장 중요한 것 중 하나는 위험 관리입니다.",
    difficulty: "실버",
  },
  {
    id: "s2",
    question: "인플레이션이 높을 때 일반적으로 가장 불리한 자산은 무엇인가요?",
    options: [
      { value: "a", label: "주식" },
      { value: "b", label: "부동산" },
      { value: "c", label: "현금" },
      { value: "d", label: "물가연동채권" },
    ],
    correctAnswer: "c",
    explanation:
      "인플레이션이 높을 때는 현금의 구매력이 시간이 지남에 따라 감소합니다. 반면, 주식, 부동산, 물가연동채권 등은 일반적으로 인플레이션에 대한 헤지 역할을 할 수 있습니다.",
    hint: "화폐 가치가 떨어지면 어떤 자산이 가장 영향을 많이 받을까요?",
    difficulty: "실버",
  },
  {
    id: "s3",
    question: "다음 중 신용점수에 가장 큰 영향을 미치는 요소는 무엇인가요?",
    options: [
      { value: "a", label: "소득 수준" },
      { value: "b", label: "대출 상환 이력" },
      { value: "c", label: "보유 계좌 수" },
      { value: "d", label: "최근 신용 조회 횟수" },
    ],
    correctAnswer: "b",
    explanation:
      "신용점수에 가장 큰 영향을 미치는 요소는 대출 상환 이력입니다. 제때 상환하는 것이 좋은 신용점수를 유지하는 데 가장 중요합니다.",
    hint: "신용기관이 가장 중요하게 보는 것은 과거의 금융 행동입니다.",
    difficulty: "실버",
  },

  // 골드 난이도 문제
  {
    id: "g1",
    question: "다음 중 효율적 시장 가설(Efficient Market Hypothesis)의 내용으로 가장 적절한 것은?",
    options: [
      { value: "a", label: "시장은 항상 상승한다" },
      { value: "b", label: "모든 투자자는 합리적으로 행동한다" },
      { value: "c", label: "주가는 이미 모든 공개 정보를 반영하고 있다" },
      { value: "d", label: "장기 투자가 단기 투자보다 항상 유리하다" },
    ],
    correctAnswer: "c",
    explanation:
      "효율적 시장 가설에 따르면, 주가는 이미 모든 공개된 정보를 반영하고 있어 추가적인 정보 분석을 통한 초과 수익을 지속적으로 얻기 어렵다고 봅니다.",
    hint: "시장 가격과 정보의 관계에 대해 생각해보세요.",
    difficulty: "골드",
  },
  {
    id: "g2",
    question: "다음 중 채권 가격과 이자율의 관계를 가장 정확하게 설명한 것은?",
    options: [
      { value: "a", label: "이자율이 상승하면 채권 가격도 상승한다" },
      { value: "b", label: "이자율이 하락하면 채권 가격도 하락한다" },
      { value: "c", label: "이자율과 채권 가격은 반비례 관계이다" },
      { value: "d", label: "이자율과 채권 가격은 관련이 없다" },
    ],
    correctAnswer: "c",
    explanation:
      "채권 가격과 이자율은 반비례 관계입니다. 이자율이 상승하면 새로 발행되는 채권의 수익률이 높아지므로, 기존 채권의 가치는 상대적으로 하락합니다.",
    hint: "새로운 채권이 더 높은 이자를 제공한다면, 기존 채권의 가치는 어떻게 될까요?",
    difficulty: "골드",
  },
  {
    id: "g3",
    question: "다음 중 옵션(Option) 계약에 대한 설명으로 옳지 않은 것은?",
    options: [
      { value: "a", label: "콜옵션은 특정 가격에 자산을 살 수 있는 권리이다" },
      { value: "b", label: "풋옵션은 특정 가격에 자산을 팔 수 있는 권리이다" },
      { value: "c", label: "옵션 매수자는 권리를 행사할 의무가 있다" },
      { value: "d", label: "옵션 프리미엄은 옵션 구매 비용이다" },
    ],
    correctAnswer: "c",
    explanation:
      "옵션 매수자는 권리를 행사할 의무가 아닌 권리만 가집니다. 상황이 불리하면 옵션을 행사하지 않을 수 있으며, 이 경우 지불한 프리미엄만 손실로 확정됩니다.",
    hint: "옵션의 핵심은 '의무'가 아닌 '권리'에 있습니다.",
    difficulty: "골드",
  },
]

export default function QuizContent() {
  const [userRank, setUserRank] = useState<"브론즈" | "실버" | "골드">("실버") // 예시로 실버 랭크 설정
  const [selectedQuiz, setSelectedQuiz] = useState<QuizQuestion | null>(null)
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null)
  const [isAnswered, setIsAnswered] = useState(false)
  const [isCorrect, setIsCorrect] = useState(false)
  const [completedQuizzes, setCompletedQuizzes] = useState<string[]>([])
  const [solvedQuizzes, setSolvedQuizzes] = useState<string[]>([])
  const [rankProgress, setRankProgress] = useState<number>(0)
  const [previousRankQuizzes, setPreviousRankQuizzes] = useState<QuizQuestion[]>([])

  // 로컬 스토리지에서 완료된 퀴즈 불러오기
  useEffect(() => {
    const savedCompletedQuizzes = localStorage.getItem("completedQuizzes")
    if (savedCompletedQuizzes) {
      setCompletedQuizzes(JSON.parse(savedCompletedQuizzes))
    }

    const savedSolvedQuizzes = localStorage.getItem("solvedQuizzes")
    if (savedSolvedQuizzes) {
      setSolvedQuizzes(JSON.parse(savedSolvedQuizzes))
    }

    const savedRankProgress = localStorage.getItem("rankProgress")
    if (savedRankProgress) {
      setRankProgress(Number.parseInt(savedRankProgress))
    }

    // 예시를 위해 로컬 스토리지에서 랭크 불러오기
    const savedRank = localStorage.getItem("userRank")
    if (savedRank && (savedRank === "브론즈" || savedRank === "실버" || savedRank === "골드")) {
      setUserRank(savedRank as "브론즈" | "실버" | "골드")

      // 이전 랭크의 퀴즈 목록 불러오기
      const prevRankQuizzes = quizData.filter((quiz) => {
        if (savedRank === "실버") return quiz.difficulty === "브론즈"
        if (savedRank === "골드") return quiz.difficulty === "브론즈" || quiz.difficulty === "실버"
        return false
      })
      setPreviousRankQuizzes(prevRankQuizzes)
    }
  }, [])

  // 완료된 퀴즈 저장
  useEffect(() => {
    if (completedQuizzes.length > 0) {
      localStorage.setItem("completedQuizzes", JSON.stringify(completedQuizzes))
    }

    if (solvedQuizzes.length > 0) {
      localStorage.setItem("solvedQuizzes", JSON.stringify(solvedQuizzes))

      // 랭크 진행도 업데이트 및 랭크 상승 체크
      const newRankProgress = Math.min(solvedQuizzes.length, 10)
      setRankProgress(newRankProgress)
      localStorage.setItem("rankProgress", newRankProgress.toString())

      // 랭크 상승 체크
      if (userRank === "브론즈" && newRankProgress >= 5) {
        const prevRank = userRank
        setUserRank("실버")
        localStorage.setItem("userRank", "실버")

        // 이전 랭크 퀴즈 저장
        const prevRankQuizzes = quizData.filter((quiz) => quiz.difficulty === prevRank)
        setPreviousRankQuizzes(prevRankQuizzes)
      } else if (userRank === "실버" && newRankProgress >= 8) {
        const prevRank = userRank
        setUserRank("골드")
        localStorage.setItem("userRank", "골드")

        // 이전 랭크 퀴즈 저장
        const prevRankQuizzes = quizData.filter((quiz) => quiz.difficulty === "브론즈" || quiz.difficulty === "실버")
        setPreviousRankQuizzes(prevRankQuizzes)
      }
    }
  }, [solvedQuizzes, userRank])

  // 퀴즈 선택 핸들러
  const handleSelectQuiz = (quiz: QuizQuestion) => {
    setSelectedQuiz(quiz)
    setSelectedAnswer(null)
    setIsAnswered(false)
    setIsCorrect(false)
  }

  // 답변 제출 핸들러
  const handleSubmitAnswer = () => {
    if (!selectedQuiz || !selectedAnswer) return

    setIsAnswered(true)
    const correct = selectedAnswer === selectedQuiz.correctAnswer
    setIsCorrect(correct)

    if (correct) {
      if (!completedQuizzes.includes(selectedQuiz.id)) {
        setCompletedQuizzes([...completedQuizzes, selectedQuiz.id])
      }

      if (!solvedQuizzes.includes(selectedQuiz.id)) {
        setSolvedQuizzes([...solvedQuizzes, selectedQuiz.id])
      }
    }
  }

  // 다시 풀기 핸들러
  const handleRetry = () => {
    setSelectedAnswer(null)
    setIsAnswered(false)
    setIsCorrect(false)
  }

  // 퀴즈 목록으로 돌아가기 핸들러
  const handleBackToList = () => {
    setSelectedQuiz(null)
    setSelectedAnswer(null)
    setIsAnswered(false)
    setIsCorrect(false)
  }

  // 랭크별 퀴즈 필터링
  const bronzeQuizzes = quizData.filter((quiz) => quiz.difficulty === "브론즈")
  const silverQuizzes = quizData.filter((quiz) => quiz.difficulty === "실버")
  const goldQuizzes = quizData.filter((quiz) => quiz.difficulty === "골드")

  // 사용자 랭크에 따라 접근 가능한 퀴즈 결정
  const accessibleQuizzes = {
    브론즈: ["브론즈"],
    실버: ["브론즈", "실버"],
    골드: ["브론즈", "실버", "골드"],
  }

  return (
    <div className="container mx-auto max-w-5xl py-6">
      <h1 className="mb-8 text-3xl font-bold">금융 퀴즈</h1>

      {!selectedQuiz ? (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <p className="text-lg">
              현재 랭크: <Badge className="ml-2 text-base">{userRank}</Badge>
            </p>
            <p className="text-sm text-muted-foreground">
              완료한 퀴즈: {completedQuizzes.length}/{quizData.length}
            </p>
          </div>

          <div className="mt-2 mb-4">
            <div className="flex items-center justify-between text-sm text-muted-foreground">
              <span>랭크 진행도: {rankProgress}/10</span>
              {userRank === "브론즈" ? (
                <span>실버 랭크까지 {Math.max(0, 5 - rankProgress)}문제 남음</span>
              ) : userRank === "실버" ? (
                <span>골드 랭크까지 {Math.max(0, 8 - rankProgress)}문제 남음</span>
              ) : (
                <span>최고 랭크 달성!</span>
              )}
            </div>
            <Progress value={rankProgress * 10} max={100} className="h-2 w-full mt-1" />
          </div>

          <Tabs defaultValue="브론즈">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="브론즈" disabled={!accessibleQuizzes[userRank].includes("브론즈")}>
                브론즈 퀴즈
              </TabsTrigger>
              <TabsTrigger value="실버" disabled={!accessibleQuizzes[userRank].includes("실버")}>
                실버 퀴즈
              </TabsTrigger>
              <TabsTrigger value="골드" disabled={!accessibleQuizzes[userRank].includes("골드")}>
                골드 퀴즈
              </TabsTrigger>
            </TabsList>

            <TabsContent value="브론즈" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>브론즈 난이도 퀴즈</CardTitle>
                  <CardDescription>기본적인 금융 개념에 대한 퀴즈입니다.</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {bronzeQuizzes.map((quiz) => (
                      <div
                        key={quiz.id}
                        className={`flex cursor-pointer items-center justify-between rounded-lg border p-4 transition-colors hover:bg-muted ${
                          completedQuizzes.includes(quiz.id) ? "border-green-500 bg-green-50" : ""
                        }`}
                        onClick={() => handleSelectQuiz(quiz)}
                      >
                        <div className="flex items-center gap-3">
                          {completedQuizzes.includes(quiz.id) && <Check className="h-5 w-5 text-green-500" />}
                          <span>{quiz.question}</span>
                        </div>
                        <ChevronRight className="h-5 w-5 text-muted-foreground" />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="실버" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>실버 난이도 퀴즈</CardTitle>
                  <CardDescription>중급 수준의 금융 지식을 테스트합니다.</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {silverQuizzes.map((quiz) => (
                      <div
                        key={quiz.id}
                        className={`flex cursor-pointer items-center justify-between rounded-lg border p-4 transition-colors hover:bg-muted ${
                          completedQuizzes.includes(quiz.id) ? "border-green-500 bg-green-50" : ""
                        }`}
                        onClick={() => handleSelectQuiz(quiz)}
                      >
                        <div className="flex items-center gap-3">
                          {completedQuizzes.includes(quiz.id) && <Check className="h-5 w-5 text-green-500" />}
                          <span>{quiz.question}</span>
                        </div>
                        <ChevronRight className="h-5 w-5 text-muted-foreground" />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="골드" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>골드 난이도 퀴즈</CardTitle>
                  <CardDescription>고급 금융 지식을 테스트합니다.</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {goldQuizzes.map((quiz) => (
                      <div
                        key={quiz.id}
                        className={`flex cursor-pointer items-center justify-between rounded-lg border p-4 transition-colors hover:bg-muted ${
                          completedQuizzes.includes(quiz.id) ? "border-green-500 bg-green-50" : ""
                        }`}
                        onClick={() => handleSelectQuiz(quiz)}
                      >
                        <div className="flex items-center gap-3">
                          {completedQuizzes.includes(quiz.id) && <Check className="h-5 w-5 text-green-500" />}
                          <span>{quiz.question}</span>
                        </div>
                        <ChevronRight className="h-5 w-5 text-muted-foreground" />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      ) : (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Badge>{selectedQuiz.difficulty}</Badge>
                퀴즈
              </CardTitle>
              <Button variant="ghost" size="sm" onClick={handleBackToList}>
                목록으로 돌아가기
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <h2 className="text-xl font-semibold">{selectedQuiz.question}</h2>

              <RadioGroup
                value={selectedAnswer || ""}
                onValueChange={setSelectedAnswer}
                disabled={isAnswered && isCorrect}
              >
                <div className="space-y-3">
                  {selectedQuiz.options.map((option) => (
                    <div
                      key={option.value}
                      className={`flex items-center space-x-2 rounded-md border p-3 ${
                        isAnswered && option.value === selectedAnswer && isCorrect
                          ? "border-green-500 bg-green-50"
                          : isAnswered && option.value === selectedAnswer && !isCorrect
                            ? "border-red-500 bg-red-50"
                            : ""
                      }`}
                    >
                      <RadioGroupItem value={option.value} id={`option-${option.value}`} />
                      <Label htmlFor={`option-${option.value}`} className="flex-grow cursor-pointer">
                        {option.label}
                      </Label>
                      {isAnswered && option.value === selectedAnswer && isCorrect && (
                        <Check className="h-5 w-5 text-green-500" />
                      )}
                      {isAnswered && option.value === selectedAnswer && !isCorrect && (
                        <X className="h-5 w-5 text-red-500" />
                      )}
                    </div>
                  ))}
                </div>
              </RadioGroup>
            </div>

            {isAnswered && (
              <Alert className={isCorrect ? "bg-green-50" : "bg-amber-50"}>
                <Trophy className={`h-4 w-4 ${isCorrect ? "text-green-500" : "text-amber-500"}`} />
                <AlertTitle>{isCorrect ? "정답입니다!" : "다시 생각해보세요"}</AlertTitle>
                <AlertDescription>
                  {isCorrect ? selectedQuiz.explanation : "힌트: " + selectedQuiz.hint}
                </AlertDescription>
              </Alert>
            )}
          </CardContent>
          <CardFooter className="flex justify-end gap-2">
            {isAnswered && !isCorrect && (
              <Button variant="outline" onClick={handleRetry}>
                다시 시도하기
              </Button>
            )}
            {!isAnswered && (
              <Button onClick={handleSubmitAnswer} disabled={!selectedAnswer}>
                정답 확인하기
              </Button>
            )}
            {isAnswered && isCorrect && <Button onClick={handleBackToList}>다음 퀴즈로</Button>}
          </CardFooter>
        </Card>
      )}
      {!selectedQuiz && previousRankQuizzes.length > 0 && (
        <div className="mt-12">
          <h2 className="mb-4 text-xl font-semibold">이전 랭크 퀴즈</h2>
          <Card>
            <CardHeader>
              <CardTitle>이전에 풀었던 퀴즈</CardTitle>
              <CardDescription>랭크가 올라가면서 이전에 풀었던 퀴즈들입니다.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {previousRankQuizzes.map((quiz) => (
                  <div
                    key={quiz.id}
                    className={`flex cursor-pointer items-center justify-between rounded-lg border p-4 transition-colors hover:bg-muted ${
                      completedQuizzes.includes(quiz.id) ? "border-green-500 bg-green-50" : ""
                    }`}
                    onClick={() => handleSelectQuiz(quiz)}
                  >
                    <div className="flex items-center gap-3">
                      {completedQuizzes.includes(quiz.id) && <Check className="h-5 w-5 text-green-500" />}
                      <span>{quiz.question}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge>{quiz.difficulty}</Badge>
                      <ChevronRight className="h-5 w-5 text-muted-foreground" />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
