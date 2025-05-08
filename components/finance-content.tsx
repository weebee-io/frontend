"use client"

import { useState, useEffect } from "react"
import { ChevronDown, ChevronUp, ExternalLink, Star } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// 금융 서비스 데이터 타입 정의
interface FinancialService {
  id: string
  title: string
  category: "예금" | "투자" | "대출" | "보험" | "연금" | "세금"
  description: string
  effectiveness: 1 | 2 | 3 | 4 | 5 // 1-5 별점
  minRank: "브론즈" | "실버" | "골드"
  url: string
}

// 금융 서비스 데이터 (예시)
const financialServicesData: FinancialService[] = [
  // 브론즈 랭크 서비스
  {
    id: "b1",
    title: "초보자를 위한 자유적금",
    category: "예금",
    description:
      "매월 일정 금액을 자유롭게 저축할 수 있는 적금 상품입니다. 금융 습관을 기르기 시작하는 분들에게 적합합니다. 최소 가입 금액이 낮고, 자유롭게 입금 가능합니다.",
    effectiveness: 3,
    minRank: "브론즈",
    url: "https://example.com/savings",
  },
  {
    id: "b2",
    title: "청년 우대 정기예금",
    category: "예금",
    description:
      "청년층을 위한 우대 금리를 제공하는 정기예금입니다. 안정적인 수익을 원하는 초보 투자자에게 적합합니다. 일정 기간 동안 돈을 맡기면 약속된 이자를 지급합니다.",
    effectiveness: 2,
    minRank: "브론즈",
    url: "https://example.com/deposit",
  },
  {
    id: "b3",
    title: "생애 첫 주택 대출",
    category: "대출",
    description:
      "생애 첫 주택 구매자를 위한 특별 금리 대출 상품입니다. 낮은 금리와 유연한 상환 조건을 제공합니다. 주택 구매를 계획 중인 초보자에게 추천합니다.",
    effectiveness: 4,
    minRank: "브론즈",
    url: "https://example.com/first-home-loan",
  },
  {
    id: "b4",
    title: "기본 실손의료보험",
    category: "보험",
    description:
      "의료비 부담을 줄여주는 기본적인 실손의료보험입니다. 입원, 통원, 약제비 등을 보장하며, 건강 관리의 첫 단계로 적합합니다.",
    effectiveness: 4,
    minRank: "브론즈",
    url: "https://example.com/health-insurance",
  },
  {
    id: "b5",
    title: "소액 투자 앱",
    category: "투자",
    description:
      "소액으로 시작할 수 있는 투자 앱입니다. 적은 금액으로도 다양한 자산에 투자할 수 있어 투자 입문자에게 적합합니다. 자동 투자 기능도 제공합니다.",
    effectiveness: 3,
    minRank: "브론즈",
    url: "https://example.com/micro-investing",
  },

  // 실버 랭크 서비스
  {
    id: "s1",
    title: "중기 성장형 펀드",
    category: "투자",
    description:
      "3-5년의 중기 투자를 목표로 하는 성장형 펀드입니다. 주식과 채권에 분산 투자하여 적절한 위험 관리와 수익을 추구합니다. 기본적인 투자 경험이 있는 분들에게 적합합니다.",
    effectiveness: 4,
    minRank: "실버",
    url: "https://example.com/growth-fund",
  },
  {
    id: "s2",
    title: "스마트 자산 배분 서비스",
    category: "투자",
    description:
      "개인의 투자 성향과 목표에 맞춰 자산을 자동으로 배분해주는 서비스입니다. 알고리즘을 통해 정기적으로 리밸런싱을 수행하여 최적의 포트폴리오를 유지합니다.",
    effectiveness: 4,
    minRank: "실버",
    url: "https://example.com/asset-allocation",
  },
  {
    id: "s3",
    title: "종합 소득세 절세 서비스",
    category: "세금",
    description:
      "개인의 소득과 지출 패턴을 분석하여 최적의 세금 절약 방법을 제안하는 서비스입니다. 공제 항목을 최대화하고 세금 부담을 줄이는 데 도움을 줍니다.",
    effectiveness: 3,
    minRank: "실버",
    url: "https://example.com/tax-saving",
  },
  {
    id: "s4",
    title: "생활 보장 종합보험",
    category: "보험",
    description:
      "질병, 상해, 재물 손해 등 다양한 위험을 한 번에 보장하는 종합보험입니다. 여러 보험을 따로 가입하는 것보다 효율적으로 보장받을 수 있습니다.",
    effectiveness: 5,
    minRank: "실버",
    url: "https://example.com/comprehensive-insurance",
  },
  {
    id: "s5",
    title: "개인형 IRP(개인형 퇴직연금)",
    category: "연금",
    description:
      "퇴직금을 효율적으로 관리하고 노후를 준비할 수 있는 개인형 퇴직연금입니다. 세제 혜택과 함께 다양한 금융 상품에 투자할 수 있습니다.",
    effectiveness: 4,
    minRank: "실버",
    url: "https://example.com/personal-pension",
  },

  // 골드 랭크 서비스
  {
    id: "g1",
    title: "해외 ETF 포트폴리오",
    category: "투자",
    description:
      "글로벌 시장에 분산 투자할 수 있는 해외 ETF 포트폴리오 서비스입니다. 다양한 국가와 산업에 효율적으로 투자하여 위험을 분산하고 수익을 추구합니다.",
    effectiveness: 5,
    minRank: "골드",
    url: "https://example.com/global-etf",
  },
  {
    id: "g2",
    title: "대체 투자 플랫폼",
    category: "투자",
    description:
      "부동산, 예술품, 사모펀드 등 전통적인 금융 상품 외의 대체 투자 기회를 제공하는 플랫폼입니다. 포트폴리오 다각화와 높은 수익 잠재력을 추구하는 투자자에게 적합합니다.",
    effectiveness: 4,
    minRank: "골드",
    url: "https://example.com/alternative-investments",
  },
  {
    id: "g3",
    title: "맞춤형 세무 컨설팅",
    category: "세금",
    description:
      "개인의 자산 구조와 소득 특성에 맞는 전문적인 세무 컨설팅 서비스입니다. 세금 최적화 전략을 수립하고 장기적인 자산 관리 계획을 제공합니다.",
    effectiveness: 5,
    minRank: "골드",
    url: "https://example.com/tax-consulting",
  },
  {
    id: "g4",
    title: "VIP 자산관리 서비스",
    category: "투자",
    description:
      "고액 자산가를 위한 프리미엄 자산관리 서비스입니다. 전담 PB(프라이빗 뱅커)가 종합적인 자산 관리 솔루션을 제공하며, 투자, 세무, 상속 등 다양한 영역을 포괄합니다.",
    effectiveness: 5,
    minRank: "골드",
    url: "https://example.com/vip-wealth-management",
  },
  {
    id: "g5",
    title: "다중 자산 포트폴리오 보험",
    category: "보험",
    description:
      "다양한 자산(부동산, 주식, 채권 등)에 대한 종합적인 보장을 제공하는 고급 보험 상품입니다. 자산 가치 변동에 따른 위험을 관리하고 보호합니다.",
    effectiveness: 4,
    minRank: "골드",
    url: "https://example.com/multi-asset-insurance",
  },
]

