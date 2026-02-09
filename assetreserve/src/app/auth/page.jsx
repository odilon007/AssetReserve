import { Suspense } from 'react'
import AuthContent from '@/components/auth/AuthContent'

export default function Page() {
  return (
    <Suspense fallback={<div className="flex h-screen items-center justify-center">Carregando...</div>}>
      <AuthContent />
    </Suspense>
  )
}