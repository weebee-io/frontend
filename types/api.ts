// weebee-front/types/api.ts
// ─────────────────────────────────────────────────────────

/* ========== AUTH ========== */
export interface SignupReq {
    email: string;
    password: string;
    name: string;
  }
// types/api.ts – Login 응답 인터페이스만 추가/수정
export interface LoginReq {
  email: string;
  password: string;
}

export interface LoginRes {
  accessToken: string;      // JWT
  // 선택: refreshToken, expiresIn …
}

  
  /* ========== USER ========== */
  export interface UserRes {
    id: number;
    email: string;
    name: string;
    // ↓ 필요 시 추가
    roles?: string[];
    createdAt?: string; // ISO 8601
  }
  
  /* ========== PAGINATION 공통 ========== */
  export interface PageMeta {
    page: number;          // 0-based
    size: number;
    totalPages: number;
    totalElements: number;
  }
  export interface PageRes<T> {
    content: T[];
    page: PageMeta;
  }
  
  /* ========== QUIZ ========== */
  export interface QuizOptionRes {
    id: number;
    text: string;
    isCorrect?: boolean;   // 답을 보여줄 API라면 포함
  }
  export interface QuizRes {
    id: number;
    text: string;
    category: string;      // e.g. INVESTMENT, SAVING
    level: 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED';
    options: QuizOptionRes[];
  }
  
  /* ========== PRODUCT ========== */
  export interface ProductRes {
    id: number;
    name: string;
    type: 'DEPOSIT' | 'LOAN' | 'FUND' | string;
    bank: string;          // e.g. WOORI
    rate: number;          // 연 이율 %
    risk: 'LOW' | 'MEDIUM' | 'HIGH';
    description?: string;
  }
  