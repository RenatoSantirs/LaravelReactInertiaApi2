import AppLayout from '@/layouts/app-layout';
import { Head, Link } from '@inertiajs/react';

export default function StoreIndex({ products }: any) {
  return (
    <AppLayout>
      <Head title="Tienda" />

      <div className="p-6">
        <h1 className="text-3xl font-bold mb-6">🛒 Tienda</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {products.data.map((p: any) => (
            <Link
              key={p.id}
              href={`/store/products/${p.id}`}
              className="border rounded-lg p-4 hover:shadow-lg transition"
            >
              <h2 className="text-xl font-semibold">{p.nombre}</h2>
              <p className="text-gray-600 mt-2">{p.descripcion}</p>
              <p className="text-lg font-bold mt-4">${p.precio}</p>
              <p className="text-lg font-bold mt-4">Quedan:{p.stock}</p>

            </Link>
          ))}
        </div>
      </div>
    </AppLayout>
  );
}
