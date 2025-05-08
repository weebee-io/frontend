"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { RefreshCw } from "lucide-react"
import { User, BookOpen, CreditCard } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

// 금융 관련 지식/팁 배열
const financialTips = [
  "복리는 투자의 8번째 불가사의입니다. 일찍 투자를 시작할수록 더 큰 이익을 얻을 수 있습니다.",
  "50/30/20 규칙: 수입의 50%는 필수 지출, 30%는 개인 지출, 20%는 저축 및 투자에 사용하세요.",
  "긴급 자금은 최소 3-6개월치의 생활비를 보유하는 것이 좋습니다.",
  "투자 포트폴리오는 다양화하는 것이 중요합니다. '모든 달걀을 한 바구니에 담지 마세요.'",
  "신용 점수는 금융 건강의 중요한 지표입니다. 정기적으로 확인하고 관리하세요.",
  "부채를 갚을 때는 눈덩이 효과를 위해 고금리 부채부터 상환하는 것이 효과적입니다.",
  "인플레이션은 돈의 구매력을 감소시킵니다. 저축만으로는 자산 가치를 유지하기 어렵습니다.",
  "장기 투자는 단기 시장 변동성의 영향을 줄이는 데 도움이 됩니다.",
  "세금 우대 계좌를 활용하면 장기적으로 더 많은 자산을 축적할 수 있습니다.",
  "자동 저축 및 투자 설정은 재정 목표를 달성하는 데 효과적인 방법입니다.",
  "주택 구매 시 총 비용(세금, 보험, 유지 관리 등)을 고려해야 합니다.",
  "투자 결정을 내릴 때는 감정보다 데이터와 연구에 기반하는 것이 중요합니다.",
  "금융 목표는 구체적이고 측정 가능하며 달성 가능한 것으로 설정하세요.",
  "정기적인 재정 점검은 재정 건강을 유지하는 데 필수적입니다.",
  "투자 수수료는 장기 수익에 큰 영향을 미칠 수 있으므로 항상 확인하세요.",
]

export default function DashboardContent() {
  const [tip, setTip] = useState("")
  const [isRefreshing, setIsRefreshing] = useState(false)

  // 랜덤 팁 선택 함수
  const getRandomTip = () => {
    const randomIndex = Math.floor(Math.random() * financialTips.length)
    return financialTips[randomIndex]
  }

  // 페이지 로드 시 랜덤 팁 설정
  useEffect(() => {
    setTip(getRandomTip())
  }, [])

  // 팁 새로고침 함수
  const refreshTip = () => {
    setIsRefreshing(true)
    setTimeout(() => {
      setTip(getRandomTip())
      setIsRefreshing(false)
    }, 500)
  }

  return (
    <div className="container mx-auto max-w-5xl py-6">
      <h1 className="mb-8 text-3xl font-bold">환영합니다!</h1>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        <div className="flex flex-col items-center justify-center">
          <div className="relative h-64 w-64 overflow-hidden rounded-full border-4 border-primary shadow-lg">
            <Image
              src="/placeholder.svg?height=256&width=256"
              alt="사용자 캐릭터"
              width={256}
              height={256}
              className="object-cover"
              priority
            />
          </div>
          <h2 className="mt-4 text-xl font-semibold">나의 캐릭터</h2>
        </div>

        <Card className="overflow-hidden">
          <CardContent className="p-0">
            <div className="flex flex-col md:flex-row">
              <div className="relative h-48 w-full md:h-auto md:w-1/3">
                <Image
                  src="/placeholder.svg?height=300&width=200"
                  alt="금융 어드바이저 NPC"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
              <div className="flex flex-1 flex-col justify-between p-6">
                <div>
                  <h3 className="mb-2 text-xl font-semibold">금융 어드바이저</h3>
                  <p className="text-muted-foreground">오늘의 금융 팁:</p>
                  <p className="mt-2 text-lg">{tip}</p>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  className="mt-4 self-end"
                  onClick={refreshTip}
                  disabled={isRefreshing}
                >
                  <RefreshCw className={`mr-2 h-4 w-4 ${isRefreshing ? "animate-spin" : ""}`} />
                  새로운 팁 보기
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
        {navItems.map((item) => (
          <Card key={item.title} className="hover:bg-muted/50">
            <CardContent className="flex cursor-pointer flex-col items-center justify-center p-6">
              <item.icon className="mb-4 h-12 w-12 text-primary" />
              <h3 className="text-xl font-medium">{item.title}</h3>
              <p className="mt-2 text-center text-sm text-muted-foreground">
                {item.title === "스탯" && "능력치 및 랭크 확인하기"}
                {item.title === "퀴즈" && "금융 지식 퀴즈에 도전하세요"}
                {item.title === "금융 서비스" && "다양한 금융 서비스 이용하기"}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

const navItems = [
  {
    title: "스탯",
    href: "/dashboard/stats",
    icon: User,
  },
  {
    title: "퀴즈",
    href: "/dashboard/quiz",
    icon: BookOpen,
  },
  {
    title: "금융 서비스",
    href: "/dashboard/finance",
    icon: CreditCard,
  },
]
