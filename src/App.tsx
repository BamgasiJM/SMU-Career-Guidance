import { Routes, Route, useLocation } from 'react-router'
import { useEffect, useState } from 'react'
import Navbar from '@/components/layout/Navbar/Navbar'
import CreditCalc from '@/components/common/CreditCalc/CreditCalc'
import LandingPage          from '@/pages/LandingPage/LandingPage'
import DepartmentsPage      from '@/pages/DepartmentsPage/DepartmentsPage'
import DepartmentDetailPage from '@/pages/DepartmentDetailPage/DepartmentDetailPage'
import TransferPage         from '@/pages/TransferPage/TransferPage'
import ModularPage          from '@/pages/ModularPage/ModularPage'
import SelfDesignPage       from '@/pages/SelfDesignPage/SelfDesignPage'

/** 라우트 이동 시 항상 최상단으로 스크롤 */
function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [pathname])
  return null
}

export default function App() {
  // 졸업 학점 계산기 모달 — 현재 페이지 위에 열리도록 App 레벨에서 관리
  const [showCalc, setShowCalc] = useState(false)

  return (
    <>
      <ScrollToTop />
      <Navbar onOpenCalc={() => setShowCalc(true)} />
      <Routes>
        <Route path="/"                     element={<LandingPage />} />
        <Route path="/departments"          element={<DepartmentsPage />} />
        <Route path="/departments/:id"      element={<DepartmentDetailPage />} />
        <Route path="/programs/transfer"    element={<TransferPage />} />
        <Route path="/programs/modular"     element={<ModularPage />} />
        <Route path="/programs/self-design" element={<SelfDesignPage />} />
      </Routes>
      {showCalc && <CreditCalc onClose={() => setShowCalc(false)} />}
    </>
  )
}
