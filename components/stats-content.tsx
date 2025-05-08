"use client"

import { useState, useEffect } from "react"
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
} from "chart.js"
import { Radar, Bar } from "react-chartjs-2"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"

// Chart.js 컴포넌트 등록
ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
)

// 사용자 능력치 데이터 (예시)
const statsData = {
  금융지식: 75,
  투자능력: 60,
  예산관리: 85,
  위험관리: 70,
  저축습관: 90,
  부채관리: 65,
}

// 최대 능력치
const maxStats = 100

// 랭크 결정 함수
const determineRank = (stats: Record<string, number>): string => {
  const average = Object.values(stats).reduce((sum, stat) => sum + stat, 0) / Object.values(stats).length

  if (average >= 85) return "골드"
  if (average >= 70) return "실버"
  return "브론즈"
}

// 랭크별 색상
const rankColors = {
  골드: "bg-yellow-500",
  실버: "bg-gray-400",
  브론즈: "bg-amber-700",
}

export default function StatsContent() {
  const [rank, setRank] = useState("")
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
    setRank(determineRank(statsData))
  }, [])

  // 레이더 차트 데이터
  const radarData = {
    labels: Object.keys(statsData),
    datasets: [
      {
        label: "현재 능력치",
        data: Object.values(statsData),
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 2,
        pointBackgroundColor: "rgba(75, 192, 192, 1)",
        pointBorderColor: "#fff",
        pointHoverBackgroundColor: "#fff",
        pointHoverBorderColor: "rgba(75, 192, 192, 1)",
      },
      {
        label: "최대 능력치",
        data: Array(Object.keys(statsData).length).fill(maxStats),
        backgroundColor: "rgba(255, 99, 132, 0.1)",
        borderColor: "rgba(255, 99, 132, 0.5)",
        borderWidth: 1,
        pointBackgroundColor: "rgba(255, 99, 132, 0.5)",
        pointBorderColor: "#fff",
        pointHoverBackgroundColor: "#fff",
        pointHoverBorderColor: "rgba(255, 99, 132, 1)",
      },
    ],
  }

  // 레이더 차트 옵션
  const radarOptions = {
    scales: {
      r: {
        angleLines: {
          display: true,
        },
        suggestedMin: 0,
        suggestedMax: maxStats,
      },
    },
    maintainAspectRatio: false,
  }

  // 막대 차트 데이터
  const barData = {
    labels: Object.keys(statsData),
    datasets: [
      {
        label: "능력치",
        data: Object.values(statsData),
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  }

  // 막대 차트 옵션
  const barOptions = {
    scales: {
      y: {
        beginAtZero: true,
        max: maxStats,
      },
    },
    indexAxis: "y" as const,
    maintainAspectRatio: false,
  }

  return (
    <div className="container mx-auto max-w-5xl py-6">
      <h1 className="mb-8 text-3xl font-bold">능력치 및 랭크</h1>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>나의 랭크</span>
                <Badge className={`text-lg py-1 px-3 ${rankColors[rank as keyof typeof rankColors] || "bg-gray-500"}`}>
                  {rank}
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4 text-muted-foreground">
                {rank === "골드" && "상위 10%의 금융 전문가입니다. 축하합니다!"}
                {rank === "실버" && "평균 이상의 금융 지식을 보유하고 있습니다."}
                {rank === "브론즈" && "금융 지식을 쌓아가는 중입니다. 퀴즈를 통해 더 많은 지식을 얻어보세요."}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>능력치 상세</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {Object.entries(statsData).map(([stat, value]) => (
                <div key={stat} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">{stat}</span>
                    <span className="text-sm text-muted-foreground">
                      {value}/{maxStats}
                    </span>
                  </div>
                  <Progress value={value} max={maxStats} className="h-3" />
                </div>
              ))}
            </CardContent>
          </Card>

          {isClient && (
            <Card>
              <CardHeader>
                <CardTitle>능력치 분포</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <Bar data={barData} options={barOptions} />
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        <Card>
          <CardHeader>
            <CardTitle>능력치 다이어그램</CardTitle>
          </CardHeader>
          <CardContent>
            {isClient && (
              <div className="h-[500px] w-full">
                <Radar data={radarData} options={radarOptions} />
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
