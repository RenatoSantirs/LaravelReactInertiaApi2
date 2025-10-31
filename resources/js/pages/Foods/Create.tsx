import { useForm, Link } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';

export default function Create() {
  const { data, setData, post, errors } = useForm({
    nombre: '',
    cantidad: '',
  });

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    post('/foods');
  };

  return (
    <AppLayout>
      <div className="p-6">
        <h1 className="mb-4 text-2xl font-bold">Crear Alimento</h1>

        <form onSubmit={submit} className="space-y-4 max-w-md">
          <div>
            <label>Nombre</label>
            <input
              type="text"
              value={data.nombre}
              onChange={(e) => setData('nombre', e.target.value)}
              className="w-full border p-2"
            />
            {errors.nombre && <p className="text-red-500">{errors.nombre}</p>}
          </div>

          <div>
            <label>Cantidad</label>
            <input
              type="number"
              value={data.cantidad}
              onChange={(e) => setData('cantidad', e.target.value)}
              className="w-full border p-2"
            />
            {errors.cantidad && <p className="text-red-500">{errors.cantidad}</p>}
          </div>

          <button className="rounded bg-green-500 px-4 py-2 text-white">Guardar</button>
          <Link href="/foods" className="ml-2 text-gray-600">
            Volver
          </Link>
        </form>
      </div>
    </AppLayout>
  );
}
