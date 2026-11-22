import AppLayout from '@/layouts/app-layout';
import { Link } from '@inertiajs/react';

export default function MisCompras({ orders }: any) {
  return (
    <AppLayout>
      <div className="p-6">
        <h1 className="mb-4 text-2xl font-bold">Mis compras</h1>

        <table className="w-full border">
          <thead>
            <tr>
              <th className="border p-2">Orden</th>
              <th className="border p-2">Total</th>
              <th className="border p-2">Estado</th>
              <th className="border p-2">Fecha</th>
              <th className="border p-2">Acciones</th>
            </tr>
          </thead>

          <tbody>
            {orders.data.length > 0 ? (
              orders.data.map((order: any) => (
                <tr key={order.id}>
                  <td className="border p-2">#{order.id}</td>
                  <td className="border p-2">${order.total}</td>
                  <td className="border p-2">{order.status}</td>
                  <td className="border p-2">
                    {new Date(order.created_at).toLocaleDateString()}
                  </td>
                  <td className="border p-2">
                    <Link
                      href={`/mis-compras/${order.id}`}
                      className="text-blue-600 underline"
                    >
                      Ver detalle
                    </Link>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="p-4 text-center text-gray-500">
                  Aún no tienes compras
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </AppLayout>
  );
}
