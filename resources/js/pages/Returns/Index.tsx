import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';

interface Return {
  id: number;
  quantity: number;
  amount: number;
  status: string;

  order_item: {
    product: {
      nombre: string;
    };
    order: {
      id: number;
    };
  };

  user: {
    name: string;
  };
}

interface Props {
  returns: Return[];
}

export default function Index({ returns }: Props) {
  const breadcrumbs = [
    { title: 'Dashboard', href: '/dashboard' },
    { title: 'Devoluciones', href: '/returns' },
  ];

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Devoluciones" />

      <div className="p-6">
        <h1 className="mb-4 text-2xl font-bold">Devoluciones</h1>

        <table className="w-full border">
          <thead>
            <tr>
              <th className="border p-2">Orden</th>
              <th className="border p-2">Producto</th>
              <th className="border p-2">Cliente</th>
              <th className="border p-2">Cantidad</th>
              <th className="border p-2">Monto</th>
              <th className="border p-2">Estado</th>
            </tr>
          </thead>

          <tbody>
            {returns.length > 0 ? (
              returns.map((r) => {
                console.log(r);

                return (
                  <tr key={r.id}>
                    <td className="border p-2">#{r.order_item?.order?.id ?? '—'}</td>

                    <td className="border p-2">{r.order_item?.product?.nombre ?? '—'}</td>

                    <td className="border p-2">{r.user?.name}</td>

                    <td className="border p-2">{r.quantity}</td>

                    <td className="border p-2 font-semibold">${r.amount}</td>

                    <td className="border p-2">
                      <span
                        className={`rounded px-2 py-1 text-sm text-white ${
                          r.status === 'pending' ? 'bg-yellow-500' : r.status === 'approved' ? 'bg-green-600' : 'bg-red-600'
                        }`}
                      >
                        {r.status}
                      </span>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan={6} className="border p-4 text-center text-gray-500">
                  No hay devoluciones registradas.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </AppLayout>
  );
}