// 카테고리 목록
const categories = ["전체", "예금", "투자", "대출", "보험", "연금", "세금"] as const

export default function FinanceContent() {
  const [userRank, setUserRank] = useState<"브론즈" | "실버" | "골드">("실버") // 예시로 실버 랭크 설정
  const [selectedCategory, setSelectedCategory] = useState<string>("전체")
  const [expandedServices, setExpandedServices] = useState<string[]>([])

  // 로컬 스토리지에서 랭크 불러오기
  useEffect(() => {
    const savedRank = localStorage.getItem("userRank")
    if (savedRank && (savedRank === "브론즈" || savedRank === "실버" || savedRank === "골드")) {
      setUserRank(savedRank as "브론즈" | "실버" | "골드")
    }
  }, [])

  // 서비스 확장/축소 토글
  const toggleServiceExpand = (serviceId: string) => {
    setExpandedServices((prev) =>
      prev.includes(serviceId) ? prev.filter((id) => id !== serviceId) : [...prev, serviceId],
    )
  }

  // 랭크에 따라 접근 가능한 서비스 필터링
  const getAccessibleServices = () => {
    const rankLevels = {
      브론즈: 1,
      실버: 2,
      골드: 3,
    }

    const userRankLevel = rankLevels[userRank]

    return financialServicesData.filter((service) => {
      const serviceRankLevel = rankLevels[service.minRank]
      return serviceRankLevel <= userRankLevel
    })
  }

  // 카테고리별 필터링
  const getFilteredServices = () => {
    const accessibleServices = getAccessibleServices()

    if (selectedCategory === "전체") {
      return accessibleServices
    }

    return accessibleServices.filter((service) => service.category === selectedCategory)
  }

  // 효과 별점 렌더링
  const renderEffectiveness = (level: number) => {
    return (
      <div className="flex items-center">
        {Array.from({ length: 5 }).map((_, index) => (
          <Star
            key={index}
            className={`h-4 w-4 ${index < level ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
          />
        ))}
      </div>
    )
  }

  // 랭크별 서비스 그룹화
  const bronzeServices = getFilteredServices().filter((service) => service.minRank === "브론즈")
  const silverServices = getFilteredServices().filter((service) => service.minRank === "실버")
  const goldServices = getFilteredServices().filter((service) => service.minRank === "골드")

  return (
    <div className="container mx-auto max-w-5xl py-6">
      <h1 className="mb-8 text-3xl font-bold">금융 서비스 추천</h1>

      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2">
          <span className="text-lg">현재 랭크:</span>
          <Badge className="text-base">{userRank}</Badge>
        </div>

        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </Button>
          ))}
        </div>
      </div>

      <Tabs defaultValue="all">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="all">모든 서비스</TabsTrigger>
          <TabsTrigger value="by-rank">랭크별 보기</TabsTrigger>
          <TabsTrigger value="by-category">카테고리별 보기</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="mt-6 space-y-4">
          {getFilteredServices().length > 0 ? (
            getFilteredServices().map((service) => (
              <Card key={service.id} className="overflow-hidden">
                <CardHeader className="cursor-pointer" onClick={() => toggleServiceExpand(service.id)}>
                  <div className="flex items-center justify-between">
                    <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:gap-3">
                      <Badge variant="outline" className="w-fit">
                        {service.category}
                      </Badge>
                      <CardTitle className="text-lg">{service.title}</CardTitle>
                    </div>
                    <div className="flex items-center gap-4">
                      {renderEffectiveness(service.effectiveness)}
                      {expandedServices.includes(service.id) ? (
                        <ChevronUp className="h-5 w-5" />
                      ) : (
                        <ChevronDown className="h-5 w-5" />
                      )}
                    </div>
                  </div>
                </CardHeader>
                {expandedServices.includes(service.id) && (
                  <>
                    <CardContent>
                      <CardDescription className="text-base">{service.description}</CardDescription>
                    </CardContent>
                    <CardFooter className="flex justify-end">
                      <Button variant="outline" size="sm" asChild>
                        <a
                          href={service.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2"
                        >
                          자세히 보기
                          <ExternalLink className="h-4 w-4" />
                        </a>
                      </Button>
                    </CardFooter>
                  </>
                )}
              </Card>
            ))
          ) : (
            <div className="rounded-lg border border-dashed p-8 text-center">
              <p className="text-muted-foreground">선택한 카테고리에 해당하는 서비스가 없습니다.</p>
            </div>
          )}
        </TabsContent>

        <TabsContent value="by-rank" className="mt-6 space-y-6">
          {bronzeServices.length > 0 && (
            <div>
              <h2 className="mb-4 text-xl font-semibold">브론즈 랭크 추천 서비스</h2>
              <div className="space-y-4">
                {bronzeServices.map((service) => (
                  <Card key={service.id} className="overflow-hidden">
                    <CardHeader className="cursor-pointer" onClick={() => toggleServiceExpand(service.id)}>
                      <div className="flex items-center justify-between">
                        <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:gap-3">
                          <Badge variant="outline" className="w-fit">
                            {service.category}
                          </Badge>
                          <CardTitle className="text-lg">{service.title}</CardTitle>
                        </div>
                        <div className="flex items-center gap-4">
                          {renderEffectiveness(service.effectiveness)}
                          {expandedServices.includes(service.id) ? (
                            <ChevronUp className="h-5 w-5" />
                          ) : (
                            <ChevronDown className="h-5 w-5" />
                          )}
                        </div>
                      </div>
                    </CardHeader>
                    {expandedServices.includes(service.id) && (
                      <>
                        <CardContent>
                          <CardDescription className="text-base">{service.description}</CardDescription>
                        </CardContent>
                        <CardFooter className="flex justify-end">
                          <Button variant="outline" size="sm" asChild>
                            <a
                              href={service.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-2"
                            >
                              자세히 보기
                              <ExternalLink className="h-4 w-4" />
                            </a>
                          </Button>
                        </CardFooter>
                      </>
                    )}
                  </Card>
                ))}
              </div>
            </div>
          )}

          {silverServices.length > 0 && (
            <div>
              <h2 className="mb-4 text-xl font-semibold">실버 랭크 추천 서비스</h2>
              <div className="space-y-4">
                {silverServices.map((service) => (
                  <Card key={service.id} className="overflow-hidden">
                    <CardHeader className="cursor-pointer" onClick={() => toggleServiceExpand(service.id)}>
                      <div className="flex items-center justify-between">
                        <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:gap-3">
                          <Badge variant="outline" className="w-fit">
                            {service.category}
                          </Badge>
                          <CardTitle className="text-lg">{service.title}</CardTitle>
                        </div>
                        <div className="flex items-center gap-4">
                          {renderEffectiveness(service.effectiveness)}
                          {expandedServices.includes(service.id) ? (
                            <ChevronUp className="h-5 w-5" />
                          ) : (
                            <ChevronDown className="h-5 w-5" />
                          )}
                        </div>
                      </div>
                    </CardHeader>
                    {expandedServices.includes(service.id) && (
                      <>
                        <CardContent>
                          <CardDescription className="text-base">{service.description}</CardDescription>
                        </CardContent>
                        <CardFooter className="flex justify-end">
                          <Button variant="outline" size="sm" asChild>
                            <a
                              href={service.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-2"
                            >
                              자세히 보기
                              <ExternalLink className="h-4 w-4" />
                            </a>
                          </Button>
                        </CardFooter>
                      </>
                    )}
                  </Card>
                ))}
              </div>
            </div>
          )}

          {goldServices.length > 0 && (
            <div>
              <h2 className="mb-4 text-xl font-semibold">골드 랭크 추천 서비스</h2>
              <div className="space-y-4">
                {goldServices.map((service) => (
                  <Card key={service.id} className="overflow-hidden">
                    <CardHeader className="cursor-pointer" onClick={() => toggleServiceExpand(service.id)}>
                      <div className="flex items-center justify-between">
                        <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:gap-3">
                          <Badge variant="outline" className="w-fit">
                            {service.category}
                          </Badge>
                          <CardTitle className="text-lg">{service.title}</CardTitle>
                        </div>
                        <div className="flex items-center gap-4">
                          {renderEffectiveness(service.effectiveness)}
                          {expandedServices.includes(service.id) ? (
                            <ChevronUp className="h-5 w-5" />
                          ) : (
                            <ChevronDown className="h-5 w-5" />
                          )}
                        </div>
                      </div>
                    </CardHeader>
                    {expandedServices.includes(service.id) && (
                      <>
                        <CardContent>
                          <CardDescription className="text-base">{service.description}</CardDescription>
                        </CardContent>
                        <CardFooter className="flex justify-end">
                          <Button variant="outline" size="sm" asChild>
                            <a
                              href={service.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-2"
                            >
                              자세히 보기
                              <ExternalLink className="h-4 w-4" />
                            </a>
                          </Button>
                        </CardFooter>
                      </>
                    )}
                  </Card>
                ))}
              </div>
            </div>
          )}

          {bronzeServices.length === 0 && silverServices.length === 0 && goldServices.length === 0 && (
            <div className="rounded-lg border border-dashed p-8 text-center">
              <p className="text-muted-foreground">선택한 카테고리에 해당하는 서비스가 없습니다.</p>
            </div>
          )}
        </TabsContent>

        <TabsContent value="by-category" className="mt-6 space-y-6">
          {categories
            .filter((category) => category !== "전체")
            .map((category) => {
              const categoryServices = getFilteredServices().filter((service) => service.category === category)

              if (categoryServices.length === 0) return null

              return (
                <div key={category}>
                  <h2 className="mb-4 text-xl font-semibold">{category} 서비스</h2>
                  <div className="space-y-4">
                    {categoryServices.map((service) => (
                      <Card key={service.id} className="overflow-hidden">
                        <CardHeader className="cursor-pointer" onClick={() => toggleServiceExpand(service.id)}>
                          <div className="flex items-center justify-between">
                            <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:gap-3">
                              <Badge>{service.minRank}</Badge>
                              <CardTitle className="text-lg">{service.title}</CardTitle>
                            </div>
                            <div className="flex items-center gap-4">
                              {renderEffectiveness(service.effectiveness)}
                              {expandedServices.includes(service.id) ? (
                                <ChevronUp className="h-5 w-5" />
                              ) : (
                                <ChevronDown className="h-5 w-5" />
                              )}
                            </div>
                          </div>
                        </CardHeader>
                        {expandedServices.includes(service.id) && (
                          <>
                            <CardContent>
                              <CardDescription className="text-base">{service.description}</CardDescription>
                            </CardContent>
                            <CardFooter className="flex justify-end">
                              <Button variant="outline" size="sm" asChild>
                                <a
                                  href={service.url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="flex items-center gap-2"
                                >
                                  자세히 보기
                                  <ExternalLink className="h-4 w-4" />
                                </a>
                              </Button>
                            </CardFooter>
                          </>
                        )}
                      </Card>
                    ))}
                  </div>
                </div>
              )
            })}
        </TabsContent>
      </Tabs>
    </div>
  )
}
