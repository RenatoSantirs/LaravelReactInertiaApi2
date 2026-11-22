import AppLayout from '@/layouts/app-layout'
import { Head, Link } from '@inertiajs/react'

export default function Index({ cart, total }: any) {
  return (
    <AppLayout>
      <Head title="Carrito" />

      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">Carrito</h1>

        {cart.length > 0 ? (
          <>
            <table className="w-full border mb-4">
              <thead>
                <tr>
                  <th className="border p-2">Producto</th>
                  <th className="border p-2">Cantidad</th>
                  <th className="border p-2">Precio</th>
                  <th className="border p-2">Subtotal</th>
                  <th className="border p-2">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {cart.map((item: any) => (
                  <tr key={item.id}>
                    <td className="border p-2">{item.nombre}</td>
                    <td className="border p-2">{item.quantity}</td>
                    <td className="border p-2">${item.precio}</td>
                    <td className="border p-2">${item.subtotal}</td>
                    <td className="border p-2">
                      <Link
                        as="button"
                        method="delete"
                        href={`/cart/${item.id}`}
                        className="text-red-600"
                      >
                        Quitar
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="text-right text-xl font-bold mb-4">
              Total: ${total}
            </div>

            {/* 👇 AQUÍ VA EL BOTÓN */}
            <Link
              href="/checkout"
              className="inline-block bg-green-600 text-white px-6 py-2 rounded"
            >
              Pagar ahora
            </Link>
          </>
        ) : (
          <p className="text-gray-500">Tu carrito está vacío</p>
        )}
      </div>
    </AppLayout>
  )
}
