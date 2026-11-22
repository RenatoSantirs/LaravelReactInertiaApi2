import AppLayout from '@/layouts/app-layout';
import { Head, Link, router, usePage } from '@inertiajs/react';

interface OrderItem {
  id: number;
  quantity: number;
  price: number;
  subtotal: number;
  returns: any[]; // 👈 agrega esto
  product: {
    nombre: string;
  };
}

interface Order {
  id: number;
  total: number;
  status: string;
  created_at: string;
  user: {
    name: string;
    email: string;
  };
  items: OrderItem[];
}

interface OrderProps {
  order: Order;
}

export default function Show() {
  const { order } = usePage<OrderProps>().props;

  const breadcrumbs = [
    { title: 'Dashboard', href: '/dashboard' },
    { title: 'Ventas', href: '/orders' },
    { title: `Orden #${order.id}`, href: `/orders/${order.id}` },
  ];

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title={`Orden #${order.id}`} />

      <div className="p-6">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-2xl font-bold">Orden #{order.id}</h1>

          <Link href="/orders" className="rounded bg-gray-500 px-3 py-1 text-white">
            Volver
          </Link>
        </div>

        {/* INFO */}
        <div className="mb-6 rounded border p-4">
          <p>
            <strong>Cliente:</strong> {order.user.name}
          </p>
          <p>
            <strong>Email:</strong> {order.user.email}
          </p>
          <p>
            <strong>Estado:</strong> <span className="rounded bg-green-600 px-2 py-1 text-sm text-white">{order.status}</span>
          </p>
          <p>
            <strong>Fecha:</strong> {new Date(order.created_at).toLocaleString()}
          </p>
        </div>

        {/* ITEMS */}
        <table className="w-full border">
          <thead>
            <tr>
              <th>Producto</th>
              <th>Cantidad</th>
              <th>Precio</th>
              <th>Subtotal</th>
              <th>Acciones</th>
            </tr>
          </thead>

          <tbody>
            {order.items.map((item) => {
              const returned = item.returns.length > 0;

              return (
                <tr key={item.id}>
                  <td>{item.product.nombre}</td>
                  <td>{item.quantity}</td>
                  <td>${item.price}</td>
                  <td>${item.subtotal}</td>
                  <td>
                    {item.returns.length > 0 ? (
                      <div className="text-sm text-gray-600">
                        Devuelto ({item.returns[0].quantity}) – ${item.returns[0].amount}
                      </div>
                    ) : (
                      <button
                        className="text-red-600 hover:underline"
                        onClick={() => {
                          if (!confirm('¿Deseas devolver este producto?')) return;
                          router.post(`/order-items/${item.id}/return`);
                        }}
                      >
                        Devolver
                      </button>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        <div className="mt-4 text-right text-xl font-bold">Total: ${order.total}</div>
      </div>
    </AppLayout>
  );
}
