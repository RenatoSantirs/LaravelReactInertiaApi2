import { useForm, Head } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';

export default function Create() {
  const { data, setData, post, processing, errors } = useForm({
    nombre: '',
    descripcion: '',
    precio: '',
    stock: '',
  });

  const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/dashboard' },
    { title: 'Productos', href: '/products' },
    { title: 'Nuevo', href: '/products/create' },
  ];

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    post('/products');
  };

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Nuevo Producto" />
      <div className="p-6">
        <h1 className="mb-4 text-2xl font-bold">Nuevo Producto</h1>

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
            className="rounded bg-green-500 px-4 py-2 text-white"
          >
            Guardar
          </button>
        </form>
      </div>
    </AppLayout>
  );
}
