"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { User, BookOpen, CreditCard, Menu } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { cn } from "@/lib/utils"

// LogoutModal 컴포넌트 사용
import LogoutModal from "@/components/logout-modal"

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

export default function DashboardNav() {
  const router = useRouter()
  const [activeItem, setActiveItem] = useState("사용자 정보")

  const handleLogout = () => {
    // 로컬 스토리지에서 사용자 데이터 삭제
    localStorage.removeItem("userRank")
    localStorage.removeItem("completedQuizzes")
    localStorage.removeItem("solvedQuizzes")
    localStorage.removeItem("rankProgress")

    // 로그인 페이지로 리다이렉트
    router.push("/login")
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">메뉴 열기</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-64">
              <div className="flex flex-col gap-4 py-4">
                <div className="flex items-center gap-2 px-2">
                  <CreditCard className="h-5 w-5" />
                  <span className="text-lg font-semibold">파이낸스 매니저</span>
                </div>
                <nav className="flex flex-col gap-2">
                  {navItems.map((item) => (
                    <Link
                      key={item.title}
                      href={item.href}
                      className={cn(
                        "flex items-center gap-2 rounded-md px-2 py-1.5 text-sm font-medium",
                        activeItem === item.title
                          ? "bg-muted text-foreground"
                          : "text-muted-foreground hover:bg-muted hover:text-foreground",
                      )}
                      onClick={() => setActiveItem(item.title)}
                    >
                      <item.icon className="h-4 w-4" />
                      {item.title}
                    </Link>
                  ))}
                </nav>
              </div>
            </SheetContent>
          </Sheet>
          <Link href="/dashboard" className="flex items-center gap-2">
            <CreditCard className="h-5 w-5" />
            <span className="text-lg font-semibold">파이낸스 매니저</span>
          </Link>
        </div>
        <nav className="hidden md:flex md:gap-6">
          {navItems.map((item) => (
            <Link
              key={item.title}
              href={item.href}
              className={cn(
                "flex items-center gap-2 text-sm font-medium",
                activeItem === item.title ? "text-foreground" : "text-muted-foreground hover:text-foreground",
              )}
              onClick={() => setActiveItem(item.title)}
            >
              <item.icon className="h-4 w-4" />
              {item.title}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <LogoutModal />
        </div>
      </div>
    </header>
  )
}
