import { useEffect, useState } from 'react'
import { initMercadoPago, Wallet } from '@mercadopago/sdk-react'

export default function Checkout() {
  const [preferenceId] = useState('TEST-PREFERENCE-ID')

  useEffect(() => {
    initMercadoPago(import.meta.env.VITE_MP_PUBLIC_KEY)
  }, [])

  return (
    <div>
      <h1>Pagar producto</h1>
      <Wallet initialization={{ preferenceId }} />
    </div>
  )
}
