import AppLayout from '@/layouts/app-layout';
import { Head, Link, usePage } from '@inertiajs/react';

interface Order {
  id: number;
  total: number;
  status: string;
  created_at: string;
  user: {
    name: string;
    email: string;
  };
}

interface OrdersProps {
  orders: Order[];
}

export default function Index() {
  const { orders } = usePage<OrdersProps>().props;

  const breadcrumbs = [
    { title: 'Dashboard', href: '/dashboard' },
    { title: 'Ventas', href: '/orders' },
  ];

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Ventas" />

      <div className="p-6">
        <h1 className="mb-4 text-2xl font-bold">Ventas</h1>

        <table className="w-full border">
          <thead>
            <tr>
              <th className="border p-2">ID</th>
              <th className="border p-2">Usuario</th>
              <th className="border p-2">Total</th>
              <th className="border p-2">Estado</th>
              <th className="border p-2">Fecha</th>
              <th className="border p-2">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {orders.length > 0 ? (
              orders.map((order) => (
                <tr key={order.id}>
                  <td className="border p-2">#{order.id}</td>
                  <td className="border p-2">
                    <div className="font-semibold">{order.user.name}</div>
                    <div className="text-sm text-gray-500">
                      {order.user.email}
                    </div>
                  </td>
                  <td className="border p-2 font-bold">
                    ${order.total}
                  </td>
                  <td className="border p-2">
                    <span
                      className={`rounded px-2 py-1 text-sm text-white ${
                        order.status === 'approved'
                          ? 'bg-green-600'
                          : 'bg-gray-500'
                      }`}
                    >
                      {order.status}
                    </span>
                  </td>
                  <td className="border p-2">
                    {new Date(order.created_at).toLocaleDateString()}
                  </td>
                  <td className="border p-2">
                    <Link
                      href={`/orders/${order.id}`}
                      className="rounded bg-blue-600 px-3 py-1 text-white hover:bg-blue-700"
                    >
                      Ver detalle
                    </Link>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={6}
                  className="border p-4 text-center text-gray-500"
                >
                  No hay ventas registradas.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </AppLayout>
  );
}
