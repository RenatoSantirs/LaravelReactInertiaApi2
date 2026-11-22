import AppLayout from '@/layouts/app-layout'
import { useEffect } from 'react'
import { initMercadoPago, Wallet } from '@mercadopago/sdk-react'

export default function Checkout({ preferenceId }: any) {
  useEffect(() => {
    initMercadoPago(import.meta.env.VITE_MP_PUBLIC_KEY)
  }, [])

  return (
    <AppLayout>
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">Checkout</h1>

        <Wallet initialization={{ preferenceId }} />
      </div>
    </AppLayout>
  )
}
