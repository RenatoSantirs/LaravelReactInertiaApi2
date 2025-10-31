import AppLayout from '@/layouts/app-layout';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import { type BreadcrumbItem } from '@/types';

interface Product {
  id: number;
  nombre: string;
  descripcion: string | null;
  precio: number;
  stock: number;
  activo: boolean;
}

interface PaginationLink {
  url: string | null;
  label: string;
  active: boolean;
}

interface PaginatedProducts {
  data: Product[];
  links: PaginationLink[];
}

interface ProductsProps {
  products: PaginatedProducts;
  filters: { search?: string };
}

export default function Index() {
  const { products, filters } = usePage<ProductsProps>().props;

  const { data, setData, get } = useForm({
    search: filters.search || '',
  });

  const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/dashboard' },
    { title: 'Productos', href: '/products' },
  ];

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    get('/products', { preserveState: true });
  };

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Productos" />

      <div className="p-6">
        <h1 className="mb-4 text-2xl font-bold">Productos</h1>

        {/* 🔍 Buscador y botón de nuevo */}
        <div className="mb-4 flex items-center justify-between">
          <form onSubmit={submit} className="flex gap-2">
            <input
              type="text"
              value={data.search}
              onChange={(e) => setData('search', e.target.value)}
              placeholder="Buscar producto..."
              className="rounded border p-2"
            />
            <button type="submit" className="rounded bg-blue-500 px-4 py-2 text-white">
              Buscar
            </button>
          </form>

          <Link href="/products/create" className="rounded bg-green-500 px-4 py-2 text-white">
            Nuevo
          </Link>
        </div>

        {/* 📋 Tabla */}
        <table className="mt-4 w-full border">
          <thead>
            <tr>
              <th className="border p-2">Nombre</th>
              <th className="border p-2">Descripción</th>
              <th className="border p-2">Precio</th>
              <th className="border p-2">Stock</th>
              <th className="border p-2">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {products.data.length > 0 ? (
              products.data.map((p) => (
                <tr key={p.id}>
                  <td className="border p-2">{p.nombre}</td>
                  <td className="border p-2">{p.descripcion}</td>
                  <td className="border p-2">${p.precio}</td>
                  <td className="border p-2">{p.stock}</td>
                  <td className="flex gap-2 border p-2">
                    <Link
                      href={`/products/${p.id}/edit`}
                      className="rounded bg-orange-400 px-3 py-1 text-white hover:bg-orange-500"
                    >
                      Editar
                    </Link>
                    <Link
                      as="button"
                      method="delete"
                      href={`/products/${p.id}`}
                      onClick={(e) => {
                        if (!confirm('¿Deseas eliminar este producto?')) e.preventDefault();
                      }}
                      className="rounded bg-red-600 px-3 py-1 text-white hover:bg-red-700"
                    >
                      Eliminar
                    </Link>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="border p-4 text-center text-gray-500">
                  No se encontraron productos.
                </td>
              </tr>
            )}
          </tbody>
        </table>

        {/* 🔗 Paginación */}
        <div className="mt-4 flex gap-2">
          {products.links.map((link, i) => (
            <Link
              key={i}
              href={link.url || '#'}
              className={`rounded border px-3 py-1 ${
                link.active ? 'bg-gray-300 font-bold' : ''
              } ${!link.url ? 'cursor-not-allowed text-gray-400' : ''}`}
              dangerouslySetInnerHTML={{ __html: link.label }}
            />
          ))}
        </div>
      </div>
    </AppLayout>
  );
}
