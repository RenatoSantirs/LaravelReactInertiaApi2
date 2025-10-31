import { useForm, Head, usePage } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';

type Product = {
  id: number;
  nombre: string;
  descripcion: string | null;
  precio: number;
  stock: number;
};

export default function Edit() {
  const { product } = usePage<{ product: Product }>().props;

  const { data, setData, put, processing, errors } = useForm({
    nombre: product.nombre || '',
    descripcion: product.descripcion || '',
    precio: product.precio || '',
    stock: product.stock || '',
  });

  const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/dashboard' },
    { title: 'Productos', href: '/products' },
    { title: 'Editar', href: `/products/${product.id}/edit` },
  ];

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    put(`/products/${product.id}`);
  };

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Editar Producto" />
      <div className="p-6">
        <h1 className="mb-4 text-2xl font-bold">Editar Producto</h1>

        <form onSubmit={submit} className="space-y-4">
          <div>
            <label className="block">Nombre</label>
            <input
              type="text"
              value={data.nombre}
              onChange={(e) => setData('nombre', e.target.value)}
              className="w-full border px-2 py-1"
            />
            {errors.nombre && <p className="text-red-500">{errors.nombre}</p>}
          </div>

          <div>
            <label className="block">Descripción</label>
            <textarea
              value={data.descripcion}
              onChange={(e) => setData('descripcion', e.target.value)}
              className="w-full border px-2 py-1"
            />
            {errors.descripcion && <p className="text-red-500">{errors.descripcion}</p>}
          </div>

          <div>
            <label className="block">Precio</label>
            <input
              type="number"
              step="0.01"
              value={data.precio}
              onChange={(e) => setData('precio', e.target.value)}
              className="w-full border px-2 py-1"
            />
            {errors.precio && <p className="text-red-500">{errors.precio}</p>}
          </div>

          <div>
            <label className="block">Stock</label>
            <input
              type="number"
              value={data.stock}
              onChange={(e) => setData('stock', e.target.value)}
              className="w-full border px-2 py-1"
            />
            {errors.stock && <p className="text-red-500">{errors.stock}</p>}
          </div>

          <button
            type="submit"
            disabled={processing}
            className="rounded bg-blue-500 px-4 py-2 text-white"
          >
            Actualizar
          </button>
        </form>
      </div>
    </AppLayout>
  );
}
