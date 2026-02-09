import { Suspense } from 'react'
import AuthContent from '@/components/auth/AuthContent'

export default function Page() {
  return (
    <Suspense>
      <AuthContent />
    </Suspense>
  )
}